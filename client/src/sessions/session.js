import lcg from "../common/lcg";

import words from "../words";

const MASK_CHAR = "▪";
const START_TIMER = 60;

const isValid = (words, word) => words.indexOf(word) > -1;
const isDuplicate = (entries, word) => !!entries.find(
  (entry) => entry && entry.word === word
);

const calculateScore = (timer, word, valid, duplicate) => {
  if(duplicate)
    return 0;

  if(valid)
    return Math.ceil(word.length * timer / START_TIMER * 2);

// TODO: Negative score?
  return 0;
};
const calculateStatus = (words, guessed) => {
  if(words.length === guessed)
    return 2;

  return 3;
};

function toArray(iterator) {
  var a = [];

  for(const w of iterator)
    a.push(w);

  return a;
}

function* list(rng) {
  yield* words(5, 3, rng);
  yield* words(3, 4, rng);
  yield* words(2, 5, rng);
}

function createEntry(words, entries, timer, word) {
  const valid = isValid(words, word);
  const duplicate = isDuplicate(entries, word);

  return {
    timer,
    duplicate,
    score: calculateScore(timer, word, valid, duplicate),
    valid,
    word,
  }
}

function* pickIndex(n, rng) {
  const a = new Array(n);

  for(let i = 0, j = 0; i < n; ++i) {
    j = Math.floor(n * rng());

    if(a[j])
      continue;

    a[j] = true;

    yield j;
  }
}

function createHint(session) {
  const threshold = (1 - session.timer / START_TIMER) / 2;

  if(session.rng() > threshold)
    return undefined;

  var c;
  var revealed, word;

LOOP:
  for(const r of pickIndex(session.words.length, session.rng)) {
    word = session.words[r];

    if(session.hints[word] === word)
      continue;

    revealed = session.hints[word];

    for(c of pickIndex(word.length, session.rng)) {
      if(revealed[c] !== MASK_CHAR)
        continue;

      break LOOP;
    }
  }

  if(!revealed)
    return undefined;

  return {
    [word]: revealed.substring(0, c) + word[c] + revealed.substring(c + 1),
  }
}

export const init = (hash, id, startDate) => {
  const rng = lcg(id.timestamp);

  const words = toArray(list(rng));

  const hints = words.reduce(
    (memo, word) => ({
      ...memo,

      [word]: MASK_CHAR.repeat(word.length),
    }),
    {}
  );

  return {
    rng,

    entries: [],
    guessed: 0,
    hash,
    hints,
    id,
    score: 0,
    startDate,
    status: 0, // 0 idle, 1 progress, 2 won, 3 lost
    timer: START_TIMER,
    words,
  };
};

export const reinit = ({ entries: items, hash, id, startDate }) => {
  const initial = init(hash, id, startDate);

  var guessed = 0;
  var hints = {};
  var score = 0;
  var timer = 0;

  const n = items.length;

  if(n)
    timer = items[0].timer;

  var entries = new Array(n);

  for(let i = n - 1; i >= 0; --i) {
    const item = items[i];

    const entry = createEntry(
      initial.words,
      entries,
      item.timer,
      item.word
    );

    entries[i] = entry;

    if(entry.valid && !entry.duplicate) {
      hints[item.word] = item.word;
      guessed += 1;
    }

    score += entry.score;
  }

  return {
    ...initial,

    entries,
    guessed,
    hints,
    score,
    status: calculateStatus(initial.words, guessed),
    timer,
  };
};

export const tick = (session) => {
  --session.timer;

  const hint = createHint(session);

  if(hint)
    Object.assign(session.hints, hint);
};

export const guess = (session, word) => {
  if(session.status > 1)
    return;

  const entry = createEntry(
    session.words,
    session.entries,
    session.timer,
    word
  );

  session.entries.unshift(entry);

  if(entry.valid && !entry.duplicate) {
    session.hints[word] = word;
    session.guessed += 1;
  }

  session.score += entry.score;
};

export const end = (session) => {
  session.status = calculateStatus(session.words, session.guessed);
};

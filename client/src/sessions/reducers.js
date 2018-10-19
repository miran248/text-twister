import { LOCATION_CHANGE } from "connected-react-router";
import produce from "immer";

import { actionTypes, key } from "./actions";
import { route as sessionRoute } from "./route";

import lcg from "../common/lcg";

import words from "../words";

const START_TIMER = 60;
const MASK_CHAR = "▪";

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

function createSession(session) {
  const rng = lcg(session.startDate.valueOf());

  const words = toArray(list(rng));

  const hints = words.reduce(
    (memo, word) => ({
      ...memo,

      [word]: MASK_CHAR.repeat(word.length),
    }),
    {}
  );

  return {
    ...session,

    rng,

    entries: [],
    guessed: 0,
    hints,
    score: 0,
    status: 0, // 0 idle, 1 progress, 2 won, 3 lost
    timer: START_TIMER,
    words,
  };
}

function createEntry(session, word) {
  const valid = session.words.indexOf(word) > -1;
  const duplicate = !!session.entries.find(
    (entry) => entry.word === word
  );

  return {
    timer: session.timer,
    duplicate,
    score: duplicate ? 0 : valid
      ? Math.ceil(word.length * session.timer / START_TIMER * 2)
      : 0, // TODO: Negative score?
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

const initialState = {
  current: null,
  hash: {},
  list: [],
  name: null,
  loading: true,
};

function reducer(state = initialState, action) {
  if(action.type == LOCATION_CHANGE) {
    return produce(state, (draft) => {
      draft.current = null;
      draft.loading = true;
    });
  }

  if(action.type == actionTypes.END) {
    return produce(state, (draft) => {
      const session = draft.hash[state.current];

      if(session.guessed === session.words.length)
        session.status = 2;
      else
        session.status = 3;
    });
  }

  if(action.type == actionTypes.GUESS) {
    const { word } = action.payload;

    return produce(state, (draft) => {
      const session = draft.hash[state.current];

      if(session.status > 1)
        return;

      const entry = createEntry(session, word);

      session.entries.unshift(entry);

      if(entry.valid && !entry.duplicate) {
        session.hints[word] = word;
        session.guessed += 1;
      }

      session.score += entry.score;
    });
  }

  if(action.type == actionTypes.INFO) {
    const { id, name, startDate, version } =  action.payload;

    const existing = state.hash[id];

    return produce(state, (draft) => {
      draft.current = id;
      draft.loading = false;

      if(!existing) {
        draft.hash[id] = createSession({ name, startDate, version });
        draft.list.push(id);
      } else if(draft.hash[id].status === 1)
        draft.hash[id].status = 0;
    });
  }

  if(action.type == actionTypes.PLAY) {
    return produce(state, (draft) => {
      const { name } = action.payload;

      draft.name = name;
    });
  }
  if(action.type == actionTypes.PLAYING) {
    return produce(state, (draft) => {
      const session = draft.hash[state.current];

      session.status = 1;
    });
  }

  if(action.type == actionTypes.RESTORE) {
    const session =  action.payload;

    console.log("restoring", session);

    return state;

    // return produce(state, (draft) => {
    //   const session = draft.hash[state.current];
    //
    //   session.status = 1;
    // });
  }

  if(action.type == actionTypes.TIMER_DECREMENT) {
    return produce(state, (draft) => {
      const session = draft.hash[state.current];

      --session.timer;

      const hint = createHint(session);

      if(hint)
        Object.assign(session.hints, hint);
    });
  }

  return state;
}

export default {
  [key]: reducer,
};

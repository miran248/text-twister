import { LOCATION_CHANGE } from "connected-react-router";
import produce from "immer";

import { actionTypes, key } from "./actions";
import { route as sessionRoute } from "./route";

import words from "../words";

const START_TIMER = 60;

function toArray(iterator) {
  var a = [];

  for(const w of iterator)
    a.push(w);

  return a;
}

function* list(seed) {
  yield* words(5, 3, seed);
  yield* words(3, 4, seed);
  yield* words(2, 5, seed);
}

function createSession(session) {
  const words = toArray(list(session.startDate.valueOf()));

  return {
    ...session,

    entries: [],
    guessed: 0,
    score: 0,
    status: 0, // 0 idle, 1 progress, 2 won, 3 lost
    timer: START_TIMER,
    words,
  };
}

function createEntry(state, word) {
  const session = state.hash[state.current];

  const valid = session.words.indexOf(word) > -1;
  const duplicate = !!session.entries.find(
    (entry) => entry.word === word
  );

  return {
    date: (new Date).valueOf(),
    duplicate,
    score: duplicate ? 0 : valid
      ? Math.ceil(word.length * session.timer / START_TIMER * 2)
      : 0, // Negative score?
    valid,
    word,
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

      const entry = createEntry(state, word);

      session.entries.unshift(entry);

      if(entry.valid && !entry.duplicate)
        session.guessed += 1;

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

  if(action.type == actionTypes.TIMER_DECREMENT) {
    return produce(state, (draft) => {
      const session = draft.hash[state.current];

      --session.timer;
    });
  }

  return state;
}

export default {
  [key]: reducer,
};

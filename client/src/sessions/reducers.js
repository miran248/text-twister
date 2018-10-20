import { LOCATION_CHANGE } from "connected-react-router";
import produce from "immer";

import { actionTypes, key } from "./actions";
import { route as sessionRoute } from "./route";

import * as s from "./session";

const initialState = {
  current: null,
  hash: {},
  list: [],
  name: null,
  fetchSessionsStatus: 0,
  saveSessionStatus: 0,
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

      s.end(session);
    });
  }

  if(action.type == actionTypes.GUESS) {
    const { word } = action.payload;

    return produce(state, (draft) => {
      const session = draft.hash[state.current];

      s.guess(session, word);
    });
  }

  if(action.type == actionTypes.INFO) {
    const { hash, id, startDate } =  action.payload;

    const existing = state.hash[hash];

    return produce(state, (draft) => {
      draft.current = hash;
      draft.loading = false;

      if(!existing) {
        draft.hash[hash] = s.init(hash, id, startDate);
        draft.list.push(hash);
      } else if(draft.hash[hash].status === 1)
        draft.hash[hash].status = 0;
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

  if(action.type == actionTypes.FETCH_SESSIONS) {
    console.log("FETCH_SESSIONS");

    return produce(state, (draft) => {
      draft.fetchSessionsStatus = 1;
    });
  }
  if(action.type == actionTypes.FETCH_SESSIONS_SUCCESS) {
    const sessions =  action.payload;

    console.log("FETCH_SESSIONS_SUCCESS", sessions);

    return produce(state, (draft) => {
      for(const session of sessions) {
        if(session.hash in draft.hash)
          continue;

        draft.hash[session.hash] = s.reinit(session);
        draft.list.push(session.hash);
      }

      draft.fetchSessionsStatus = 2;
    });
  }
  if(action.type == actionTypes.FETCH_SESSIONS_FAILURE) {
    const error =  action.payload;

    console.log("FETCH_SESSIONS_FAILURE", error);

    return produce(state, (draft) => {
      draft.fetchSessionsStatus = 3;
    });
  }

  if(action.type == actionTypes.SAVE_SESSION) {
    console.log("SAVE_SESSION");

    return produce(state, (draft) => {
      draft.saveSessionStatus = 1;
    });
  }
  if(action.type == actionTypes.SAVE_SESSION_SUCCESS) {
    const session =  action.payload;

    console.log("SAVE_SESSION_SUCCESS", session);

    return produce(state, (draft) => {
      draft.saveSessionStatus = 2;
    });
  }
  if(action.type == actionTypes.SAVE_SESSION_FAILURE) {
    const error =  action.payload;

    console.log("SAVE_SESSION_FAILURE", error);

    return produce(state, (draft) => {
      draft.saveSessionStatus = 3;
    });
  }

  if(action.type == actionTypes.TIMER_DECREMENT) {
    return produce(state, (draft) => {
      const session = draft.hash[state.current];

      s.tick(session);
    });
  }

  return state;
}

export default {
  [key]: reducer,
};

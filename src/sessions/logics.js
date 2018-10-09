import { push, LOCATION_CHANGE } from "connected-react-router";
import { createLogic } from "redux-logic";

import { actions, actionTypes } from "./actions";
import { route } from "./route";
import selectors from "./selectors";

const VERSION = 1;

const changeLogic = createLogic({
  type: actionTypes.CHANGE,
  cancelType: [ LOCATION_CHANGE, actionTypes.END ],
  warnTimeout: 0,
  validate({ getState }, allow, deny) {
    const state = getState();
    const status = selectors.status(state);

    if(status > 0)
      return deny();

    allow(actions.playing());
  },
  process({ cancelled$ }, dispatch, done) {
    const interval = setInterval(() => {
      dispatch(actions.timerDecrement());
    }, 1000);

    cancelled$.subscribe(() => {
      clearInterval(interval);
    });
  }
});

const guessLogic = createLogic({
  type: actionTypes.GUESS,
  process({ getState }, dispatch, done) {
    const state = getState();
    const session = selectors.current(state);

    if(session.guessed === session.words.length)
      dispatch(actions.end());

    done();
  }
});

const playLogic = createLogic({
  type: actionTypes.PLAY,
  process({ getState, action }, dispatch, done) {
    const values = action.payload;
    var { name } = values;

    if(!name) {
      const state = getState();

      name = selectors.name(state);

      if(!name)
        return;
    }

    const id = btoa(`${VERSION}|${name}|${(new Date).valueOf()}`);

    dispatch(push(route(id)));

    done();
  }
});

const timerDecrementLogic = createLogic({
  type: actionTypes.TIMER_DECREMENT,

  validate({ getState, action }, allow, deny) {
    const state = getState();
    const timer = selectors.timer(state);

    if(timer < 1)
      return deny(actions.end());

    allow(action);
  },

  process({ getState }, dispatch, done) {
    done();
  }
});

export default [
  changeLogic,
  guessLogic,
  playLogic,
  timerDecrementLogic,
];

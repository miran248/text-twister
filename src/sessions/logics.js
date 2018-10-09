import { push, replace, LOCATION_CHANGE } from "connected-react-router";
import { DateTime } from "luxon";
import { matchPath } from "react-router";
import { createLogic } from "redux-logic";

import { actions, actionTypes } from "./actions";
import { route as playRoute } from "./route";
import selectors from "./selectors";

import { fromHex, toHex } from "../common/str2hex";

import { route as landingRoute } from "../landing/route";

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

const locationChangeLogic = createLogic({
  type: LOCATION_CHANGE,
  validate({ getState, action }, allow, deny) {
    const { location } = action.payload;

    const match = matchPath(location.pathname, playRoute());

    if(!match)
      return deny(action);

    const { id } =  match.params;

    if(typeof id === "undefined")
      return deny(replace(landingRoute()));

    const [ version, name, timestamp ] = fromHex(id).split("|");

    if(typeof version === "undefined" || typeof name === "undefined" || typeof timestamp === "undefined")
      return deny(replace(landingRoute()));

    const startDate = DateTime.fromMillis(+timestamp);

    const now = (new Date).valueOf();

    if(!startDate.isValid || startDate.year < 2018 || startDate.valueOf() > now)
      return deny(replace(landingRoute()));

    allow({
      ...action,

      infoPayload: { id, name, startDate, version },
    });
  },
  process({ getState, action }, dispatch, done) {
    dispatch(actions.info(action.infoPayload));

    done();
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
  validate({ getState, action }, allow, deny) {
    const values = action.payload;
    var { name } = values;

    if(!name) {
      const state = getState();

      name = selectors.name(state);

      if(!name)
        return deny(replace(landingRoute()));
    }

    allow(action);
  },
  process({ getState, action }, dispatch, done) {
    const values = action.payload;
    var { name } = values;

    const id = toHex(`${VERSION}|${name}|${(new Date).valueOf()}`);

    dispatch(push(playRoute(id)));

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
  locationChangeLogic,
  guessLogic,
  playLogic,
  timerDecrementLogic,
];

import { push, replace, LOCATION_CHANGE } from "connected-react-router";
import { DateTime } from "luxon";
import { matchPath } from "react-router";
import { createLogic } from "redux-logic";

import { fromHex, toHex } from "@packages/common/str2hex";
import { Id, Session } from "@packages/protobuf";

import { actions, actionTypes } from "./actions";
import { route as playRoute } from "./route";
import selectors from "./selectors";

import { route as landingRoute } from "../landing/route";

const VERSION = 1;

const generateId = (version, name, timestamp) => (
  toHex(Id.encode({ version, name, timestamp, }).finish())
);

const parseId = (id) => Id.toObject(Id.decode(fromHex(id)));

const compressSession = (session) => (
  toHex(Session.encode({
    id: {
      version: session.version,
      name: session.name,
      timestamp: session.startDate.valueOf(),
    },
    entries: session.entries.map(
      (entry) => ({
        word: entry.word,
        timer: entry.timer,
      })
    ),
  }).finish())
);

const restoreSession = (hex) => {
  const session = Session.toObject(Session.decode(fromHex(hex)));
  const { id } = session;

  return {
    ...session,

    hash: generateId(id.version, id.name, id.timestamp),
  };
};

const restored = restoreSession("0a10080110d4a3efcde62c1a054d6972616e1207083212037065611207083312036361741207083412037a69701207083512036c6f7412070835120374656112080836120462657374120808371204766f69641208083812047475726e1209083a12057072696d651209083c1205706f776572");

console.log(actions.restore(restored));

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

const encodeGuard = (operation) => {
  try {
    return operation();
  } catch(e) {
    // TODO: Show it to the user?
    console.error("Encoding failed with error:", e.message);
  }
};

const decodeGuard = (operation) => {
  try {
    return operation();
  } catch(e) {
    // TODO: Show it to the user?
    console.error("Decoding failed with error:", e.message);
  }
};

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

    const decoded = decodeGuard(
      () => parseId(id)
    );

    console.log(decoded);

    if(!decoded)
      return deny(replace(landingRoute()));

    const { version, name, timestamp } = decoded;

    if(typeof version === "undefined" || typeof name === "undefined" || typeof timestamp === "undefined")
      return deny(replace(landingRoute()));

    const startDate = DateTime.fromMillis(+timestamp);

    const now = (new Date).valueOf();

    if(!startDate.isValid || startDate.year < 2018 || startDate.valueOf() > now || version !== VERSION)
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

    const id = encodeGuard(
      () => generateId(VERSION, name, (new Date).valueOf())
    );

    if(!id)
      return deny(replace(landingRoute()));

    allow({
      ...action,

      playPayload: id,
    });
  },
  process({ getState, action }, dispatch, done) {
    dispatch(push(playRoute(action.playPayload)));

    done();
  }
});

const shareLogic = createLogic({
  type: actionTypes.SHARE,
  process({ getState }, dispatch, done) {
    const state = getState();
    const session = selectors.current(state);

    const share = encodeGuard(
      () => compressSession(session)
    );

    console.log(share);

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
  shareLogic,
  timerDecrementLogic,
];

import { push, replace, LOCATION_CHANGE } from "connected-react-router";
import { DateTime } from "luxon";
import { matchPath } from "react-router";
import { createLogic } from "redux-logic";

import { fromHex, toHex } from "@packages/common/str2hex";
import { Id, Session, Sessions } from "@packages/protobuf";

import { actions, actionTypes } from "./actions";
import { route as playRoute } from "./route";
import selectors from "./selectors";

import { route as landingRoute } from "../landing/route";

const VERSION = 1;

const generateId = (version, name, timestamp) => (
  toHex(Id.encode({ version, name, timestamp, }).finish())
);

const parseId = (hash) => Id.toObject(Id.decode(fromHex(hash)));

const compressSession = (session) => (
  Session.encode({
    entries: session.entries.map(
      (entry) => ({
        word: entry.word,
        timer: entry.timer,
      })
    ),
    hash: session.hash,
  }).finish()
);

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

const fetchSessionsLogic = createLogic({
  type: actionTypes.FETCH_SESSIONS,
  validate({ getState, action }, allow, deny) {
    const state = getState();
    const status = selectors.fetchSessionsStatus(state);

    if(status == 1)
      return deny();

    allow(action);
  },
  async process(context, dispatch, done) {
    try {
      const response = await fetch("http://localhost:3000/sessions");

      if(!response.ok) {
        const message = await response.text();

        throw new Error(message);
      }

      const buffer = await response.arrayBuffer();
      const array = new Uint8Array(buffer);

      const sessions = Sessions.toObject(Sessions.decode(array));

      const items = sessions.sessions.map((item) => {
        const id = parseId(item.hash);

        return {
          ...item,

          id,
          startDate: DateTime.fromMillis(id.timestamp),
        };
      });

      dispatch(actions.fetchSessionsSuccess(items));
    } catch(e) {
      dispatch(actions.fetchSessionsFailure(e));
    }

    done();
  }
});

const saveSessionLogic = createLogic({
  type: actionTypes.SAVE_SESSION,
  validate({ getState, action }, allow, deny) {
    const state = getState();
    const status = selectors.saveSessionStatus(state);

    if(status == 1)
      return deny();

    allow(action);
  },
  async process({ getState }, dispatch, done) {
    const state = getState();
    const session = selectors.current(state);

    try {
      const compressed = compressSession(session);

      console.log("saveSessionLogic", compressed);

      const response = await fetch("http://localhost:3000/sessions", {
        method: "POST",
        body: compressed,
        headers: {
          "Content-Type": "application/x-protobuf",
        }
      });

      if(!response.ok) {
        const message = await response.text();

        throw new Error(message);
      }

      dispatch(actions.saveSessionSuccess(session));
    } catch(e) {
      dispatch(actions.saveSessionFailure(e));
    };

    done();
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

    console.log("match", match);

    if(!match)
      return deny(action);

    const { hash } =  match.params;

    if(typeof hash === "undefined")
      return deny(replace(landingRoute()));

    const decoded = decodeGuard(
      () => parseId(hash)
    );

    console.log(decoded);

    if(!decoded)
      return deny(replace(landingRoute()));

    const { version, timestamp } = decoded;

    const startDate = DateTime.fromMillis(+timestamp);

    const now = (new Date).valueOf();

    if(!startDate.isValid || startDate.year < 2018 || startDate.valueOf() > now || version !== VERSION)
      return deny(replace(landingRoute()));

    allow({
      ...action,

      infoPayload: {
        hash,
        id: decoded,
        startDate,
      },
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

    const hash = encodeGuard(
      () => generateId(VERSION, name, (new Date).valueOf())
    );

    if(!hash)
      return deny(replace(landingRoute()));

    allow({
      ...action,

      playPayload: hash,
    });
  },
  process({ getState, action }, dispatch, done) {
    dispatch(push(playRoute(action.playPayload)));

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
  fetchSessionsLogic,
  saveSessionLogic,
  locationChangeLogic,
  guessLogic,
  playLogic,
  timerDecrementLogic,
];

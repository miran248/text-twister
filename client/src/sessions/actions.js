export const key = "sessions";

const CHANGE = `${key}/CHANGE`;
const END = `${key}/END`;
const GUESS = `${key}/GUESS`;
const INFO = `${key}/INFO`;
const PLAY = `${key}/PLAY`;
const PLAYING = `${key}/PLAYING`;

const FETCH_SESSIONS = `${key}/FETCH_SESSIONS`;
const FETCH_SESSIONS_SUCCESS = `${key}/FETCH_SESSIONS_SUCCESS`;
const FETCH_SESSIONS_FAILURE = `${key}/FETCH_SESSIONS_FAILURE`;

const SAVE_SESSION = `${key}/SAVE_SESSION`;
const SAVE_SESSION_SUCCESS = `${key}/SAVE_SESSION_SUCCESS`;
const SAVE_SESSION_FAILURE = `${key}/SAVE_SESSION_FAILURE`;

export const TIMER_DECREMENT = "TIMER_DECREMENT";

export const actionTypes = {
  CHANGE,
  END,
  GUESS,
  INFO,
  PLAY,
  PLAYING,

  FETCH_SESSIONS,
  FETCH_SESSIONS_SUCCESS,
  FETCH_SESSIONS_FAILURE,

  SAVE_SESSION,
  SAVE_SESSION_SUCCESS,
  SAVE_SESSION_FAILURE,

  TIMER_DECREMENT,
};

const change = () => ({ type: CHANGE });

const end = () => ({ type: END });

const guess = (values) => ({
  type: GUESS,

  payload: values,
});

const info = (values) => ({
  type: INFO,

  payload: values,
});

const play = (values) => ({
  type: PLAY,

  payload: values,
});
const playing = () => ({ type: PLAYING });

const fetchSessions = () => ({ type: FETCH_SESSIONS });
const fetchSessionsSuccess = (sessions) => ({
  type: FETCH_SESSIONS_SUCCESS,

  payload: sessions,
});
const fetchSessionsFailure = (error) => ({
  type: FETCH_SESSIONS_FAILURE,

  error: true,
  payload: error,
});

const saveSession = () => ({ type: SAVE_SESSION });
const saveSessionSuccess = (session) => ({
  type: SAVE_SESSION_SUCCESS,

  payload: session,
});
const saveSessionFailure = (error) => ({
  type: SAVE_SESSION_FAILURE,

  error: true,
  payload: error,
});

const timerDecrement = () => ({ type: TIMER_DECREMENT });

export const actions = {
  change,
  end,
  guess,
  info,

  play,
  playing,

  fetchSessions,
  fetchSessionsSuccess,
  fetchSessionsFailure,

  saveSession,
  saveSessionSuccess,
  saveSessionFailure,

  timerDecrement,
};

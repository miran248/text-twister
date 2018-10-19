export const key = "sessions";

const CHANGE = `${key}/CHANGE`;
const END = `${key}/END`;
const GUESS = `${key}/GUESS`;
const INFO = `${key}/INFO`;
const PLAY = `${key}/PLAY`;
const PLAYING = `${key}/PLAYING`;

const RESTORE = `${key}/RESTORE`;
const SHARE = `${key}/SHARE`;

export const TIMER_DECREMENT = "TIMER_DECREMENT";

export const actionTypes = {
  CHANGE,
  END,
  GUESS,
  INFO,
  PLAY,
  PLAYING,

  RESTORE,
  SHARE,

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

const restore = (session) => ({
  type: RESTORE,

  payload: session,
});;
const share = () => ({ type: SHARE });

const timerDecrement = () => ({ type: TIMER_DECREMENT });

export const actions = {
  change,
  end,
  guess,
  info,

  play,
  playing,

  restore,
  share,

  timerDecrement,
};

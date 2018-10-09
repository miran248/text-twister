export const key = "sessions";

const CHANGE = `${key}/CHANGE`;
const END = `${key}/END`;
const GUESS = `${key}/GUESS`;
const PLAY = `${key}/PLAY`;
const PLAYING = `${key}/PLAYING`;

export const TIMER_DECREMENT = "TIMER_DECREMENT";

export const actionTypes = {
  CHANGE,
  END,
  GUESS,
  PLAY,
  PLAYING,

  TIMER_DECREMENT,
};

const change = () => ({ type: CHANGE });

const end = () => ({ type: END });

const guess = (values, options) => ({
  type: GUESS,

  payload: {
    options,
    values,
  },
});

const play = (values) => ({
  type: PLAY,

  payload: values,
});
const playing = () => ({ type: PLAYING });

const timerDecrement = () => ({ type: TIMER_DECREMENT });

export const actions = {
  change,
  end,
  guess,

  play,
  playing,

  timerDecrement,
};

import { DateTime } from "luxon";

export const formatAttempts = (attempts) => {
  if(attempts > 1)
    return `${attempts} attempts`;

  if(attempts > 0)
    return `${attempts} attempt`;

  return "";
};

export const formatDate = (date) => (
  DateTime.fromMillis(date).toFormat("yyyy/MM/dd HH:mm")
);

export const formatGuessed = (guessed, words) => (
  `guessed ${guessed}/${words} words`
);

export const formatScore = (score) => {
  if(score > 0)
    return `+${score}`;

  return `${score}`;
};

export const formatTimer = (timer, status) => {
  if(timer === 0 && status > 1)
    return "Out of time";

  return `${timer}s`;
};

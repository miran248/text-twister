import { key } from "./actions";

class Selectors {
  raw = (state) => state[key];
  current = (state) => {
    const raw = this.raw(state);

    if(!raw.current)
      return undefined;

    return raw.hash[raw.current];
  };

  list = (state) => {
    const raw = this.raw(state);

    return raw.list.map(
      (id) => raw.hash[id]
    );
  };
  recents = (state) => {
    const list = this.list(state);

    return list.sort(
      (a, b) => b.startDate - a.startDate
    );
  };
  highscores = (state) => {
    const list = this.list(state);

    return list.sort(
      (a, b) => b.score - a.score
    ).slice(0, 5);
  };

  entries = (state) => {
    const session = this.current(state);

    return session.entries;
  };
  guessed = (state) => {
    const session = this.current(state);

    return session.guessed;
  };
  name = (state) => {
    const session = this.current(state);

    if(!session)
      return this.raw(state).name;

    return session.name;
  };
  score = (state) => {
    const session = this.current(state);

    return session.score;
  };

  status = (state) => {
    const session = this.current(state);

    return session.status;
  };
  idle = (state) => this.status(state) === 0;
  progress = (state) => this.status(state) === 1;
  won = (state) => this.status(state) === 2;
  lost = (state) => this.status(state) === 3;

  timer = (state) => {
    const session = this.current(state);

    return session.timer;
  };
  words = (state) => {
    const session = this.current(state);

    return session.words;
  };
};

export default new Selectors;

import { key } from "./actions";

class Selectors {
  raw = (state) => state[key];
  current = (state) => {
    const raw = this.raw(state);

    if(!raw.current)
      return undefined;

    return raw.hash[raw.current];
  };

  loading = (state) => {
    const raw = this.raw(state);

    return raw.loading;
  };

  fetchSessionsStatus = (state) => {
    const raw = this.raw(state);

    return raw.fetchSessionsStatus;
  };
  saveSessionStatus = (state) => {
    const raw = this.raw(state);

    return raw.saveSessionStatus;
  };

  list = (state) => {
    const raw = this.raw(state);

    return raw.list.map(
      (hash) => raw.hash[hash]
    );
  };
  recents = (state) => {
    const list = this.list(state);

    return list.sort(
      (a, b) => b.startDate.valueOf() - a.startDate.valueOf()
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
  hints = (state) => {
    const session = this.current(state);

    return session.hints;
  };
  guessed = (state) => {
    const session = this.current(state);

    return session.guessed;
  };
  name = (state) => {
    const session = this.current(state);

    if(!session)
      return this.raw(state).name;

    return session.id.name;
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

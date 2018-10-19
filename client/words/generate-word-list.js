import words from "word-list-json";

const groups = words.reduce(
  (memo, word) => {
    const n = word.length;

    if(n < 3 || n > 5)
      return memo;

    const list = memo[n] || [];

    if(list.length > 50)
      return memo;

    return {
      ...memo,

      [n]: [
        ...list,

        word,
      ]
    };
  },
  {}
);

console.log(JSON.stringify(groups));

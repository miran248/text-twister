import json from "./words.json";

// https://gist.github.com/blixt/f17b47c62508be59987b#gistcomment-1272204
const lcg = (seed) => () => {
  seed = Math.imul(16807, seed) | 0 % 2147483647;
  return (seed & 2147483647) / 2147483648;
}

function* shuffler(list, random) {
  var a = [ ...list ];

  for(let i = a.length - 1; i >= 0; --i) {
    const j = Math.floor((i + 1) * random());

    [ a[i], a[j] ] = [ a[j], a[i] ];

    yield a[i];
  }
}

export default function*(count, length, seed) {
  const words = shuffler(json[length], lcg(seed));

  for(let i = 0, word = null; i < count && (word = words.next().value); ++i) {
    yield word;
  }
}

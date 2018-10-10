import json from "./words.json";

function* shuffler(list, rng) {
  var a = [ ...list ];

  for(let i = a.length - 1; i >= 0; --i) {
    const j = Math.floor((i + 1) * rng());

    [ a[i], a[j] ] = [ a[j], a[i] ];

    yield a[i];
  }
}

export default function*(count, length, rng) {
  const words = shuffler(json[length], rng);

  for(let i = 0, word = null; i < count && (word = words.next().value); ++i) {
    yield word;
  }
}

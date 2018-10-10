// https://gist.github.com/blixt/f17b47c62508be59987b#gistcomment-1272204
export default (seed) => () => {
  seed = Math.imul(16807, seed) | 0 % 2147483647;

  return (seed & 2147483647) / 2147483648;
}

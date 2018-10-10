import PropTypes from "prop-types";
import React from "react";

import * as c from "../components";

const renderChar = (char, hint, visible) => {
  if(!visible)
    return hint;

  return char;
};

const renderWord = (word, hint, i, entries, reveal) => {
  const match = !!entries.find((entry) => entry.word === word);

  return word.split("").map((char, i) => (
    <c.Grid.Cell key={`${word}|${i}`} c={i + 1} blue={match}>{renderChar(char, hint[i], match || reveal)}</c.Grid.Cell>
  ))
};

const Words = ({ entries, hints, words, reveal }) => (
  <c.Grid>
  {words.map(
    (word, i) => renderWord(word, hints[word], i, entries, reveal)
  )}
  </c.Grid>
);

Words.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string.isRequired,
  })).isRequired,
  hints: PropTypes.object.isRequired,
  words: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  reveal: PropTypes.bool.isRequired,
};

export default Words;

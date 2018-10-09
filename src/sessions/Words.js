import PropTypes from "prop-types";
import React from "react";

import * as c from "../components";

const renderChar = (char, visible) => {
  if(!visible)
    return "▪";

  return char;
};

const renderWord = (word, i, entries, reveal) => {
  const match = !!entries.find((entry) => entry.word === word);

  return word.split("").map((char, i) => (
    <c.Grid.Cell key={`${word}|${i}`} c={i + 1} blue={match}>{renderChar(char, match || reveal)}</c.Grid.Cell>
  ))
};

const Words = ({ entries, words, reveal }) => (
  <c.Grid>
  {words.map(
    (word, i) => renderWord(word, i, entries, reveal)
  )}
  </c.Grid>
);

Words.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string.isRequired,
  })).isRequired,
  words: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  reveal: PropTypes.bool.isRequired,
};

export default Words;

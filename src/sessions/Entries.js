import PropTypes from "prop-types";
import React from "react";

import { formatScore } from "./formatters";

import * as c from "../components";

const renderEntry = (entry, i) => {
  const score = formatScore(entry.score);

  if(entry.duplicate) {
    return (
      <React.Fragment key={entry.date}>
        <c.Grid.Cell c={1} bold={false}>{`Already tried "${entry.word}"`}</c.Grid.Cell>
        <c.Grid.Cell c={2} bold={false}>{score}</c.Grid.Cell>
      </React.Fragment>
    );
  }

  if(entry.valid) {
    return (
      <React.Fragment key={entry.date}>
        <c.Grid.Cell c={1} bold={false} green light>{`Found "${entry.word}", yay!`}</c.Grid.Cell>
        <c.Grid.Cell c={2} bold={false} green light>{score}</c.Grid.Cell>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment key={entry.date}>
      <c.Grid.Cell c={1} bold={false} red light>{`Nope, "${entry.word}" is not on the list`}</c.Grid.Cell>
      <c.Grid.Cell c={2} bold={false} red light>{score}</c.Grid.Cell>
    </React.Fragment>
  );
};

const renderMessage = (status) => {
  if(status > 2) {
    return (
      <c.Grid.Cell bold={false} red light>You haven't even tried :(</c.Grid.Cell>
    );
  }

  if(status > 1) {
    return (
      <c.Grid.Cell bold={false} green light>Congratz! You've broke the game 8)</c.Grid.Cell>
    );
  }

  if(status > 0) {
    return (
      <c.Grid.Cell bold={false}>Whatcha waiting for?</c.Grid.Cell>
    );
  }

  return (
    <c.Grid.Cell bold={false}>Start typing, when ready!</c.Grid.Cell>
  );
};

const Entries = ({ entries, status }) => (
  <c.Grid>
  {entries.map(renderEntry)}
  {!entries.length && renderMessage(status)}
  </c.Grid>
);

Entries.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    duplicate: PropTypes.bool.isRequired,
    score: PropTypes.number.isRequired,
    valid: PropTypes.bool.isRequired,
    word: PropTypes.string.isRequired,
  })).isRequired,
  status: PropTypes.number.isRequired,
};

export default Entries;

import PropTypes from "prop-types";
import React from "react";

import { formatDate, formatScore } from "../sessions/formatters";

import * as c from "../components";

const renderSession = (session, i) => {
  const score = formatScore(session.score);
  const startDate = formatDate(session.startDate);
  const { status } = session;

  var color = {};

  if(status === 2)
    color = { green: true };

  if(status === 3)
    color = { red: true };

  return (
    <React.Fragment key={session.startDate}>
      <c.Grid.Cell c={1} bold={false}>{session.name}</c.Grid.Cell>
      <c.Grid.Cell c={2} bold={false}>{startDate}</c.Grid.Cell>
      <c.Grid.Cell c={3} bold={false} {...color} light>{score}</c.Grid.Cell>
    </React.Fragment>
  );
};

const Sessions = ({ sessions }) => (
  <c.Grid>
  {sessions.map(renderSession)}
  {!sessions.length && (
    <c.Grid.Cell bold={false}>No plays</c.Grid.Cell>
  )}
  </c.Grid>
);

Sessions.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    startDate: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
  })).isRequired,
};

export default Sessions;

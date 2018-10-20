import React from "react";
import { connect } from "react-redux";

import { actions } from "./actions";
import { formatAttempts, formatGuessed, formatScore, formatTimer } from "./formatters";
import selectors from "./selectors";

import Entries from "./Entries";
import GuessForm from "./GuessForm";
import Words from "./Words";

import Preloader from "../common/Preloader";

import * as c from "../components";

import { route as landingRoute } from "../landing/route";

const renderSaveButton = (status) => {
  if(status == 3)
    return "Failed Saving";

  if(status == 2)
    return "Saved";

  if(status == 1)
    return "Saving..";

  return "Save";
};

const View = ({ entries, guessed, hints, idle, name, score, status, timer, words, saveSessionStatus, onChange, onSubmit, save, playAgain }) => (
  <c.SplitView withoutAnimation>
    <c.Left masked withoutAnimation>
      <c.Heading withoutAnimation>
        <c.H2>{formatTimer(timer, status)}</c.H2>
        <c.H1 withoutAnimation>TEXT</c.H1>
      </c.Heading>
      <c.Separator withoutAnimation />
      <c.Vertical masked>
        <c.Heading>
          <c.H2>Words</c.H2>
          <c.H2>{!idle && formatGuessed(guessed, words.length)}</c.H2>
        </c.Heading>
        <Words entries={entries} hints={hints} words={words} reveal={status > 1} />
      </c.Vertical>
    </c.Left>
    <c.Right masked withoutAnimation>
      <c.Heading withoutAnimation>
        <c.H1 withoutAnimation>TWISTER</c.H1>
        <c.H2>{formatScore(score)}</c.H2>
      </c.Heading>
      <c.Separator withoutAnimation />
      {status === 2 && (
        <c.H2>Congrats! You must be {name}!</c.H2>
      )}
      {status === 3 && (
        <c.H2>Sigh.</c.H2>
      )}
      {status > 1 && (
        <c.Separator />
      )}
      <c.Vertical masked>
        <c.Heading>
          <c.H2>Recents</c.H2>
          <c.H2>{formatAttempts(entries.length)}</c.H2>
        </c.Heading>
        <Entries entries={entries} status={status} />
      </c.Vertical>
      <c.Separator />
      {status < 2 && (
        <GuessForm onChange={onChange} onSubmit={onSubmit} />
      )}
      {status > 1 && (
        <c.Cell flex={0} horizontal large spaced>
          <c.StyledLink to={landingRoute()}>Go back</c.StyledLink>
          {/*<c.StyledButton onClick={save} disabled={saveSessionStatus == 1}>{renderSaveButton(saveSessionStatus)}</c.StyledButton>*/}
          <c.StyledButton onClick={playAgain}>Try again!</c.StyledButton>
        </c.Cell>
      )}
    </c.Right>
  </c.SplitView>
);

const enhance = connect(
  (state) => ({
    entries: selectors.entries(state),
    guessed: selectors.guessed(state),
    hints: selectors.hints(state),
    idle: selectors.idle(state),
    name: selectors.name(state),
    score: selectors.score(state),
    status: selectors.status(state),
    timer: selectors.timer(state),
    words: selectors.words(state),
    saveSessionStatus: selectors.saveSessionStatus(state),
  }),
  {
    onChange: actions.change,
    onSubmit: actions.guess,

    save: actions.saveSession,
    playAgain: actions.play,
  }
);

const EnhancedView = enhance(View);

const loading = connect(
  (state) => ({
    loading: selectors.loading(state),
  }),
);

export default loading(({ loading }) => {
  if(loading) {
    return (
      <Preloader />
    );
  }

  return (
    <EnhancedView />
  );
});

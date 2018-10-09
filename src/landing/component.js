import React from "react";
import { connect } from "react-redux";

import NameForm from "./NameForm";
import Sessions from "./Sessions";

import { actions as sessionActions } from "../sessions/actions";
import sessionSelectors from "../sessions/selectors";

import * as c from "../components";

const View = ({ highscores, name, recents, onSubmit }) => (
  <c.SplitView withoutAnimation>
    <c.Left masked withoutAnimation>
      <c.H1 withoutAnimation>TEXT</c.H1>
      <c.Separator withoutAnimation />
      <c.Vertical masked>
        <c.H2>Recents</c.H2>
        <Sessions sessions={recents} />
        <c.Separator />
        <c.H2>Highscores</c.H2>
        <Sessions sessions={highscores} />
      </c.Vertical>
    </c.Left>
    <c.Right masked withoutAnimation>
      <c.H1 withoutAnimation>TWISTER</c.H1>
      <c.Separator withoutAnimation />
      <c.Vertical centered masked>
        <NameForm name={name} onSubmit={onSubmit} />
      </c.Vertical>
    </c.Right>
  </c.SplitView>
);

const enhance = connect(
  (state) => ({
    highscores: sessionSelectors.highscores(state),
    name: sessionSelectors.name(state),
    recents: sessionSelectors.recents(state),
  }),
  {
    onSubmit: sessionActions.play,
  }
);

export default enhance(View);

import React, { Component } from "react";
import { connect } from "react-redux";

import NameForm from "./NameForm";
import Sessions from "./Sessions";

import { actions as sessionActions } from "../sessions/actions";
import sessionSelectors from "../sessions/selectors";

import * as c from "../components";
import { backendAvailable } from "../config";

const renderFetchButton = (status) => {
  if(status == 3)
    return "failed fetching sessions";

  // if(status == 2)
  //   return "sessions were fetched";

  if(status == 1)
    return "fetching sessions..";

  return "fetch sessions";
};

class View extends Component {
  constructor(props) {
    super();

    const { fetchSessions } = props;

    if(backendAvailable)
      fetchSessions();
  }

  render() {
    const { highscores, name, recents, fetchSessionsStatus, fetchSessions, onSubmit } = this.props;

    return (
      <c.SplitView withoutAnimation>
        <c.Left masked withoutAnimation>
          <c.Heading withoutAnimation>
            <c.Horizontal>
              {backendAvailable && fetchSessionsStatus < 3 && (
                <c.BlueButton
                  title={renderFetchButton(fetchSessionsStatus)}
                  disabled={fetchSessionsStatus == 1}
                  onClick={fetchSessions}
                >&#8635;</c.BlueButton>
              )}
              {backendAvailable && fetchSessionsStatus == 3 && (
                <c.RedButton
                  title={renderFetchButton(fetchSessionsStatus)}
                  disabled={fetchSessionsStatus == 1}
                  onClick={fetchSessions}
                >&#8635;</c.RedButton>
              )}
            </c.Horizontal>
            <c.H1 withoutAnimation>TEXT</c.H1>
          </c.Heading>
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
  }
}

const enhance = connect(
  (state) => ({
    highscores: sessionSelectors.highscores(state),
    name: sessionSelectors.name(state),
    recents: sessionSelectors.recents(state),
    fetchSessionsStatus: sessionSelectors.fetchSessionsStatus(state),
  }),
  {
    fetchSessions: sessionActions.fetchSessions,
    onSubmit: sessionActions.play,
  }
);

export default enhance(View);

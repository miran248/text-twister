import React from "react";

import * as c from "../components";

const Preloader = () => (
  <c.SplitView withoutAnimation>
    <c.Left masked withoutAnimation>
      <c.Heading withoutAnimation>
        <c.H1 withoutAnimation>TEXT</c.H1>
      </c.Heading>
      <c.Separator withoutAnimation />
      <c.Vertical centered masked>
        <c.H2>please</c.H2>
      </c.Vertical>
    </c.Left>
    <c.Right masked withoutAnimation>
      <c.Heading withoutAnimation>
        <c.H1 withoutAnimation>TWISTER</c.H1>
      </c.Heading>
      <c.Separator withoutAnimation />
      <c.Vertical centered masked>
        <c.H2>wait</c.H2>
      </c.Vertical>
    </c.Right>
  </c.SplitView>
);

export default Preloader;

import styled, { css } from "styled-components";

import cellMixin from "./mixins/cell";
import directionMixin from "./mixins/direction";

export const List = styled.ul`
  list-style-type: none;
  // margin: 1vmin;
  margin: 0;
  padding: 0;
`;
List.Item = styled.li`
  border-radius: .4vmin;
  display: flex;
  margin: 1vmin;
  padding: 3vmin;

  ${cellMixin}
  ${directionMixin}
`;

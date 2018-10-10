import { css } from "styled-components";

import {
  transparent
} from "../colors";

import {
  Left,
  Right
} from "../layout";

export default css`
  &[disabled] {
    pointer-events: none;
  }

  ${Left} &[disabled] {
    background-color: ${transparent.dark};
  }
  ${Right} &[disabled] {
    background-color: ${transparent.light};
  }
`;

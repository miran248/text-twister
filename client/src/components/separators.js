import styled from "styled-components";

import {
  Horizontal,
  Vertical
} from "./base";

import {
  transparent
} from "./colors";

import {
  Left,
  Right
} from "./layout";

import withoutAnimationMixin from "./mixins/withoutAnimation";

export const Separator = styled.div`
  margin: 4vmin;

  ${Horizontal}${Left} & {
    border-right: .2vmin solid ${transparent.dark};
  }
  ${Horizontal}${Right} & {
    border-right: .2vmin solid ${transparent.light};
  }
  ${Vertical}${Left} & {
    border-bottom: .2vmin solid ${transparent.dark};
  }
  ${Vertical}${Right} & {
    border-bottom: .2vmin solid ${transparent.light};
  }

  ${withoutAnimationMixin}
`;

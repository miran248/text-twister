import styled from "styled-components";

import {
  Horizontal
} from "./base";

import {
  Left,
  Right
} from "./layout";

import withoutAnimationMixin from "./mixins/withoutAnimation";

import sizes from "./sizes";

export const Heading = styled(Horizontal).attrs({
  spaced: true,
})`
  align-items: center;
  flex: none;
`;

export const H1 = styled.h1`
  font-size: ${sizes.h1};
  margin: 0;

  ${Left} & {
    text-align: right;
  }
  ${Right} & {
    text-align: left;
  }

  ${withoutAnimationMixin}
`;
export const H2 = styled.h2`
  font-size: ${sizes.h2};
  margin: 0;
`;

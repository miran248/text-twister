import styled from "styled-components";

import {
  Horizontal,
  Vertical
} from "./base";

import {
  main,
  vibrant
} from "./colors";

import sizes from "./sizes";

const Element = styled(Vertical)`
  padding: 4vmin;
`;

export const SplitView = styled(Horizontal)`
  font-size: ${sizes.normal};
  height: 100%;
`;

export const Left = styled(Element)`
  background-color: ${main.dark};
  border-right: .4vmin solid ${vibrant.orange};
  color: ${main.light};
`;
export const Right = styled(Element)`
  background-color: ${main.light};
  color: ${main.dark};
`;

import styled, { css } from "styled-components";

import {
  Flex
} from "./base";

import cellMixin from "./mixins/cell";

import sizes from "./sizes";

export const Cell = styled(Flex).attrs({
  centered: true,
})`
  border-radius: .4vmin;
  margin: .4vmin;
  padding: 1vmin;

  ${({ large }) => large && css`
    margin: 1vmin;
    padding: 3vmin;
  `}

  ${cellMixin}
`;

export const Grid = styled.div`
  display: grid;
  margin: .4vmin;
`;
Grid.Cell = styled(Cell)`
  ${({ bold = true }) => bold && css`
    font-weight: bold;
    font-size: ${sizes.letter};
    text-transform: uppercase;
  `}

  ${({ c }) => typeof c !== "undefined" && css`
    grid-column: ${c};
  `}
  ${({ r }) => typeof r !== "undefined" && css`
    grid-row: ${r};
  `}
`;

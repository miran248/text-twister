import { css } from "styled-components";

import {
  main,
  pastel,
  transparent,
  vibrant
} from "../colors";

import {
  Left,
  Right
} from "../layout";

export default css`
  ${Left} & {
    background-color: ${transparent.dark};
  }
  ${Right} & {
    background-color: ${transparent.light};
  }

  ${({ red, light }) => red && css`
    background-color: ${light ? pastel.red : vibrant.red} !important;
  `}
  ${({ green, light }) => green && css`
    background-color: ${light ? pastel.green : vibrant.green} !important;
  `}
  ${({ blue, light }) => blue && css`
    background-color: ${light ? pastel.blue : vibrant.blue} !important;
  `}

  ${({ red, green, light }) => (red || green) && light && css`
    color: ${main.dark} !important;
  `}
`;

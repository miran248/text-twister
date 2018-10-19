import { css } from "styled-components";

export default css`
  ${({ horizontal }) => horizontal && css`
    flex-direction: row;
  `}

  ${({ vertical }) => vertical && css`
    flex-direction: column;
  `}
`;

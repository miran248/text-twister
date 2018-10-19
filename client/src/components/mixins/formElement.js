import { css } from "styled-components";

export default css`
  &:first-child {
    border-bottom-left-radius: .4vmin;
    border-top-left-radius: .4vmin;
  }
  &:last-child {
    border-bottom-right-radius: .4vmin;
    border-top-right-radius: .4vmin;
  }
`;

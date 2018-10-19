import { css } from "styled-components";

const mixin = css`
  animation: none;
`;

export default ({ withoutAnimation }) => withoutAnimation && mixin;

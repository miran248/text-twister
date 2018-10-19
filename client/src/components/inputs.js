import styled from "styled-components";

import {
  main
} from "./colors";

import formElementMixin from "./mixins/formElement";

import sizes from "./sizes";

export const Input = styled.input.attrs({
   autoComplete: "off",
})`
  background-color: ${main.light};
  border: none;
  font-family: DroidSansMono;
  font-size: ${sizes.normal};
  margin: 0;
  outline: none;
  padding: 1vmin;
  width: 100%;

  &:focus {
    background-color: #FEFEFE;
  }

  ${formElementMixin}
`;

import styled from "styled-components";

import {
  pastel,
  vibrant
} from "./colors";

import buttonMixin from "./mixins/button";
import disabledMixin from "./mixins/disabled";
import formElementMixin from "./mixins/formElement";

import sizes from "./sizes";

export const StyledButton = styled.button`
  background-color: initial;
  border: none;
  cursor: pointer;
  font-family: DroidSans;
  font-size: ${sizes.normal};
  margin: 0;
  outline: none;

  ${buttonMixin}
  ${disabledMixin}
  ${formElementMixin}
`;
export const BlueButton = styled(StyledButton)`
  background-color: ${vibrant.blue};
`;
export const GreenButton = styled(StyledButton)`
  background-color: ${pastel.green};
`;
export const RedButton = styled(StyledButton)`
  background-color: ${vibrant.red};
`;

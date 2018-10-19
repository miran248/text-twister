import { Link } from "react-router-dom";
import styled from "styled-components";

import {
  pastel,
} from "./colors";

import buttonMixin from "./mixins/button";
import disabledMixin from "./mixins/disabled";
import formElementMixin from "./mixins/formElement";

import sizes from "./sizes";

export const StyledLink = styled(Link)`
  text-decoration: none;

  ${buttonMixin}
  ${disabledMixin}
  ${formElementMixin}
`;
export const GreenLink = styled(StyledLink)`
  background-color: ${pastel.green};
`;

import styled, { css } from "styled-components";

import directionMixin from "./mixins/direction";
import withoutAnimationMixin from "./mixins/withoutAnimation";

export const Flex = styled.div`
  display: flex;

  ${({ flex = 1 }) => css`
    flex: ${flex};
  `}

  ${({ centered }) => centered && css`
    align-items: center;
    justify-content: center;
  `}

  ${({ spaced }) => spaced && css`
    justify-content: space-between;
  `}

  ${({ left }) => left && css`
    align-items: flex-start;
  `}
  ${({ right }) => right && css`
    align-items: flex-end;
  `}

  ${({ masked }) => masked && css`
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  `}

  ${directionMixin}
  ${withoutAnimationMixin}
`;

export const Horizontal = styled(Flex).attrs({
  horizontal: true,
})`
`;
export const Vertical = styled(Flex).attrs({
  vertical: true,
})`
`;

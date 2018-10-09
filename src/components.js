import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const main = {
  dark: "#141414",
  light: "#EBEBEB",
}
const transparent = {
  dark: "rgba(255, 255, 255, .06)",
  light: "rgba(0, 0, 0, .06)",
}
const vibrant = {
  orange: "#EF8923",

  // red: "#EF8923",
  // // green: "#89EF23",
  // blue: "#2389EF",

  red: "hsl(30, 86%, 54%)",
  green: "hsl(70, 86%, 54%)",
  blue: "hsl(210, 86%, 54%)",
};
const pastel = {
  // // red: "#EFCDAB",
  // green: "#CDEFAB",
  // // blue: "#ABCDEF",

  // red: "hsl(22, 75%, 90%)",
  // green: "hsl(90, 75%, 90%)",
  // blue: "hsl(215, 75%, 90%)",

  red: "hsl(30, 86%, 80%)",
  green: "hsl(80, 86%, 80%)",
  blue: "hsl(210, 86%, 80%)",
};

const sizes = {
  h1: "4vmin",
  h2: "3vmin",
  normal: "2vmin",
  letter: "3vmin",
};

export const Flex = styled.div`
  display: flex;

  ${({ withoutAnimation }) => withoutAnimation && css`
    animation: none;
  `}

  ${({ flex = 1 }) => css`
    flex: ${flex};
  `}

  ${({ horizontal }) => horizontal && css`
    flex-direction: row;
  `}

  ${({ vertical }) => vertical && css`
    flex-direction: column;
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
`;
export const Horizontal = styled(Flex).attrs({
  horizontal: true,
})`
`;
export const Vertical = styled(Flex).attrs({
  vertical: true,
})`
`;

export const Heading = styled(Horizontal)`
  align-items: center;
  flex: none;
  justify-content: space-between;
`;

export const SplitView = styled(Horizontal)`
  font-size: ${sizes.normal};
  height: 100%;
`;

export const Element = styled(Vertical)`
  padding: 4vmin;
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

export const Separator = styled.div`
  margin: 4vmin;

  ${({ withoutAnimation }) => withoutAnimation && css`
    animation: none;
  `}

  ${Horizontal}${Left} & {
    border-right: .2vmin solid ${transparent.dark};
  }
  ${Horizontal}${Right} & {
    border-right: .2vmin solid ${transparent.light};
  }
  ${Vertical}${Left} & {
    border-bottom: .2vmin solid ${transparent.dark};
  }
  ${Vertical}${Right} & {
    border-bottom: .2vmin solid ${transparent.light};
  }
`;

export const H1 = styled.h1`
  font-size: ${sizes.h1};
  margin: 0;

  ${({ withoutAnimation }) => withoutAnimation && css`
    animation: none;
  `}

  ${Left} & {
    text-align: right;
  }
  ${Right} & {
    text-align: left;
  }
`;
export const H2 = styled.h2`
  font-size: ${sizes.h2};
  margin: 0;
`;

export const List = styled.ul`
  list-style-type: none;
  // margin: 1vmin;
  margin: 0;
  padding: 0;
`;
List.Item = styled.li`
  border-radius: .4vmin;
  display: flex;
  margin: 1vmin;
  padding: 3vmin;

  ${Left} & {
    background-color: ${transparent.dark};
  }
  ${Right} & {
    background-color: ${transparent.light};
  }

  ${({ horizontal }) => horizontal && css`
    flex-direction: row;
  `}

  ${({ vertical }) => vertical && css`
    flex-direction: column;
  `}

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

export const Cell = styled(Flex).attrs({
  centered: true,
})`
  border-radius: .4vmin;
  margin: .4vmin;
  padding: 1vmin;

  ${Left} & {
    background-color: ${transparent.dark};
  }
  ${Right} & {
    background-color: ${transparent.light};
  }

  ${({ large }) => large && css`
    margin: 1vmin;
    padding: 3vmin;
  `}

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

  &:first-child {
    border-bottom-left-radius: .4vmin;
    border-top-left-radius: .4vmin;
  }
  &:last-child {
    border-bottom-right-radius: .4vmin;
    border-top-right-radius: .4vmin;
  }
`;

export const StyledLink = styled(Link)`
  border-radius: .4vmin;
  color: inherit;
  padding: 1.4vmin;
  text-decoration: none;

  &[disabled] {
    pointer-events: none;
  }
  ${Left} &[disabled] {
    background-color: ${transparent.dark};
  }
  ${Right} &[disabled] {
    background-color: ${transparent.light};
  }
`;
export const GreenLink = styled(StyledLink)`
  background-color: ${pastel.green};
`;

export const StyledButton = styled.button`
  background-color: initial;
  border: none;
  cursor: pointer;
  font-family: DroidSans;
  font-size: ${sizes.normal};
  outline: none;
  padding: 1.4vmin;

  &:first-child {
    border-bottom-left-radius: .4vmin;
    border-top-left-radius: .4vmin;
  }
  &:last-child {
    border-bottom-right-radius: .4vmin;
    border-top-right-radius: .4vmin;
  }

  &[disabled] {
    pointer-events: none;
  }
  ${Left} &[disabled] {
    background-color: ${transparent.dark};
  }
  ${Right} &[disabled] {
    background-color: ${transparent.light};
  }
`;
export const GreenButton = styled(StyledButton)`
  background-color: ${pastel.green};
  color: inherit;
`;

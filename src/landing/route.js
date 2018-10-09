import component from "./component";

const publicUrl = process.env.PUBLIC_URL;

export const route = () => publicUrl;

export default {
  exact: true,
  path: route(),
  component,
};

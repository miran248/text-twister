import component from "./component";

const publicUrl = process.env.PUBLIC_URL;

export const route = (hash = ":hash") => `${publicUrl}sessions/${hash}`;

export default {
  path: route(),
  component,
};

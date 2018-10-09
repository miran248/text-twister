import component from "./component";

const publicUrl = process.env.PUBLIC_URL;

export const route = (id = ":id") => `${publicUrl}sessions/${id}`;

export default {
  path: route(),
  component,
};

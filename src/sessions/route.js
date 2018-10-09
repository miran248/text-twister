import component from "./component";

export const route = (id = ":id") => `/sessions/${id}`;

export default {
  path: route(),
  component,
};

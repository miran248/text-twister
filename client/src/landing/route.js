import component from "./component";

import { publicUrl } from "../config";

export const route = () => publicUrl;

export default {
  exact: true,
  path: route(),
  component,
};

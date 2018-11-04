import component from "./component";

import { publicUrl } from "../config";

export const route = (hash = ":hash") => `${publicUrl}sessions/${hash}`;

export default {
  path: route(),
  component,
};

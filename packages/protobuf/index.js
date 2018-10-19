import protobuf from "protobufjs/light";

const definitions = require("./definitions");

const root = protobuf.Root.fromJSON(definitions);

export const Id = root.lookupType("Id");
export const Session = root.lookupType("Session");

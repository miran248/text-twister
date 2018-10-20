import { fromHex } from "@packages/common/str2hex";
import { Id, Session, Sessions } from "@packages/protobuf";

export const encodeSessions = (sessions) => Sessions.encode({
  sessions,
}).finish();

export const decodeSession = (bytes) => {
  const session = Session.toObject(Session.decode(bytes));

  // Ensure hash is valid
  const id = fromHex(session.hash);
  Id.decode(id);

  return session;
};

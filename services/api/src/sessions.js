import { sessionsPromise } from "./db";

export const add = async (session) => {
  const sessions = await sessionsPromise;

  const found = await sessions.findOne({ _id: session.hash });

  if(found)
    return;

  await sessions.insertOne({
    _id: session.hash,

    entries: session.entries,
  });
};

// TODO: Cache items
export const list = async () => {
  const sessions = await sessionsPromise;
  const cursor = await sessions.find();
  const items = await cursor.toArray();

  return items.map((item) => ({
    entries: item.entries,

    hash: item._id,
  }));
};

import { sessionsPromise } from "./db";

export const add = async (data) => {
  const c = await sessionsPromise;

  const found = await c.findOne({ data });

  if(found)
    return found;

  return c.insertOne({
    data,
  });
};

export const list = async () => {
  const c = await sessionsPromise;

  return c.find();
};

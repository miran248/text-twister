import { MongoClient } from "mongodb";

import { mongoDatabase, mongoPath } from "./config";

export const clientPromise = MongoClient.connect(mongoPath, {
  useNewUrlParser: true,
});

export const dbPromise = clientPromise.then(
  (client) => client.db(mongoDatabase)
);

export const sessionsPromise = dbPromise.then(
  (db) => db.createCollection("sessions", {
    capped: true,
    size: 1024 ** 2, // 1MB
  })
);

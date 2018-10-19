import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";

import { fromHex } from "@packages/common/str2hex";
import { Session } from "@packages/protobuf";

import * as sessions from "./sessions";
import * as validators from "./validators";

const app = new Koa;
const router = new Router;

const listSessions = async () => {
  const cursor = await sessions.list();

  return cursor.toArray();
};

router.get("/sessions", async (context, next) => {
  const items = await listSessions();

  context.body = JSON.stringify(items);
});

router.post("/sessions", async (context, next) => {
  const { request } = context;

  const result = validators.sessionsPost(request.body);

  if(result.error) {
    context.throw(400, `Validation failed with error: ${result.error.message}`);

    return;
  }

  const { data } = request.body;

  try {
    Session.decode(fromHex(data));
  } catch(e) {
    context.throw(400, `Decoding failed with error: ${e.message}`);

    return;
  }

  await sessions.add(data);

  const items = await listSessions();

  context.body = JSON.stringify(items);
});

app
  .use(cors({
    allowMethods: [ "GET", "POST" ],
  }))
  .use(bodyParser())
  .use(router.routes());

app.listen(8080);

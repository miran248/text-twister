import Koa from "koa";
import cors from "@koa/cors";
import rawBody from "raw-body";
import Router from "koa-router";

import { encodeSessions, decodeSession } from "./encoder";

import * as sessions from "./sessions";

const app = new Koa;
const router = new Router;

router.get("/sessions", async (context, next) => {
  try {
    const items = await sessions.list();

    context.type = "application/x-protobuf";
    context.body = encodeSessions(items);
  } catch(e) {
    console.log("get", e);

    context.throw(400, `Encoding failed with error: ${e.message}`);
  }
});

router.post("/sessions", async (context, next) => {
  const { req, request } = context;

  try {
    const body = await rawBody(req, {
      length: request.length,
    });

    const session = decodeSession(body);

    await sessions.add(session);

    context.status = 200;
  } catch(e) {
    console.log("post", e);

    context.throw(400, `Decoding failed with error: ${e.message}`);
  }
});

app
  .use(cors({
    allowMethods: [ "GET", "POST" ],
  }))
  .use(router.routes());

app.listen(8080);

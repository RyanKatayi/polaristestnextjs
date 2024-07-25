// src/index.ts

import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors';
import { orderRoutes } from './controllers/orders_controller';

const app = new Elysia()
  .use(cors())
  .use(orderRoutes)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

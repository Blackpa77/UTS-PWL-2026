import { Hono } from "hono";
import router from "./routes/web";
import { serveStatic } from "hono/bun";

const app = new Hono();
app.use("/css/*", serveStatic({ root: "./src/public" }));
app.route("/", router);
app.use("*", async (c, next) => {
  c.set("currentPath", c.req.path);
  await next();
});
export default { 
  port: 3000, 
  hostname: "0.0.0.0", 
  fetch: app.fetch,
}

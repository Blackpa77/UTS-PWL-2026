import ejs from "ejs";
import { readFile } from "fs/promises";
export const render = async (view, data = {}, c = null) => {
  const viewTemplate = await readFile(`./src/views/${view}.ejs`, "utf-8");
  const layoutTemplate = await readFile(`./src/views/layout.ejs`, "utf-8");
  return ejs.render(layoutTemplate, { ...data, body: ejs.render(viewTemplate, data), currentPath: c?.req?.path || "" });
};

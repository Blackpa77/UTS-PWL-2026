import { render } from "../config/viewEngine";
import * as model from "../models/mahasiswaModel";

export const home = async (c) => {
  const data = await model.getAll();

  const html = await render("home", {
    title: "Dashboard Bun MVC",
    message: "Hello dari Bun + Tailwind",
    totalMahasiswa: data.length,
    dataMahasiswa: data,  
    currentPath: c.get("currentPath"),
  });

  return c.html(html);
};
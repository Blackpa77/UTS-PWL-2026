import { render } from "../config/viewEngine";
import * as model from "../models/mahasiswaModel";
export const index = async (c) => c.html(await render("mahasiswa/index", { title: "Data Mahasiswa", mahasiswa: await model.getAll(), success: c.req.query("success"), error: c.req.query("error") }, c));
export const createForm = async (c) => c.html(await render("mahasiswa/create", { title: "Tambah Mahasiswa" }, c));
export const store = async (c) => {
  const body = await c.req.parseBody();
  if (!body.nama || !body.nim) return c.redirect("/mahasiswa/create?error=Semua field wajib diisi");
  await model.create({ nama: body.nama, nim: body.nim });
  return c.redirect("/mahasiswa?success=Data berhasil ditambahkan");
};
export const editForm = async (c) => c.html(await render("mahasiswa/edit", { title: "Edit Mahasiswa", mhs: await model.getById(c.req.param("id")) }, c));
export const updateData = async (c) => {
  const body = await c.req.parseBody();
  await model.update(c.req.param("id"), { nama: body.nama, nim: body.nim });
  return c.redirect("/mahasiswa?success=Data berhasil diupdate");
};
export const destroy = async (c) => {
  await model.remove(c.req.param("id"));
  return c.redirect("/mahasiswa?success=Data berhasil dihapus");
};

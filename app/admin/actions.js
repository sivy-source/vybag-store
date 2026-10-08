"use server";

import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createSessionClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect(
      "/admin/login?error=" +
        encodeURIComponent("Silakan login terlebih dahulu.")
    );
  }

  return { supabase, user };
}

export async function login(arg1, arg2) {
  const formData = arg1 instanceof FormData ? arg1 : arg2 instanceof FormData ? arg2 : null;

  if (!formData) {
    redirect("/admin/login?error=" + encodeURIComponent("Data formulir tidak valid."));
  }

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    redirect("/admin/login?error=" + encodeURIComponent("Email dan password wajib diisi."));
  }

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(email).trim(),
    password: String(password),
  });

  if (error) {
    const pesan =
      error.message === "Invalid login credentials"
        ? "Email atau password salah."
        : `Gagal masuk: ${error.message}`;
    redirect("/admin/login?error=" + encodeURIComponent(pesan));
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function gantiPassword(arg1, arg2) {
  const isActionState = arg2 instanceof FormData;
  const formData = isActionState ? arg2 : (arg1 instanceof FormData ? arg1 : null);

  if (!formData) {
    const msg = "Data formulir tidak valid.";
    if (isActionState) return { error: msg };
    redirect("/admin/password?error=" + encodeURIComponent(msg));
  }

  const passwordBaru = formData.get("password_baru");
  const konfirmasiPassword = formData.get("konfirmasi_password");

  if (!passwordBaru || !konfirmasiPassword) {
    const msg = "Password baru dan konfirmasi password wajib diisi.";
    if (isActionState) return { error: msg };
    redirect("/admin/password?error=" + encodeURIComponent(msg));
  }

  const strPassword = String(passwordBaru);
  const strKonfirmasi = String(konfirmasiPassword);

  if (strPassword.length < 8) {
    const msg = "Password baru minimal 8 karakter.";
    if (isActionState) return { error: msg };
    redirect("/admin/password?error=" + encodeURIComponent(msg));
  }

  if (strPassword !== strKonfirmasi) {
    const msg = "Password baru dan konfirmasi password tidak sama.";
    if (isActionState) return { error: msg };
    redirect("/admin/password?error=" + encodeURIComponent(msg));
  }

  // Wajib memeriksa status login admin di server sebelum mengubah data (aturan keamanan #3)
  const { supabase } = await requireAdmin();

  const { error } = await supabase.auth.updateUser({
    password: strPassword,
  });

  if (error) {
    const msg = `Gagal mengganti password: ${error.message}`;
    if (isActionState) return { error: msg };
    redirect("/admin/password?error=" + encodeURIComponent(msg));
  }

  const successMsg = "Password berhasil diperbarui.";
  if (isActionState) return { sukses: successMsg };
  redirect("/admin/password?sukses=" + encodeURIComponent(successMsg));
}

export const updatePassword = gantiPassword;

"use server";

import { login } from "./auth";

export async function loginAction(username: string, password: string) {
  try {
    const success = await login(username, password);
    if (success) {
      return { success: true };
    }
    return { success: false, error: "Usuario o contraseña incorrectos" };
  } catch (error) {
    return { success: false, error: "Error al iniciar sesión" };
  }
}


"use server";

import { signIn, signOut } from "../../auth";

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}


export async function doCredentialLogin(credential) {
  try {
    const response = await signIn("credentials", {
      user: JSON.stringify(credential),
      username: credential?.username,
      password: credential?.password,
      redirect: false,
    });

    return response;
  } catch (err) {
    throw err;
  }
}

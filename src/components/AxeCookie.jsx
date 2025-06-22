"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AxeCookie() {
  const cookieJar = await cookies();
  cookieJar.delete("loggedIn");
  revalidatePath("/");
  redirect("/");
}

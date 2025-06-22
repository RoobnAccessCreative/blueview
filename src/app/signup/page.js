import Link from "next/link";
import UserCreds from "@/components/UserCreds";
import bcrypt from "bcrypt";
import { db } from "@/utils/database";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function SignUpPage() {
  const makeAccount = async (formData) => {
    "use server";
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: await bcrypt.hash(formData.get("password"), 10),
    };
    const query = await db.query("SELECT username from bv_users");
    const isPresent = query.rows;

    let flag = true;
    isPresent.every((u) => {
      if (u.username === data.username) {
        flag = false;
        return false;
      }
      return true;
    });
    if (!flag) {
      throw new Error("Username already exists");
    } else {
      await db.query(
        "INSERT INTO bv_users (username, email, password)\
        VALUES ($1, $2, $3)",
        [data.username, data.email, data.password]
      );
      const cookieJar = await cookies();
      cookieJar.set({
        name: "loggedIn",
        value: true,
        path: "/",
        secure: true,
      });
      revalidatePath("/");
      redirect("/");
    }
  };

  return (
    <main className="flex flex-col items-center justify-evenly h-3/4">
      <UserCreds mode={"signup"} handler={makeAccount} />

      <p>
        Have an Account?{" "}
        <Link href={"/login"} className="text-acc ml-1">
          Log In
        </Link>
      </p>
    </main>
  );
}

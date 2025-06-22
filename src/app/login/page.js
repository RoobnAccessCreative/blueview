import Link from "next/link";
import UserCreds from "@/components/UserCreds";
import bcrypt from "bcrypt";
import { db } from "@/utils/database";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const verifyInputs = async (formData) => {
    "use server";
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    const user = await db.query(
      "SELECT username, password FROM bv_users WHERE username = $1",
      [data.username]
    );
    const userData = user.rows[0];
    if (userData) {
      if (await bcrypt.compare(data.password, userData.password)) {
        const cookieJar = await cookies();
        cookieJar.set({
          name: "loggedIn",
          value: true,
          path: "/",
          secure: true,
        });
        revalidatePath("/");
        redirect("/");
      } else {
        console.error("Password invalid");
      }
    } else {
      console.error("Username invalid");
    }
  };

  return (
    <main className="flex flex-col items-center justify-evenly h-3/4">
      <UserCreds mode={"login"} handler={verifyInputs} />

      <p>
        New to us?{" "}
        <Link href={"/signup"} className="text-acc ml-1">
          Sign Up
        </Link>
      </p>
    </main>
  );
}

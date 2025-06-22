import Link from "next/link";
import UserCreds from "@/components/UserCreds";

export default function SignUpPage() {
  const makeAccount = async () => {
    "use server";
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

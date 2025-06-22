import { db } from "@/utils/database";
import Image from "next/image";
import postStyles from "./post.module.css";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function PostPage({ params }) {
  const param = await params;
  const post = param.post;

  const cookieJar = await cookies();

  // get post info
  const res = await db.query("SELECT * FROM bv_posts WHERE id = $1", [post]);
  // remove need for .map
  const data = res.rows[0];

  // get comments
  const query = await db.query(
    "SELECT bv_comments.id, bv_comments.message, bv_users.username FROM bv_comments \
    JOIN bv_users ON bv_comments.user_id=bv_users.id WHERE bv_comments.post_id = $1 ORDER BY bv_comments.id DESC LIMIT 30",
    [post]
  );
  const comments = query.rows;

  const handleForm = async (formData) => {
    "use server";
    const toInsert = {
      message: formData.get("comm"),
      user: 1,
      post: post,
    };
    const res = db.query(
      "INSERT INTO bv_comments (message, user_id, post_id) \
      VALUES ($1, $2, $3)",
      [toInsert.message, toInsert.user, toInsert.post]
    );
    revalidatePath(`/posts/${post}`);
    redirect(`/posts/${post}`);
  };

  return (
    <main className="h-3/4">
      <h2 className="font-t text-3xl mt-[-1rem] pb-4 ml-20">{data.title}</h2>
      <div
        className={`flex flex-wrap w-full ${
          !cookieJar.has("loggedIn") ? "items-center" : "items-start"
        } justify-around`}
      >
        <span className="w-1/2">
          <Image
            src={`/${data.image}`}
            width={500}
            height={500}
            alt={"" /* bio underneath */}
            className={`rounded-3xl ${postStyles["post-image"]}`}
          />
          <p className="mt-4 p-4 rounded-2xl bg-[midnightblue]/50">
            {data.bio}
          </p>
        </span>

        {cookieJar.has("loggedIn") ? (
          <span>
            <form
              action={handleForm}
              className="bg-pri rounded-2xl p-4 flex flex-col items-center gap-1 text-xl w-[30dvw] mb-4"
            >
              <label htmlFor="comm">Leave a Comment</label>
              <textarea
                name="comm"
                id="comm"
                className="bg-[midnightblue] resize-none rounded-md text-[1rem] p-2 w-full"
              />
              <button type="submit" className="cursor-pointer">
                Post
              </button>
            </form>
            <ul>
              {comments.map((c) => (
                <div key={c.id} className="mb-2">
                  <h3>{c.username}</h3>
                  <p>{c.message}</p>
                </div>
              ))}
            </ul>
          </span>
        ) : (
          <>
            <h2 className="text-3xl">
              <Link href={"/login"} className="text-acc">
                Login
              </Link>{" "}
              to View/Write comments
            </h2>
          </>
        )}
      </div>
    </main>
  );
}

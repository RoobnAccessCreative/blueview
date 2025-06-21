import { db } from "@/utils/database";
import Image from "next/image";
import postStyles from "./post.module.css";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function PostPage({ params }) {
  const param = await params;
  const post = param.post;

  // get post info
  const res = await db.query("SELECT * FROM bv_posts WHERE id = $1", [post]);
  // remove need for .map
  const data = res.rows[0];

  // get comments
  const query = await db.query(
    "SELECT bv_comments.id, bv_comments.message, bv_users.username FROM bv_comments \
    JOIN bv_users ON bv_comments.user_id=bv_users.id WHERE bv_comments.post_id = $1",
    [post]
  );
  const comments = res.rows;

  const handleForm = (formData) => {
    const toInsert = {
      message: formData.get("comm"),
      user: userID || 1,
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
    <main>
      <h2>{data.title}</h2>
      <div className="flex flex-wrap w-full">
        <span>
          <Image
            src={`/${data.image}`}
            width={500}
            height={500}
            alt={"" /* bio underneath */}
            className={`rounded-3xl ${postStyles["post-image"]}`}
          />
          <p>{data.bio}</p>
        </span>
        <span>
          <form action={handleForm}>
            <label htmlFor="comm">Leave a Comment</label>
            <textarea name="comm" id="comm" />
          </form>
          <ul>
            {comments.map((c) => (
              <div key={c.id}>
                <h3>{c.username}</h3>
                <p>{c.message}</p>
              </div>
            ))}
          </ul>
        </span>
      </div>
    </main>
  );
}

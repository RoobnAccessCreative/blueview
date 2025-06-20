import { db } from "@/utils/database";
import Image from "next/image";
import postStyles from "./post.module.css";

export default async function PostPage({ params }) {
  const param = await params;
  const post = param.post;

  const res = await db.query("SELECT * FROM bv_posts WHERE id = $1", [post]);
  let data = await res.json;
  console.log(res.rows);
  // remove need for .map
  data = res.rows[0];

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
      </div>
    </main>
  );
}

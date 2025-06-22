import { db } from "@/utils/database";
import Image from "next/image";
import Link from "next/link";

export default async function Posts() {
  const res = await db.query("SELECT id, image, title FROM bv_posts LIMIT 50");
  const posts = res.rows;

  return (
    <section className="flex flex-col items-center">
      {posts.map((p) => (
        <Link href={`/posts/${p.id}`} key={p.id}>
          <div
            className={
              "flex items-center gap-4 min-w-[30dvw] bg-pri/75 p-4 pl-6 pr-6 rounded-full"
            }
          >
            <Image
              src={`/${p.image}`}
              width={50}
              height={50}
              className="rounded-full"
              alt=""
            />
            <h2 className="text-bg text-xl font-medium">{p.title}</h2>
          </div>
        </Link>
      ))}
    </section>
  );
}

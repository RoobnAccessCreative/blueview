import { db } from "@/utils/database";
import Image from "next/image";

export default async function AboutPage({ params }) {
  const param = await params;
  const post = param.post;

  const getData = async () => {
    const res = await db
      .query("SELECT * FROM bv_posts WHERE id = $1", [post])
      .then((response) => response.json());
    return res.rows[0];
  };

  return (
    <main>
      <h2>{post}</h2>
      <div className="flex flex-wrap w-full">
        <span>
          <Image
            src={`/public/${getData}`}
            width={500}
            height={500}
            alt={"" /* bio underneath */}
          />
        </span>
      </div>
    </main>
  );
}

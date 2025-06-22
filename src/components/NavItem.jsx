"use client";
import navStyles from "./css/Navbar.module.css";
import Link from "next/link";

import { useParams, usePathname } from "next/navigation";

export default function NavItem({ path, name }) {
  const isPath = usePathname();
  const params = useParams();

  return (
    <>
      <Link href={path}>
        <h3
          className={`${navStyles["nav-item"]} ${
            isPath === path || (params?.post && name === "Posts")
              ? navStyles.active
              : ""
          }`}
        >
          {name}
        </h3>
      </Link>
    </>
  );
}

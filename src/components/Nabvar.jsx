import Image from "next/image";
import Link from "next/link";
import NavItem from "./NavItem";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-[100%] p-4 pr-8 pl-6 bg-pri mb-12">
      <Link href={"/"}>
        <Image
          src={"/blueView.svg"}
          width={120}
          height={250}
          alt="BlueView"
          className="rounded-2xl"
        />
      </Link>
      <div className="flex items-center justify-evenly gap-8 mr-8">
        <NavItem path={"/"} name={"Posts"} />
        <NavItem path={"/about"} name={"About"} />
        {/* ... */}
      </div>
    </nav>
  );
}

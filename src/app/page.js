import Posts from "@/components/Posts";

export default function HomePage() {
  return (
    <main className="w-full h-3/4">
      <div className="flex w-full items-center justify-around">
        <h1>important text and slogan</h1>
        <Posts />
      </div>
    </main>
  );
}

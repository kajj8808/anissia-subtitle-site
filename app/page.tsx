import db from "@lib/server/db";
import Link from "next/link";

export const revalidate = 3600; // 1 시간 마다 데이터를 재검증 합니다.

async function getAnissiaAnimations() {
  const anissiaAnimations = await db.animation.findMany({
    orderBy: {
      updateAt: "desc",
    },
  });
  return anissiaAnimations;
}

export default async function Home() {
  const anissiaAnimations = await getAnissiaAnimations();
  return (
    <main className="mt-20 flex flex-col gap-5 px-4 sm:px-10">
      {anissiaAnimations.map((anissiaAnimation) => (
        <Link
          href={`/animeNo/${anissiaAnimation.animeNo}`}
          key={anissiaAnimation.animeNo}
          className="grid grid-cols-12 rounded-md border px-2 py-3 shadow-md transition-transform hover:scale-105 active:scale-95"
        >
          <div className="col-span-2 flex items-center justify-center">
            <p className="text-sm">
              {anissiaAnimation.status === "ON" ? "방영중" : "종영"}
            </p>
          </div>
          <div className="col-span-10 flex flex-col gap-1 border-l py-4 pl-5">
            <p className="w-full truncate">{anissiaAnimation.name}</p>
            <p className="text-xs text-gray-600">{anissiaAnimation.genres}</p>
            <p className="text-xs text-gray-600">
              {anissiaAnimation.updateAt.toLocaleString()}
            </p>
          </div>
        </Link>
      ))}
    </main>
  );
}

import db from "@lib/server/db";
import Link from "next/link";

export const revalidate = 3600; // 1 시간 마다 데이터를 재검증 합니다.

async function getAnissiaSubtitleDetail(animeNo: number) {
  const animation = await db.animation.findUnique({
    where: { animeNo: animeNo },
    select: {
      name: true,
      website: true,
      genres: true,
      status: true,
    },
  });
  const subtitles = await db.subTitle.findMany({
    where: {
      animeNo: animeNo,
    },
    orderBy: {
      updateAt: "desc",
    },
  });

  return {
    name: animation?.name,
    website: animation?.website,
    genres: animation?.genres,
    status: animation?.status,
    subtitles: subtitles,
  };
}

export default async function AnissiaSubtitleDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const subtitleData = await getAnissiaSubtitleDetail(+id);

  return (
    <div className="mt-24 flex flex-col items-center">
      <h1 className="text-lg">{subtitleData.name}</h1>
      <h3 className="text-sm text-gray-600">{subtitleData.genres}</h3>
      <h3 className="text-sm text-gray-600">
        {subtitleData.status === "ON" ? "방영중" : "종영"}
      </h3>
      <ul className="mt-8 border-t">
        {subtitleData.subtitles.map((subtitle) => (
          <Link
            key={subtitle.id}
            href={subtitle.website}
            className="flex border-b p-5 transition-transform hover:scale-110 active:scale-95"
          >
            <div className="flex items-center justify-center p-5">
              <p className="text-sm text-gray-700">
                episode: {subtitle.episode}
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm">uploader: {subtitle.uploader}</p>
              <p className="text-sm text-gray-600">
                {subtitle.updateAt.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}

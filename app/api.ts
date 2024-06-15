import { getOgData } from "@lib/client/utile";
import db from "@lib/server/db";
import { SubTitle } from "@prisma/client";

interface ISubtitles extends SubTitle {
  animation: {
    name: string;
  };
  ogImage: string;
  ogTitle: string;
}

export async function getSubtitles() {
  let subtitles = await db.subTitle.findMany({
    include: {
      animation: {
        select: {
          name: true,
          website: true,
        },
      },
    },
  });

  const perfectItems = (await Promise.all(
    subtitles.slice(0, 3).map(async (subtitle) => {
      let ogData = await getOgData(subtitle.website);

      if (ogData.ogImage === null) {
        ogData = await getOgData(subtitle.animation.website);
      }
      return {
        ...subtitle,
        ogImage: ogData.ogImage ?? "",
        ogTitle: ogData.ogTitle,
      };
    })
  )) as ISubtitles[];

  return perfectItems;
}

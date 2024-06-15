import ogs from "open-graph-scraper";
export async function getOgData(siteUrl: string) {
  try {
    const {
      result: { ogImage, ogTitle },
    } = await ogs({ url: siteUrl });
    return {
      ogImage: ogImage ? ogImage[0].url : null,
      ogTitle: ogTitle,
    };
  } catch (error) {
    return { ogImage: null, ogTitle: null };
  }
}

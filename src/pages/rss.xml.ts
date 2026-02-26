/**
 * ─── RSS Feed ───
 * Auto-generates an RSS feed from the blog collection.
 * Available at /rss.xml
 */
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@data/site";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: SITE.name,
    description: SITE.seo.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags,
    })),
    customData: `<language>${SITE.language}</language>`,
  });
}

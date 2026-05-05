import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { projects, blogPosts } from "@db/schema";
import { like, or } from "drizzle-orm";

export const searchRouter = createRouter({
  global: publicQuery
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ input }) => {
      const db = getDb();
      const searchTerm = `%${input.query}%`;

      const projectResults = await db
        .select()
        .from(projects)
        .where(
          or(
            like(projects.name, searchTerm),
            like(projects.location, searchTerm),
            like(projects.description, searchTerm)
          )
        )
        .limit(10);

      const blogResults = await db
        .select()
        .from(blogPosts)
        .where(
          or(
            like(blogPosts.title, searchTerm),
            like(blogPosts.excerpt, searchTerm),
            like(blogPosts.content, searchTerm)
          )
        )
        .limit(10);

      return {
        projects: projectResults,
        blogPosts: blogResults,
      };
    }),
});

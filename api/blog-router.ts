import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { blogPosts } from "@db/schema";
import { eq, like, and, desc } from "drizzle-orm";

export const blogRouter = createRouter({
  list: publicQuery
    .input(
      z
        .object({
          category: z
            .enum(["design", "construction", "industry", "company", "sustainability"])
            .optional(),
          search: z.string().optional(),
          limit: z.number().min(1).max(50).default(20),
          offset: z.number().min(0).default(0),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const conditions = [];

      if (input?.category) {
        conditions.push(eq(blogPosts.category, input.category));
      }
      if (input?.search) {
        conditions.push(
          like(blogPosts.title, `%${input.search}%`) ||
            like(blogPosts.excerpt, `%${input.search}%`)
        );
      }

      const where = conditions.length > 0 ? and(...conditions) : undefined;

      const results = await db
        .select()
        .from(blogPosts)
        .where(where)
        .limit(input?.limit || 20)
        .offset(input?.offset || 0)
        .orderBy(desc(blogPosts.publishedAt));

      return results;
    }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, input.slug))
        .limit(1);
      return result[0] || null;
    }),

  create: adminQuery
    .input(
      z.object({
        slug: z.string(),
        title: z.string(),
        excerpt: z.string(),
        content: z.string(),
        featuredImage: z.string(),
        category: z.enum(["design", "construction", "industry", "company", "sustainability"]),
        author: z.string(),
        readTime: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(blogPosts).values(input);
      return result;
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        slug: z.string().optional(),
        title: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        featuredImage: z.string().optional(),
        category: z.enum(["design", "construction", "industry", "company", "sustainability"]).optional(),
        author: z.string().optional(),
        readTime: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(blogPosts).where(eq(blogPosts.id, input.id));
      return { success: true };
    }),
});

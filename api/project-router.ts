import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { projects } from "@db/schema";
import { eq, like, and, desc } from "drizzle-orm";

export const projectRouter = createRouter({
  list: publicQuery
    .input(
      z
        .object({
          category: z
            .enum(["residential", "commercial", "landscape", "interior", "exterior"])
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
        conditions.push(eq(projects.category, input.category));
      }
      if (input?.search) {
        conditions.push(
          like(projects.name, `%${input.search}%`) ||
            like(projects.location, `%${input.search}%`)
        );
      }

      const where = conditions.length > 0 ? and(...conditions) : undefined;

      const results = await db
        .select()
        .from(projects)
        .where(where)
        .limit(input?.limit || 20)
        .offset(input?.offset || 0)
        .orderBy(desc(projects.createdAt));

      return results;
    }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(projects)
        .where(eq(projects.slug, input.slug))
        .limit(1);
      return result[0] || null;
    }),

  create: adminQuery
    .input(
      z.object({
        slug: z.string(),
        name: z.string(),
        location: z.string(),
        category: z.enum(["residential", "commercial", "landscape", "interior", "exterior"]),
        description: z.string(),
        area: z.string().optional(),
        duration: z.string().optional(),
        year: z.number().optional(),
        budget: z.string().optional(),
        featuredImage: z.string(),
        images: z.array(z.string()).default([]),
        featured: z.boolean().default(false),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(projects).values({
        ...input,
        images: JSON.stringify(input.images),
      });
      return result;
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        slug: z.string().optional(),
        name: z.string().optional(),
        location: z.string().optional(),
        category: z.enum(["residential", "commercial", "landscape", "interior", "exterior"]).optional(),
        description: z.string().optional(),
        area: z.string().optional(),
        duration: z.string().optional(),
        year: z.number().optional(),
        budget: z.string().optional(),
        featuredImage: z.string().optional(),
        images: z.array(z.string()).optional(),
        featured: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(projects).set(data).where(eq(projects.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(projects).where(eq(projects.id, input.id));
      return { success: true };
    }),
});

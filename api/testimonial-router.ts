import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { testimonials, newsletterSubscribers } from "@db/schema";
import { eq, asc } from "drizzle-orm";

export const testimonialRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(testimonials).orderBy(asc(testimonials.order));
  }),

  create: adminQuery
    .input(
      z.object({
        quote: z.string(),
        authorName: z.string(),
        authorTitle: z.string(),
        authorCompany: z.string().optional(),
        avatar: z.string().optional(),
        order: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(testimonials).values(input);
      return result;
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        quote: z.string().optional(),
        authorName: z.string().optional(),
        authorTitle: z.string().optional(),
        authorCompany: z.string().optional(),
        avatar: z.string().optional(),
        order: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(testimonials).set(data).where(eq(testimonials.id, id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(testimonials).where(eq(testimonials.id, input.id));
      return { success: true };
    }),
});

export const newsletterRouter = createRouter({
  subscribe: publicQuery
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      try {
        await db.insert(newsletterSubscribers).values({ email: input.email });
        return { success: true };
      } catch {
        return { success: false, message: "Already subscribed" };
      }
    }),
});

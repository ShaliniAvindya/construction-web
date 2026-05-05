import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { contactSubmissions } from "@db/schema";

export const contactRouter = createRouter({
  submit: publicQuery
    .input(
      z.object({
        name: z.string().min(1).max(255),
        email: z.string().email(),
        phone: z.string().max(50).optional(),
        projectType: z.enum([
          "interior",
          "exterior",
          "landscape",
          "construction",
          "project_management",
          "travel",
          "other",
        ]),
        message: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(contactSubmissions).values(input);
      return { success: true, id: Number(result[0].insertId) };
    }),
});

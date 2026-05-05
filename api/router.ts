import { authRouter } from "./auth-router";
import { contactRouter } from "./contact-router";
import { projectRouter } from "./project-router";
import { blogRouter } from "./blog-router";
import { testimonialRouter, newsletterRouter } from "./testimonial-router";
import { searchRouter } from "./search-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  contact: contactRouter,
  project: projectRouter,
  blog: blogRouter,
  testimonial: testimonialRouter,
  newsletter: newsletterRouter,
  search: searchRouter,
});

export type AppRouter = typeof appRouter;

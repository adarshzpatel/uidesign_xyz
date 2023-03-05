import { createTRPCRouter } from "./trpc";
import { componentRouter } from "./routers/component";
import { tagsRouter } from "./routers/tags";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  component:componentRouter,
  tags:tagsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

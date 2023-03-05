import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const tagsRouter = createTRPCRouter({
    createTag: publicProcedure.input(z.object({
      name:z.string()
    })).mutation(async({input,ctx}) => {
      try{
         return ctx.prisma.tag.create({
            data:{
               name:input.name
            }
         })
      }catch(err){
         console.log("Create tag Error",err)
      }
    }),
   getAllTags:publicProcedure.query(async({ctx})=>{
      return await ctx.prisma.tag.findMany() || []
   }),
});

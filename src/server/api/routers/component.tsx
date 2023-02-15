import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const componentRouter = createTRPCRouter({
  /*
  TODO : Routes
    1. CREATE 
       - id 
       - title 
       - description 
       - tags[]
       - component [ copied from figma]
       - thumbnailUrl 
       - createdAt 
       - updatedAt
       - createdBy
    2. GET COMPONENT BY ID
    3. GET ALL COMPONENTS 
    4. UPDATE COMPONENTS 
    5. DELETE COMPONENT
       */

    // TODO : IMPLEMENT AUTH CHECK & make it private procedure
    create: publicProcedure.input(z.object(
      {
         title:z.string().min(5),
         description:z.string(),
         tags:z.array(z.string()),
         component: z.coerce.string(),
         thumbnailUrl:z.string().url(),
      }
    )).mutation(async ({input,ctx}) => {
         try{
            return ctx.prisma.component.create({
               data: {
                  title:input.title,
                  component:input.component,
                  thumbnailUrl:input.thumbnailUrl,
               }
            })
         } catch(err){
            console.log("Create Error : ", err)
         }
    }),
    getAll:publicProcedure.query(async({ctx})=>{
      return await ctx.prisma.component.findMany({orderBy:{likes:'desc'}})
   }),
   like: publicProcedure.input(z.object({
      id:z.string()
   })).mutation(async({input,ctx})=>{
      try{  
         return await ctx.prisma.component.update({data:{likes:{increment:1}},where:{id:input.id}})
      } catch(err){  
         console.log("like error",err)
      }
   })
});

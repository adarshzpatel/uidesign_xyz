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
         title:z.string().min(3),
         tags:z.array(z.string()),
         component: z.coerce.string(),
         thumbnailUrl:z.string().url(),
      }
    )).mutation(async ({input,ctx}) => {
         try{
            const component = Buffer.from(input.component,'utf-8')
            return ctx.prisma.component.create({
               data: {
                  title:input.title,
                  component:component,
                  thumbnailUrl:input.thumbnailUrl,
                  tags:{
                     connectOrCreate:input?.tags?.map((item)=>({where:{name:item},create:{name:item}}))
                  }
               }
            })
         } catch(err){
            console.log("Create Error : ", err)
         }
    }),

    createTag: publicProcedure.input(z.object({
      name:z.string()
    })).mutation(async({input,ctx}) => {
      try{
         await ctx.prisma.tag.create({
            data:{
               name:input.name
            }
         })
      }catch(err){
         console.log("Create tag Error",err)
      }
    }),

   getAllComponents:publicProcedure.query(async({ctx})=>{
      let res = await ctx.prisma.component.findMany()
      return res.map((item)=>({...item,component:item?.component.toString()}))
}),

   getAllTags:publicProcedure.query(async({ctx})=>{
      return await ctx.prisma.component.findMany()
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

import { votes } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";

export default async function handle(req : NextApiRequest, res: NextApiResponse){
    const session = getSession({req})

    if (!session) {
        return res.status(404).json({message:"Kamu harus login duls."})
    }

    const { code } = req.query
    // Get Detail By code
    if (req.method==="GET") {
        const result = await prisma.votes.findFirst({
            select:{
                id:true,
                publisher:true,
                title:true,
                code:true,
                candidates:true,
                startDateTime:true,
                endDateTime:true,
                createdAt:true,
                deleteAt:true
            },
            where:{
                code : code as string,
                deleteAt: null
            }
        })

        if (!result) {
            return res.status(404).json({message : "NOT_FOUND"})
        }
        const response: Res<votes> ={
            status:200,
            data: result
        }
        return res.json(response)
    }

    //Delete by code
    if (req.method ==="DELETE") {
        const result = await prisma.votes.update({
            where:{
                code : code as string
            },data:{
                deleteAt: new Date().toString()
            }
        })
        return res.json(result)
    }

    //Update by code
    if(req.method === "PUT"){
        const result = await prisma.votes.update({
            where:{
                code: code as string
            },
            data:{
                candidates:req.body.candidates,
                startDateTime : req.body.startDateTime,
                endDateTime: req.body.endDateTime,
                title: req.body.title
            }
        })
        return res.json(result)
    }
}
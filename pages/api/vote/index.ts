import { votes } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { code } from "../../../lib/code";
import { prisma } from "../../../lib/prisma";

export default async function handle(req:NextApiRequest,res:NextApiResponse) {
    const session = await getSession({ req })

    if (!session) {
        return res.status(404).json({message:"Kamu harus login duls."})
    }

    //create new
    if (req.method ==="POST") {
        const result = await prisma?.votes.create({
            data:{
                title : req.body.title,
                candidates : req.body.candidates,
                startDateTime : req.body.startDateTime,
                endDateTime : req.body.endDateTime,
                publisher : req.body.publisher,
                code : code(6),
                deleteAt : null
            }
        })
        return res.json(result)
    }

    //get all user
    if (req.method === "GET") {
        const result = await prisma.votes.findMany({
            where:{
                AND:[
                    { deleteAt: null },
                    { publisher: session?.user?.email! }
                ]
            }
        })

        const response : Res<votes[]> = {
            status : 200,
            data : result
        }

        return res.json(response)
    }
    return res.status(200).json({data : "hellow"})
}
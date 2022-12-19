import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    const session = await getSession({req})

    if (!session) {
        return res.status(404).json({message:"Kamu harus login duls."})
    }
    
    const { code } = req.query
    //add participant
    if (req.method === "POST") {
        const result = await prisma?.participant.create({
            data:{
                candidates: req.body.candidate,
                email: session?.user?.email!,
                code: code as string
            }
        })
        return res.json(result)
    }

    //Get participant model
    //add participant
    if (req.method === "GET") {
        const result = await prisma?.participant.findFirst({
            where:{
                code: code as string,
                email:session.user?.email!
            }
        })
        const response={
            status:200,
            data:result
        }
        return res.status(200).json(response)
    }
}
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";

export default async function handle(req : NextApiRequest, res: NextApiResponse){
    const session = getSession({req})

    // if (!session) {
    //     return res.status(404).json({message:"Kamu harus login duls."})
    // }

    const { code } = req.query
    // Get Detail By code
    if (req.method==="GET") {
        const vote = await prisma.votes.findFirst({
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

        if (!vote) {
            return res.status(404).json({message : "NOT_FOUND"})
        }

        //get participant vote
        const participants = await prisma.participant.findMany({
            select:{
                candidates:true,
                email:true,
                createdAt:true
            },
            where:{
                code:code as string
            }
        })

        //Count vote foreach candidate
        var candidates:Candidate[] = []
        if(participants){
            candidates = vote?.candidates.map((candidate)=>{
                const votes = participants.filter((participant) => participant.candidates === candidate.name).length || 0 ;

                return{
                    ...candidate,
                    votes
                }
            }) as Candidate[]
        }

        const clientVote : Vote = {
            id:vote.id,
            title:vote.title,
            code:vote.code,
            publisher:vote.publisher,
            candidates:vote.candidates,
            startDateTime:String(vote.startDateTime),
            endDateTime:String(vote.endDateTime),
            createdAt:String(vote.createdAt),
            deleteAt:String(vote.deleteAt),
            totalVotes: candidates ? candidates?.reduce((acc,candidate) => acc + (candidate.votes ? candidate.votes : 0),0) : 0
        } 

        const response: Res<Vote> ={
            status:200,
            data: clientVote
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
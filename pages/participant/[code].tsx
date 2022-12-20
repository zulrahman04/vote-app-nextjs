import Head from "next/head"
import { useRouter } from "next/router"
import { showAlert } from "../../components/Alert"
import Button from "../../components/Button"
import CandidateItem from "../../components/CandidateItem"
import CountDown from "../../components/CountDown/CountDown"
import Menu from "../../components/Menu"
import { useSession } from "next-auth/react"
import RestrictedPage from "../../components/page/RestrictedPage"
import useVote from "../../lib/useVote"
import { useEffect, useState } from "react"
import moment from "moment"
import useParticipant from "../../lib/useParticipant"

export const STATE_NOT_STARTED = "STATE_NOTSTARTED",
            STATE_STARTED = "STATE_STARTED",
            STATE_ENDED="STATE_ENDED",
            STATE_LOADING="STATE_LOADING"

export default function DetailVoting(){
    const {data:session} = useSession()
    const router = useRouter()
    const {code} = router.query
    const { data:dataVoteApi, mutate:mutateVoteApi } = useVote(code as string)
    const [currentState, setCurrentState] = useState()
    const [selectedCandidate, setSelectedCandidate]= useState<Candidate | null>(null)
    const {data:dataParticipantApi, mutate:mutateDataParticipanApi} = useParticipant(code as string)

    const submitVote =async()=>{
        if (selectedCandidate) {
            showAlert({
                title:"Apakah kamu yakin?",
                message:"kamu akan memilih kandidat "+selectedCandidate.name,
                positiveBtnText:"Ya",
                onPositiveClick: async()=>{
                    const res = await fetch("/api/participant/"+ dataVoteApi?.data?.code,{
                        method:"POST",
                        headers:{
                            "Content-Type" :"application/json"
                        },
                        body:JSON.stringify({
                            candidate:selectedCandidate.name,
                        })
                    })
                    if (res.status === 200) {
                        mutateVoteApi()
                        mutateDataParticipanApi()
                        showAlert({title:"Vote Terkirim",message:"Terimakasih sudah berpartisipasi"})
                    }
                }
            })
        }else{
            showAlert({
                title:"Vote Gagal",
                message:"Plih salah satu kandidat",
            })
        }
    }

    useEffect(()=>{
        const vote = dataVoteApi?.data
        if (dataVoteApi && dataVoteApi.data) {
            if (currentState === STATE_ENDED) {
                return
            }
        }

        const start = moment(String(vote?.startDateTime))
        const end = moment(String(vote?.endDateTime))

        const interval = setInterval(async()=>{
            const now = moment()

            if (now.isBefore(start)) {
                setCurrentState(STATE_NOT_STARTED)
            }else if(now.isAfter(start) && now.isBefore(end)){                
                setCurrentState(STATE_STARTED)
            }else if(now.isAfter(end)){         
                setCurrentState(STATE_ENDED)
            }
        },1000)

        return ()=>clearInterval(interval)
    },[dataVoteApi])

    useEffect(()=>{
        if (dataParticipantApi?.data && dataVoteApi?.data) {
            const candidate = dataVoteApi?.data?.candidates?.find((c)=>
                c.name === dataParticipantApi?.data?.candidates
            )
            if (candidate) {
                setSelectedCandidate(candidate)
            }
        }
    },[dataParticipantApi,dataVoteApi])

    if (!session) {
        return <RestrictedPage/>
    }

    return (
        <div className="container mx-auto">
            <Head>
                <title>Mulai Voting</title>
            </Head>

            <Menu/>

            <div>
                <h1 className="text-4xl mt-10 text-center">
                    {dataVoteApi?.data?.title}
                </h1>

                {/* timer */}
                {/* <div className="">

                </div> */}
                <CountDown 
                start={String(dataVoteApi?.data?.startDateTime)} 
                end={String(dataVoteApi?.data?.endDateTime)}
                currentState={String(currentState)}
                className="mt-10"/>
                {/* /timer */}

                {/* kandidat */}
                <div className="mt-10 space-y-3 mx-auto w-2/3">
                    {dataVoteApi?.data?.candidates.map((candidate:Candidate,index:number)=>(
                        <CandidateItem 
                            onClick={() => { !dataParticipantApi?.data &&
                                currentState === STATE_STARTED && setSelectedCandidate(candidate)} }
                            isSelected={selectedCandidate?.name === candidate.name}
                            name={candidate.name}
                            title={"Kandidat " + candidate.key}
                            percentage={candidate.votes ? ( (dataVoteApi?.data?.totalVotes || 0)) * 100 : 0}
                            key={candidate.key} index={index + 1}/>
                            ))}
                </div>
                {/* /kandidat */}

                {/* Submit */}
                <div className="text-center mt-10">
                    {(session?.user?.email != dataVoteApi?.data?.publisher) && !dataParticipantApi?.data && currentState===STATE_STARTED && (
                        <Button text="Kirim Vote Saya"
                        onClick={()=> {
                            submitVote()
                        }}/>
                    )}
                    {dataParticipantApi?.data && <span className="bg-zinc-100 py-2 px-3">Kamu sudah memilih</span>}
                    {session.user?.email === dataVoteApi?.data?.publisher && (
                        <span className="bg-zinc-100 py-2 px-3">Pembuat Tidak boleh memilih</span>
                    )}
                </div>
                {/* /Submit */}
            </div>
        </div>
        )
}
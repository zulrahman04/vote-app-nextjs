import Head from "next/head";
import Menu from "../../components/Menu";
import Image from 'next/image'
import Form from "../../components/Form";
import ReactDatePicker, {registerLocale} from "react-datepicker"
import id from "date-fns/locale/id"
import { useState } from "react";
registerLocale("id", id)
import "react-datepicker/dist/react-datepicker.css"
import CandidateForm from "../../components/CandidateForm";
import { PlusIcon } from "@heroicons/react/24/solid";
import { json } from "stream/consumers";
import Button from "../../components/Button";

export default function CreateVote(){
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [candidates, setCandidates]=useState<Candidate[]>([])
    
    const submitCandidate = (candidate:Candidate)=>{
        setCandidates(
            candidates.map((c)=>(c.key===candidate.key ? candidate : c))
        )
    }
    
    const addCandidateForm = ()=>{
        const newCandidate:Candidate={
            name:"",
            key: candidates.length + 1,
            title:""
        };
        setCandidates([...candidates,newCandidate])
    }

    const removeCandidateForm = (key:number) => {
        // List kandidat baru kecuali dengan key diatas
        const newCandidates=candidates.filter(
            (candidate)=>candidate.key !== key
        )
        
        // Re-arrange atau diurutkan ulang
        newCandidates.forEach((candidate,index)=>{
            candidate.key=index+1
        })

        setCandidates(newCandidates)
    }

    return (
    <div className="container mx-auto">
        <Head>
            <title>Voting Baru</title>
        </Head>
        <Menu/>

        <div className="py-10">
            <Image alt="Create Vote" src={"/assets/org.png"} width={284} height={198}/>
            <h1 className="text-4xl font-bold">Buat Voting Baru</h1>
            <h2 className="text-zinc-700 mt-3">Silahkan masukan data yang dibutuhkan sebelum vote online</h2>

            <form className="flex flex-col">
                {/* detail vote  */}
                <div className="space-y-5">
                    <div className="flex flex-col">
                        <h3 className="font-meduim text-xl mt-10 ">Detail Voting</h3>
                            <label className="text-sm mt-5">judul</label>
                            <Form onChange={()=>{}} value={""} 
                            placeholder={"Contoh : Voting Claon Gubernur"} 
                            className={`mt-1 w-1/2`}/>
                    </div>
                    <div className="flex flex-col w-2/3">
                        <label className="text-sm">Kapan dimulai?</label>
                        <div className="inline-flex">
                            <ReactDatePicker 
                            locale={"id"}
                            showTimeSelect selected={startDate}
                            onChange={(date)=> date && setStartDate(date)}
                            dateFormat={"Pp"} 
                            minDate={new Date()} 
                            className={"w-full bg-zinc-100 py-2 px-3"}
                            />
                            <span className="text-sm text-center p-3"> Sampai</span>
                            <ReactDatePicker 
                            locale={"id"}
                            showTimeSelect selected={endDate}
                            onChange={(date)=> date && setEndDate(date)}
                            dateFormat={"Pp"} 
                            minDate={startDate} 
                            className={"w-full bg-zinc-100 py-2 px-3"}
                            />
                        </div>
                    </div>
                </div>
                {/* /detail vote  */}

                {/* Kandidat  */}
                <h3 className="font-medium text-xl mt-10">Kandidat</h3>
                <div className="grid gap-4 grid-cols-4 mt-5">
                    {candidates.map((candidate:Candidate, index:number)=>
                        <CandidateForm 
                            key={index} 
                            candidate={candidate} 
                            submitCandidate={submitCandidate}
                            removeCandidateForm={removeCandidateForm}
                        />
                    )}
                    <div className="w-1/3 flex flex-col items-center justify-center cursor-pointer bg-zinc-100 aspect-square text-zinc-400 hover:bg-black" onClick={() => addCandidateForm()}>
                        <PlusIcon className="w-1/3"/>
                    </div>                    
                </div>
                {/* /Kandidat  */}

                <div className="text-right mt-10">
                    <Button text="Buat Voting"/>
                </div>     
            </form>
        </div>
    </div>)
}
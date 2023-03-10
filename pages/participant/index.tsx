import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../components/Button";
import Form from "../../components/Form";
import { useSession } from "next-auth/react"
import RestrictedPage from "../../components/page/RestrictedPage"
import { showAlert } from "../../components/Alert";

export default function Participant(){
    const {data:session} = useSession()
    const [code, setCode] = useState("")

    if (!session) {
        return <RestrictedPage/>
    }

    const handlerSubmit = async () =>{
        if (code ===""){ 
            showAlert({title:"hmmzzz", message:"Tolong masukan kode yang benar"})       
            return 
        }

        await fetch("/api/vote/"+code,{
            method:"GET",
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.message && data.message ==="NOT_FOUND"){
                showAlert({title:"hmmzzz", message:"kode yang anda masukan salah"})   
                return
            }
            router.push("/participant/"+code)
            return
        })
    }
    const router = useRouter()


    return <div className="flex flex-col items-center justify-center h-screen space-y-5 container mx-auto">
        <Head>
            <title>Ikut Participant</title>
        </Head>

        <Image alt="participant" src={"/assets/org.png"}
        width={200}
        height={180}
        />

        <h1 className="text-3xl font-bold">Ikutan Voting</h1>
        <h2 className="w-1/3 text-center">
            Untuk ikutan voting, kamu harus memasukan kode voting yang sudah di berikan panitia/peyelenggara
        </h2>
        <Form placeholder="Masukan Kode Voting" className="w-1/3 mt-3" value={code} onChange={setCode}/>

        <Button onClick={handlerSubmit} text="lanjutkan" className="w-1/3"/>
        <button className="text-sm" onClick={()=> router.push("/")}>Kembali</button>
    </div>
}
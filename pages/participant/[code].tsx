import Head from "next/head"
import { useRouter } from "next/router"
import { showAlert } from "../../components/Alert"
import Button from "../../components/Button"
import CandidateItem from "../../components/CandidateItem"
import CountDown from "../../components/CountDown/CountDown"
import Menu from "../../components/Menu"
import { useSession } from "next-auth/react"
import RestrictedPage from "../../components/page/RestrictedPage"

export default function DetailVoting(){
    const {data:session} = useSession()

    if (!session) {
        return <RestrictedPage/>
    }
    const router = useRouter()
    const {code} = router.query
    return (
        <div className="container mx-auto">
            <Head>
                <title>Mulai Voting</title>
            </Head>

            <Menu/>

            <div>
                <h1 className="text-4xl mt-10 text-center">judul voting</h1>

                {/* timer */}
                {/* <div className="">

                </div> */}
                <CountDown className="mt-10"/>
                {/* /timer */}

                {/* kandidat */}
                <div className="mt-10 space-y-3 mx-auto w-2/3">
                    <CandidateItem/>
                </div>
                {/* /kandidat */}

                {/* Submit */}
                <div className="text-center mt-10">
                    <Button text="Kirim Vote Saya"
                    onClick={()=> showAlert({
                        title:"Kamu Yakin?",
                        message:"Kamu memilih kandidat no 1",
                        positiveBtnText:"Ya",
                        onPositiveClick(){
                            console.log('awaw')
                        }
                    })}/>
                </div>
                {/* /Submit */}
            </div>
        </div>
        )
}
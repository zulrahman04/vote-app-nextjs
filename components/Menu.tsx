import Image from "next/image"
import { useRouter } from "next/router"
import Button from "./Button"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Menu(){

    const router = useRouter()
    const { data:session } = useSession()

    return (
    <div className="flex justify-between py-5 ">
        <Image src={"/assets/logo-100.png"} width={50} height={50} alt='logo'
        onClick={()=>router.push("/")}
        className={"cursor-pointer"}/>
        {session ? <div className="space-x-3">
            <span>{session?.user?.name}</span>
            <Button text="Logout" onClick={signOut}/>
        </div>:<Button text="Login" onClick={signIn}/>}

    </div>
    )
}
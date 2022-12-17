import Image from "next/image"
import { Router,useRouter } from "next/router"
import Button from "./Button"

export default function Menu(){

    const router = useRouter()


    return <div className="flex justify-between py-5 ">
        <Image src={"/assets/logo-100.png"} width={50} height={50} alt='logo' 
        onClick={()=>router.push("/")}
        className={"cursor-pointer"}/>
        <Button text="Login" type="primary"/>
    </div>
}
import Head from "next/head";
import Image from "next/image";
import Button from "../Button";
import { signIn } from "next-auth/react"

export default function RestrictedPage(){
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-5 ">
            <Head>
                <title>Login duls</title>
            </Head>

            <Image alt="restricted" src={"/assets/org.png"} width={200} height={200} />

            <h1 className="text-4xl font-bold">Login Duls OK</h1>
            <h2 className="text-lg">Untuk mengakses halaman ini kamu harus login duls</h2>
            <Button onClick={signIn} text={"Login"}/>
        </div>
        )
}
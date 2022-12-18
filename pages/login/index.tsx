import Head from "next/head";
import Link from "next/link";
import { useSession, getProviders, signIn } from "next-auth/react"
import { useRouter } from "next/router";

export default function Login({providers} : any){
    const { data:session} = useSession()
    const router = useRouter()
    const googleIcon = (
        <svg
        className="mr-2 -ml-1 w-4 h-4 mt-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        data-prefix="fab"
        data-icon="google"
        role="img"
        >
            <path d="m472.4 213.9h-190.5c-8.4 0-15.2 6.8-15.2 15.2v60.9c0 8.4 6.8 15.2 15.2 15.2h107.3c-11.7 30.5-33.7 56-61.6 72.2l45.7 79.2c73.3-42.4 116.7-116.9 116.7-200.2 0-11.9-.9-20.4-2.6-29.9-1.4-7.3-7.7-12.6-15-12.6z" fill="#167ee6"/><path d="m256.5 396.6c-52.5 0-98.3-28.7-122.9-71.1l-79.2 45.6c40.3 69.9 115.8 116.9 202.1 116.9 42.4 0 82.3-11.4 116.8-31.3v-.1l-45.7-79.2c-21 12.2-45.2 19.2-71.1 19.2z" fill="#12b347"/><path d="m373.2 456.7v-.1l-45.7-79.2c-20.9 12.1-45.1 19.2-71 19.2v91.4c42.4 0 82.3-11.4 116.7-31.3z" fill="#0f993e"/><path d="m114.4 254.5c0-25.9 7.1-50.1 19.2-71l-79.2-45.6c-20 34.3-31.4 74.1-31.4 116.6s11.4 82.3 31.4 116.6l79.2-45.6c-12.2-20.9-19.2-45.1-19.2-71z" fill="#ffd500"/><path d="m256.5 112.4c34.2 0 65.7 12.2 90.2 32.4 6.1 5 14.9 4.6 20.4-.9l43.1-43.1c6.3-6.3 5.8-16.6-.9-22.4-41.1-35.8-94.6-57.4-152.8-57.4-86.3 0-161.8 47-202.1 116.9l79.2 45.6c24.6-42.4 70.4-71.1 122.9-71.1z" fill="#ff4b26"/><path d="m346.7 144.8c6.1 5 14.9 4.6 20.4-.9l43.1-43.1c6.3-6.3 5.8-16.6-.9-22.4-41.1-35.8-94.6-57.4-152.8-57.4v91.4c34.2 0 65.7 12.1 90.2 32.4z" fill="#d93f21"/></svg>
    )

    if (session) {
        router.push("/")
    }
    return(
        <div className="flex flex-col items-center justify-center container h-screen m-auto">
            <Head>
                <title>Login</title>
            </Head>

            <Link href={"/"} className="text-6xl mb-10 font-thin">
                Pear
            </Link>

            <div className="w-1/3">
                {Object.values(providers).map((provider:any)=>(
                    <button key={provider.id}
                     className="inline-flex justify-center item-center bg-white py-2 w-full border border-2 border-black font-medium hover:bg-black hover:text-white" onClick={()=>signIn(provider.id)}>
                        {provider.name === "Google" && googleIcon}
                        Login Dengan {provider.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders()
    return {
      props: { providers },
    }
  }
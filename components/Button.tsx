interface Props{
    text: string
    type?: 'primary' | 'secondary'
    className?:string
    onClick?: () => void
    isLoading ?: boolean
}

export default function Button(props: Props){
    return <button onClick={props.onClick}
    disabled={props.isLoading}
    className={`${props.type !== "secondary" && "bg-black border-2 border-black px-3 py-2 text-white hover:bg-zinc-800"}
    ${props.type === "secondary" && "bg-white border-2 border-black px-3 py-2 text-black hover:text-white hover:bg-black"}
    ${props.className}
    `}>
        {props.isLoading ? "Loading.." : props.text}
    </button>
}
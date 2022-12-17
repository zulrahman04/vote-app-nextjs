interface Props{
    onChange:(value:string) => void
    value: string
    placeholder: string
    className?: string
    type?:string
}

export default function Form(props : Props){
    return <input type={props.type ? props.type : "text"} 
    className={`border bg-zinc-100 py-2 px-3 ${props.className}`}
    placeholder={props.placeholder}
    onChange={(e) => props.onChange(e.target.value)}
    value={props.value} />
}
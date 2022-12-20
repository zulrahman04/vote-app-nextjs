import { CheckIcon } from "@heroicons/react/24/solid";

interface Props{
    name:string
    title?:string
    index:number
    percentage?:number
    onClick?: ()=> void
    isSelected:boolean
}

export default function CandidateItem(props:Props){
    return( 
        <div className="flex flex-row border border-zinc-100 p-5 rounded-md space-x-3 ">
            <div className="w-12 h-12 font-bold text-lg items-center flex justify-center bg-zinc-100 text-center">
                {props.index}
            </div>
            <div className="w-full">
                <h3 className="text-lg font-bold">{props.name}</h3>
                <p>{props.title}</p>
                <div className="flex flex-row items-center space-x-2">
                    {/* Bar */}
                    <div className="w-full h-1 bg-zinc-100 rounded-full">
                        <div className="h-1 bg-black rounded-full" style={{width : `${props.percentage}%`}}>
                        </div>
                    </div>
                    {/* /Bar */}

                    {/* Indicator */}
                    <p className="text-sm font-bold">{Intl.NumberFormat('en',{notation:"compact"}).format(props.percentage || 0 ) }%</p>
                    {/* /Indicator */}
                </div>
            </div>
            <div onClick={props.onClick} 
            className={`flex w-20 h-20 items-center justify-center cursor-pointer bg-zinc-100 rounded-md 
            ${props.isSelected ? 
            "bg-green-500 hover:bg-green-600 text-white":
            "bg-zinc-200 hover:bg-zinc-100"}`}>
                <CheckIcon className="w-7 h-7"/>
            </div>
        </div>
    )
}
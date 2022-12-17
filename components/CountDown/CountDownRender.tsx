import CountDownItem from "./CountDownItem"

interface Props{
    days: number
    hours: number
    minutes: number
    seconds: number
}


export default function CountDownRender(props : Props){
    return (
        <div className="flex flex-row mx-auto justify-center">
            <CountDownItem label="Hari" value={props.days}/>
            <CountDownItem label="Jam" value={props.hours}/>
            <CountDownItem label="Menit" value={props.minutes}/>
            <CountDownItem label="Detik" value={props.seconds}/>
        </div>
    )
}
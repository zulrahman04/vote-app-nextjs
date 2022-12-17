import Countdown, { CountdownRendererFn } from "react-countdown";
import CountDownRender from "./CountDownRender";

interface Props{
    className:string
}

export default function CountDown(props: Props){    
    
    const countDown : CountdownRendererFn =({
        days,
        hours,
        minutes,
        seconds
    })=>{
        return(
            <CountDownRender days={days} hours={hours} minutes={minutes} seconds={seconds}/>
        )
    }

    return (
        <div className={`text-center ${props.className}`}>
            <p>Voting akan dimulai pada:</p>
            <Countdown date={Date.now() + 100000000} renderer={countDown}/>
        </div>
    )
}
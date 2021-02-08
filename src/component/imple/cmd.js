import { useEffect, useState } from "react"

export default function Cmd(props) {   

    const [style,setStyle] = useState({optical:0})
    
    useEffect(()=>{
        if(props.view){
            setStyle({optical:1})
        }else{
            setStyle({optical:0})
        }
    },[])
    
    return(
        <>
        <div className="cmd_wrap" style={style}>
            <div className="cmd_top">

            </div>
            <div className="cmd_body">

            </div>
        </div>
        </>
    )
}
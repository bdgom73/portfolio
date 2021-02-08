import { useEffect,useState } from "react";
import Certificate from "./Certificate";
import Education from "./Education";
import Footer from "./Footer";
import Header from "./header";
import Introduce from "./Introduce";

export default function Page(props) {
    if(props.page === 0){ 
        return(
            <>
            <Header/>
            <Introduce/>
            <Education/>
            <Certificate/>
            {props.footer  ? (<><Footer/></>) : <></>}
            </>
        );
    }else if(props.page === 1){
        return(
            <>      
            <Header/>  
            <Education/>
            <Certificate/>
            <Introduce/>
            {props.footer ? (<><Footer/></>) : <></>}
            </>
        );
    }else if(props.page === 2){
        return(
            <> 
            <Header/>             
            <Certificate/>
            <Introduce/>
            <Education/>
            {props.footer  ? (<><Footer/></>) : <></>}
            </>
        );
        }
   
}
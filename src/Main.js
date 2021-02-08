import { useEffect, useState } from "react";
import App from "./App";
import Reg from "./component/imple/reg";
import {createTable} from "./db";
function Main() {
    const [page,setPage] = useState(0);

    useEffect(()=>{
        createTable("CREATE TABLE member(id integer primary key, uid, password)");
        createTable(`
        CREATE TABLE board(
            id integer primary key, 
            title, 
            content, 
            created,updated, 
            write,
            member_id,  
            FOREIGN KEY (member_id) REFERENCES member(id) ON UPDATE CASCADE)`);
    },[])
    return(
        <>
        {
            page === 0 ? <App onChangePage={()=>{
                setPage(1);
            }}/> : <Reg onChangePage={()=>{
                setPage(0);
            }}/>
        }
        </>
    );
}

export default Main;
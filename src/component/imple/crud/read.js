import { useContext, useState } from "react";
import { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { findAll, findJoinAll } from "../../../db";

export default function Read(props) {
    
    const [readData, setReadData] = useState([]);

    function getAllReadDataList(){
        
        findJoinAll("board",(rs)=>{
            setReadData(rs)
        }) 
    }
    useEffect(getAllReadDataList,[readData]);
    useEffect(()=>{
        props.cmd[1]([...props.cmd[0], `${new Date()} / CRUD TEST 페이지로 이동했습니다.`]);
    },[])
    let history = useHistory();

    return(
        <>
        <div className="readList_wrap">
            <div className="readTable">
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>title</th>
                        <th>writer</th>
                        <th>created</th>
                        <th>updated</th>
                    </tr>
                </thead>
                <tbody>        
                    {
                        readData.map((rd)=>{
                            return (
                                <>
                                 <tr key={rd.id} onClick={()=>{history.push(`/adm/read/${rd.id}/${rd.title}`)}}>
                                    <td>{rd.id}</td>
                                    <td>{rd.title}</td>
                                    <td>{rd.uid ? rd.uid : rd.write ? rd.write : "" }</td>
                                    <td>{rd.created}</td>
                                    <td>{rd.updated}</td>
                                </tr>
                                </>
                            );
                        })
                    }
                </tbody>
            </table>
            <div className="table-btn_tool">
                <button type="button" onClick={()=>{history.push("/adm/create")}}>CREATE</button>
            </div>
            </div>
        </div>
        </>
    );
}
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory, useLocation, useParams } from "react-router-dom"
import { AESDecrypt } from "../../../crypto";
import { deleteBoardById, findById } from "../../../db";

export default function Detail(props) {
    
    let params = useParams();
    const history = useHistory();
    const [cookie] = useCookies();
    const [bd,setBd] = useState({});
    const [isUser,setIsUser] = useState(false);
  
    function getDetailData() {
        const id = params.id;
        try{
            findById("board",id,(result)=>{
                setBd(result);
                const cid = cookie.uid;   
                if(cid && result){
                    const xid = AESDecrypt(cid);
                    if(xid === result.member_id) setIsUser(true);
                    else setIsUser(false);
                }
                if(!result){
                    alert("삭제되거나 존재되지않은 게시글입니다.");
                    history.push("/adm/read");
                }
               
            })
        }catch(error){
            alert("삭제되거나 존재되지않은 게시글입니다.");
            history.push("/adm/read");
        }  
    }
    useEffect(getDetailData,[]);


    function onDeleteHandler() {
        const id = params.id;
        deleteBoardById(id);
        history.push("/mi/adm/read");
    }
    if(bd){
        return(
            <>
            <div className="detail_wrap">
                <div className="detail">
                    <div className="detail_body">
                        <div className="detail_top">
                            <span className="detail_num">No.{bd.id}</span>
                            <div className="detail_title">{bd.title}</div>
                            <span className="detail_writer"><span>Writer</span> 🔹{bd.write ? bd.write : bd.uid}</span>    
                            <div className="detail_date">
                                <div>created | {bd.created}</div>
                                <div>updated | {bd.updated}</div>
                            </div>        
                        </div>
                        <pre>{bd.content}</pre>
                    </div>
                    {
                    isUser ? (
                        <div className="detail_control">
                            <button type="button" onClick={()=>{
                                history.push(`/mi/adm/update/${bd.id}`)
                            }}>UPDATE</button>
                            <button type="button" onClick={onDeleteHandler}>DELETE</button>
                        </div>
                    ) : <></>
                }
                </div>
               
               
            </div>
            </>
     )
    }else {
        return (
            <></>
        );
    }
    
   
}
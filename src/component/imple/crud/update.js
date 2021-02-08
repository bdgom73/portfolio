import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory, useLocation, useParams } from "react-router-dom"
import { AESDecrypt } from "../../../crypto";
import { findById, updateBoardById } from "../../../db";
import "../../../func";
export default function Update(props) {
    
    let params = useParams();

    const [cookie,setCookie] = useCookies();
    const [bd,setBd] = useState({});
    const [isUser,setIsUser] = useState(true);
  
    function getDetailData() {
        const id = params.id;
        findById("board",id,(result)=>{
            setBd(result);
            const cid = cookie.uid;   
            if(cid && result){
                const xid = AESDecrypt(cid);
                if(xid === result.member_id) setIsUser(true);
                else setIsUser(false);
            }else{
                alert("삭제되거나 존재되지않은 게시글입니다.");
                history.push("/mi/adm/read");
            }
        })
    }
    useEffect(getDetailData,[isUser]);

    let history = useHistory();
    useEffect(()=>{
        if(!(cookie.uid && isUser)) alert("작성자만 수정하거나 삭제할 수 있습니다.");
    },[isUser])

    function onChangeTitleValue(e) {
        setBd({...bd, title : e.target.value});
    }
    function onChangeContentValue(e) {
        setBd({...bd, content : e.target.value});
    }

    function onSubmitUpdateHandler(e) {
        e.preventDefault();
        const ud = {
            title : e.target[0].value,
            content : e.target[1].value,
            id : params.id,
            updated : new Date().format(new Date())
        }
        updateBoardById(ud,()=>{
            history.push(`/mi/adm/read/${bd.id}`)
        });
      
    }
    if(cookie.uid && isUser && bd){
        return(
            <>
            <div className="create_wrap">
                <form onSubmit={onSubmitUpdateHandler}>
                    <div className="form_data-Field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" value={bd.title} onChange={onChangeTitleValue}/>
                    </div>
                    <div className="form_data-Field">
                        <textarea id="content" value={bd.content} onChange={onChangeContentValue} wrap="hard"></textarea>
                    </div>
                    <input type="submit" value="Update"/>
                </form>
            </div>
            </>       
        )
    }else{   
        return(
            <>
            {history.push("/mi/adm")}
            </>
        );
        
       

    }
    
}
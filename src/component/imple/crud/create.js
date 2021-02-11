import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { AESDecrypt } from "../../../crypto";
import { insertSql, lastSqlId } from "../../../db";
import "../../../func";
export default function Create(props){

    const [cookie,setCookie] = useCookies();
    const history = useHistory();
    const onSubmitWrite=(e)=>{
        e.preventDefault();
        const writeData = {
            title : e.target[0].value,
            content : e.target[1].value,
            writer : e.target[2].value ? e.target[2].value : null,
            user : cookie.uid ? cookie.uid : null 
        }
        const now = new Date();
        if(cookie.uid){
            const id = AESDecrypt(cookie.uid);
            const sql = "INSERT INTO board(title,content,created,updated,member_id) values(?,?,?,?,?)";
            const arg = [writeData.title , writeData.content,now.format(new Date()),now.format(new Date()),id];
            insertSql(sql,arg,(result)=>{
                history.push(`/adm/read/${result}`)
            });
            
        }else{
            const sql = "INSERT INTO board(title,content,created,updated,write) values(?,?,?,?,?)";
            const arg = [writeData.title , writeData.content,now.format(new Date()),now.format(new Date()),writeData.writer];
            insertSql(sql,arg,(result)=>{
                history.push(`/adm/read/${result}`)
                props.cmd[1]([...props.cmd[0], `${new Date()} / ${result.id}번 게시글이 작성되었습니다.`]);
            });
        }
        
    }

    const [tl,setTl] = useState({color:"black"})
    
    return(
        <>
        <div className="create_wrap">
            <form onSubmit={onSubmitWrite}>
                <div className="form_data-Field">
                    <label htmlFor="title" className="titleLabel" style={tl}>Title</label>
                    <input type="text" id="title" placeholder="ex ) 제목입니다..." required onFocus={()=>{setTl({color: "#c4420f"})}} onBlur={()=>{setTl({color:"black"})}}/>
                </div>
                <div className="form_data-Field">
                    <label htmlFor="content">Content</label>
                    <textarea id="content" placeholder="내용을 입력해주세요" wrap="hard"/>
                </div>
                {
                    !cookie.uid ? (
                        <>
                        <div className="form_data-Field">
                            <label htmlFor="write">작성자</label>
                            <input type="text" required id="write" placeholder="ex ) kij"/>
                        </div>                       
                        </>
                    ) : (
                        <></>
                    )
                }
                <input type="submit" value="글쓰기"/>
            </form>
        </div>
        </>
    );
}
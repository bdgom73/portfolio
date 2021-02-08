import { useEffect, useState } from "react";
import crypto from "crypto-js";
import {insertData,findAll, findById, find, findByUserId} from "../../db";
import {AESDecrypt, AESEncrypt,confirmPassword} from "../../crypto";

export default function SignUp(props) {

    const [member,setMember] = useState([]);
    const [memo,setMemo] = useState();
    const onSubmitHanlder = (e)=>{   
        e.preventDefault();
        setMemo(`${new Date()} / 동일성 검사 시작.`);
        const id = e.target[0].value;
        const pw = e.target[1].value;
        const pw2 = e.target[2].value;  
        findByUserId("member",id,(value)=>{
            if(value){
                setMemo(`${new Date()} / 이미존재하는계정입니다..`);
            }else{
                if(pw === ""){
                    setMemo(`${new Date()} / 비밀번호를 입력하지 않았습니다.`);
                }else if(pw === pw2){    
                    const userInfo = {
                        id : id,
                        pw : AESEncrypt(pw,true)
                    }    
                    setMemo(`----${new Date()}---- 
                    \r\n ID : ${userInfo.id} 
                    \r\n PW : ${userInfo.pw} 
                    \r\n decodePW : ${pw} 
                    \r\n------------------------------------------------------------------------`);
                    insertData("INSERT INTO member(uid,password) values(?,?)",[userInfo.id,userInfo.pw],setMemo)    
                }else if(pw !== pw2){
                    setMemo(`${new Date()} / 두 암호가 일치하지 않습니다.`);
                }     
            }
        })
       
    }

    useEffect(()=>{
        if(memo)
        props.cmd[1]([...props.cmd[0],memo])
    },[memo])

    const [focus,setFocus] = useState({});

    const onFocusHandler = (e)=>{
        e.target.style.borderBottom = "2px solid #cc5858"
    }
    const onBlurHandler = (e)=>{
        e.target.style.borderBottom = "2px solid black"
    }
    return(
        <>
        <div className="signup_wrap" >
            <div className="signup-page">
            <h1>SIGNUP</h1>
            <div className="warming">연습용이므로 가상의 ID와 패스워드를 입력하세요.</div>
                <form onSubmit={onSubmitHanlder}>
                    <p>
                        <label htmlFor="id">ID</label>
                        <input type="text" id="id" required placeholder="ID를 입력해주세요." onFocus={onFocusHandler} onBlur={onBlurHandler}></input>
                    </p>
                    <p>
                        <label htmlFor="pw">PASSWORD</label>
                        <input type="password" id="pw" required placeholder="패스워드를 입력해주세요." onFocus={onFocusHandler}  onBlur={onBlurHandler}></input>
                    </p>
                    <p>
                        <label htmlFor="pw2">ConfirmPassword</label>
                        <input type="password" id="pw2" required placeholder="패스워드를 다시 입력해주세요." onFocus={onFocusHandler} onBlur={onBlurHandler}></input>
                    </p>           
                    <input type="submit" value="Register"/>
                </form>     
            </div>
        </div>
        </>
    );
}
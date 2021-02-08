import { useState } from "react";
import {findByUserId} from "../../db";
import {confirmPassword,AESDecrypt,AESEncrypt} from "../../crypto";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
export default function Login(props) {
    
    const [login, setLogin] = useState({});
    const [cookie,setCookie] = useCookies();
    let history = useHistory();
    function onSubmitHandler(e) {
        e.preventDefault();
        const logininfo = {
            id : e.target[0].value,
            pw : e.target[1].value
        }
        findByUserId("member",logininfo.id,(result)=>{
            if(result){
                if(confirmPassword(result.password, logininfo.pw)){
                    props.cmd[1]([...props.cmd[0],`${new Date()} / 로그인성공`]);
                    const idx = AESEncrypt(result.id.toString(),true);
                    setCookie('uid',idx,{path:"/mi"});
                    history.push("/mi/adm/read");
                }else{
                    props.cmd[1]([...props.cmd[0],`${new Date()} / 비밀번호가 틀렸습니다.`])
                }
            }else{
                props.cmd[1]([...props.cmd[0],`${new Date()} / 존재하지 않는 계정입니다.`])
            }
        });
    }
    return(
        <>
        <div className="Login_wrap">
            <div className="Login-page">
                <h1>LOGIN</h1>
                <form onSubmit={onSubmitHandler}> 
                    <p>
                        <label htmlFor="id">ID</label>
                        <input type="text" id="id" required placeholder="ID를 입력해주세요."></input>
                    </p>
                    <p>
                        <label htmlFor="pw">PASSWORD</label>
                        <input type="password" id="pw" required placeholder="패스워드를 입력해주세요."></input>
                    </p>
                    <input type="submit" value="LOGIN"/>
                </form>
            </div>      
        </div>
        </>
    );
}
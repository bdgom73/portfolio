import SignUp from "./Signup";
import { useEffect, useState } from "react";
import Login from "./Login";
import { IoApps } from 'react-icons/io5';
import { useCookies } from "react-cookie";
import { findById,findMemberById } from "../../db";
import { AESDecrypt } from "../../crypto";
import { NavLink, Route, Switch, useHistory } from "react-router-dom";
import Read from "./crud/read";
import Create from "./crud/create";
import Detail from "./crud/detail";
import Update from "./crud/update";

export default function Reg(props) {
    
    const [cmd,setCmd] = useState([]);
    const [style,setStyle] = useState({height:"100px"});
    const [cursor,setCursor] = useState("auto");
    const [he,setHe] = useState(0)
    const [cookie,setCookie,removeCookie] = useCookies(['uid']);


    useEffect(()=>{
        if(cookie.uid){          
            findById("member",AESDecrypt(cookie.uid),(value)=>{
                cmd.push(`${new Date()} / CMD창이 활성화되었습니다.
                \r\n✅현재 로그인 되어있습니다.
                \r\n===========로그인 정보===========
                \r\nid : ${value.id}
                \r\nuid : ${value.uid}
                \r\npw : ${value.password}
                \r\n==============================`);
                setCmd([...cmd ])
            })    
        }else if(!cookie.uid){
            setCmd([...cmd ,`${new Date()} /  CMD창이 활성화되었습니다. \r\n${new Date()} / 🔴 로그인 정보가 없습니다.`]); 
        }
    },[])

    const [isMouseDown,setIsMouseDown] = useState(false);

    const onMouseDownHandler = ()=>{
        setIsMouseDown(true);    
        setCursor("ns-resize")
    }
    const onMouseUpHandler = ()=>{
        setIsMouseDown(false);
        setCursor("default")
    }
    const onMouseMoveHandlerWindow = (e)=>{
        if(isMouseDown)
            setStyle({height: (window.innerHeight - e.pageY)+"px"})
          
        else{
            setStyle(style)
        }
    }
    useEffect(()=>{
        window.addEventListener("mouseup",onMouseUpHandler);
        const cmds = document.getElementById("cmd").style.height ;
        if(!isMouseDown){     
            window.removeEventListener('mousemove',onMouseMoveHandlerWindow)
            window.addEventListener("mousemove",()=>{setStyle({height:cmds})})
        }else{
            window.addEventListener("mousemove",onMouseMoveHandlerWindow);
        }
        
        
    },[isMouseDown])

    const [side,setSide] = useState(true)
    const [cmdSize,setCmdSize] = useState(true);
    let history = useHistory();

    const [f,setf]=useState(true); 
    function onClickHandler() {
        setf(!f);
    }
 
    const [user,setUser] = useState({});
    useEffect(()=>{
        if(cookie.uid){
            try{
                const idx = AESDecrypt(cookie.uid);
                findMemberById(idx,(result)=>{
                    setUser(result || {});
                })  
            }catch(error){
                console.log(error.toString())
            }
        } 
    },[cookie])

    return(
        <>
        <div className="reg_wrap" >
            
            <div className="regH" id="regH" style={f ? {top:"0px" } : {top:"-110px"}} >
                <div className="regH_underLine" onClick={onClickHandler}></div>
                <div className="home_move" onClick={()=>{history.push("/mi")}}>Home</div>
                <div className="login-check">
                        {
                            cookie.uid ? (
                                <>
                                <ul>
                                    <li><span>{user.uid}</span>의 계정으로 로그인중입니다.</li>
                                    <li onClick={()=>{
                                        removeCookie("uid",{path:"/mi"});  
                                    }}>LOGOUT</li>
                                </ul>
                                </>
                            ) : <><span>로그인 상태가 아닙니다.</span></>}
                    </div>  
                <div className="reg_header">
                    <div className="reg_logo" onClick={()=>{history.push("/mi/adm"); setCmd([...cmd, `${new Date()} / 메인페이지로 이동합니다.`])}}>
                        <span className="fl">S</span>ervice<span className="n1"><span className="fl">T</span>est</span>
                    </div>         
                </div>
                <div className="side_bar">    
                   
                    <div className="activeSide-bar">
                    {
                        side ? (<>
                            <ul> 
                                <li title="회원가입"><NavLink to="/mi/adm/signup" activeStyle={{color:"#c25353"}} onClick={()=>{setCmd([...cmd,`${new Date()} / 회원가입페이지로 이동합니다.`]);}}>Sign up</NavLink></li>
                                <li title="로그인"><NavLink to="/mi/adm/login" activeStyle={{color:"#c25353"}} onClick={()=>{setCmd([...cmd,`${new Date()} / 로그인페이지로 이동합니다.`]);}}>Login</NavLink></li>                    
                            </ul>
                        </>) : (<></>)
                    }                   
                    </div>
                    <div className="side_right">
                    <IoApps size={50} color={"#fff"}                   
                        onClick={()=>{setSide(!side)}} 
                    />  
                    </div>   
                              
                </div>
            </div>        
            <Switch>
                <Route path="/mi/adm" exact><RegHome cmd={[cmd,setCmd]}/></Route>
                <Route path="/mi/adm/login"><Login cmd={[cmd,setCmd]}/></Route>
                <Route path="/mi/adm/signup"><SignUp cmd={[cmd,setCmd]}/></Route>
                <Route path="/mi/adm/read" exact><Read cmd={[cmd,setCmd]}/></Route>
                <Route path="/mi/adm/create"><Create cmd={[cmd,setCmd]}/></Route>
                <Route path="/mi/adm/read/:id"><Detail cmd={[cmd,setCmd]}/></Route>
                <Route path="/mi/adm/update/:id"><Update cmd={[cmd,setCmd]}/></Route>
            </Switch>
            <div className="cmd_wrap" id="cmd" style={style} onMouseMove={(e)=>{
                setHe((e.clientY))
            }}>
            <div className="cmd_top" onMouseDown={onMouseDownHandler}>
                <span>CMD</span>
                <span onMouseDown={()=>{
                    setStyle({height:"36px",transition: "all .4s ease-in-out"});
                }}>❌</span>
            </div>
            <div className="cmd_body">
            {
                cmd.map(
                    (c,i)=>{   
                    return (
                        <>
                            <pre key={`${i}`}>{`${c.toString()}`}</pre>
                        </>
                    );
                })
                }
            </div>
        </div>
        </div>
        </>
    );
}

function RegHome(props) {
    let history = useHistory();
    return(
        <>
        <div className="reg-home_wrap">
            <div className="reg_u">
                <div className="reg_box" style={{backgroundImage:"url('/mp/login.png')"}} onClick={()=>{
                    history.push("/mi/adm/login");
                    props.cmd[1]([...props.cmd[0],`${new Date()} / 로그인페이지로 이동합니다.`]);
                }}><span>Login</span></div>
                <div className="reg_box" onClick={()=>{
                    history.push("/mi/adm/signup")
                    props.cmd[1]([...props.cmd[0],`${new Date()} / 회원가입페이지로 이동합니다.`]);
                }}><span>Sign Up</span></div>
                <div className="reg_box" onClick={()=>{
                    history.push("/mi/adm/read")
                    props.cmd[1]([...props.cmd[0],`${new Date()} / 게시글 작성페이지로 이동합니다.`]);
                }}><span>CRUD <br/> Test</span></div>
                <div className="reg_box"><span>Does not exist.</span></div>
            </div>
        </div>
        </>
    );
}
import SignUp from "./Signup";
import { useEffect, useState } from "react";
import Login from "./Login";
import { IoApps } from 'react-icons/io5';
import { useCookies } from "react-cookie";
import { createTable, deleteBoardById, findAll, findById,findMemberById } from "../../db";
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
                cmd.push(error.toString());
                setCmd(cmd);
            }
        } 
    },[cookie])

    const [mypage, setMypage] = useState(false);

    function checkSize(e) {
        let check = 0;
        for(let i = 0 ; i < (e.target.length - 1) ; i++){
            if(e.target[i].checked){
                check = check+1;
            }
        }
        return check;
    }

    const resetTableHandler = e=>{
        e.preventDefault();
        const check = checkSize(e);
        if(check > 0){
            if(window.confirm("선택한 테이블 데이터가 전부 초기화됩니다. \n ( 정말로 삭제하시겠습니까? )")){
                for(let i = 0 ; i < (e.target.length - 1) ; i++){
                    if(e.target[i].checked){
                        let sql = `DELETE FROM ${e.target[i].value}`
                        createTable(sql,[],()=>{
                            cmd.push(`${new Date()} / ${e.target[i].value} 테이블이 초기화 되었습니다.`);
                            setCmd(cmd)
                            if(e.target[i].value === "member")
                            removeCookie("uid",{path:"/"})
                        });      
                    }
                }
            }
        }else{
            alert("선택된 테이블이 없습니다.");
            cmd.push(`${new Date()} / 선택된 테이블이 없습니다.`);
            setCmd(cmd)
        }   
    }
    const onSubmitGetData = (e)=>{
        e.preventDefault();
        for(var i = 0 ; i < (e.target.length-1) ; i++){
            if(e.target[i].checked && e.target[i].value !== "all"){
                cmd.push(`${new Date()}---------\n`);
                findAll(e.target[i].value,(value)=>{
                    for(var k = 0 ; k < value.length ; k++){
                        cmd.push(JSON.stringify(value[k] )+"\n");
                    }
                    setCmd(cmd);
                })     
            }else if(e.target[i].checked && e.target[i].value === "all"){
                cmd.push(`${new Date()}---------\n`);
                findAll("member",(value)=>{
                    cmd.push(`MEMBER TABLE`);
                    for(var k = 0 ; k < value.length ; k++){
                        cmd.push(JSON.stringify(value[k]) +"\n");
                    }
                    setCmd(cmd);
                    findAll("board",(value2)=>{
                        cmd.push(`BOARD TABLE`);
                        for(var k = 0 ; k < value2.length ; k++){
                            cmd.push(JSON.stringify(value2[k]) +"\n");
                        }
                        setCmd(cmd);
                    })
                }) 
            }
        }
    }
    const [iconColor,setIconColor] = useState("#ffffff");
    useEffect(()=>{
        if(window.innerHeight <= 864){
            setIconColor("#222222");
        }else{setIconColor("#ffffff")}
    },[window.innerHeight])
    return(
        <>
        <div className="reg_wrap" >
            <div className="regH" id="regH" style={f ? {top:"0px" } : {top:"-110px"}} >
                <div className="home_move" onClick={()=>{history.push("/")}}>Home</div>
                <div className="login-check">
                        {
                            cookie.uid ? (
                                <>
                                <ul>
                                    <li>
                                        <span onClick={()=>{setMypage(!mypage); console.log(mypage)}} className="userId">{user.uid}</span>의 계정으로 로그인중입니다.
                                        {
                                            mypage ? (
                                                <>
                                                    <div className="mypage_wrap">
                                                        <div className="mypage">
                                                            <h1><span>W</span>eb <span>D</span>ataBase <span>M</span>anagement</h1>
                                                            <h2>테이블 초기화</h2>
                                                            <form onSubmit={resetTableHandler}>
                                                                <div className="checkbox_wrap">
                                                                    <label><input type="checkbox" name="table" value="member"/>Member Table</label>
                                                                    <label><input type="checkbox" name="table" value="board"/>Board Table</label> 
                                                                </div>
                                                                <input type="submit" value="reset"/>
                                                            </form>
                                                            <h2>값 가져오기</h2>
                                                            <form onSubmit={onSubmitGetData}>
                                                                <div className="checkbox_wrap">
                                                                    <label><input type="radio" name="table" value="member"/>Member Data</label>
                                                                    <label><input type="radio" name="table" value="board"/>Board Data</label>
                                                                    <label><input type="radio" name="table" value="all"/>All Data</label> 
                                                                </div>
                                                                <input type="submit" value="DB값 가져오기"/>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : <></>
                                        }
                                    </li>
                                    <li onClick={()=>{
                                        removeCookie("uid",{path:"/"});  
                                    }}>LOGOUT</li>
                                </ul>
                                </>
                            ) : <><span>로그인 상태가 아닙니다.</span></>}
                    </div>  
                <div className="reg_header">
                    <div className="reg_logo" onClick={()=>{history.push("/adm"); setCmd([...cmd, `${new Date()} / 메인페이지로 이동합니다.`])}}>
                        <span className="fl">S</span>ervice<span className="n1"><span className="fl">T</span>est</span>
                    </div>         
                </div>
                <div className="side_bar">    
                   
                    <div className="activeSide-bar">
                    {
                        side ? (<>
                            <ul> 
                                <li title="회원가입"><NavLink to="/adm/signup" activeStyle={{color:"#c25353"}} onClick={()=>{setCmd([...cmd,`${new Date()} / 회원가입페이지로 이동합니다.`]);}}>Sign up</NavLink></li>
                                <li title="로그인"><NavLink to="/adm/login" activeStyle={{color:"#c25353"}} onClick={()=>{setCmd([...cmd,`${new Date()} / 로그인페이지로 이동합니다.`]);}}>Login</NavLink></li>   
                                <li title="CRUDTEST"><NavLink to="/adm/read" activeStyle={{color:"#c25353"}} onClick={()=>{setCmd([...cmd,`${new Date()} / CRUD-TEST페이지로 이동합니다.`]);}}>CRUDTEST</NavLink></li>                 
                            </ul>
                        </>) : (<></>)
                    }                   
                    </div>
                    <div className="side_right">
                    <IoApps size={50} color={iconColor}                   
                        onClick={()=>{
                            setSide(!side);
                           
                        }}  
                    />  
                    </div>   
                              
                </div>
            </div>        
            <Switch>
                <Route path="/adm" exact><RegHome cmd={[cmd,setCmd]}/></Route>
                <Route path="/adm/login"><Login cmd={[cmd,setCmd]}/></Route>
                <Route path="/adm/signup"><SignUp cmd={[cmd,setCmd]}/></Route>
                <Route path="/adm/read" exact><Read cmd={[cmd,setCmd]}/></Route>
                <Route path="/adm/create"><Create cmd={[cmd,setCmd]} offHeader={()=>{setf(false)}}/></Route>
                <Route path="/adm/read/:id"><Detail cmd={[cmd,setCmd]}/></Route>
                <Route path="/adm/update/:id"><Update cmd={[cmd,setCmd]}/></Route>
            </Switch>
            
            <div className="cmd_wrap" id="cmd" style={style} onMouseMove={(e)=>{
                setHe((e.clientY))
            }}>
            <div className="cmd_top" onMouseDown={onMouseDownHandler}>              
                <span onMouseDown={()=>{
                    setStyle({height:"36px",transition: "all .4s ease-in-out"});
                }}>❌</span>
                <span>CMD</span>
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
                <div className="reg_box" style={{backgroundImage:"url('/login.png')"}} onClick={()=>{
                    history.push("/adm/login");
                    props.cmd[1]([...props.cmd[0],`${new Date()} / 로그인페이지로 이동합니다.`]);
                }}><span>Login</span></div>
                <div className="reg_box" style={{backgroundImage:"url('/signup.jpg')"}} onClick={()=>{
                    history.push("/adm/signup")
                    props.cmd[1]([...props.cmd[0],`${new Date()} / 회원가입페이지로 이동합니다.`]);
                }}><span>Sign Up</span></div>
                <div className="reg_box" style={{backgroundImage:"url('/crud.jpg')"}} onClick={()=>{
                    history.push("/adm/read")
                    props.cmd[1]([...props.cmd[0],`${new Date()} / 게시글 작성페이지로 이동합니다.`]);
                }}><span>CRUD <br/> Test</span></div>
                <div className="reg_box" style={{backgroundImage:"url('/exist.png')"}}><span>Does not exist.</span></div>
            </div>
        </div>
        </>
    );
}
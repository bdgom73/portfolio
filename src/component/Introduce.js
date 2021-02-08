import { useEffect, useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
export default function Introduce(props){

    const [onoff,setOnOff] = useState(false)
    const [screen, setScreen] = useState({backgroundColor : "black"});
    const [screenWrap, setScreenWrap] = useState({
        opacity : 0.95,backgroundImage:"url('/screen.png')",
        animation: "slide-in-bck-center 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940)"});
    const [op,setOp] =useState({display:"flex"})
    const [page,setPage] = useState(false);
    

    useEffect(()=>{
        setScreen(
            onoff ? {backgroundColor:"white"} : {backgroundColor : "black"}
        )
    },[onoff])
    return(
        <>
        
            <div className="introduce_wrap"  style={{backgroundImage : "url('/introbg.jpg')"}}>
            <div className="coting"></div>
            <div className="screen">
                <BrowserBody/> 
            </div>
                      
            </div>
        </>
    );
}

function BrowserBody() { 

    const [url , setUrl] = useState({
        url : "kij://myintroduct/profile",
        page : 0
    })

    const [search,setSearch] = useState(false);

    const searchHandler = ()=>{
        const search =  document.getElementById("search");
        if(search.value === "kij://myintroduct/language"){
            setUrl({
                url : "kij://myintroduct/language",
                page : 1
            });
        }else{
            setUrl({
                url : "kij://myintroduct/profile",
                page : 0
            })
        }
        setSearch(false)
    }

    const onChangeHandler = ()=>{
        const search =  document.getElementById("search");
        setUrl({
            ...url,
            url : search.value
        })
    }
   

    const onSearchClick = ()=>{
        setSearch(!search)
    }

    const getSearchContent =(e)=>{
        const searchText = e.target.innerText;
        const search =  document.getElementById("search");
        setUrl({
            ...url,
            url : searchText
        })
        setSearch(false)
    } 
    const [scroll,setScroll] = useState();
    const body = document.getElementById("browser_body");

    function onScroll() {
        setScroll(body.scrollTop);
    }

    return(
        <>
        <div className="bigScreen">                            
            <div className="browser">
                <div className="browser_top">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span>
                        <input id="search" type="text" value={url.url} onChange={onChangeHandler} onClick={onSearchClick}/>
                        {
                            search ? (
                            <div className="search_content">
                            <div>
                                <ul>
                                    <li onClick={getSearchContent}>kij://myintroduct/profile</li>
                                    <li onClick={getSearchContent}>kij://myintroduct/language</li>
                                </ul>
                            </div>
                            </div>
                            ) :<></>
                        }
                        <button type="button" onClick={searchHandler}>
                            <AiOutlineSearch size={20}/>
                        </button>
                    </span>         
                </div>
                <div className="browser_body" id="browser_body" onScroll={onScroll}>
                    {
                        url.page === 0 ? (<BrowserProfile/>) : 
                        url.page === 1 ? (<BrowserUseLanguage scroll={scroll}/>) : (<BrowserProfile/>)
                    } 
                </div>
            </div>
        </div>    
        </>
    );
}


function BrowserProfile() { 
    return(
        <>
            <div className="browser_body-title">Kim IlJOONG Profile</div>
            <div className="browser_content">
                <img src="/noimage.png" alt="photo"/>
                <div className="me_wrap">
                    <div className="me_body">
                        <span className="me_name"><span>Name</span>김일중 ( Kim IlJOONG )</span>
                        <span className="me_birthday"><span>BirthDay</span>1997.10</span>
                        <span className="me_age">Age<span>25</span></span>
                    </div>
            </div>
            </div>            
        </>
    );
}

function BrowserUseLanguage(props) { 

    const [f1, setf1] = useState({opacity : 0});
    const [f2, setf2] = useState({opacity : 0});
    const [f3, setf3] = useState({opacity : 0});

    const [b1,setb1] = useState({opacity : 0});
    const [b2,setb2] = useState({opacity : 0});
    const [b3,setb3] = useState({opacity : 0});
    useEffect(()=>{
        if(props.scroll > 300){
            setf1({opacity : 1,animation: "s_control 1s "});
            setf2({opacity : 1,animation: "s_control 2s "});
            setf3({opacity : 1,animation: "s_control 3s "});      
        }else{
            setf1({opacity : 0});
            setf2({opacity : 0});
            setf3({opacity : 0});      
        }
        if(props.scroll > 880){
            setb1({opacity:1,animation: "tilt-in-bottom-1 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"});
            setb2({opacity:1,animation: "tilt-in-bottom-1 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"});
            setb3({opacity:1,animation: "tilt-in-bottom-1 2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"});
        }else{
            setb1({opacity : 0});
            setb2({opacity : 0});
            setb3({opacity : 0});
        }
        
    },[props.scroll])
    return(
        <>
            <div className="browser_body-title">Language you are studying</div>
            <div className="browser_lang" id="browser_lang">
                <div className="me_useLanguage">
                    <div className="me_useLanguage-body" >
                        <h1><span>Front</span>-end</h1>
                        <div className="me-lang-info">
                            <div className="me_front">          
                                <img src="/html.png" alt="html" title="HTML"/>
                                <img src="/css.png" alt="css" title="CSS"/>
                                <img src="/react.png" alt="React" title="REACT" className="imgplus"/>
                            </div>  
                        </div>
                        <h1><span>Back</span>-end</h1>
                        <div className="me-lang-info">
                            <div className="me_front">          
                                <img src="/spring.png" alt="spring" title="spring"  style={f1}/>
                                <img src="/node.png" alt="node" title="node"  style={f2}/>
                                <img src="/db.png" alt="React" title="db" className="imgplus"  style={f3}/>
                            </div>   
                        </div>
                        <h2>
                            <span>Back-end</span>
                            DATA
                            <span>BASE</span>
                        </h2>
                        <div className="me-lang-info">
                            <div className="me_front">          
                                <img src="/mysql.png" alt="mysql" title="mysql" style={b1} />
                                <img src="/mongo.png" alt="mongo" title="mongo" className="imgplus" style={b2}/>
                                <img src="/h2.jpg" alt="h2" title="h2" className="imgplus" style={b3}/>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>            
        </>
    );
}
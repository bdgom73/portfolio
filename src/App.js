import Home from "./component/Home";

import "./scss/index.scss";
import { useHistory } from "react-router-dom";

import { useEffect, useState } from "react";
import Footer from "./component/Footer";
function App(props) {

  const history = useHistory();
  const [scroll,setScroll] = useState(0);
  const [footer,setFooter] = useState(false);
  const [headerView , setHeaderView] = useState(true);
  const [headerStyle,setHeaderStyle] = useState({top:"-100px"})

  const [lastScroll , setLastScroll] = useState(false);

  useEffect(()=>{
    setHeaderStyle({
      top: headerView ? "0px" : "-100px"
    })
  },[headerView])



  useEffect(()=>{
    // document.getElementsByClassName("education").id = "education"
    window.addEventListener("scroll",()=>{
      setScroll(window.scrollY);  
      setLastScroll(document.querySelector("html").scrollTop);
    })
   
    const height =  document.body.scrollHeight;
    if(scroll > ((height/3)-98) && scroll < ((height/3)+98)){
      window.scrollTo(0,(height/3))
    }
    if(document.getElementById("header")){
      if(window.scrollY===0 || window.scrollY === (height/3) || (window.scrollY === window.innerHeight*2+17 || window.scrollY === window.innerHeight*2)){
        document.getElementById("header").style.backgroundColor = "";  
      }  
      else document.getElementById("header").style.backgroundColor = "rgba(0,0,0,0.78)";
    }
    
  })



  function viewFooterHandler(e) { 
    const hscroll = Math.ceil(scroll);
    const bh = document.body.scrollHeight - window.innerHeight;
    if((hscroll === bh || hscroll === (bh+17)) && e.deltaY > 0){
      setFooter(true);
    }else{
      setFooter(false);
    }
  }

  return (
      <>
      <div className="container" id="container" onWheel={viewFooterHandler}>                        
        <Home footer={footer}/>
      </div>
      </>
  );
}

export default App;

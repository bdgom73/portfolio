import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {

  
    const [headerView , setHeaderView] = useState(true);
    const [headerStyle,setHeaderStyle] = useState({top:"-100px"})
  
  
    useEffect(()=>{
      setHeaderStyle({
        top: headerView ? "0px" : "-100px"
      })
    },[headerView])
  
    function onMouseEnterHandler() {
      setHeaderView(true) 
    }
  
  
    return(
        <header style={headerStyle} onMouseEnter={onMouseEnterHandler} id="header">
              <div className="header">
              <div className="title">
                MyIntroduce <span>myself</span>
              </div>
              <nav>
                  <ul>
                      <NavLink to="/" exact activeStyle={{borderBottom:"2px solid red"}}><li>Introduce</li></NavLink>
                      <NavLink to="/education" activeStyle={{borderBottom:"2px solid red"}}><li>Education</li></NavLink>
                      <NavLink to="/certificate" activeStyle={{borderBottom:"2px solid red"}}><li>Certificate</li></NavLink>    
                      <NavLink to="/adm" activeStyle={{borderBottom:"2px solid red"}}>Test</NavLink> 
                  </ul>
              </nav>
              </div>
            </header>
    );
}
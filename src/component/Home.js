import {  BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Certificate from "./Certificate";
import Details from "./Details";
import Education from "./Education";
import Footer from "./Footer";
import Header from "./header";
import Reg from "./imple/reg";
import SignUp from "./imple/Signup";
import Introduce from "./Introduce";
import Page from "./page";
import ScrollToTop from "./ScrollToTop";

export default function Home(props){

    return(
        <>
        <div className="app_wrap"> 
          <div className="main_wrap">   
          <ScrollToTop/>
            <Switch>
                <Route path="/" exact><Page page={0} footer={props.footer}/></Route>
                <Route path="/education"><Page page={1} footer={props.footer}/></Route>
                <Route path="/certificate"><Page page={2} footer={props.footer}/></Route>
                <Route path="/adm"><Reg/></Route>
            </Switch>

          </div>
      </div>
      </>
    );

}
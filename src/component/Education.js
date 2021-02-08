import { useEffect, useState } from "react";
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
export default function Education(props) {
    
    const [page,setPage] = useState(0);

    return(
        <>
        <div className="education_wrap" style={{backgroundImage:"url('/mp/edubg.jpg')"}}>   
            <div className="education" id="education">               
              <div className="edu1">
                    <div className="edu_middle">
                    <div className="edu_title">KIJ <span>Education</span></div>  
                        {
                            page === 0 ? <EduPageOne/> : 
                            page === 1 ? <EduPageTwo/> : <></>
                        }
                        {
                            page === 0 ? (
                                <div className="nextPage" onClick={()=>{setPage(1)}}>
                                     다음페이지
                                </div>
                            ) : 
                            page === 1 ? (
                                <div className="previousPage" onClick={()=>{setPage(0)}}>
                                     이전페이지
                                </div>
                            ) : <></>
                        }
                 
                    </div>  
                   
                    <div className="edu_footer_wrap">
                        <div className="edu_footer">
                            <h3>Home<span>page</span></h3>
                            <a href={ page === 0 ?  "https://www.kopo.ac.kr/index.do" : 
                            page === 1 ? "http://www.gitra.hs.kr/" : ""} target="_blank">
                            <h4>{ page === 0 ?  "https://www.kopo.ac.kr/index.do" : 
                            page === 1 ? "http://www.gitra.hs.kr/" : ""}</h4>    
                            </a>
                        </div>
                    </div>
                </div>
              </div> 
         
        </div>
        </>
    );
}

function EduPageOne() {
    return(
        <>
        <div className="edu_info" id="edu_info">
            <div className="edu_term">
                <h1>재학 <span>기간</span></h1>
                <span className="edu_content">2012. 03. 02 ~ 2019. 02. 25</span>
            </div>
            <div className="edu_term">
                <h1>소<span>재</span>지</h1>
                <span className="edu_content">인천</span>
            </div>
            <div className="edu_term">
                <h1>학교<span>명</span></h1>
                <span className="edu_content">한국폴리텍대학2 인천캠퍼스</span>
            </div>
            <div className="edu_term">
                <h1><span>전공</span></h1>
                <span className="edu_content">정보통신</span>
            </div> 
        </div>   
        <img src="/mp/campus.jpg" alt="캠퍼스" id="edupageOneImg"/>   
        </>
    );
}

function EduPageTwo() {
    return(
        <>
        <div className="edu_info">
            <div className="edu_term">
                <h1>재학 <span>기간</span></h1>
                <span className="edu_content">2012. 03. 02 ~ 2019. 02. 25</span>
            </div>
            <div className="edu_term">
                <h1>소<span>재</span>지</h1>
                <span className="edu_content">부천</span>
            </div>
            <div className="edu_term">
                <h1>학교<span>명</span></h1>
                <span className="edu_content">경기국제통상고등학교</span>
            </div>
            <div className="edu_term">
                <h1><span>전공</span></h1>
                <span className="edu_content">경영정보</span>
            </div> 
        </div>   
        <img src="/mp/high.jpg" alt="고등학교" id="edupageOneImg"/>   
        </>
    );
}
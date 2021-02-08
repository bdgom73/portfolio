import { useEffect, useState } from "react";
import { RiArrowDropRightFill } from 'react-icons/ri';
import { RiArrowDropLeftFill } from 'react-icons/ri';

export default function Certificate(props) {

    useEffect(()=>{
        document.documentElement.style.setProperty('--rote', "60deg");   
    })

    const [page,setPage] = useState(0);
    const [style,setStyle] = useState({});
    const [style2,setStyle2] = useState({});

    const[pagemove,setPagemove] = useState(true)
    const[pagemove2,setPagemove2] = useState(true)
    return(
        <>   
        <div className="certificate_wrap" style={{backgroundImage:"url('/mp/office.jpg')"}}>
            <div className="certificate">
                <div className="card_wrap">
                    <div className="card">  
                    <div className="card_next"></div>   
                    <div className="card_pre"></div>     
                    <div className="card_right" style={style} id="card_right" onAnimationEnd={()=>{setStyle({}); setPagemove2(true)}}>    
                    <div className="care_bg"></div>        
                            {
                                page === 0 && pagemove2? <Card
                                    title={"정보통신산업기사"}
                                    date={"2019.05.31"}
                                    issuer={"한국방송통신전파진흥원"}
                                    src={"/mp/kbt.jpg"}
                                    page={page}
                                    onClick={()=>{
                                        if(page >= 0 && page < 2){
                                            setPage(page+1);
                                            setStyle({animation: "slide-rotate-mid2 0.3s"})        
                                            setPagemove2(false)    
                                        }  
                                    }}
                                /> :
                                page === 1 && pagemove2? <Card
                                    title={"정보처리기능사"}
                                    date={"2017.03.29"}
                                    issuer={"한국산업인력공단"}
                                    src={"/mp/noimage.png"}
                                    page={page}
                                    onClick={()=>{
                                        if(page >= 0 && page < 2){
                                            setPage(page+1);
                                            setStyle({animation: "slide-rotate-mid2 0.3s"})        
                                            setPagemove2(false)    
                                        }  
                                    }}
                                /> : 
                                page === 2 && pagemove2 ?
                                <Card
                                    title={"워드프로세서"}
                                    date={"2014.10.31"}
                                    issuer={"대한상공회의소"}
                                    src={"/mp/noimage.png"}
                                    page={page}
                                    onClick={()=>{
                                        if(page >= 0 && page < 2){
                                            setPage(page+1);
                                            setStyle({animation: "slide-rotate-mid2 0.3s"})        
                                            setPagemove2(false)    
                                        }  
                                    }}
                                />  :<></>        
                            }
                        </div>
                        <div className="card_left" style={style2} onAnimationEnd={()=>{
                            setStyle2({});
                            setPagemove(true)
                        }}>
                        <div className="care_bg2" onClick={()=>{
                        if(page >= 1 && page < 3){
                            setPage(page-1);
                            setStyle2({animation: "slide-rotate-mid3 0.3s"}) 
                            setPagemove(false)
                        }
                    
                        }}></div>  
                                <div className="cr_text" onClick={()=>{
                        if(page >= 1 && page < 3){
                            setPage(page-1);
                            setStyle2({animation: "slide-rotate-mid3 0.3s"}) 
                            setPagemove(false)
                        }                   
                        }}>
                        {
                            pagemove ? (
                             <>
                             <h1><RiArrowDropLeftFill color={"#212249"} size={100}/> 주 의 사 항 <RiArrowDropRightFill color={"#212249"} size={100}/></h1>
                             <ol>
                                 <li>국가기술자격증은 관계자의 요청이 있을 때에는 제시해야 합니다.</li>
                                 <li>국가기술자격취득자는 취업 중인 사업체 등에 변동이 있을 때에는 이의 정정을 요청해야 합니다.</li>
                                 <li>국가기술자격증을 타인에게 대여하면 국가기술자격법 제16조의 규정에 의거 1년 이하의 징역 또는 1천만원 이하의 벌금형을 받게 되며, 
                                     당해 국가기술자격은 취소 또는 3년 이내의 범위에서 정지됩니다. 
                                     국가기술자격증을 대여받은자 또한 국가기술자격법 제27조(양벌규정)에 의거 동일한 처벌을 받게되니 주의하시기 바랍니다.
                                 </li>
                                 <li>국가기술자격증을 타인에게 대여하면 국가기술자격법 제16조의 규정에 의거 1년 이하의 징역 또는 1천만원 이하의 벌금형을 받게 되며, 
                                     당해 국가기술자격은 취소 또는 3년 이내의 범위에서 정지됩니다. 
                                     국가기술자격증을 대여받은자 또한 국가기술자격법 제27조(양벌규정)에 의거 동일한 처벌을 받게되니 주의하시기 바랍니다.
                                 </li>
                             </ol>
                             </>
                            ) : (
                                <></>
                            )
                        }
                            </div>
                        </div>
                    
                    </div>
                </div>
               
            </div>
        </div>
        </>
    );
}
function Card(props) {  

    return(                     
            <div className="cl_text" onClick={props.onClick}>
            <h1>취득 국가기술 자격증 현황</h1>
            <img src="/mp/noimage.png" alt="avatars"/>
            <ul>
                <li>자격번호 : <span className="mosaic">#{(Math.round(Math.random()*100*100*100))}</span></li>
                <li>자격종목 : <span>{props.title}</span></li>
                <li>성 명 : 김 일 중</li>
                <li>생년월일 : 1997.10</li>
                <span>위 사람은 위의 국가 기술 자격증을 취득하였음.</span>
                <li>취득일자 : {props.date}</li>
                <span className="lastText">
                    발행기관 
                    <span>
                        {props.issuer}
                        <img src={props.src} alt="logo"/>
                    </span>
                </span>
            </ul>
        </div> 
    );
}
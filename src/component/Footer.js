export default function Footer(props) {
    

    return(
        <>
        <div className="footer_wrap">
            <footer>
                <div className="footer">
                    <ul>
                        <li>Email : <span>bdgom73@naver.com</span></li>
                        <li>Github : <span>https://github.com/bdgom73</span></li>
                        <li>Home : <span>https://주소</span></li>
                    </ul>
                    <ul className="middleLine">
                        <li>개인정보 처리방침</li>
                        <li>홈페이지 이용약관</li>
                        <li>참고사이트</li>
                    </ul>
                </div>
                <div className="copylight">&copy;Kim IlJoong / bdgom73@naver.com  </div>
            </footer>
        </div>
        </>
    );
}
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-all">
      <div className="footer-top">
        <div className="footer-top-left">
          <div className="footer-top-left-link">
            <a>공지사항</a>
          </div>
          <div className="footer-top-left-link">
            <a>회사소개</a>
          </div>
          <div className="footer-top-left-link">
            <a>인재채용</a>
          </div>
          <div className="footer-top-left-link">
            <a>매장안내</a>
          </div>
          <div className="footer-top-left-link">
            <a>쇼핑몰 이용약관</a>
          </div>
          <div className="footer-top-left-link">
            <a>멤버십 이용약관</a>
          </div>
          <div className="footer-top-left-link">
            <a>개인정보처리방침</a>
          </div>
        </div>
        <div className="footer-top-right">
          <div>
            <img src={`${process.env.PUBLIC_URL}/페이스북.png`} alt="facebook" id="facebooklogo" className="footer-img" />
          </div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/유튜브.png`} alt="youtube" id="youtubelogo" className="footer-img" />
          </div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/인스타그램.png`} alt="instar" id="instarlogo" className="footer-img" />
          </div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/트위터.png`} alt="twitter" id="twitterlogo" className="footer-img" />
          </div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/카카오톡.png`} alt="kakaotalk" id="kakaotalklogo" className="footer-img" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <div className="footer-bottom-left-left">
            <span className="footer-logo">PLAMODEL FACTORY</span>
          </div>
          <div className="footer-bottom-left-right">
            <p>법인명: 프라모델팩토리주식회사 | 주소: (00000) 천안 동남구 대흥로 255 (대흥동, 화일빌딩) 3층</p>
            <p>대표이사: 황영진 | 사업자등록번호: 000-00-00000 | 통신판매업신고: 제0000-천안동남구-0000호</p>
            <p>이메일문의: as@plamodelfactory.com | 프라모델팩토리: mall@plamodelfactory.com</p>
            <p>프라모델팩토리의 모든 콘텐츠는 무단 도용 시 법적인 제재를 받을 수 있습니다.</p>
            <p>PlaModelFactory ALL RIGHTS RESERVED.</p>
          </div>
        </div>
        <div className="footer-bottom-right">
          <div className="footer-bottom-right-top">
            <h3>고객센터 : 0000-0000</h3>
            <p>전화문의 - 평일 9:00 ~ 18:00 / 점심시간 12:30 ~ 13:30 ( 토,일및법정공휴일휴무 )</p>
          </div>
          <div className="footer-bottom-right-bottom">
            <button className="footer-btn">고객센터 바로가기</button>
            <button className="footer-btn">1:1 문의 바로가기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "../home/home.css";

const Home = () => {
    return (
        <div className="home-all">
            <Header />
            <div className="homeContainer">
                <div className="home-mainimg">
                </div>
                <div className="home-hashtag">
                    <span className="hashtag">#마감임박! 종료예정 예약상품</span><span className="hashtag">#누구나 갖고싶은 프라모델</span><span className="hashtag">#시선집중! NEW 예약상품</span><span className="hashtag">#취향저격 프라모델</span>
                </div>
                <div className="home-Recommendation">
                    <div id="Recommendation1"></div>
                    <div id="Recommendation2"></div>
                    <div id="Recommendation3"></div>
                    <div id="Recommendation4"></div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Menubar from "../../components/header/Menubar";
import "../home/home.css";

const images = [
    'https://cdn.bnkrmall.co.kr/live/data/base/editor/20240131/62e451baa47a42a29028d78b3bc034c9.jpg',
    'https://cdn.bnkrmall.co.kr/live/data/base/banner/4d4d55ba38df40278d9eb158fb7e0850.jpg?resize=2880&quality=70',
    'https://cdn.bnkrmall.co.kr/live/data/base/banner/c433df08b64a40e58a15fd36c6b6ea24.jpg?resize=2880&quality=70',
    'https://cdn.bnkrmall.co.kr/live/data/base/banner/2234fd07aa0448bbb39984d33e4ababc.jpg?resize=2880&quality=70',
    'https://cdn.bnkrmall.co.kr/live/data/base/banner/ce359a04c4a04e8f9708dd6a96f612df.jpg?resize=2880&quality=70'
];

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const goToPreviousImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
    };

    const goToNextImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="home-all">
            <Header />
            <Menubar />
            <div className="homeContainer">
                <div className="home-mainimg">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`슬라이드 ${index}`}
                            className={`slideshow-image ${index === currentImageIndex ? 'active' : ''}`}
                        />
                    ))}
                    <button className="previous-button" onClick={goToPreviousImage}>‹</button>
                    <button className="next-button" onClick={goToNextImage}>›</button>
                    <div className="dots">
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                                onClick={() => goToImage(index)}
                            ></span>
                        ))}
                    </div>
                </div>
                <div className="home-hashtag">
                    <span className="hashtag">#마감임박! 종료예정 예약상품</span>
                    <span className="hashtag">#누구나 갖고싶은 프라모델</span>
                    <span className="hashtag">#시선집중! NEW 예약상품</span>
                    <span className="hashtag">#취향저격 프라모델</span>
                </div>
                <div className="home-recommendation">
                    <div className="recommendation-item" id="recommendation1">
                        <img src="https://cdn.bnkrmall.co.kr/live/data/base/goods/middle/20240328/396fe3c8e8584a60a59142cc0b180cfe.jpg?resize=550&quality=70" alt="Recommendation 1" />
                        <p>나루토 질풍전</p>
                        <p>23,000원</p>
                    </div>
                    <div className="recommendation-item" id="recommendation2">
                        <img src="https://cdn.bnkrmall.co.kr/live/data/base/goods/middle/20240408/df837dea22e74cc9a76327bc251db3fb.jpg?resize=550&quality=70" alt="Recommendation 2" />
                        <p>S.H.피규아트 오공 블랙</p>
                        <p>43,200원</p>
                    </div>
                    <div className="recommendation-item" id="recommendation3">
                        <img src="https://cdn.bnkrmall.co.kr/live/data/base/goods/middle/20240510/68e4144e08f94b4582aecc6a141a60ec.jpg?resize=550&quality=70" alt="Recommendation 3" />
                        <p>초합금 루빅스 큐브</p>
                        <p>128,700원</p>
                    </div>
                    <div className="recommendation-item" id="recommendation4">
                        <img src="https://cdn.bnkrmall.co.kr/live/data/base/goods/middle/20240512/e93477da95554708a4e280c0f0dd8afe.jpg?resize=550&quality=70" alt="Recommendation 4" />
                        <p>DX초합금혼 메카고질라 1974</p>
                        <p>514,800원</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
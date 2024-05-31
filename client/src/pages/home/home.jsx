import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Menubar from "../../components/header/Menubar";
import { useNavigate } from "react-router-dom";
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
    const [recommendations, setRecommendations] = useState([]);
    const [newProductRecommendations, setNewProductRecommendations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${apiUrl}/products`);
                const products = response.data;
                const shuffled = products.sort(() => 0.5 - Math.random());
                setRecommendations(shuffled.slice(0, 5));

                // isNewProduct가 true인 상품들 중에서 랜덤으로 4개 선택
                const newProducts = products.filter(product => product.isNewProduct);
                const shuffledNewProducts = newProducts.sort(() => 0.5 - Math.random());
                setNewProductRecommendations(shuffledNewProducts.slice(0, 4));
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        };

        fetchRecommendations();
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

    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    };

    const handleCategorypokemon = () => {
        navigate("/pokemonList")
    }

    const handleCategorydigimon = () => {
        navigate("/digimonList")
    }

    const handleCategorygundam = () => {
        navigate("/gundamList")
    }

    const handleCategoryhexagear = () => {
        navigate("/hexaGearList")
    }

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
                <div className="home-newProduct-desc">
                    <h1>NEW! 화제의 <span id="home-newProduct-desc-new">신상품</span></h1>
                </div>
                <div>
                    <div className="home-new-products">
                        {newProductRecommendations.map((product, index) => (
                            <div key={index} className="new-product-item" onClick={() => handleProductClick(product._id)}>
                                <img src={product.photos[0]} alt={`New Product ${index + 1}`} id="home-new-product-img" />
                                <p>{product.productName}</p>
                                <p>{new Intl.NumberFormat('ko-KR').format(product.price)}원</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="home-recommendation-category">
                    <div className="home-recommendation-category-pokemon" onClick={handleCategorypokemon}>
                    </div>
                    <div className="home-recommendation-category-digimon" onClick={handleCategorydigimon}>
                    </div>
                    <div className="home-recommendation-category-gundam" onClick={handleCategorygundam}>
                    </div>
                    <div className="home-recommendation-category-hexagear" onClick={handleCategoryhexagear}>
                    </div>
                </div>
                <div className="home-hashtag">
                    <span className="hashtag">#마감임박! 종료예정 예약상품</span>
                    <span className="hashtag">#누구나 갖고싶은 프라모델</span>
                    <span className="hashtag">#시선집중! NEW 신상품</span>
                    <span className="hashtag">#취향저격 프라모델</span>
                </div>
                <div className="home-recommendation">
                    {recommendations.map((product, index) => (
                        <div key={index} className="recommendation-item" onClick={() => handleProductClick(product._id)}>
                            <img src={product.photos[0]} alt={`Recommendation ${index + 1}`} id="home-recommendation-img" />
                            <p>{product.productName}</p>
                            <p>{new Intl.NumberFormat('ko-KR').format(product.price)}원</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;

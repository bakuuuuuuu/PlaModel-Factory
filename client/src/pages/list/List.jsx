import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Menubar from "../../components/header/Menubar";
import "../list/list.css";

const List = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${apiUrl}/products`);
                setProducts(response.data);
            } catch (error) {
                console.error("There was an error fetching the products!", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <Header />
            <Menubar />
            <div className="productListContainer">
                <div className="productList-content-top">
                    <div className="productList-content-img">
                    </div>
                </div>
                <div className="productList-content-middle">
                    <div className="productList-content-middle-position">
                        <div className="productList-content-middle-top">
                            <h4>건담 프라모델</h4>
                        </div>
                        <div className="productList-content-middle-bottom">
                            <div>
                                <button className="productList-filterbtn">인기도순</button> <span className="filter-text">|&nbsp;</span>
                            </div>
                            <div>
                                <button className="productList-filterbtn">최신등록순</button> <span className="filter-text">|&nbsp;</span>
                            </div>
                            <div>
                                <button className="productList-filterbtn">낮은가격순</button> <span className="filter-text">|&nbsp;</span>
                            </div>
                            <div>
                                <button className="productList-filterbtn">높은가격순</button> <span className="filter-text">|&nbsp;</span>
                            </div>
                            <div>
                                <button className="productList-filterbtn">할인율순</button> <span className="filter-text">|&nbsp;</span>
                            </div>
                            <div>
                                <button className="productList-filterbtn">리뷰많은순</button> <span className="filter-text">|&nbsp;</span>
                            </div>
                            <div>
                                <button className="productList-filterbtn">평점높은순</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="productList-content-bottom">
                    <div className="productList-content-bottom-products">
                        {products.map((product) => (
                            <div key={product._id} className="productList-content-bottom-product">
                                <img src={product.photos[0]} alt={product.productName} />
                                <h5>{product.productName}</h5>
                                <p>{product.rating}</p>
                                <p>{product.category}</p>
                                <p>{product.type}</p>
                                <p>{product.price}원</p>
                                <p>{product.inventory}개</p>
                                <p>{product.manufacturer}</p>
                                <p>{product.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
};

export default List;

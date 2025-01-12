import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";

import Header from "../Header";
import Nav from "../Nav";

import "../../../css/ItemList.css";
import "../../../css/Pagination.css";
import "../../../css/BestShopItemList.css";

function BestShopItemList({ isLogin, setIsLogin }) {

    const location = useLocation();
    const site = location.state.site;
    const size = 100;
    const [title, setTitle] = useState("");
    const clickedSite = useRef(site);

    console.log(site);
    // setClickedSite(site);

    const [product, setProduct] = useState([
        {
            id: "상품명",
            score: "이미지URL",
            site: "상품 가격(원)",
            prdName: "상품 가격(원)",
            webUrl: "대분류카테고리",
            price: "소분류카테고리",
            purchase: 0,
            cat: "사이트",
            subcat: "",
            imgSrc: "",
        },
    ]);

    useEffect(() => {
        axios
            .get(`/bot/today-best`, {
                params: {
                    site: `${site}`,
                    size: `${size}`
                },
                headers: {
                    "x-access-token": localStorage.getItem("access_token")
                }
            })
            .then(function(response) {
                console.log(response.data.result.content);

                setTitle(`${site} Top 100`);
                setProduct(response.data.result.content);
        
                document.getElementById("kakao").style.color = "#222222";
                document.getElementById("kakao").style.fontWeight = "400";
        
                document.getElementById(site).style.color = "#FF6928";
                document.getElementById(site).style.fontWeight = "700";
            })
            .catch(function(error) {
                alert("error");
            });
    }, []);

    const clickSortBtnHandler = (e) => {

        console.log("1", clickedSite, document.getElementById(clickedSite.current));
        document.getElementById(clickedSite.current).style.color = "#222222";
        document.getElementById(clickedSite.current).style.fontWeight = "400";

        // setClickedSort(sortValue);        
        clickedSite.current = e.target.id;

        document.getElementById(e.target.id).style.color = "#FF6928";
        document.getElementById(e.target.id).style.fontWeight = "700";

        axios
            .get(`/bot/today-best`, {
                params: {
                    site: `${clickedSite.current}`,
                    size: `${size}`
                },
                headers: {
                    "x-access-token": localStorage.getItem("access_token"),
                },
            })
            .then(function(response) {
                setTitle(`${clickedSite.current} Top 100`);
                setProduct(response.data.result.content);
            })
            .catch(function(error) {
                alert("상품을 정렬하지 못했습니다.");
                console.log(error);
            });
    };

    const handlePageChange = async (Page) => {
        // axios
            // .get(`/search/collections/${themeIdx}`, {
            //     params: {
            //         size: `${size}`,
            //         page: `${page.current}`,
            //     },
            //     headers: {
            //         "x-access-token": localStorage.getItem("access_token"),
            //     },
            // })
            // .then(function(response) {
            //     setTitle(response.data.result.title);
            //     setProduct(response.data.result.result.content);
            // })
            // .catch(function(error) {
            //     alert("현재 페이지의 특가 상품을 가져올 수 없습니다.");
            // });
    };

    return (
        <div>
            <Header setIsLogin={setIsLogin} isLogin={isLogin} />
            <Nav />
            <div className="ItemList bestshop">
                <div className="msg">
                    <h2>🏆 {title} 🏆</h2>
                </div>
                <div className="sort-group">
                    <button
                        className="sort-btn"
                        id="kakao"
                        onClick={clickSortBtnHandler}
                    >
                        kakao
                    </button>
                    <button
                        className="sort-btn"
                        id="11번가"
                        onClick={clickSortBtnHandler}
                    >
                        11번가
                    </button>
                    <button
                        className="sort-btn"
                        id="홈플러스"
                        onClick={clickSortBtnHandler}
                    >
                        홈플러스
                    </button>
                </div>
                <div className="itemList">
                    {product && product.length > 0 ? (
                        product.map((data, index) => (
                            <a
                                href={data.webUrl}
                                className="item-link"
                                target="_blank"
                                key={`link-${data.prdName}`}
                            >
                                <div className="best-index">{
                                index === 0 ? "🥇" : 
                                index === 1 ? "🥈" :
                                index === 2 ? "🥉" : index+1}</div>
                                <div
                                    className="list-item"
                                    key={`상품목록${index + 1}`}
                                >
                                    <div className="item-img">
                                        {data.imgSrc === null ? (
                                            <img
                                                src={
                                                    process.env.PUBLIC_URL +
                                                    "/img/no-img.png"
                                                }
                                                alt="Item"
                                                className="item-img"
                                            />
                                        ) : (
                                            <img
                                                src={data.imgSrc}
                                                alt="Item"
                                                className="item-img"
                                            />
                                        )}
                                    </div>

                                    <div className="item-info">
                                        <div>
                                            <strong className="item-name">
                                                {data.prdName}
                                            </strong>
                                            <div className="item-price">
                                                {data.price.toLocaleString()} 원
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-desc">
                                        <div>
                                            <span>카테고리</span>
                                            <span>
                                                {data.cat}&gt;
                                                <br />
                                                {data.subcat}
                                            </span>
                                        </div>
                                        <div>
                                            <span>구매횟수</span>
                                            <span>{data.purchase}</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))
                    ) : (
                        <div>검색 결과가 없습니다.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BestShopItemList;

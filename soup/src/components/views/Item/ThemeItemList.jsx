import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";

import Header from "../Header";
import Nav from "../Nav";

import "../../../css/ItemList.css";
import "../../../css/SubCategoryList.css";
import "../../../css/Pagination.css";

function ThemeItemList({ isLogin, setIsLogin }) {
    const [size, setSize] = useState("30");
    const [sort, setSort] = useState("purchase,desc");
    const [title, setTitle] = useState("");
    const page = useRef(0);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [clickedSort, setClickedSort] = useState("purchase,desc");

    const location = useLocation();
    const themeIdx = location.state.themeIdx;

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
        page.current = 0;
        axios
            .get(`/search/collections/${themeIdx}`, {
                params: {
                    size: `${size}`,
                    page: `${page.current}`,
                },
                headers: {
                    "x-access-token": localStorage.getItem("access_token"),
                },
            })
            .then(function(response) {
                setTitle(response.data.result.title);
                setProduct(response.data.result.result.content);
                setTotalElements(response.data.result.result.totalElements);
                setTotalPages(response.data.result.result.totalPages);
            })
            .catch(function(error) {
                alert("error");
            });
    }, [themeIdx]);

    const clickSortBtnHandler = (e) => {
        const sortValue = e.target.id;

        document.getElementById(clickedSort).style.color = "#222222";
        document.getElementById(clickedSort).style.fontWeight = "400";

        setClickedSort(sortValue);
        setSort(sortValue);

        document.getElementById(e.target.id).style.color = "#FF6928";
        document.getElementById(e.target.id).style.fontWeight = "700";

        axios
            .get(`/search/collections/${themeIdx}`, {
                params: {
                    size: `${size}`,
                    page: `${page.current}`,
                },
                headers: {
                    "x-access-token": localStorage.getItem("access_token"),
                },
            })
            .then(function(response) {
                setTitle(response.data.result.title);
                setProduct(response.data.result.result.content);
                setTotalElements(response.data.result.result.totalElements);
                setTotalPages(response.data.result.result.totalPages);
            })
            .catch(function(error) {
                alert("상품을 정렬하지 못했습니다.");
                console.log(error);
            });
    };

    const handlePageChange = async (Page) => {
        page.current = Page - 1;
        axios
            .get(`/search/collections/${themeIdx}`, {
                params: {
                    size: `${size}`,
                    page: `${page.current}`,
                },
                headers: {
                    "x-access-token": localStorage.getItem("access_token"),
                },
            })
            .then(function(response) {
                setTitle(response.data.result.title);
                setProduct(response.data.result.result.content);
            })
            .catch(function(error) {
                alert("현재 페이지의 특가 상품을 가져올 수 없습니다.");
            });
    };

    return (
        <div>
            <Header setIsLogin={setIsLogin} isLogin={isLogin} />
            <Nav />
            <div className="ItemList">
                <div className="msg">
                    <h3>“ {title} ”</h3>
                    <span>
                        {" "}
                        테마 상품이{" "}
                        <strong style={{ color: "#FF6928", fontSize: "18px" }}>
                            {totalElements}
                        </strong>
                        개 검색되었습니다.
                    </span>
                </div>
                <div className="sort-group">
                    <button
                        className="sort-btn"
                        id="purchase,desc"
                        onClick={clickSortBtnHandler}
                    >
                        판매량순
                    </button>
                    <button
                        className="sort-btn"
                        id="price,asc"
                        onClick={clickSortBtnHandler}
                    >
                        가격낮은순
                    </button>
                    <button
                        className="sort-btn"
                        id="price,desc"
                        onClick={clickSortBtnHandler}
                    >
                        가격높은순
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
                                        <div>
                                            <span>판매처</span>
                                            <span>{data.site}</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))
                    ) : (
                        <div>검색 결과가 없습니다.</div>
                    )}
                </div>
                <Pagination
                    activePage={page.current + 1}
                    itemsCountPerPage={30}
                    totalItemsCount={totalElements}
                    pageRangeDisplay={totalPages}
                    onChange={handlePageChange}
                    innerClass="page-ul"
                    itemClass="page-li"
                    activeClass="page-active"
                    activeLinkClass="pagelink-active"
                ></Pagination>
            </div>
        </div>
    );
}

export default ThemeItemList;

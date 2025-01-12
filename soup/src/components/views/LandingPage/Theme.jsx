import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../../../css/Theme.css";
import "../../../css/SubCategoryList.css";
import "../../../css/ItemList.css";
import "../../../css/Pagination.css";

function Theme(props) {
    const navigate = useNavigate();

    const [themeList, setThemeList] = useState([
        {
            idx: 1,
            title: "테마1"
        }
    ]);
    const bannerShift = useRef(0);

    const ClickButton = (e) => {
        const bannerList = document.getElementById("BannerList");
        
        navigate("/", {
            state: {
                idx: e.currentTarget.value,
                title: e.currentTarget.innerText,
            },
        });

        bannerShift.current = Number(e.target.id) * (-1050);
        bannerList.animate(
            {
                transform: [`translateX(${bannerShift.current}px)`],
            },
            {
                duration: 500, // 밀리초 지정
                fill: "forwards", // 종료 시 속성을 지님
                easing: "ease", // 가속도 종류
            }
        );
    };

    const titleShift = useRef(0);
    const onClickShiftHandler = (e) => {
        // Shift === "pause" ? setShift("play") : setShift("pause");
        const themeContainer = document.querySelector(
            ".Theme .theme-container"
        );
        const themeWidth = themeContainer.clientWidth;
        const maxShift = themeWidth - 950;

        if (e.target.id === "right-shift-btn") {
            if (titleShift.current >= -maxShift) {
                titleShift.current = titleShift.current - 100;
            }
        } else if (e.target.id === "left-shift-btn") {
            if (titleShift.current < 0) titleShift.current = titleShift.current + 100;
        }
        themeContainer.animate(
            {
                transform: [`translateX(${titleShift.current}px)`],
            },
            {
                duration: 500, // 밀리초 지정
                fill: "forwards", // 종료 시 속성을 지님
                easing: "ease", // 가속도 종류
            }
        );
    };

    useEffect(() => {
        const getThemeList = async () => {
            try {
                axios
                    .get("/search/main", {
                        headers: {
                            "x-access-token": localStorage.getItem(
                                "access_token"
                            ),
                        },
                    })
                    .then(function(response) {
                        console.log(response)
                        setThemeList(response.data.result.themeList);
                    })
                    .catch(function(error) {
                        alert("error");
                        console.log(error);
                    });
            } catch (e) {
                alert("error");
                console.log(e);
            }
        };
        getThemeList();
    }, []);

    return (
        <div className="Theme container">
            <div id="BannerList">
                {themeList.map((theme, index) => (
                    <Link to="/theme" state={{themeIdx: `${theme.idx}`}} key={`banner${index}`}>
                    <div className="banner-item" >
                        <img
                            src={'data:image/png;base64,' + theme.banner}
                            alt={`banner${index}`}
                            className="banner-img"
                            
                        />
                    </div>
                    </Link>
                ))}
            </div>
            <div className="Title container">
                <div className="theme-shift" onClick={onClickShiftHandler}>
                    <button type="button">
                        <img
                            src={`${process.env.PUBLIC_URL}/img/left-arrow.png`}
                            alt="shift button"
                            id="left-shift-btn"
                        />
                    </button>
                    <button type="button" id="right-shift-btn">
                        <img
                            src={`${process.env.PUBLIC_URL}/img/right-arrow.png`}
                            alt="shift button"
                            id="right-shift-btn"
                        />
                    </button>
                </div>
                <div className="theme-group" style={{ width: "100%" }}>
                    <div className="theme-container">
                        {themeList.map((theme, index) => (
                            <button
                                type="button"
                                onClick={ClickButton}
                                value={theme.idx}
                                key={index + 1}
                                className="theme-btn"
                                id={index}
                            >
                                {theme.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Theme;

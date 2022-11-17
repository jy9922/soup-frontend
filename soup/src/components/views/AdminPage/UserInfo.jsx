import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";


function UserInfo() {

    const [UserList, setUserList] = useState([]);
    
    useEffect(() => {
        axios.get("/admin/members", {
            headers: {
                'x-access-token': localStorage.getItem('access_token')
            }})
        .then(function (response) {
            setUserList(response.data.result)
        })
        .catch((error) => {
            alert("유저 정보를 확인할 수 없습니다.");
            console.log(error);
        })
    }, []);

    return (
        <div className="UserInfo">
            <h3>유저 정보</h3>
            <table className="userInfo">
                <thead className="table-header">
                    <tr>
                        <th scope="col">memberIdx</th>
                        <th scope="col">nickname</th>
                        <th scope="col">id</th>
                        <th scope="col">birthday</th>
                        <th scope="col">gender</th>
                        <th scope="col">role</th>
                        <th scope="col">oauth</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {UserList.map((user, index) => (
                        <tr className="user" key={`user${index+1}`}>
                            <th scope="row">{user.memberIdx}</th>
                            <td>{user.nickname}</td>
                            <td>{user.id}</td>
                            <td>{user.birthday}</td>
                            <td>{user.gender}</td>
                            <td>{user.role}</td>
                            <td>{user.auth}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserInfo;
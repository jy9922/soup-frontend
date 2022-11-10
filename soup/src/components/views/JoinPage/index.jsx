import React, { useState } from 'react';
// import { withRouter } from "react-router-dom";
import axios from 'axios';

import Header from '../Header';
import Nav from '../Nav'

import '../../../css/JoinPage.css';

function JoinPage() {

  const [Id, setId] = useState("");
  const [DuplBtnClicked, setDuplBtnClicked] = useState(false);
  const [Nickname, setNickname] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordCheck, setPasswordCheck] = useState("");
  const [Birth, setBirth] = useState("");
  // const [Gender, setGender] = useState("");
  const [Gender, setGender] = useState("male");

  const onIdHandler = (e) => {
    setId(e.currentTarget.value);
  };

  const onNicknameHandler = (e) => {
    setNickname(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onPasswordCheckHandler = (e) => {
    setPasswordCheck(e.currentTarget.value);
  };

  const onBirthHandler = (e) => {
    setBirth(e.currentTarget.value);
  };

  const onGenderHandler = (e) => {
    setGender(e.currentTarget.value);
  };

  const onDuplicateHandler = () => {
    axios.get('http://localhost:8000/members/id-check', {
      params: {
        id: `${Id}`
      }
    })
      .then(function (response) {
        console.log(response.data)
        setDuplBtnClicked(true);
      }).catch(function (error) {
        alert('Fail to Signup');
        console.log(error);
      });
  };

  const onSubmitHandler = (e) => {
    if (DuplBtnClicked) {
      axios.post('http://localhost:8000/members/signup', {
        id: `${Id}`,
        nickname: `${Nickname}`,
        password: `${Password}`,
        confirmPassword: `${PasswordCheck}`,
        birthday: `${Birth}`,
        gender: `${Gender}`,
        role: "USER",
        oauth: "ORIGIN"
      })
        .then(function (response) {
          console.log(response.data)
        }).catch(function (error) {
          alert('Fail to Signup');
          console.log(error);
        });
    };

    return (
      <div>
        <Header />
        <Nav />
        <main className="Join container">
          <div className="square">
            <h2>회원가입</h2>
            <form action="/">
              <div>
                <label htmlFor="join-id">ID</label>
                <input type="text" value={Id} minLength="5" maxLength="12" onChange={onIdHandler} id="join-id" placeholder="ID 입력 (5~12자)" />
                <button type="button" onClick={onDuplicateHandler} className="btn id-check">중복확인</button>
              </div>
              <div>
                <label htmlFor="join-nickname">닉네임</label>
                <input type="text" value={Nickname} minLength="2" maxLength="10" onChange={onNicknameHandler} id="join-nickname" placeholder="닉네임 입력 (2~10자)" />
              </div>
              <div>
                <label htmlFor="join-pw">비밀번호</label>
                <input type="password" value={Password} minLength="6" maxLength="15" onChange={onPasswordHandler} id="join-pw" placeholder="비밀번호 입력 (8~15자)" />
              </div>
              <div>
                <label htmlFor="join-pwcheck">비밀번호 확인</label>
                <input type="password" value={PasswordCheck} minLength="6" maxLength="15" onChange={onPasswordCheckHandler} id="join-pwcheck" placeholder="비밀번호 재입력" />
              </div>
              <div>
                <label htmlFor="join-birth">생년월일</label>
                <input type="text" value={Birth} onChange={onBirthHandler} id="join-birth" />
              </div>
              <div>
                <label htmlFor="">성별</label>
                <div>
                  <input type="radio" value="M" onChange={onGenderHandler} id="male" checked={Gender === "M"} />
                  <label htmlFor="male">남자</label>
                  <input type="radio" value="W" onChange={onGenderHandler} id="female" checked={Gender === "W"} />
                  <label htmlFor="female">여자</label>
                </div>
              </div>
              <button type="submit" onClick={onSubmitHandler} className="page-btn btn">회원가입</button>
            </form>
          </div>
        </main>
      </div>
    );
  }
}

export default JoinPage;
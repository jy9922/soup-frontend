import React, { useState } from 'react';
// import { withRouter } from "react-router-dom";

import Header from '../Header';
import Nav from '../Nav'


function JoinPage() {

  const [Id, setId] = useState("");
  const [Nickname, setNickname] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordCheck, setPasswordCheck] = useState("");
  const [Birth, setBirth] = useState("");
  // const [Gender, setGender] = useState("");
  const [Gender, setGender] = useState("male");

  const onIdHandler = (e) => {
    console.log("id:", e.currentTarget.value)
    setId(e.currentTarget.value);
  };

  const onNicknameHandler = (e) => {
    console.log("nick:", e.currentTarget.value)
    setNickname(e.currentTarget.value);
  };
  
  const onPasswordHandler = (e) => {
    console.log("pw:", e.currentTarget.value)
    setPassword(e.currentTarget.value);
  };
  
  const onPasswordCheckHandler = (e) => {
    console.log("pw-check:", e.currentTarget.value)
    setPasswordCheck(e.currentTarget.value);
  };

  const onBirthHandler = (e) => {
    console.log("birth:", e.currentTarget.value)
    setBirth(e.currentTarget.value);
  };

  const onGenderHandler = (e) => {
    console.log("gender:", e.currentTarget.value)
    setGender(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    console.log("submit:", e.currentTarget)
    e.preventDefault();
  };  


  return (
    <div>
      <Header />
      <Nav />
      <main className="Join container">
        <div className="square">
          <h2>회원가입</h2>
          <form action="">
            <div>
              <label htmlFor="join-id">ID</label>
              <input type="text" value={Id} minLength="5" maxLength="12" onChange={onIdHandler} id="join-id" className="form-label" placeholder="ID 입력 (5~12자)" />  
            </div>
            <div>
              <label htmlFor="join-nickname">닉네임</label>
              <input type="text" value={Nickname} minLength="2" maxLength="10" onChange={onNicknameHandler} id="join-nickname" className="form-label" placeholder="닉네임 입력 (2~10자)"/>  
            </div>
            <div>
              <label htmlFor="join-pw">비밀번호</label>
              <input type="password" value={Password} minLength="8" maxLength="15" onChange={onPasswordHandler} id="join-pw" className="form-label" placeholder="비밀번호 입력 (8~15자)" />  
            </div>
            <div>
              <label htmlFor="join-pwcheck">비밀번호 확인</label>
              <input type="password" value={PasswordCheck} minLength="8" maxLength="15" onChange={onPasswordCheckHandler} id="join-pwcheck" className="form-label" placeholder="비밀번호 재입력" />  
            </div>
            <div>
              <label htmlFor="join-birth">생년월일</label>
              <input type="date" value={Birth} onChange={onBirthHandler} id="join-birth" className="form-label"/>  
            </div>
            <div>
              <label htmlFor="">성별</label>
              <div>
                <input type="radio" value="male" onChange={onGenderHandler} id="male" checked={Gender === "male"} className="form-label" />
                <label htmlFor="male">남자</label>
                <input type="radio" value="female" onChange={onGenderHandler} id="female" checked={Gender === "female"} className="form-label" />
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

export default JoinPage;
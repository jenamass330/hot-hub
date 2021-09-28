import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoPersonCircleSharp } from "react-icons/io5";
import { CgDetailsMore } from "react-icons/cg";

// import components
import Navbar from "./Navbar";
import Login from "./Login";

const Header = () => {
  const [quotes, setQuotes] = useState(null)

  // fetch("/quotes").then(async response => {
  //   try {
  //    const data = await response.json()
  //    console.log('response data?', data)
  //  } catch(error) {
  //    console.log('Error happened here!')
  //    console.error(error)
  //  }
  // })

  useEffect(() => {
    fetch('/quotes')
    .then((res) => res.json())
    .then((data) => {
      setQuotes(data)
      console.log(data)
    })
    .catch((err) => {
      console.log("error", err)
    })
  }, [])

  return (
    <HeaderBar>
    <Navbar />
      <Title>Hot Hub Movie Machine</Title>
      <LoginBar>
        <div>
          <IoPersonCircleSharp />
        </div>
        <Login />
      </LoginBar>
    </HeaderBar>
  );
};

const HeaderBar = styled.div`
  /* background-color: #d69d65; */
  display: flex;
  justify-content: space-between;
  height: 50px;
`;
const Title = styled.div`
  margin-top: 10px;
  align-items: center;
`;
const LoginBar = styled.div`
  display: flex;
  margin-top: 10px;
`;

export default Header;

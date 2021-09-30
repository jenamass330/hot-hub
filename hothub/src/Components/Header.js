import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { IoPersonCircleSharp } from "react-icons/io5";
import { CgDetailsMore } from "react-icons/cg";
import { useAuth0 } from "@auth0/auth0-react";

// import components
import Navbar from "./Navbar";
import Login from "./Login";
import Logout from "./Logout";

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [quote, setQuote] = useState(null);
  let history = useHistory();

  // useEffect(() => {
  //   fetch('/quotes')
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setQuote(data.data)
  //     console.log(data.data)
  //   })
  //   .catch((err) => {
  //     console.log("error", err)
  //   })
  // }, [])

  // console.log(quote)

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <>
      <HeaderBar>
        <Navbar />
        <LoginBar>
          <div style={{ marginTop: "5px", marginRight: "10px" }}></div>
          <Logout />
          <Profile
            onClick={() => {
              history.push("/profile");
            }}
            style={{ fontSize: "25px", marginTop: "10px", marginRight: "10px" }}
          >
            Profile
          </Profile>
        </LoginBar>
      </HeaderBar>
      <QuoteBar></QuoteBar>
    </>
  ) : (
    <>
      <HeaderBar>
        <Navbar />
        <Title>Hot Hub Movie Machine</Title>
        <LoginBar></LoginBar>
      </HeaderBar>
      <QuoteBar></QuoteBar>
    </>
  );
};

const HeaderBar = styled.div`
  background-color: #fff8dc;
  display: flex;
  justify-content: space-around;
  height: 50px;
`;
const Title = styled.div`
  margin-top: 15px;
`;
const LoginBar = styled.div`
  display: flex;
  margin-top: 10px;
  margin-right: 200px;
`;
const QuoteBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Quote = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
const Movie = styled.div`
  font-size: 15px;
`;
const Profile = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
export default Header;

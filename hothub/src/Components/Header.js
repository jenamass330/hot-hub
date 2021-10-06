import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

// import components
import Navbar from "./Navbar";
import Logout from "./Logout";
const movieQuotes = require("movie-quotes");

const Header = () => {
  const { isAuthenticated } = useAuth0();
  const [quote, setQuote] = useState(null);

  let history = useHistory();

  useEffect(() => {
    setInterval(() => {
      setQuote(movieQuotes.random());
    }, 5000);
  }, []);

  return isAuthenticated ? (
    <>
      <HeaderBar>
        <Navbar />
        <Title>
          <HH
            onClick={() => {
              history.push("/");
            }}
            style={{ fontSize: "30px", position: "absolute" }}
          >
            HotHub Movie Machine
          </HH>
          <div
            style={{
              position: "absolute",
              marginTop: "40px",
              textAlign: "center",
              width: "700px",
              marginLeft: "-150px",
            }}
          >
            {quote}
          </div>
        </Title>
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
  justify-content: space-between;
  height: 100px;
`;

const Title = styled.div`
  margin-top: 15px;
  margin-left: -300px;
`;

const HH = styled.div`
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const LoginBar = styled.div`
  display: flex;
  margin-top: 10px;
  // margin-right: 200px;
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

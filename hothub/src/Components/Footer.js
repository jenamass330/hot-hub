import React from "react";
import styled from "styled-components";
import {
  RiFacebookBoxLine,
  RiTwitterLine,
  RiInstagramLine,
} from "react-icons/ri";

const Footer = () => {
  return (
    <>
      <Wrap>
        <Div>
          <RiFacebookBoxLine />
          <RiInstagramLine />
          <RiTwitterLine />
        </Div>
      </Wrap>
      <Div style={{ fontSize: "15px" }}>2021 - All rights reserved.</Div>
    </>
  );
};

const Wrap = styled.div`
  display: flex;
  width: 100%;
  bottom: 0;
`;

const Div = styled.div`
  background-color: #fff8dc;
  text-align: center;
  font-size: 25px;
  width: 100%;
`;

export default Footer;

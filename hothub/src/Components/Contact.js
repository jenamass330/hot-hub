import React from "react";
import styled from "styled-components";

const Contact = () => {
  return (
    <>
      <ContactTitle>Contact</ContactTitle>
      <No>Don't.</No>
    </>
  );
};

const ContactTitle = styled.div`
  text-align: center;
  font-size: 30px;
  margin-bottom: 25px;
  margin-top: 50px;
`;
const No = styled.div`
  text-align: center;
`;

export default Contact;

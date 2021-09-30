import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <Button onClick={() => loginWithRedirect()}>Log In</Button>
    </>
  );
};

const Button = styled.div`
  margin-right: 20px;
  font-size: 25px;
  margin-top: 10px;

  &:hover {
    cursor: pointer;
  }
`;

export default Login;

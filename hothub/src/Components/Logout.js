import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Logout = () => {
  const { logout } = useAuth0();
  return (
    <>
      <Button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </Button>
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

export default Logout;

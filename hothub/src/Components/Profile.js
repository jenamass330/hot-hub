import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Watchlist from "./Watchlist";
import WatchedMini from "./WatchedMini";
import WatchListMini from "./WatchListMini";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);

  if (isLoading) {
    return <div></div>;
  }
  return (
    isAuthenticated && (
      <>
        <Wrap>
          <Picture src={user.picture} alt={user.name} />
          <Name>{user.name}</Name>
          <Email>{user.email}</Email>
        </Wrap>
        <WatchListMini />
        <WatchedMini />
      </>
    )
  );
};

const Wrap = styled.div`
  display: flex;
  padding-left: 400px;
  
`
const Name = styled.h1`
  font-size: 25px;
`
const Email = styled.h2``

const Picture = styled.img`
  border-radius: 50%;
`;

export default Profile;

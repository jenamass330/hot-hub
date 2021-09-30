import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Watchlist from "./Watchlist";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <>
        <div>
          <Picture src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <Watchlist />
      </>
    )
  );
};

const Picture = styled.img`
  border-radius: 50%;
`;

export default Profile;

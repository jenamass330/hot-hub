import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import WatchedMini from "./WatchedMini";
import WatchListMini from "./WatchListMini";
import { getUser, updateWatchlist, updateWatchedlist } from "../service";


const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // console.log(user);
  const [userData, setUserData] = useState({})

  useEffect(() => {

    if (isAuthenticated) {
      fetch("/user/" + user.email)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.data)
          // console.log(data.data.watchList)
        })
        .catch((err) => {
          console.log("error", err);
        })
      }

  }, [isAuthenticated, userData]);

  if (isLoading) {
    return <div></div>;
  }
  return (
    isAuthenticated && (
      <>
      
        <BigWrap>
          <Picture src={user.picture} alt={user.name} />
        <Wrap>
          <Name>{user.name}</Name>
          <Email>{user.email}</Email>
        </Wrap>
        </BigWrap>
        
        <WatchListMini userData={userData} />
        <WatchedMini />
        <Title>Ratings and Reviews</Title>
      </>
    )
  );
};

const Wrap = styled.div`
  margin-top: 55px;
  margin-left: 10px;
`
const BigWrap = styled.div`
display: flex;
width: 50%;
margin-left: 50%;
transform: translateX(-50%);
`

const Name = styled.h1`
  font-size: 25px;
  
`
const Email = styled.h2`

`

const Picture = styled.img`
  border-radius: 50%;
  height: 150px;
`;

const Title = styled.div`
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 200px;
  font-size: 25px;
  letter-spacing: 3px;
`

export default Profile;

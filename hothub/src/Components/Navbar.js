import React from "react";
import { useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import styled from "styled-components";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Nav>
        <Ul>
          <Li>
            <a href="#" onClick={() => setOpen(!open)} style={{color:"black"}}>
              <CgDetailsMore />
            </a>
            {open ? (
              <Dropdown>
                <Item href='#'>Home</Item>
                <Item href="#">About</Item>
                <Item href='#'>Contact</Item>
              </Dropdown>
            ) : null}
          </Li>
        </Ul>
      </Nav>
    </>
  );
};

const Nav = styled.nav`
  padding: 0 1rem;
  background-color: white;
  margin-top: 10px;
`;
const Ul = styled.ul`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;
const Li = styled.li``;

const Dropdown = styled.div`
    background-color: white;
    position: absolute;
    top: 58px;
    width: 200px;
    transform: translateX(-10%);
    padding: 1rem;
    overflow: hidden;
`
const Item = styled.a`
    height: 50px;
    display: flex;
    align-items: center;
    transition: background(200ms);
    padding: 0.5rem;
    color: black;
    text-decoration: none;

    &:hover {
        background-color: lightgrey;
        color: white;
    }
`

export default Navbar;

import React, {ReactElement} from "react";
import Container from 'react-bootstrap/Container';
import {Navbar} from "react-bootstrap";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from '@emotion/react'
import {SerializedStyles} from "@emotion/serialize";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import NavbarCollapse from "react-bootstrap/lib/NavbarCollapse";
import Sizes from "src/constants/Sizes";


// todo: 특정 도메인에 종속되지 않게 만들기, logo.png 위
const TopNavigationBar: React.FC<TopNavigationBarProps> = ({
                                                             brand,
                                                             collapse,
                                                             containerStyle
                                                           }: TopNavigationBarProps) => {


  // todo: refac links
  return <Navbar expand="lg" >
    <Container css={containerStyle}>
      {brand}
      {/*todo: check - 이거 뭔지 현재 모름.*/}
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      {collapse}
    </Container>
  </Navbar>
};

interface TopNavigationBarProps {
  brand: ReactElement<NavbarBrand>;
  collapse: ReactElement<NavbarCollapse>;
  containerStyle: SerializedStyles;
}

export default TopNavigationBar;

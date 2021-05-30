import React, {ReactElement} from "react";
import {css} from "@emotion/react";
import TopNavigationBar from "src/pages/components/bars/navigation/Top";
import Sizes from "src/constants/Sizes";
import {Button, Nav, Navbar, NavbarBrand} from "react-bootstrap";
import brandImage from 'src/assets/brand_at_top_navigation.png'
import NavbarCollapse from "react-bootstrap/lib/NavbarCollapse";
import Container from 'react-bootstrap/Container';
import Colors from "src/constants/Colors";

const TopNavigationSection: React.FC = () => {
  const topNavigationContainerStyle = css({
    backgroundColor: Colors.theme.bar.top,
    height: Sizes.layout.bar.top.value
  });

  const brand: ReactElement<NavbarBrand> = <Navbar.Brand href="#home">
    <img src={brandImage} alt="Brand" width={Sizes.components.bar.logo.width.value}
         height={Sizes.components.bar.logo.height.value}/>
  </Navbar.Brand>;

  // todo: Link의 색상 조정 - 가만히 있을 땐 연보라, 클릭하면 진보라. 혹은 연주황 -> 진보라
  const collapse: ReactElement<NavbarCollapse> = <Navbar.Collapse id="basic-navbar-nav">
    <Container>
      <Nav className="me-auto">
        <Nav.Link href="#management">Management</Nav.Link>
        <Nav.Link href="#contact">Contact</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="#sign">
          <SignInButton />
        </Nav.Link>
      </Nav>
    </Container>
  </Navbar.Collapse>;

  return <div>
    <TopNavigationBar containerStyle={topNavigationContainerStyle} brand={brand} collapse={collapse}/>
  </div>;
};

const SignInButton: React.FC = () => {
  //todo: refac - use constants
  //todo: refac - 클릭했을 시 글씨 색상 주황색으로 바꾸기.
  const backgroundColor: string = "#802578";
  const color: string = "white";
  return <>
    <style type="text/css"> {`
            .btn-sign {
              background-color: ${backgroundColor};
              color: ${color};
            }
          `}
    </style>
    <Button variant={"sign"}>Sign</Button>
  </>
};

export default TopNavigationSection;

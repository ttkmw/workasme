import React, {ReactElement, ReactNode} from "react";
import {css} from "@emotion/react";
import Sizes from "src/constants/Sizes";
import {Nav, Navbar, NavbarBrand} from "react-bootstrap";
import brandImage from 'src/assets/brand_at_top_navigation.png'
import NavbarCollapse from "react-bootstrap/lib/NavbarCollapse";
import Container from 'react-bootstrap/Container';
import Colors from "src/constants/Colors";
import {SerializedStyles} from "@emotion/serialize";
import {LinkContainer} from 'react-router-bootstrap'
import ButtonComponent from "src/pages/components/ButtonComponent";
import Percentage from "src/graphic/size/percentage";
import {useDispatch, useSelector} from "react-redux";
import {selectSign} from "src/context/signSlice";
import {selectUsername} from "src/context/usernameSlice";
import {selectPassword} from "src/context/passwordSlice";


const Menus: React.FC<{isSigned: boolean}> = (props: {isSigned: boolean}) => {
  const {isSigned} = props;
  if (isSigned) {
    return (
      <>
        <LinkContainer to={"/management"}>
          <Nav.Link>Management</Nav.Link>
        </LinkContainer>
        <LinkContainer to={"/contact"}>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </LinkContainer>
      </>
    )
  }

  return <>
    <LinkContainer to={"/contact"}>
      <Nav.Link href="/contact">Contact</Nav.Link>
    </LinkContainer>
  </>

};

const Header: React.FC = () => {
  const isSigned = useSelector(selectSign);

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
        <Menus isSigned={isSigned}/>
      </Nav>
    </Container>
  </Navbar.Collapse>;

  return <div>
    <TopNavigationBar containerStyle={topNavigationContainerStyle} brand={brand} collapse={collapse}/>
  </div>;
};


const TopNavigationBar: React.FC<TopNavigationBarProps> = ({
                                                             brand,
                                                             collapse,
                                                             containerStyle
                                                           }: TopNavigationBarProps) => {


  // todo: refac links
  return <Navbar expand="lg">
    <Container css={containerStyle}>
      <LinkContainer to={"/"}>{brand}</LinkContainer>
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

export default Header;

import React, {ReactElement} from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Sizes from "src/constants/Sizes";
import {Nav, Navbar, NavbarBrand} from "react-bootstrap";
import brandImage from 'src/assets/brand_at_top_navigation.png'
import NavbarCollapse from "react-bootstrap/lib/NavbarCollapse";
import Container from 'react-bootstrap/Container';
import Colors from "src/constants/Colors";
import {SerializedStyles} from "@emotion/serialize";
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector} from "react-redux";
import {selectSign} from "src/context/signSlice";
import fontConfig from "src/graphic/text/font";


const Menus: React.FC<{isSigned: boolean}> = (props: {isSigned: boolean}) => {
  const {isSigned} = props;

  // css={css({
  //
  //          })}
  return <>
    <LinkContainer css={css({
      color: "rgba(0, 0, 0, .9)",
      fontFamily: fontConfig.web.light.fontFamily,
      paddingTop: 5,
      paddingBottom: 5,
      marginTop: 3,
      height: 30,
      display: "flex",
      alignItems: "center"
    })} to={"/time-trackers"}>
      <Nav.Link>Time Track</Nav.Link>
    </LinkContainer>
  </>

};

const Header: React.FC = () => {
  const isSigned = useSelector(selectSign);

  const topNavigationContainerStyle = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.theme.bar.top,
    height: Sizes.layout.bar.top.value
  });

  const brand: ReactElement<NavbarBrand> = <Navbar.Brand href="#home">
    <img src={brandImage} alt="Brand" width={Sizes.components.bar.logo.width.value}
         height={Sizes.components.bar.logo.height.value}/>
  </Navbar.Brand>;

  // todo: Link의 색상 조정 - 가만히 있을 땐 연보라, 클릭하면 진보라. 혹은 연주황 -> 진보라
  const collapse: ReactElement<Nav> = <Nav className="me-auto">
    <Menus isSigned={isSigned}/>
  </Nav>;

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
  return <Container css={containerStyle}>
    <LinkContainer to={"/"}>{brand}</LinkContainer>
    {/*/!*todo: check - 이거 뭔지 현재 모름.*!/*/}
    {/*<Navbar.Toggle aria-controls="basic-navbar-nav"/>*/}
    {collapse}
  </Container>
};


interface TopNavigationBarProps {
  brand: ReactElement<NavbarBrand>;
  collapse: ReactElement<Nav>;
  containerStyle: SerializedStyles;
}

export default Header;

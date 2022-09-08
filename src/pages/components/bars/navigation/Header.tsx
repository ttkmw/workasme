import React, {ReactElement} from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Sizes from "src/constants/Sizes";
import {Nav, Navbar, NavbarBrand} from "react-bootstrap";
import brandImage from 'src/assets/brand_at_top_navigation.png'
import Container from 'react-bootstrap/Container';
import Colors from "src/constants/Colors";
import {SerializedStyles} from "@emotion/serialize";
import {useDispatch, useSelector} from "react-redux";
import {selectSign} from "src/context/signSlice";
import fontConfig from "src/graphic/text/font";
import {useNavigate} from "react-router-dom";


const Menus: React.FC<{ isSigned: boolean }> = (props: { isSigned: boolean }) => {
  const navigate = useNavigate();
  return <div css={css({
    display: "flex",
    flexDirection: "row",

    ".menu-name": {
      color: "rgba(0, 0, 0, .9)",
      fontFamily: fontConfig.web.light.fontFamily,
      paddingTop: 5,
      paddingBottom: 5,
      marginTop: 3,
      height: 30,
      display: "flex",
      alignItems: "center",
      ":hover": {
        color: "inherit"
      }
    }
  })}>
    <span className={"menu-name"} onClick={() => navigate("/time-track")}>Time Track</span>
  </div>

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

  const brand: ReactElement<NavbarBrand> = <img css={css({
    marginRight: "16px"
  })} src={brandImage} alt="Brand" width={Sizes.components.bar.logo.width.value}
                                                height={Sizes.components.bar.logo.height.value}/>;

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


  const navigate = useNavigate();
  // todo: refac links
  return <Container css={containerStyle}>
    <span onClick={() => navigate("/time-track")}>{brand}</span>
    {collapse}
  </Container>
};


interface TopNavigationBarProps {
  brand: ReactElement<NavbarBrand>;
  collapse: ReactElement<Nav>;
  containerStyle: SerializedStyles;
}

export default Header;

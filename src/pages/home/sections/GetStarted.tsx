import React from "react";
import Container from 'react-bootstrap/Container';
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Pixel from "src/graphic/size/pixel";
import {Button, Nav} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import Colors from "src/constants/Colors";

const GetStartedSection: React.FC = () => {
  //width: 389
  const containerStyle = css({
    height: 'auto'
  });


  return <Container css={containerStyle}>
    <IntroductionPhrase/>
    <GetStartedPart/>
  </Container>;
};

const IntroductionPhrase: React.FC = () => {
  return <div>
    <h1 css={css({
      textAlign: 'center',
      fontSize: new Pixel(70).value,
      paddingLeft: new Pixel(24).value,
      paddingRight: new Pixel(24).value,
    })}>
      <span css={
        css({
          fontFamily: "ObjectSans-Heavy",
          color: Colors.theme.main.work,
          fontWeight: 700
        })
      }>work with </span>
      <span css={
        css({
          fontFamily: "Pattaya-Regular",
          color: Colors.theme.main.orgasme,
          fontWeight: 900
        })
      }>
         orgasme
      </span>
    </h1>
  </div>;
};

const GetStartedPart: React.FC = () => {
  return <div css={css({
    textAlign: 'center',
    fontSize: new Pixel(18).value,
    paddingLeft: new Pixel(24).value,
    paddingRight: new Pixel(24).value,
  })}>
    <Description/>
    <GetStartedButton/>
  </div>;
};

const Description: React.FC = () => {
  return <div css={css({
    marginBottom: new Pixel(30).value
  })}>
    <span>Make a goal, record, feedback. You will definitely achieve your goal and feel good.</span><br/>
    <span>Maybe you feel blurred... I can show you. work as me!</span>
  </div>
};


// <LinkContainer to={"/management"}>
//   <Nav.Link>Management</Nav.Link>
// </LinkContainer>
const GetStartedButton: React.FC = () => {
  return <LinkContainer to={"/sign"}>
    <div css={css({
      marginLeft: 'auto',
      marginRight: 'auto'
    })}>
      <>
        <style type="text/css"> {`
            .btn-getStarted {
              background-color: ${Colors.theme.main.orgasme};
              color: ${Colors.theme.text.button.default};
            }
          `}
        </style>
        <Button variant={"getStarted"} size={"lg"}>Get Started</Button>
      </>
    </div>
  </LinkContainer>
};

export default GetStartedSection;

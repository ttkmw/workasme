import React from "react";
import Container from 'react-bootstrap/Container';
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Pixel from "src/graphic/size/pixel";
import Colors from "src/constants/Colors";
import {Form} from "react-bootstrap";
import ButtonComponent from "src/pages/components/ButtonComponent";
import Percentage from "src/graphic/size/percentage";

const SignInSection: React.FC = () => {
  return <Container>
    <Title/>
    <SignInForm/>

  </Container>;
};

const SignInForm: React.FC = () => {
  return <Container>
    <Form>
      <EmailInput/>
      <PasswordInput/>
      <SignInButton/>
    </Form>
  </Container>;
};

const EmailInput: React.FC = () => {
  return <Form.Group controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email"/>
  </Form.Group>;
};

const PasswordInput: React.FC = () => {
  return <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password"/>
  </Form.Group>;
};

const SignInButton: React.FC = () => {
  return <ButtonComponent name={"signIn"} backgroundColor={Colors.theme.main.orgasme}
                          defaultTextColor={Colors.theme.text.button.default}
                          width={new Percentage(100)}
                          onClick={() => {
                            console.log("clicked!")
                          }}
  >
    Sign In
  </ButtonComponent>;
};

const Title: React.FC = () => {
  return <Container>
    <h2 css={css({
      textAlign: 'center',
      fontSize: new Pixel(50).value,
      fontFamily: "ObjectSans-Regular",
      color: Colors.theme.text.default,
      fontWeight: 700
    })}>
      Sign In
    </h2>
  </Container>
};

export default SignInSection;

import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Pixel from "src/graphic/size/pixel";
import Colors from "src/constants/Colors";
import {Form} from "react-bootstrap";
import ButtonComponent from "src/pages/components/ButtonComponent";
import Percentage from "src/graphic/size/percentage";
import createAxios from "src/api/adapterFactory/axiosFactory";
import {useDispatch} from "react-redux";
import { passwordSignIn } from "src/context/passwordSlice";

const SignInSection: React.FC = () => {
  return <Container>
    <Title/>
    <SignInForm/>

  </Container>;
};

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  return <Container>
    <Form>
      <EmailInput setEmail={setEmail}/>
      <PasswordInput setPassword={setPassword}/>
      <SignInButton email={email} password={password}/>
    </Form>
  </Container>;
};

const EmailInput: React.FC<{setEmail: Dispatch<SetStateAction<string>>}> = (props: {setEmail: Dispatch<SetStateAction<string>>}) => {
  const {setEmail} = props;
  return <Form.Group controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}} type="email"/>
  </Form.Group>;
};

const PasswordInput: React.FC<{setPassword: Dispatch<SetStateAction<string>>}> = (props: {setPassword: Dispatch<SetStateAction<string>>}) => {
  const {setPassword} = props;
  return <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}} type="password"/>
  </Form.Group>;
};

const SignInButton: React.FC<{email: string, password: string}> = (props: {email: string, password: string}) => {
  const {email, password} = props;
  const dispatch = useDispatch();

  const axiosInstance = createAxios({
    auth: {
      username: email,
      password: password
    }
  });
  return <ButtonComponent name={"signIn"} backgroundColor={Colors.theme.main.orgasme}
                          defaultTextColor={Colors.theme.text.button.default}
                          hoverTextColor={Colors.theme.main.work}
                          width={new Percentage(100)}
                          onClick={async () => {
                            const response = await axiosInstance.get("http://localhost:8081/try")
                            if (response.status === 200) {
                              console.log("200!");
                              dispatch(passwordSignIn("This is hahaha"));
                            }
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

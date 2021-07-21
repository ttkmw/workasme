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
import createAxios, {host} from "src/api/adapterFactory/axiosFactory";
import {useDispatch, useSelector} from "react-redux";
import { passwordSign } from "src/context/passwordSlice";
import {selectUsername, usernameSign} from "src/context/usernameSlice";

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
    <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}} type="email" placeholder="username@example.com"/>
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
    },
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  });

  const signIn = async () => {
    console.log("before call")
    const response = await axiosInstance.post(`http://${host}/auth/signIn`, {
      "signature": email,
      "password": password,
    });

    console.log("after call")
    console.log(response.status);

    if (response.status === 201) {
      dispatch(usernameSign(email));
      dispatch(passwordSign(password));
      console.log("signIn");
    }
  };

  return <ButtonComponent name={"signIn"} backgroundColor={Colors.theme.main.work}
                          defaultTextColor={Colors.theme.text.button.default}
                          hoverTextColor={Colors.theme.main.orgasme}
                          width={new Percentage(100)}
                          onClick={signIn}
  >
    Sign In
  </ButtonComponent>;
};

const Title: React.FC = () => {
  const username: string = useSelector(selectUsername);
  console.log("hahaha");
  console.log(username);
  return <Container>
    <h2 css={css({
      textAlign: 'center',
      fontSize: new Pixel(50).value,
      fontFamily: "ObjectSans-Regular",
      color: Colors.theme.text.default,
      fontWeight: 700
    })}>
      {username}
    </h2>
  </Container>
};

export default SignInSection;

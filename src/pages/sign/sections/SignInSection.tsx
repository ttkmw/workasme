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
import {useDispatch, useSelector} from "react-redux";
import { passwordSign } from "src/context/redux/passwordSlice";
import {selectUsername, usernameSign} from "src/context/redux/usernameSlice";
import axios from "axios";

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

  const axiosInstance = axios.create({
    auth: {
      username: email,
      password: password
    }
  });

  const signIn = async () => {
    const response = await axiosInstance.post(`/auth/signIn`, {
      "signature": email,
      "password": password,
    });

    if (response.status === 201) {
      dispatch(usernameSign(email));
      dispatch(passwordSign(password));
    }
  };

  return <ButtonComponent name={"signIn"} backgroundColor={Colors.theme.main.work}
                          textSize={new Pixel(20)}
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

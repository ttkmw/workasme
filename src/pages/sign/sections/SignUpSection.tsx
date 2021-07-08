import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Container from "react-bootstrap/Container";
import Pixel from "src/graphic/size/pixel";
import Colors from "src/constants/Colors";
import {Col, Form, Row} from "react-bootstrap";
import ButtonComponent from "src/pages/components/ButtonComponent";
import Percentage from "src/graphic/size/percentage";
import googleLogo from "src/assets/icons/google.png";

const SignUpSection: React.FC = () => {
  return <Container>
    <Title/>
    <SignUpForm/>
  </Container>;
};

const SignUpForm: React.FC = () => {
  return <Container>
    <Form>
      <EmailInput/>
      <PasswordInput/>
      <FullNameInput/>
      <WhereAreYouInInput/>
    </Form>
    <CreateAccountButton/>
    <SplitWithOrLine/>
    <ContinueWithGoogleButton/>
  </Container>;
};

// https://codepen.io/scottzirkel/pen/yNxNME
// todo: Or 컨텐트가 안보임. ::before , ::after 문제인듯.
const SplitWithOrLine: React.FC = () => {
  return <>
    <style type="text/css"> {`
            .hr-text {
              line-height: 1em;
              position: relative;
              outline: 0;
              border: 0;
              color: black;
              text-align: center;
              height: 1.5em;
              opacity: 0.5;
            }
            .hr-text:before {
                content: '';
                background: linear-gradient(to right, transparent, #818078, transparent);
                position: absolute;
                left: 0;
                top: 50%;
                width: 100%;
                height: 1px;
            }
            .hr-text:after {
                content: attr(data-content);
                position: relative;
                display: inline-block;
                color: black;
              
                padding: 0 .5em;
                line-height: 1.5em;
                color: #818078;
                background-color: #fcfcfa;
            }
            `}
    </style>
    <hr className="hr-text" data-content="OR"/>
  </>;
};


// {
//   line-height: 1em;
//   position: relative;
//   outline: 0;
//   border: 0;
//   color: black;
//   text-align: center;
//   height: 1.5em;
//   opacity: .5;
// &:before {
//   content: '';
//   // use the linear-gradient for the fading effect
//   // use a solid background color for a solid bar
//   background: linear-gradient(to right, transparent, #818078, transparent);
//   position: absolute;
//   left: 0;
//   top: 50%;
//   width: 100%;
//   height: 1px;
// }
// &:after {
//   content: attr(data-content);
//   position: relative;
//   display: inline-block;
//   color: black;
//
//   padding: 0 .5em;
//   line-height: 1.5em;
//   // this is really the only tricky part, you need to specify the background color of the container element...
//   color: #818078;
//   background-color: #fcfcfa;
// }
// }


// todo: onHover 했을 때 색깔 - primary 때문.
const ContinueWithGoogleButton: React.FC = () => {

  return <ButtonComponent name={"outline-primary"} backgroundColor={Colors.theme.button.default}
                          defaultTextColor={Colors.theme.main.orgasme}
                          hoverTextColor={Colors.theme.main.orgasme}
                          borderColor={Colors.theme.main.orgasme}
                          width={new Percentage(100)}
                          onClick={() => {console.log("clicked!")}}
  >
    <ButtonContent/>
  </ButtonComponent>;
};

const ButtonContent: React.FC = () => {
  return <div css={css({
    display: 'flex',
    flexDirection: 'row'
  })}>
    <img src={googleLogo} alt="Google" width={24}
         height={24}/>
    <span css={css({
      display: 'flex',
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: '0%',
      justifyContent: 'center'
    })}>Continue with Google</span>
  </div>
};


const CreateAccountButton: React.FC = () => {
  return <ButtonComponent name={"createAccount"} backgroundColor={Colors.theme.main.orgasme}
                          defaultTextColor={Colors.theme.text.button.default}
                          hoverTextColor={Colors.theme.main.work}
                          width={new Percentage(100)}
                          onClick={() => {console.log("clicked!")}}
  >
    Create Account
  </ButtonComponent>;
};

const EmailInput: React.FC = () => {
  return <Form.Group>
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="username@example.com"/>
  </Form.Group>;
};

const PasswordInput: React.FC = () => {
  return <Form.Group>
    <Form.Label>Password</Form.Label>
    <Form.Control type="password"/>
  </Form.Group>;
};

const FullNameInput: React.FC = () => {
  return <Form.Group>
    <Form.Label>Name</Form.Label>
    <Row>
      <Col>
        <Form.Control placeholder="First"/>
      </Col>
      <Col>
        <Form.Control placeholder="Last"/>
      </Col>
    </Row>
  </Form.Group>;
};

const WhereAreYouInInput: React.FC = () => {
  return <Form.Group controlId="SelectBelongsTo">
    <Form.Label>Where are you in?</Form.Label>
    <Form.Control as="select" custom>
      <option>Independent(No where)</option>
      <option>Company</option>
      <option>Club</option>
      <option>Team</option>
    </Form.Control>
  </Form.Group>;
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
      Sign Up
    </h2>
  </Container>
};

export default SignUpSection;

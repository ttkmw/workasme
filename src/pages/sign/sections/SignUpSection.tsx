import React, {Dispatch, SetStateAction, useState} from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Container from "react-bootstrap/Container";
import Pixel from "src/graphic/size/pixel";
import Colors from "src/constants/Colors";
import {Alert, Button, Col, Form, Modal, Nav, Row} from "react-bootstrap";
import ButtonComponent from "src/pages/components/ButtonComponent";
import Percentage from "src/graphic/size/percentage";
import googleLogo from "src/assets/icons/google.png";
import createAxios from "src/api/adapterFactory/axiosFactory";
import {useDispatch} from "react-redux";
import { usernameSign } from "src/context/usernameSlice";
import { passwordSign } from "src/context/passwordSlice";
import {LinkContainer} from "react-router-bootstrap";

const SignUpSection: React.FC = () => {
  return <Container>
    <Title/>
    <SignUpForm/>
  </Container>;
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

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return <Container>
    <Form>
      <EmailInput setEmail={setEmail}/>
      <PasswordInput setPassword={setPassword}/>
      <FullNameInput setFirstName={setFirstName} setLastName={setLastName}/>
      {/*todo: 나중에 다 적용하기*/}
      {/*<WhereAreYouInInput/>*/}
      <SignUpButton email={email} password={password} firstName={firstName} lastName={lastName} handleShow={handleShow}/>
      <SignUpButtonModal show={show} handleClose={handleClose}/>
    </Form>
    {/*<SplitWithOrLine/>*/}
    {/*<ContinueWithGoogleButton/>*/}
  </Container>;
};



const SignUpButton: React.FC<{email: string, password: string, firstName:string, lastName: string, handleShow: () => void}>
  = (props: {email: string, password: string, firstName:string, lastName: string, handleShow: () => void}) => {

  const {email, password, firstName, lastName, handleShow} = props;
  const axiosInstance = createAxios({});
  const signUp = async () =>  {
    const response = await axiosInstance.post("http://localhost:8081/auth/signUp", {
      signature: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    });

    if (response.status === 201) {
      dispatch(usernameSign(email));
      dispatch(passwordSign(password));
      handleShow();
    }
  };

  const dispatch = useDispatch();

  return <ButtonComponent name={"createAccount"} backgroundColor={Colors.theme.main.work}
                          defaultTextColor={Colors.theme.text.button.default}
                          hoverTextColor={Colors.theme.main.orgasme}
                          width={new Percentage(100)}
                          onClick={signUp}
  >
    Sign Up
  </ButtonComponent>;
};

const EmailInput: React.FC<{setEmail: Dispatch<SetStateAction<string>>}> = (props: {setEmail: Dispatch<SetStateAction<string>>}) => {
  const {setEmail} = props;
  return <Form.Group>
    <Form.Label>Email</Form.Label>
    <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}} type="email" placeholder="username@example.com"/>
  </Form.Group>;
};

const PasswordInput: React.FC<{setPassword: Dispatch<SetStateAction<string>>}> = (props: {setPassword: Dispatch<SetStateAction<string>>}) => {
  const {setPassword} = props;
  return <Form.Group>
    <Form.Label>Password</Form.Label>
    <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}} type="password"/>
  </Form.Group>;
};

const FullNameInput: React.FC<{setFirstName: Dispatch<SetStateAction<string>>, setLastName: Dispatch<SetStateAction<string>>}> = (props: {setFirstName: Dispatch<SetStateAction<string>>,
  setLastName: Dispatch<SetStateAction<string>>}) => {

  const {setFirstName, setLastName} = props;

  return <Form.Group>
    <Form.Label>Name</Form.Label>
    <Row>
      <Col>
        <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setFirstName(e.target.value)}} placeholder="First"/>
      </Col>
      <Col>
        <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setLastName(e.target.value)}} placeholder="Last"/>
      </Col>
    </Row>
  </Form.Group>;
};


const SignUpButtonModal:React.FC<{show: boolean, handleClose: () => void}> = (props: {show: boolean, handleClose: () => void}) => {
  const {show, handleClose} = props;
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Good Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sign Up Succeed, Enjoy my service</Modal.Body>
        <Modal.Footer>
          <LinkContainer to="/management">
            <ButtonComponent name={"moveToManagement"} backgroundColor={Colors.theme.main.work}
                             defaultTextColor={Colors.theme.text.button.default}
                             hoverTextColor={Colors.theme.main.orgasme}
                             width={new Percentage(100)}
                             onClick={() => {}}
            >
              Move To Management
            </ButtonComponent>
          </LinkContainer>
        </Modal.Footer>
      </Modal>
    </>
  );
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

const WhereAreYouInInput: React.FC = () => {
  const [selected, setSelected] = useState();
  return <Form.Group controlId="SelectBelongsTo">
    <Form.Label>Where are you in?</Form.Label>
    <Form.Control onChange={(e: React.ChangeEvent<HTMLInputElement>) => {console.log(e.target.value)}} as="select" custom>
      <option>Independent(No where)</option>
      <option>Company</option>
      <option>Club</option>
      <option>Team</option>
    </Form.Control>
  </Form.Group>;
};



export default SignUpSection;

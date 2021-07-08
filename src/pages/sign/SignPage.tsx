import React from "react";
import SignInSection from "src/pages/sign/sections/SignInSection";
import SignUpSection from "src/pages/sign/sections/SignUpSection";
import Container from 'react-bootstrap/Container';
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import {Col, Row} from "react-bootstrap";

const SignPage: React.FC = () => {
  return <Container>
    <Row>
      <Col sm><SignInSection /></Col>
      <Col sm><SignUpSection /></Col>
    </Row>

  </Container>;
};

export default SignPage;

import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Pixel from "src/graphic/size/pixel";
import Title from "src/pages/components/Title";
import Colors from "src/constants/Colors";
import {LinkContainer} from "react-router-bootstrap";



const SignUpPage: React.FC = () => {
  return <div css={css({
    fontFamily: "Gaegu-Regular",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh"
  })}>
    <SignUpSection/>
  </div>
}

const SignUpSection: React.FC = () => {
  return <div>
    <div css={css({
      width: new Pixel(380).toString(),
      backgroundColor: "white",
      borderWidth: new Pixel(1).toString(),
      borderStyle: "solid",
      borderColor: "rgb(219, 219, 219)",
      borderRadius: new Pixel(3).toString(),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: new Pixel(21).toString()
    })}>
      <Title />
      <input css={css({
        width: new Pixel(280).toString(),
        height: new Pixel(38).toString(),
        borderWidth: new Pixel(1).toString(),
        borderStyle: "solid",
        borderColor: "rgb(219, 219, 219)",
        borderRadius: new Pixel(1).toString(),
        paddingLeft: new Pixel(7).toString(),
        ":focus-visible": {
          outline: "0px"
        },
        backgroundColor: "rgba(var(--b3f,250,250,250),1)",
        marginBottom: new Pixel(6).toString()
      })} placeholder={"email"} id={"sign-up-id"}/>
      <input css={css({
        width: new Pixel(280).toString(),
        height: new Pixel(38).toString(),
        borderWidth: new Pixel(1).toString(),
        borderStyle: "solid",
        borderColor: "rgb(219, 219, 219)",
        borderRadius: new Pixel(1).toString(),
        paddingLeft: new Pixel(7).toString(),
        ":focus-visible": {
          outline: "0px"
        },
        backgroundColor: "rgba(var(--b3f,250,250,250),1)",
        marginBottom: new Pixel(6).toString()
      })} placeholder={"name"} id={"sign-up-name"}/>
      <input css={css({
        width: new Pixel(280).toString(),
        height: new Pixel(38).toString(),
        borderWidth: new Pixel(1).toString(),
        borderStyle: "solid",
        borderColor: "rgb(219, 219, 219)",
        borderRadius: new Pixel(1).toString(),
        paddingLeft: new Pixel(7).toString(),
        ":focus-visible": {
          outline: "0px"
        },
        backgroundColor: "rgba(var(--b3f,250,250,250),1)",
        marginBottom: new Pixel(14).toString()
      })} placeholder={"nickname"} id={"nickname"}/>
      <LinkContainer to={"/time-track"}>
        <div css={css({
          display: "flex",
          alignItems: "center",
          '.button-work': {
            backgroundColor: Colors.theme.main.work,
            border: "none",
            color: Colors.theme.button.default,
          },

        })}>
          <button
            css={css({
              width: new Pixel(280).toString(),
              borderRadius: 7,
              height: new Pixel(30).toString(),
              marginBottom: new Pixel(20).toString()
            })}
            className={'button-work'}
            type={"submit"}
            onClick={() => alert("should api call sign up")}
          >sign up</button>
        </div>
      </LinkContainer>

    </div>
    <div css={css({
      width: new Pixel(380).toString(),
      height: new Pixel(62).toString(),
      backgroundColor: "white",
      borderWidth: new Pixel(1).toString(),
      borderStyle: "solid",
      borderColor: "rgb(219, 219, 219)",
      borderRadius: new Pixel(3).toString(),
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    })}>
      <span css={css({
        paddingRight: new Pixel(7).toString()
      })}>has account already?</span>
      <LinkContainer to={"/"}>
        <span css={css({
          fontFamily: "Gaegu-Regular",
          color: Colors.theme.main.work
        })}> Sign in</span>
      </LinkContainer>


    </div>
  </div>;

}

export default SignUpPage;

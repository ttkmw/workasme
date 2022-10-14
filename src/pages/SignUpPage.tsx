import React, {useState} from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Pixel from "src/graphic/size/pixel";
import Title from "src/pages/components/Title";
import Colors from "src/constants/Colors";
import {useNavigate} from "react-router-dom";
import {useInjection} from "inversify-react";
import UserApi from "src/api/UserApi";


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
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const userApi = useInjection(UserApi);


  async function signUp() {
    if (password !== passwordConfirm) {
      alert("Please check password");
      return;
    }

    // "username": "test-signup",
    //   "email": "test-signup@gmail.com",
    //   "firstName": "test-signup",
    //   "lastName": "test-signup",
    //   "password": "026060Mcfnxm**"


    let response;
    try {
      console.log("trying create")
      //todo: user api
      await userApi.signUp(username, email, firstName, lastName, password);

      await userApi.signIn(username, password);
      navigate("/time-track")
      //todo: 이거 로직 빼기
    } catch (e: any) {
      // console.clear();
      if (e.response) {
        console.warn("error", e.response.data.message);
        const status = e.response.status;
        if (status === 401) {
          const code: string = e.response.data.code;
          if (code.includes("credentials")) {
            alert("invalid email or password")
          } else {
            alert("unauthorized")
          }
          return
        }
      } else if(e.request) {
        alert("could not communicate with server")
      } else {
        alert("unknown error occurred")
      }
    }



    // navigate("/time-track")
  }

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
      <Title/>
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
      })}
             value={username}
             onChange={(event => setUsername(event.target.value))}
             placeholder={"username(user id)"} id={"sign-up-username"}/>
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
      })}
             value={email}
             onChange={(event => setEmail(event.target.value))}
             placeholder={"email"} id={"sign-up-email"}/>
      <div css={css({
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: new Pixel(280).toString(),
      })}>
        <div>
          <input css={css({
            width: new Pixel(135).toString(),
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
          })}
                 value={firstName}
                 onChange={(event => setFirstName(event.target.value))}
                 placeholder={"first name"} id={"sign-up-first-name"}/>
        </div>
        <div>
          <input css={css({
            width: new Pixel(135).toString(),
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
          })}
                 value={lastName}
                 onChange={(event => setLastName(event.target.value))}
                 placeholder={"last name"} id={"sign-up-last-name"}/>
        </div>
      </div>
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
      })}
             value={password}
             onChange={(event => setPassword(event.target.value))}
             type={'password'}
             placeholder={"password"} id={"password"}/>
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
      })}
             value={passwordConfirm}
             onChange={(event => setPasswordConfirm(event.target.value))}
             type={'password'}
             placeholder={"passwordConfirm"} id={"password check"}/>

      <div css={css({
        display: "flex",
        alignItems: "center",
        '.button-work': {
          backgroundColor: Colors.theme.main.work,
          border: "none",
          color: Colors.theme.button.default,
        },
        width: new Pixel(280).toString(),
        height: new Pixel(30).toString(),
        marginBottom: new Pixel(20).toString()
      })}>
        <button
          css={css({
            width: new Pixel(280).toString(),
            borderRadius: 7,
            height: new Pixel(30).toString(),

          })}
          className={'button-work'}
          type={"submit"}
          onClick={signUp}
        >sign up
        </button>
      </div>


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
      <span css={css({
        fontFamily: "Gaegu-Regular",
        color: Colors.theme.main.work
      })} onClick={() => navigate("/")}> Sign in</span>


    </div>
  </div>;

}

export default SignUpPage;

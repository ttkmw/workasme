import React, {useState} from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from "@emotion/react";
import Pixel from "src/graphic/size/pixel";
import Colors from "src/constants/Colors";
import Title from "src/pages/components/Title";
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {useInjection} from "inversify-react";
import AxiosProvider from "src/context/inversify/providers/AxiosProvider";


const SignInSection: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>("");
  const axiosProvider = useInjection(AxiosProvider);




  async function signIn() {
    const axiosInstance = axiosProvider.provide()
    axiosInstance.interceptors.response.use(function (response) {
      if (response.status === 400) {
        return;
      }
      return response;
    }, function (error) {
      // Do something with response error
      return;
    });
    //todo: try-catch
    let response;
    // axiosInstance.post(`${workasme_host}/iam/realms/bintegration/protocol/openid-connect/token`, {
    //   "username": email,
    //   "password": password,
    // }).then(response => {
    //     console.log('data', response.data)
    //   }
    // ).catch(error => {
    //   console.log('error', error.message)
    // });
    try {
      response = await axiosInstance.post(`/iam/realms/bintegration/protocol/openid-connect/token`, {
        "username": email,
        "password": password,
      });
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      localStorage.setItem("refresh_token", response.data.refresh_token)
      // dispatch(signInSlice({accessToken: accessToken}))
      console.log("axiosInstance", axiosInstance);
      console.log("header", axiosInstance.defaults.headers.common['Authorization']);
      navigate("/time-track")
      return;

    } catch (e: any) {
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
      console.clear();
    }
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
      })} value={email} onChange={(event) => {setEmail(event.target.value)}} placeholder={"email"} id={"sign-in-id"}/>

      <input css={css({
        width: new Pixel(280).toString(),
        height: new Pixel(38).toString(),
        borderWidth: new Pixel(1).toString(),
        borderStyle: "solid",
        borderColor: "rgb(219, 219, 219)",
        paddingLeft: new Pixel(7).toString(),
        borderRadius: new Pixel(1).toString(),
        ":focus-visible": {
          outline: "0px"
        },
        backgroundColor: "rgba(var(--b3f,250,250,250),1)",
        marginBottom: new Pixel(14).toString()
      })} value={password} onChange={(event => {setPassword(event.target.value)})} type={'password'} placeholder={"password"} id={"sign-in-password"}/>

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
            height: new Pixel(30).toString(),
            borderRadius: 7,

          })}
          className={'button-work'}
          type={"submit"}
          onClick={signIn}
        >

          sign in

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
      })}>no account yet?</span>
      <span css={css({
        fontFamily: "Gaegu-Regular",
        color: Colors.theme.main.work
      })} onClick={() => navigate("/sign-up")}> Join us</span>


    </div>

  </div>;
}

const SignInPage: React.FC = () => {
  return <div css={css({
    height: "100vh",
    fontFamily: "Gaegu-Regular",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
  })}>
    <div css={css({
      width: 500,
    })}>
      <Description/>
    </div>
    <SignInSection/>
  </div>
}

export default SignInPage;


const Description: React.FC = () => {
  return <div css={css({
    marginBottom: new Pixel(30).value,
    textAlign: 'center',
    fontSize: new Pixel(18).value,
    paddingLeft: new Pixel(24).value,
    paddingRight: new Pixel(24).value,
    minWidth: "500px"
  })}>
    <span>Make a goal, record, feedback.</span><br/>
    <span>You will definitely achieve your goal and feel good.</span><br/>
    <span>Maybe you feel blurred...</span><br/>
    <span>I can show you. work as me!</span>
  </div>
};

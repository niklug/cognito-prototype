import * as React from "react";
import styled from 'styled-components';
import { InputEmail, InputPassword } from '../Components'
import Router from 'next/router'
import Link from 'next/link'

// Amplify AWS Congnito
import Amplify, { Auth } from 'aws-amplify';
import CognitoConfig from '../Configs/Congnito.config';
Amplify.configure(CognitoConfig);

const Title = styled.h1`
  color: red;
`;

interface Props { }

interface State {
  email: string,
  password?: string,
  message?: string
}

class Login extends React.Component<Props, State> {

  constructor(props: any) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  componentDidMount() {
    // if user is logged in! go to the first page
    this.loadFacebookSDK();
    Auth.currentAuthenticatedUser()
      .then(() => {
        Router.push('/')
      }).catch(() => {
        // do nothing
      })
  }



  private _handleSubmit = (event) => {
    if (event) event.preventDefault()

    const { email, password } = this.state
    Auth.signIn(email, password).then(() => {
      this.setState({
        message: 'Successful'
      })
      window.location.replace('/');
    }).catch((response: any) => {
      if (response.message) {
        this.setState({
          message: response.message
        })
      }
    });

    // let challengeResponse = "5";

    // Auth.signIn(email)
    //   .then(user1 => {
    //     console.log('step 1');
    //     console.log(user1)
    //     if (user1.challengeName === 'CUSTOM_CHALLENGE') {
    //       Auth.sendCustomChallengeAnswer(user1, challengeResponse)
    //         .then(user2 => {
    //           console.log('step 2');
    //           console.log(user2);
    //           this.setState({
    //             message: 'Successful'
    //           })
    //           window.location.replace('/');
    //         })
    //         .catch(err => console.log(err));
    //     } else {
    //       console.log(user1);
    //     }
    //   })
    //   .catch(err => console.log(err));
  }

  private _handleOnChangeForm = (value?: string, name?: string) => {
    this.setState({ [name]: value })
  }




  ///////

  loadFacebookSDK() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 752772915092814,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.1'
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
  statusChangeCallback = response => {
    if (response.status === "connected") {
      this.handleResponse(response.authResponse);
    } else {
      this.handleError(response);
    }
  };

  checkLoginState = () => {
    window.FB.getLoginStatus(this.statusChangeCallback);
  };

  handleFacebookLogin = () => {
    window.FB.login(this.checkLoginState, { scope: "public_profile,email" });
  };

  handleError(error) {
    console.log(error);
  }

  async handleResponse(data) {
    console.log(data)
    const { email, accessToken: token, expiresIn } = data;
    const expires_at = expiresIn * 1000 + new Date().getTime();
    const user = { email };


    try {
      const response = await Auth.federatedSignIn(
        "facebook",
        { token, expires_at },
        user
      );
      console.log(response)
      this.setState({
        message: 'Successful'
      })
      // window.location.replace('/');
    } catch (e) {
      console.log('shit');
      this.handleError(e);
    }
  }

  //


  render() {
    const { message } = this.state
    return (
      <div>
        <Title>
          Login
        </Title>
        <Link href="/login-facebook">
          <a>Go to federated flows</a>
        </Link>
        {/* <Link href="https://d1d9aqe3vb4lx7.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=Facebook&redirect_uri=http://localhost:3000&response_type=code&client_id=6oclh8r8et8m5o37gjgbacckel&scope=aws.cognito.signin.user.admin email openid profile">
          <a >Log in with Facebook</a>
        </Link> */}
        {/* <Link href="#">
          <a onClick={this.handleFacebookLogin}>Log in with Facebook</a>
        </Link> */}

        <br></br>
        <br></br>
        <form onSubmit={this._handleSubmit}>
          <InputEmail
            name={'email'}
            onChange={(value?: string) => { this._handleOnChangeForm(value, 'email') }}
          />
          <InputPassword
            name={'password'}
            onChange={(value?: string) => { this._handleOnChangeForm(value, 'password') }}
          />
          <button type="submit" onClick={this._handleSubmit}>
            Login
          </button>

          {message &&
            <p style={{ color: 'red' }}>
              {message}
            </p>
          }
        </form>
        <Link href="/forget-password">
          <a>Forgot password</a>
        </Link>
      </div>
    )
  }
}


export default Login

import * as React from "react";
import styled from 'styled-components';
import Amplify, { Auth } from 'aws-amplify';
import CognitoConfig from '../Configs/Congnito.config';
Amplify.configure(CognitoConfig);

// Auth.configure({ oauth: CognitoConfig.Auth });

// To federated sign in from Facebook
class SignInWithFacebook extends React.Component {
  constructor(props) {
    super(props);

  }

  logOut() {
    const config = CognitoConfig.Auth;
    const {
      domain,
      redirectSignIn,
      scope,
      responseType } = config.oauth;

    const clientId = config.userPoolWebClientId;

    let redirect = redirectSignIn;

    redirect = 'http://localhost:3000';


    const logOutUrl = 'https://' + domain + '/logout?redirect_uri=' + redirect + '&response_type=' + responseType + '&client_id=' + clientId;


    //     https://d1d9aqe3vb4lx7.auth.us-east-1.amazoncognito.com/logout?
    // response_type=code&
    // client_id=6oclh8r8et8m5o37gjgbacckel&
    // redirect_uri=http://localhost:3000&
    // state=STATE&
    // scope=openid+profile+aws.cognito.signin.user.admin

    console.log(logOutUrl)

    // let header = new Headers({
    //   'Access-Control-Allow-Origin': '*'
    // });

    // fetch(logOutUrl, { header: header })
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })

    Auth.signOut()
      .then(() => {
        console.log('sign out ')
      })
      .catch((e) => {
        console.log('sign out error')
      })

    // window.location.href = logOutUrl;

    // Launch Google/Facebook login page
    // window.location.assign(url_to_google);
    // window.location.assign(url_to_facebook);
  }

  signIn() {
    const config = CognitoConfig.Auth;
    const {
      domain,
      redirectSignIn,
      scope,
      responseType } = config.oauth;

    const clientId = config.userPoolWebClientId;
    // The url of the Cognito Hosted UI
    const url = 'https://' + domain + '/login?redirect_uri=' + redirectSignIn + '&response_type=' + responseType + '&client_id=' + clientId;
    // If you only want to log your users in with Google or Facebook, you can construct the url like:
    const url_to_google = 'https://' + domain + '/oauth2/authorize?redirect_uri=' + redirectSignIn + '&response_type=' + responseType + '&client_id=' + clientId + '&identity_provider=Google';
    const url_to_facebook = 'https://' + domain + '/oauth2/authorize?redirect_uri=' + redirectSignIn + '&response_type=' + responseType + '&client_id=' + clientId + '&identity_provider=Facebook&scope=' + scope.join(" ");

    window.location.href = url_to_facebook;


    // Launch Google/Facebook login page
    // window.location.assign(url_to_google);
    // window.location.assign(url_to_facebook);
  }
  signUp() {
    const config = CognitoConfig.Auth;
    const {
      domain,
      redirectSignIn,
      scope,
      responseType } = config.oauth;

    const clientId = config.userPoolWebClientId;
    const url_to_facebook = 'https://' + domain + '/login?redirect_uri=' + redirectSignIn + '&response_type=' + responseType + '&client_id=' + clientId + '&identity_provider=Facebook&scope=' + scope.join(" ");;
    window.location.href = url_to_facebook;
  }


  render() {
    return (
      <div>
        <button onClick={this.signUp}>
          Sign up with Facebook
      </button>

        <button onClick={this.signIn}>
          Login with Facebook
      </button>

        <button onClick={this.logOut}>
          Log out from Facebook
      </button>
      </div>
    );
  }
}

export default SignInWithFacebook;
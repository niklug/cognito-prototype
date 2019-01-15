import * as React from "react";
import styled from 'styled-components';
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
  user: Object,
  token: string
}

class Index extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      user: {},
      token: ''
    }
  }


  componentDidMount() {
    // if user is logged in! go to the first page

    Auth.currentAuthenticatedUser()
      .then((response?: any) => {
        console.log(response)
        this.setState({
          user: response.attributes
        })
        //console.log('currentAuthenticatedUser: ' + JSON.stringify(response, null, 2))
        Auth.currentUserCredentials()
          .then((creds?: any) => {
            //console.log('currentUserCredentials: ' + JSON.stringify(creds, null, 2))
          }).catch(() => {
            // do nothing
          })

        Auth.currentSession()
          .then((session?: any) => {
            this.setState({
              token: session.idToken.jwtToken
            })
            //console.log('currentSession: ' + JSON.stringify(session, null, 2))
            // Auth.completeNewPassword(session, 'Nikolay1!', {})
            //   .then((res?: any) => {
            //     console.log(res)
            //   })
            //   .catch((e) => {
            //     console.log(e);
            //   })

          }).catch(() => {
            // do nothing
          })
      }).catch(() => {
        // do nothing
      })
    // let challengeResponse = "5";
    // Auth.signIn('mkorb@softserveinc.com')
    //   .then(user1 => {
    //     console.log('step 1');
    //     console.log(user1)
    //     if (user1.challengeName === 'CUSTOM_CHALLENGE') {
    //       Auth.sendCustomChallengeAnswer(user1, challengeResponse)
    //         .then(user2 => {
    //           console.log('step 2');
    //           console.log(user2);
    //         })
    //         .catch(err => console.log(err));
    //     } else {
    //       console.log(user1);
    //     }
    //   })
  }

  private _handleLogOut = () => {
    Auth.signOut()
      .then(() => {
        window.location.reload()
      })
      .catch(() => {
        window.location.reload()
      })
  }

  render() {
    const { user = {}, token = '' } = this.state
    return (
      <div>
        <Title>
          Welcome
        </Title>

        {user && user.email &&
          <div>
            <h2>
              You are logged in as {user.email}
            </h2>
            <b>Token: </b>{token}
            <br />
            <button
              onClick={this._handleLogOut}
            >
              Log out
            </button>
          </div>
        }

        {!user.email &&
          <div>
            <Link href="/login">
              <a>Login</a>
            </Link>
            <br />
            <Link href="/register">
              <a>register</a>
            </Link>
          </div>
        }
      </div>
    )
  }
}


export default Index

import * as React from "react";
import styled from 'styled-components';
import { InputEmail, InputPassword } from '../Components'


// Amplify AWS Congnito
import Amplify, { Auth } from 'aws-amplify';
import CognitoConfig from '../Configs/Congnito.config';
Amplify.configure(CognitoConfig);

const Title = styled.h1`
  color: red;
`;

interface Props {}

interface State {
  email: string,
  password: string,
  message?: string,
  user?: object,
  showRegister: boolean
  title: string
}

class Register extends React.Component<Props,State> {

  constructor(props:any){
    super(props)
    this.state = {
      email:'',
      password:'Password1!',
      user: {},
      showRegister: true,
      title: 'Register'
    }
  }

  private _handleSubmit = (event) => {
    if (event) event.preventDefault()

    const { email, password } = this.state
    Auth.signUp({
      username: email,
      password: password
    }).then((response)=>{
      console.log(response)
      this.setState({
        message: 'Successfully registered',
        showRegister: false
      });
      
      // sign in flow
      Auth.signIn(email,password).then(()=>{
        this.setState({
          message: 'Successfully logged',
          title: 'Log In'
        })
        console.log(response)
        //
        Auth.currentAuthenticatedUser()
        .then((response?:any)=>{
          this.setState({
            user: response.attributes,
            title: ''
          })
          window.location.replace('/');
        }).catch(()=>{
          // do nothing
        });

        Auth.currentUserCredentials()
        .then((creds?:any)=>{
          console.log('creds: ' + JSON.stringify(creds, null, 2))
        }).catch(()=>{
          // do nothing
        })
      }).catch((response:any)=>{
        if (response.message){
          this.setState({
            message: response.message
          })
        }
      })


    }).catch((response:any)=>{
      if (response.message){
        this.setState({
          message: response.message
        })
      }
    })
    ;
  }

  private _handleOnChangeForm = (value?:string,name?:string) => {
    this.setState({[name]: value})
  }

  render () {
    const { message, user, showRegister, title } = this.state
    return (
      <div>
        <Title>
          {title}
        </Title>
        {showRegister &&
        <form onSubmit={this._handleSubmit}>
          <InputEmail 
            name={'email'}
            onChange={(value?:string)=>{this._handleOnChangeForm(value,'email')}}
          />
       
          <button type="submit" onClick={this._handleSubmit}>
            Register
          </button>

          {message &&
            <p style={{color:'red'}}>
              {message}
            </p>
          }
        </form>
        }

        {user && user.email &&
          <div>
            <h2>
              You are logged in as {user.email}
            </h2>
          </div>
        }    
      </div>
    )
  }
}


export default Register

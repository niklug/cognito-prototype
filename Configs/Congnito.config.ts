const oauth = {
  // Domain name
  domain: 'd1d9aqe3vb4lx7.auth.us-east-1.amazoncognito.com',

  // Authorized scopes
  scope: ['email', 'openid', 'aws.cognito.signin.user.admin'],

  // Callback URL
  redirectSignIn: 'http://localhost:3000',

  // Sign out URL
  redirectSignOut: 'http://localhost:3000',

  // 'code' for Authorization code grant, 
  // 'token' for Implicit grant
  responseType: 'CODE',

  // optional, for Cognito hosted ui specified options
  options: {
    // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
    AdvancedSecurityDataCollectionFlag: false
  }
}


const CognitoConfig = {
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-east-1:ec58a8c3-7e7a-4b02-b67e-f45d960a0e79',
    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_Kb9aCR3dV',
    // OPTIONAL - Amazon Cognito Web Client ID
    userPoolWebClientId: '6oclh8r8et8m5o37gjgbacckel',
    oauth: oauth
  }

  // Auth: {
  //   // REQUIRED - Amazon Cognito Identity Pool ID
  //   identityPoolId: 'us-east-1:c5993f5c-8157-4376-b46a-b7ebad562b18',
  //   // REQUIRED - Amazon Cognito Region
  //   region: 'us-east-1',
  //   // OPTIONAL - Amazon Cognito User Pool ID
  //   userPoolId: 'us-east-1_9OXAv65qg',
  //   // OPTIONAL - Amazon Cognito Web Client ID
  //   userPoolWebClientId: '46t8d61qa22t58m1msnd2c0836',
  // oauth: oauth
  // }
}


export default CognitoConfig
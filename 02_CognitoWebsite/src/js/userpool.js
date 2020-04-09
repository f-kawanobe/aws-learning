const userPool = new AmazonCognitoIdentity.CognitoUserPool({
  UserPoolId: "[ユーザープールID]",
  ClientId: "[アプリクライアントID]"
});
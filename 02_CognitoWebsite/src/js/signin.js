window.onload = () => {
  document.querySelector("#signinButton").addEventListener("click", SignIn);
};

function SignIn(event) {
  document.querySelector("#error-message").style.display = "none";
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (!email | !password) return false;
    
  const authenticationData = { Username: email, Password: password };
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    
  const userData = { Username: email, Pool: userPool };
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      const idToken = result.getIdToken().getJwtToken();
      const accessToken = result.getAccessToken().getJwtToken();
      const refreshToken = result.getRefreshToken().getToken();
      console.log("idToken : " + idToken);
      console.log("accessToken : " + accessToken);
      console.log("refreshToken : " + refreshToken);
      
      window.alert("SUCCESS");
      window.location.href = './';
    },
    onFailure: (err) => {
      document.querySelector("#error-message").innerHTML = err.message;
      document.querySelector("#error-message").style.display = "block";
    }
  });
};
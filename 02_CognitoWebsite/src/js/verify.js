window.onload = () => {
  document.querySelector("#verifyButton").addEventListener("click", Verify);
};

function Verify(event) {
  document.querySelector("#error-message").style.display = "none";
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const code = document.querySelector("#code").value;

  if (!email | !code) return false;

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({ Username : email, Pool : userPool });
    
  cognitoUser.confirmRegistration(code, true, (err, result) => {
    if (err) {
      document.querySelector("#error-message").innerHTML = err.message;
      document.querySelector("#error-message").style.display = "block";
      return;
    } else {
      window.alert(result);
      window.location.href = './signin.html';
    }
  });
};
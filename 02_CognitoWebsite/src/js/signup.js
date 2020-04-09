const attributeList = [];

window.onload = () => {
  document.querySelector("#signupButton").addEventListener("click", SignUp);
};

function SignUp(event) {
  document.querySelector("#error-message").style.display = "none";
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const name = document.querySelector("#name").value;
  const password = document.querySelector("#password").value;

  if (!email | !name | !password) return false;

  const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute({ Name : "email", Value : email });
	const attributeName = new AmazonCognitoIdentity.CognitoUserAttribute({ Name : "name", Value : name });
  attributeList.push(attributeEmail);
  attributeList.push(attributeName);

  userPool.signUp(email, password, attributeList, null, (err, result) => {
	  if (err) {
      document.querySelector("#error-message").innerHTML = err.message;
      document.querySelector("#error-message").style.display = "block";
	  	return;
	  } else {
	    window.alert("SUCCESS");
      window.location.href = './verify.html';
	  }
  });
};
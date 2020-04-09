const cognitoUser = userPool.getCurrentUser();

const currentUserData = {};

window.onload = getUserAttribute;

function getUserAttribute() {

  if (cognitoUser != null) {
    cognitoUser.getSession((err, session) => {
      if (err) {
        console.log(err);
        window.location.href = './signin.html';
      } else {
        cognitoUser.getUserAttributes((err, result) => {
          if (err) {
            console.log(err);
            window.location.href = './signin.html';
          }
          result.forEach(row => {
            currentUserData[row.getName()] = row.getValue();
          });
          Object.keys(currentUserData).forEach(key => {
            document.querySelector(`#${key}`).value = currentUserData[key];
          });
          document.querySelector("#signout").style.display = "inline";
          document.querySelector("#signout").addEventListener("click", () => {
            cognitoUser.signOut();
            location.reload();
          });
        });
      }
    });
  } else {
    window.location.href = './signin.html';
  }
};
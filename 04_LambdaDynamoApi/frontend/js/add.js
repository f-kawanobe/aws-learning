window.onload = () => {
  document.querySelector("#button").addEventListener("click", API);
}

function API() {
  document.querySelector("#error-message").style.display = "none";
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${api}/item`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(xhr.response);
      window.alert("登録完了しました");
      window.location.href = "./";
    } else {
      document.querySelector("#error-message").innerHTML = xhr.response;
      document.querySelector("#error-message").style.display = "block";
    }
  };
  xhr.onerror = function (e) {
    document.querySelector("#error-message").innerHTML = "登録に失敗しました";
    document.querySelector("#error-message").style.display = "block";
  };
  const form1 = document.querySelector("#form1");
  xhr.send(new FormData(form1));
}

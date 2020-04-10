window.onload = () => {
  document.querySelector("#button").addEventListener("click", API);
}

function API() {
  $.ajax({
//    contentType : "application/json",
//    dataType : "json",
    type　: "GET",
    url　: "https://uu5r9327t3.execute-api.ap-northeast-1.amazonaws.com/Prod/",
    success : function(data) {
      console.log(data);
    },
    error : function(data) {
      console.error(data)
    }
  })

}
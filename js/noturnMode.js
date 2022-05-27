const body = document.querySelector("body")
const noturn = document.querySelector("#nightMode");
const th = document.querySelectorAll(".heads");
const tr = document.querySelector("tr");
noturn.addEventListener("change", function(){
  body.classList.toggle("noturnMode");

});

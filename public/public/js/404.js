
var data = JSON.parse(document.getElementById("gen").innerHTML);

/*
if (data == "user not found") {
  foo.innerHTML = "Пользователь не найден.";
} else if (data == "action not found") {
  foo.innerHTML = "Статья не найдена.";
}
*/
document.getElementById("back").addEventListener("click", () => {
  window.history.back();
});





document.body.removeChild(document.getElementById("gen"));
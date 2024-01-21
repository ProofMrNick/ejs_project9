
var data = JSON.parse(document.getElementById("gen").innerHTML);
var foo = document.getElementById("foo");


if (data == "user not found") {
  foo.innerHTML = "Пользователь не найден.";
} else if (data == "action not found") {
  foo.innerHTML = "Статья не найдена.";
}


document.body.removeChild(document.getElementById("gen"));
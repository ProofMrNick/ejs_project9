
var type = [];
var content = [];

var counter = 1;

var select = ["--Не выбрано--", "Основной текст", "Подзаголовок", "📷 Картинка", "🔗 Ссылка", "▎Сноска (цитата)", "💬 Подпись к картинке", "Микро-подзаголовок"];

var header = document.getElementById("header_input");
var image = document.getElementById("image_input");

var stuff = document.getElementById("creatorContent");
var preRoot = document.getElementById("pre-root");
var root = document.getElementById("root");

var save = document.getElementById("save");

var load = document.getElementById("notLoad");

function doThis() {

  var newImg = document.createElement("img");
  newImg.setAttribute("src", image.value);
  newImg.setAttribute("id", "newImg");
  preRoot.appendChild(newImg);

  var newH1 = document.createElement("h1");
  newH1.innerHTML = header.value;
  newH1.setAttribute("id", "newH1");
  preRoot.appendChild(newH1);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  today = dd + '.' + mm + '.' + yyyy;

  var newP = document.createElement("p");
  newP.innerHTML = "Опубликовано: " + today + " • " + "Создано на ://Конструктор";
  newP.setAttribute("id", "newP");
  preRoot.appendChild(newP);

  var date = new Date();
  var fullToday = today + ' ' + ((date.getHours() < 10)?'0':'') + date.getHours() +':'+ ((date.getMinutes() < 10)?'0':'') + date.getMinutes() + ':'+ ((date.getSeconds() < 10)?'0':'') + date.getSeconds();

  /*---------------*/

  /*Testing function goes here*/

  /*--------------*/

  for (var i = 0; i < counter; i++) {
    var elem = document.getElementsByClassName("typeN");
  try {

    if (elem[i].value == "📷 Картинка") {
      type.push("img");
    } else if (elem[i].value == "Подзаголовок") {
      type.push("h2")
    } else if (elem[i].value == "Основной текст") {
      type.push("p")
    } else if (elem[i].value == "▎Сноска (цитата)") {
      type.push("blockquote")
    } else if (elem[i].value == "🔗 Ссылка") {
      type.push("a")
    } else if (elem[i].value == "💬 Подпись к картинке") {
      type.push("h4");
    } else if (elem[i].value == "Микро-подзаголовок") {
      type.push("h3");
    } else if (elem[i].value == "--Не выбрано--") {
      type.push("nope")
    } 
  } catch {

  } 
  }

  for (var i = 0; i < counter; i++) {


   /* if (document.getElementsByClassName("sup")[i].value == "--Не выбрано--" || document.getElementsByClassName("lol")[i].value == null || document.getElementsByClassName("lol")[i].value == " ") {
    document.getElementsByClassName("lol")[i].remove();
  } */



  if (type[i] == "img") {

    content.push(document.getElementsByClassName("contentN")[i].value);

    if (!content[i]) {
      continue
    }

    var body = document.getElementById("body");
    var brN = document.createElement("br");
    var e = document.createElement(type[i]);
    e.setAttribute("src", content[i]);
    e.setAttribute("class", "createdI");
    root.appendChild(e);
    root.appendChild(brN);

  } else if (type[i] == "a") {

    content.push(document.getElementsByClassName("contentN")[i].value);

    if (!content[i]) {
      continue
    }

    var body = document.getElementById("body");
    var brN = document.createElement("br");
    var pN = document.createElement("h4");
    pN.setAttribute("class", "pN");
    pN.innerHTML = "» ";

    var e = document.createElement(type[i]);
    if (!content[i].includes("http")) {
      e.setAttribute("href", "https://" + content[i].trimStart());
    } else {
      e.setAttribute("href", content[i].trimStart());
    }
    e.innerHTML = content[i] + " ↗";
    e.setAttribute("class", "createdA");

    root.appendChild(pN);
    root.appendChild(e);
    root.appendChild(brN);

  } else if (type[i] == "nope") {

    content.push(" ");
    continue

  } else if (type[i] == "h2") {

    content.push(document.getElementsByClassName("contentN")[i].value);

    if (!content[i]) {
      continue
    }

    var body = document.getElementById("body");
    var brN = document.createElement("br");
    var e = document.createElement(type[i]);
    e.innerHTML = content[i];
    e.setAttribute("class", "createdH");
    root.appendChild(e);
    root.appendChild(brN);

  } else if (type[i] == "p") {

    content.push(document.getElementsByClassName("contentN")[i].value);

    if (!content[i]) {
      continue
    }

    var body = document.getElementById("body");
    var brN = document.createElement("br");
    var e = document.createElement(type[i]);
    e.innerHTML = content[i];
    e.setAttribute("class", "createdP");
    root.appendChild(e);
    root.appendChild(brN);

 } else if (type[i] == "blockquote") {

    content.push(document.getElementsByClassName("contentN")[i].value);

    if (!content[i]) {
      continue
    }

    var body = document.getElementById("body");
    var brN = document.createElement("br");
    var e = document.createElement(type[i]);
    e.innerHTML = content[i];
    e.setAttribute("class", "createdQ");
    root.appendChild(e);
    root.appendChild(brN);

  } else if (type[i] == "h4") {

    content.push(document.getElementsByClassName("contentN")[i].value);

    if (!content[i]) {
      continue
    }

    var body = document.getElementById("body");
    var brN = document.createElement("br");
    var e = document.createElement(type[i]);
    e.innerHTML = content[i];
    e.setAttribute("class", "createdH4");
    root.appendChild(e);
    root.appendChild(brN);

  } else if (type[i] == "h3") {

    content.push(document.getElementsByClassName("contentN")[i].value);

    if (!content[i]) {
      continue
    }

    var body = document.getElementById("body");
    var brN = document.createElement("br");
    var e = document.createElement(type[i]);
    e.innerHTML = content[i];
    e.setAttribute("class", "createdH3");
    root.appendChild(e);
    root.appendChild(brN);

  } 
}

  document.getElementById("addStuff").remove();
  stuff.remove();


  /*-------------*/

  return [today, fullToday, image.value.trim(), header.value.trim(), type, content]

}


/*addStuff() function goes here*/


function addStuff() {
  var newH = document.createElement("h2");
  var newT = document.createElement("textarea");
  var newI = document.createElement("select");
  var newH2 = document.createElement("h2");

  var newBr = document.createElement("br");

  var stuff = document.getElementById("creatorContent");
  var root = document.getElementById("root");

  newH2.setAttribute("class", "newH2");

  newH.setAttribute("class", "newH");
  newH.innerHTML = '<span id="green">:/</span>Создать новый элемент';

  newT.setAttribute("rows", "3");
  newT.setAttribute("cols", "45");
  newT.setAttribute("class", "contentN"); 

  newI.setAttribute("class", "typeN");
  newI.setAttribute("id", "input");
  newI.setAttribute("oninput", "changeInstructionN()");
  for (var i = 0; i < select.length; i++) {
    var option = document.createElement("option");
    option.value = select[i];
    option.text = select[i];

    if (i == 1) {
      option.setAttribute("id", "opt1");
    } else if (i == 2) {
      option.setAttribute("id", "opt2");
    } else if (i == 3) {
      option.setAttribute("id", "opt3");
    } else if (i == 4) {
      option.setAttribute("id", "opt4");
    } else if (i == 5) {
      option.setAttribute("id", "opt5");
    } else if (i == 6) {
      option.setAttribute("id", "opt6");
    } else if (i == 7) {
      option.setAttribute("id", "opt7")
    }

    newI.appendChild(option);
 }

  stuff.appendChild(newH);
  stuff.appendChild(document.createElement("br"));
  stuff.appendChild(newI);
  stuff.appendChild(document.createElement("br"));
  stuff.appendChild(newT);
  stuff.appendChild(document.createElement("br"));
  stuff.appendChild(newH2);

  counter++;
  return counter

}


function countWord() {
  var words = document.getElementById("header_input").value;
  var count = 0;
  var split = words.split('');
  for (var i = 0; i < split.length; i++) {
  if (split[i] != "") {
    count += 1;
   }
  }
  if (count > 50) {
    document.getElementById("count").innerHTML = 'Количество символов: ' + count + '<span id="green">/50</span>' + '  <span id="red" title="Превышен лимит символов">⚠</span>'

    load.setAttribute("id", "notLoad");
    load.removeAttribute("onclick");
    load.setAttribute("title", "⚠ Найдены ошибки в заполнении заголовка и/или изображения");

  } else if (!image.value) { 

    load.setAttribute("id", "notLoad");
    load.removeAttribute("onclick");
    load.setAttribute("title", "⚠ Найдены ошибки в заполнении заголовка и/или изображения");
    document.getElementById("count").innerHTML = 'Количество символов: ' + count + '<span id="green">/50</span>' + ' <span id="white"> </span>';

  } else if (!words) {

    load.setAttribute("id", "notLoad");
    load.removeAttribute("onclick");
    load.setAttribute("title", "⚠ Найдены ошибки в заполнении заголовка и/или изображения");
    document.getElementById("count").innerHTML = 'Количество символов: ' + count + '<span id="green">/50</span>' + ' <span id="white"> </span>';

  } else {
  document.getElementById("count").innerHTML = 'Количество символов: ' + count + '<span id="green">/50</span>' + ' <span id="white"> </span>';

   load.setAttribute("id", "do");
   load.removeAttribute("title");
   load.setAttribute("onclick", "doThis()")

  }
}


function countImage () {
  if (!image.value) {

    load.setAttribute("id", "notLoad");
    load.removeAttribute("onclick");
    load.setAttribute("title", "⚠ Найдены ошибки в заполнении заголовка и/или изображения");

  } else if (!header.value) {

    load.setAttribute("id", "notLoad");
    load.removeAttribute("onclick");
    load.setAttribute("title", "⚠ Найдены ошибки в заполнении заголовка и/или изображения");

  } else {

   load.setAttribute("id", "do");
   load.removeAttribute("title");
   //load.setAttribute("onclick", "doThis()")
   load.setAttribute("onclick", "pushNewAction()");
  }
}


/**/

function displayAlertBox() {

  if (prompt("Опишите возникшую проблему")) {
    alert("Спасибо, что помогаете улучшать работу проекта!");
  } else {
    alert("Сообщение не было отправлено.");
  }

}

/**/


function changeInstructionN() {

  var contentN = document.getElementsByClassName("contentN");
  var typeN = document.getElementsByClassName("typeN");
  var h2N = document.getElementsByClassName("newH2");

  for (var i = 0; i < counter; i++) {

    if (typeN[i].value == "Подзаголовок") {
      contentN[i].style.color = "#3EFF44";
      contentN[i].style.fontWeight = "bold";
      contentN[i].innerHTML = "";
      contentN[i].style.borderLeft = "none";
      contentN[i].style.paddingLeft = "0px";
      contentN[i].style.fontStyle = "normal";
      contentN[i].style.fontSize = "55px";

      h2N[i].innerHTML = '<span id="green">Введите подзаголовок в поле выше</span>';

    } else if (typeN[i].value == "Основной текст") {
      contentN[i].style.color = "black";
      contentN[i].style.fontWeight = "normal";
      contentN[i].innerHTML = "";
      contentN[i].style.borderLeft = "none";
      contentN[i].style.paddingLeft = "0px";
      contentN[i].style.fontStyle = "normal";
      contentN[i].style.fontSize = "45px";

      h2N[i].innerHTML = '<span id="green">Введите текст в поле выше. Если он состоит из нескольких абзацев, создайте несколько новых элементов — по одному на каждый абзац</span>';

    } else if (typeN[i].value == "📷 Картинка") {
      contentN[i].style.color = "#3EFF44";
      contentN[i].style.fontWeight = "normal";
      contentN[i].innerHTML = "";
      contentN[i].style.borderLeft = "none";
      contentN[i].style.paddingLeft = "0px";
      contentN[i].style.fontStyle = "normal";
      contentN[i].style.fontSize = "45px";

      h2N[i].innerHTML = '<span id="green">Введите адрес изображения в поле выше</span> (Картинка <span id="green">❯</span> Правая кнопка мыши <span id="green">❯</span> Копировать адрес картинки)';

    } else if (typeN[i].value == "🔗 Ссылка") {
      contentN[i].style.color = "black";
      contentN[i].style.fontWeight = "normal";
      contentN[i].innerHTML = "";
      contentN[i].style.borderLeft = "none";
      contentN[i].style.paddingLeft = "0px";
      contentN[i].style.fontStyle = "normal";
      contentN[i].style.fontSize = "45px";

      h2N[i].innerHTML = '<span id="green">Введите адрес ссылки в поле выше</span>';

    } else if (typeN[i].value == "▎Сноска (цитата)") {
      contentN[i].style.color = "#454545";
      contentN[i].style.fontWeight = "normal";
      contentN[i].innerHTML = "";
      contentN[i].style.borderLeft = "9px solid #3EFF44";
      contentN[i].style.paddingLeft = "10px";
      contentN[i].style.fontStyle = "italic";
      contentN[i].style.fontSize = "45px";

      h2N[i].innerHTML = '<span id="green">Введите текст сноски (цитаты) в поле выше</span>';

    } else if (typeN[i].value == "--Не выбрано--") {
      contentN[i].style.color = "black";
      contentN[i].style.fontWeight = "normal";
      contentN[i].innerHTML = "";
      contentN[i].style.borderLeft = "none";
      contentN[i].style.paddingLeft = "0px";
      contentN[i].style.fontStyle = "normal";
      contentN[i].style.fontSize = "45px";

      h2N[i].innerHTML = '<span id="green">Для начала выберите тип нового элемента</span> <span id="red" title="Не выбран тип элемента">⚠</span>';

    } else if (typeN[i].value == "💬 Подпись к картинке") {
      contentN[i].style.color = "#454545";
      contentN[i].style.fontWeight = "bold";
      contentN[i].innerHTML = "";
      contentN[i].style.borderLeft = "none";
      contentN[i].style.paddingLeft = "0px";
      contentN[i].style.fontStyle = "italic";
      contentN[i].style.fontSize = "45px";

      h2N[i].innerHTML = '<span id="green">Введите текст подписи для картинки в поле выше</span>';

  } else if (typeN[i].value == "Микро-подзаголовок") {
      contentN[i].style.color = "black";
      contentN[i].style.fontWeight = "bold";
      contentN[i].innerHTML = "";
      contentN[i].style.borderLeft = "none";
      contentN[i].style.paddingLeft = "0px";
      contentN[i].style.fontStyle = "normal";
      contentN[i].style.fontSize = "50px";

      h2N[i].innerHTML = '<span id="green">Введите текст микро-подзаголовка в поле выше</span>';

  }
  }
}



// Fetch API (sending new action to database)

function pushNewAction() {
  var dataArray = doThis();
  dataArray.unshift(prompt("Как Вы хотите назвать эту статью?", "Новая статья"));

  var action_to_send = {
    title: dataArray[0],
    today: dataArray[1],
    fullToday: dataArray[2],
    image: dataArray[3],
    header: dataArray[4],
    type: dataArray[5],
    content: dataArray[6],
    author_email: localStorage.getItem("logged"),
    pinned: false,
    stats: {
      views: [],
      likes: [],
      comms: [],
      downvotes: [],
      ratio: 0
    },
    add_info: [],
    action_hidden: false
  }

  //alert(JSON.stringify(action_to_send));

  fetch("/api", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      do: 'create_action',
      prov_data: action_to_send
    }) 
  })

    .then(function(res) {
      return res.json();
    })

    .then(function(res) {
      if (res == "action created successfully") {
        alert("Статья успешно создана");
        document.location.href = "/" + localStorage.getItem("logged");
      } else if (res !== "done") {
        alert("Что-то пошло не так...");
      }
    });
}
/* 
localStorage.setItem("logged", res.email);

const object_to_send = pushNewAction(title, today, fullToday, image, header, type, content);

fetch("/api", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(object_to_send) 
  })

    .then(function(res) {
      return res.json();
    })

    .then(function(res) {
      if (res) {
        alert("Аккаунт успешно создан. Теперь войдите в созданный аккаунт");
        document.location.reload()
      } else if (res !== true) {
        alert("Аккаунт с такой почтой уже существует");
      }
    });
*/
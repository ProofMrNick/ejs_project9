
autosize(document.querySelectorAll("textarea"));

var data = JSON.parse(document.getElementById("gen").innerHTML);

if (data == "new act" && localStorage.getItem("logged") == null) {
  document.location.href = "/login";
} else if (data !== "new act" && localStorage.getItem("logged") !== data.author_email) {
  document.location.href = "/login";
}

function leaveAlert(e) {
  e = e || window.event;
  if (e) {
      e.returnValue = "Вы уверены, что хотите закрыть вкладку? Ваш прогресс будет потерян.";
  }
  return "Вы уверены, что хотите закрыть вкладку? Ваш прогресс будет потерян."
}

window.addEventListener("beforeunload", leaveAlert);



var counter = 1;

var privacySett = "pub"
function privacyPub() {
  document.getElementById("inpPub").classList.add("chosenPrivacy");
  document.getElementById("inpPri").classList.remove("chosenPrivacy");
  privacySett = "pub";
}

function privacyPri() {
  document.getElementById("inpPri").classList.add("chosenPrivacy");
  document.getElementById("inpPub").classList.remove("chosenPrivacy");
  privacySett = "pri";
}

function toMain() {
  document.location.href = "/";
}

function toIndex() {
  document.location.href = "/login";
}

document.getElementById("top-right-btn-noborder").innerHTML = "<i class='material-symbols-outlined' style='margin-right:5%'>account_circle</i>" + JSON.parse(localStorage
.getItem("add_info")).name.split(" ")[0];



const instrObj = {
  txtP: "Введите текст в поле выше. Если он состоит из нескольких абзацев, создайте несколько новых элементов — по одному на каждый абзац",
  txtH1: "Введите текст подзаголовка в поле выше",
  txtI: "Вставьте ссылку на изображение из Интернета в поле выше",
  txtA: "Вставьте адрес ссылки в поле выше",
  txtQ: "Введите текст сноски (цитаты) в поле выше. Такие элементы привлекают внимание читатеоей выделенной полоской слева",
  txtH4: "Введите текст подписи к картинке в поле выше",
  txtH3: "Введите текст микро-подзаголовка в поле выше. Рекомендуется использовать для выделения подпунктов в статье"
}

const typeObj = {
    txtP: "p",
    txtH1: "h2",
    txtI: "img",
    txtA: "a",
    txtQ: "blockquote",
    txtH4: "h4",
    txtH3: "h3"
}



function changeInstr(elem) {
  txtarea = elem.parentElement.nextElementSibling;
  var classList = txtarea.classList;
  while (classList.length > 0) {
    classList.remove(classList.item(0));
  }
  txtarea.classList.add("textareaElement", "txtElem", elem.value);
  txtarea.nextElementSibling.innerHTML = instrObj[elem.value];
  autosize.update(txtarea);
}

function addElems() {
  var outDiv = document.createElement("div");
  outDiv.setAttribute("class", "newElem");

  var inDiv = document.createElement("div");
  inDiv.setAttribute("class", "innerElem");

  var h4 = document.createElement("h4");
  h4.innerHTML = ((counter < 10) ? "0" + counter : counter);

  var sel = document.createElement("select");
  sel.setAttribute("class", "selectElem");
  sel.setAttribute("oninput", "changeInstr(this)");

  var o1 = document.createElement("option");
  var o2 = document.createElement("option");
  var o3 = document.createElement("option");
  var o4 = document.createElement("option");
  var o5 = document.createElement("option");
  var o6 = document.createElement("option");
  var o7 = document.createElement("option");

  o1.value = "txtP"
  o1.innerHTML = "основной текст"
  sel.appendChild(o1);

  o2.value = "txtH1"
  o2.innerHTML = "подзаголовок"
  sel.appendChild(o2);

  o3.value = "txtI"
  o3.innerHTML = "картинка"
  sel.appendChild(o3);

  o4.value = "txtA"
  o4.innerHTML = "ссылка"
  sel.appendChild(o4);

  o5.value = "txtQ"
  o5.innerHTML = "сноска (цитата)"
  sel.appendChild(o5);

  o6.value = "txtH4"
  o6.innerHTML = "подпись к картинке"
  sel.appendChild(o6);

  o7.value = "txtH3"
  o7.innerHTML = "микро-подзаголовок"
  sel.appendChild(o7);

  var ta = document.createElement("textarea");
  ta.rows = "5";
  ta.classList.add("textareaElement", "txtElem");

  var p = document.createElement("p");
  p.setAttribute("class", "instrBody");
  p.innerHTML = instrObj.txtP;


  inDiv.appendChild(h4);
  inDiv.appendChild(sel);
  outDiv.appendChild(inDiv);
  outDiv.appendChild(ta);
  outDiv.appendChild(p);

  document.getElementById("items").insertBefore(outDiv, document.getElementById("addElem"));
  autosize(document.querySelectorAll("textarea"));
  counter++;
}



function collect() {
  var type = [];
  var content = [];

  var header = document.getElementById("h1Inp");
  var image = document.getElementById("imgInp");

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  today = dd + '.' + mm + '.' + yyyy;

  var date = new Date();
  var fullToday = today + ' ' + ((date.getHours() < 10)?'0':'') + date.getHours() +':'+ ((date.getMinutes() < 10)?'0':'') + date.getMinutes() + ':'+ ((date.getSeconds() < 10)?'0':'') + date.getSeconds();


  var selElem = document.getElementsByClassName("selectElem");
  var taElem = document.getElementsByClassName("txtElem");

  for (var i = 0; i < selElem.length; i++) {
    type.push(typeObj[selElem[i].value]);
    content.push(taElem[i].value.trim());
  }

  var dataArray = [today, fullToday, image.value.trim(), header.value.trim(), type, content]
  dataArray.unshift(
    ((document.getElementById("title").value.trim().length != 0) ? document.getElementById("title").value.trim() : "Новая статья")
  );

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
    action_hidden: ((privacySett == "pub") ? false : true)
  }

  return action_to_send
}


function preview() {
  if (document.getElementById("h1Inp").value.trim().length != 0 &&
      document.getElementById("imgInp").value.trim().length != 0) {
    var action_to_preview = collect();
    localStorage.setItem("preview_action", JSON.stringify(action_to_preview));
    window.open("/preview", "_blank");
  } else {
    alert("Отсутствует заголовок или обложка статьи");
  }
}



if (data !== "new act") {  
  document.getElementById("mainH1").innerHTML = "Редактирование статьи";
  document.getElementById("doPublish").innerHTML = "Сохранить";
  
  document.getElementById("h1Inp").value = data.header;
  document.getElementById("imgInp").value = data.image;
  autosize.update(document.getElementById("h1Inp"));
  autosize.update(document.getElementById("imgInp"));

  document.getElementById("title").value = data.title;
  (data.action_hidden) ? privacyPri() : privacyPub();

  document.getElementById("doPublish").setAttribute("onclick", "updateAction()");

  for (var i = 0; i < data.type.length; i++) {
    addElems();
    document.querySelectorAll(".selectElem")[i].value = 
    Object.keys(typeObj).find((key) => typeObj[key] == data.type[i]);
    document.querySelectorAll(".txtElem")[i].value = data.content[i];
    changeInstr(document.querySelectorAll(".selectElem")[i]);
    autosize.update(document.querySelectorAll(".txtElem")[i]);
  }  
} else {
  addElems();
}




// Fetch API (sending new action to database)

function pushNewAction() {
  if (localStorage.getItem("logged") != null) {
    
    var action_to_send = collect();
    window.removeEventListener("beforeunload", leaveAlert);

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
  } else {
    if (confirm("Невозможно опубликовать статью, так как Вы вышли из аккаунта. Нажмите ОК, чтобы вернуться на страницу входа и регистрации. Ваш прогресс будет потерян.")) {
      document.location.href = "/login";
    }
  }
  
}


function updateAction() {
  if (localStorage.getItem("logged") != null && localStorage.getItem("logged") == data.author_email) {

    var upd_data = collect();
    window.removeEventListener("beforeunload", leaveAlert);

    fetch("/api", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        do: 'update_action',
        old_header: data.header,
        prov_data: upd_data
      }) 
    })

      .then(function(res) {
        return res.json();
      })

      .then(function(res) {
        if (res == "action updated successfully") {
          alert("Статья успешно обновлена");
          document.location.href = "/" + localStorage.getItem("logged");
        } else if (res !== "done") {
          alert("Что-то пошло не так...");
        }
      });
  } else {
    if (confirm("Невозможно обновить статью, так как Вы вышли из аккаунта. Нажмите ОК, чтобы вернуться на страницу входа и регистрации. Эта статья останется без изменений.")) {
      document.location.href = "/login";
    }
  }
  
}





document.body.removeChild(document.getElementById("gen"));
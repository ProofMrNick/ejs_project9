
var data = JSON.parse(document.getElementById("gen").innerHTML);
var foo = document.getElementById("foo");

var screen = window.innerWidth;

if (localStorage.getItem("logged") !== data.email) {
  loadAccountView(data);
} else {
  loadAccountEdit(data);
}


function loadAccountView(details) {
  document.getElementById("main")
    .removeChild(document.getElementById("controls"));
  var header = document.getElementById("header");
  header.innerHTML = details.name.split(" ").join(" ");
  document.title = details.name.split(" ").join(" ") + " - конструктор";

  var paragraph = document.getElementById("paragraph");
  paragraph.innerHTML = "Статьи";

  var btn1 = document.createElement("button");
  var btn2 = document.createElement("button");
  var dv = document.createElement("div");

  if (localStorage.getItem("logged") != undefined) {
    btn1.innerHTML = "<i class='material-symbols-outlined' style='margin-right:5%'>account_circle</i>" + JSON.parse(localStorage
.getItem("add_info")).name.split(" ")[0];
    btn1.id = "btn1-noborder";
  } else {
    btn1.innerHTML = "стать автором";
    btn1.id = "btn1";
  }
  
  btn1.addEventListener("click", () => {
    document.location.href = "/login"
  });
  
  btn2.innerHTML = "для организаций";
  btn2.id = "btn2";
  
  dv.id = "dv";

  dv.appendChild(btn2);
  dv.appendChild(btn1);

  document.getElementById("head").appendChild(dv);
  
  document.body.removeChild(document.getElementById("outerMessage"));
  document.body.removeChild(document.getElementById("outerMessage2"));
  document.getElementById("head").removeChild(document
.getElementById("toWorkshop"));
  document.getElementById("head").removeChild(document
.getElementById("logOut"));
  
  document.querySelectorAll(".dv4")[0]
.removeChild(document.querySelectorAll(".pToWorkshop")[0]);
  document.querySelectorAll(".dv4")[1]
.removeChild(document.querySelectorAll(".pLogOut")[0]);
  document.querySelectorAll(".dv4")[3]
.removeChild(document.querySelectorAll(".pToWorkshop")[0]);
  
  var toLogInP = document.createElement("p");
  toLogInP.addEventListener("click", 
() => {document.location.href = "/login"});
  toLogInP.innerHTML = "на страницу входа и регистрации";
  document.querySelectorAll(".dv4")[3].appendChild(toLogInP);
  
  var content = document.getElementById("content");

  for (i = 0; i < details.actions.length; i++) {
    if (details.actions[i].action_hidden) { continue }
    var actionDivView = document.createElement("div");
    actionDivView.classList.add("actionDivView");
    actionDivView.setAttribute("data-header", "/" + details.email + "/" + details.actions[i].id + "/" + details.actions[i].add_info.dup);
    actionDivView.innerHTML = 
      `<div class="innerDiv"> \
        <h2 class="h2">Опубликовано: ${details.actions[i].today}</h2> \
        <h1 class="h1">${details.actions[i].header}</h1> \
        <div class="statsDiv"> \
          <p class="p"><i class='material-symbols-outlined' style='margin-right:4px'>favorite</i>${(details.actions[i].stats.likes.length > 0) ? details.actions[i].stats.likes.length : ""}</p> \
          <p class="p"><i class='material-symbols-outlined' style='margin-right:4px'>heart_broken</i>${(details.actions[i].stats.downvotes.length > 0) ? details.actions[i].stats.downvotes.length : ""}</p> \
        </div> \
      </div> \
      <img class="actionImg" src=${details.actions[i].image}>`
    content.appendChild(actionDivView);
  }
  
  for (let act of document.querySelectorAll(".actionDivView")) {
    act.style.width = (screen <= 800) ? "95%" : "77%";
  }

  for (let img of document.querySelectorAll(".actionImg")) {
    img.style.width = "23%";
  }
  
  content.style.width = (screen <= 800) ? "95%" : "75%";
  document.querySelectorAll(".h1").forEach((h) => {
    let string = h.innerHTML;
    h.innerHTML = (string.split("").length < 100) ? string : string.split("").slice(0, 100).join("") + "...";
  });
}


function loadAccountEdit(details) {
  var header = document.getElementById("header");
  header.innerHTML = "Привет, <span id='gold'>" + details.name.split(" ")[0] + "</span>!";

  var paragraph = document.getElementById("paragraph");
  paragraph.innerHTML = "Ваши статьи";

  var content = document.getElementById("content");
  
  for (i = 0; i < details.actions.length; i++) {
    var actionDiv = document.createElement("div");
    actionDiv.classList.add("actionDiv");
    actionDiv.setAttribute("data-header", "/" + details.email + "/" + details.actions[i].id + "/" + details.actions[i].add_info.dup);
    actionDiv.innerHTML = 
    `<div class="innerDiv"> \
      <div class="topDiv"> \
        <h2 class="h2">${details.actions[i].today} (в ${ details.actions[i].fullToday.split(" ")[1]})</h2> \
        <div class="infoDiv"> \
          <p class="bigP"><i class='material-symbols-outlined' style='margin-right:4px'>${(details.actions[i].action_hidden) ? "lock</i>Частная" : "lock_open</i>Публичная"}</p> \
          <p class="bigP"><i class='material-symbols-outlined' style='margin-right:4px'>${(details.actions[i].pinned) ? "keep</i>Закреплена" : "keep_off</i>Не закреплена"}</p> \
        </div> \
      </div> \
      <h1 class="h1">${details.actions[i].header}</h1> \
      <div class="statsDiv"> \
        <p class="p"><i class='material-symbols-outlined' style='margin-right:4px'>favorite</i>${(details.actions[i].stats.likes.length > 0) ? details.actions[i].stats.likes.length : ""}</p> \
        <p class="p"><i class='material-symbols-outlined' style='margin-right:4px'>heart_broken</i>${(details.actions[i].stats.downvotes.length > 0) ? details.actions[i].stats.downvotes.length : ""}</p> \
      </div> \
    </div> \
    <img class="actionImg" src=${details.actions[i].image}>`;
    content.appendChild(actionDiv);
  }

  document.getElementById("gold").addEventListener("click", () => {
    document.getElementById("outerMessage").style.display = "flex";
    document.getElementById("message").style.display = "flex";
    document.body.style.overflow = "hidden";
    document.getElementById("page").classList.add("blurredBody");
    document.querySelector("footer").classList.add("blurredBody");
    document.getElementById("newFname").value = details.name.split(" ")[0];
    document.getElementById("newLname").value = details.name.split(" ")
.slice(1).join(" ");
  });

  document.querySelectorAll(".h1").forEach((h) => {
    let string = h.innerHTML;
    h.innerHTML = (string.split("").length < 100) ? string : string.split("").slice(0, 100).join("") + "...";
  });
}

function loadAccountMOD(details) {
  // code for MOD
}


for (let img of document.querySelectorAll(".actionImg")) {
  if (!/\.(jpeg|jpg|png|gif)\b/i.test(img.src)) {
    img.src = "/img/corrupted-image.png";
  } 
}


var buttonsShown = false;
function checkStatus() {
  if (localStorage.getItem("logged") == data.email) {
    if (!["", undefined, null].includes(link) &&
        !["", undefined, null].includes(el)) {
      document.getElementById("controls").style.opacity = "1";
      buttonsShown = true;
      if (screen <= 800) {
        document.getElementById("controls").innerHTML = 
        `<button id="openArticle" onclick="openLink()"><i  class="material-symbols-outlined">open_in_browser</i>открыть</button> \
            <button id="changeStatus" onclick="updateLink()"><i  class="material-symbols-outlined">edit</i>редактировать</button> \
            <button id="deleteArticle" onclick="deleteLink()"><i  class="material-symbols-outlined">delete</i>удалить</button>`;
      } else {
        document.getElementById("controls").innerHTML = 
        `<button id="openArticle" onclick="openLink()"><i  class="material-symbols-outlined">open_in_browser</i><i id="hidden" class="material-symbols-outlined">add_circle</i>открыть статью</button> \
            <button id="changeStatus" onclick="updateLink()"><i  class="material-symbols-outlined">edit</i><i id="hidden" class="material-symbols-outlined">add_circle</i>редактировать статью</button> \
            <button id="deleteArticle" onclick="deleteLink()"><i  class="material-symbols-outlined">delete</i><i id="hidden" class="material-symbols-outlined">add_circle</i>удалить статью</button>`;
      }
    } else {
      buttonsShown = false;
      document.getElementById("controls").style.opacity = "0.63";
      document.getElementById("controls").innerHTML = 
      `<p id="temp">для начала работы выберите статью</p>`;
    }
  }
}


function logOut() {
  document.getElementById("lgOt").addEventListener("click", () => {
    localStorage.clear();
    document.location.href = "/login";
    document.location.replace("/login");
  });

  document.getElementById("cancelLgOt").addEventListener("click", () => {
    document.getElementById("outerMessage2").style.display = "none";
    document.getElementById("message2").style.display = "none";
    document.body.style.overflow = "auto";
    document.getElementById("page").classList.remove("blurredBody");
    document.querySelector("footer").classList.remove("blurredBody");
  });

  document.getElementById("outerMessage2").style.display = "flex";
  document.getElementById("message2").style.display = "flex";
  document.body.style.overflow = "hidden";
  document.getElementById("page").classList.add("blurredBody");
  document.querySelector("footer").classList.add("blurredBody");
}


function toWorkshop() {
  document.location.href = "/workshop";
}

function toMain() {
  document.location.href = "/";
}

function select(elem) {
  if (el == elem) {
    close();
  } else {
    document.querySelectorAll(".actionDiv").forEach((e) => {
      e.classList.remove("container-selected");
    });
    link = elem.getAttribute("data-header");
    el = elem;
    elem.classList.add("container-selected");
  }
  checkStatus();
}

function close() {
  if (el !== "") {
    document.querySelectorAll(".actionDiv").forEach((e) => {
      e.classList.remove("container-selected");
    });
    link = "";
    el.classList.remove("container-selected");
    el = "";
  }
  checkStatus();
}

function openLink(element) {
  link = (link == "") ? element.getAttribute("data-header") : link;
  document.location.href = link;
}

function updateLink() {
  document.location.href = link + "/workshop";
}

function deleteLink() {
  if (confirm("Вы действительно хотите удалить статью? Это действие необратимо.")) {

    fetch("/api", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      email_to_change: data.email,
      id_to_change: link.split("/")[2],
      dup_to_change: link.split("/")[3],
      do: "delete"
    }) 
  })

    .then(function(res) {
      return res.json();
    })

    .then(function(res) {
      if (res == 'deleted successfully') {
        document.location.reload();
      } else {
        alert("Возникла ошибка при удалении. Повторите попытку позже.");
      }
    })
    
  }
}

function searchParent(element) {
  while (element.parentElement) {
    element = element.parentElement;
    if (element.getAttribute("data-header") !== null) {
      return element
    }    
  }
  return false
}

var link = "";
var el = "";

window.onclick = e => {
  if (!e.target.hasAttribute("data-header")) {
    var call = searchParent(e.target);
    (call == false) ? close() : null
  }  
} 

document.querySelectorAll(".actionDiv").forEach((elem) => {
  elem.setAttribute("onclick", "select(this)");
  elem.setAttribute("ondblclick", "openLink(this)");
});

document.querySelectorAll(".actionDivView").forEach((elem) => {
  elem.addEventListener("click", () => {
    document.location.href = elem.getAttribute("data-header");
  });
});


function cancelNewFL() {
  document.getElementById("outerMessage").style.display = "none";
  document.getElementById("message").style.display = "none";
  document.getElementById("newFname").value = "";
  document.getElementById("newLname").value = "";
  document.body.style.overflow = "auto";
  document.getElementById("page").classList.remove("blurredBody");
  document.querySelector("footer").classList.remove("blurredBody");
}

function updateUserName() {
  var updFname = document.getElementById("newFname").value;
  var updLname = document.getElementById("newLname").value;

  fetch("/api", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      do: "update_name",
      new_name: updFname + " " + updLname,
      u_email: localStorage.getItem("logged")
    }) 
  })

    .then(function(res) {
      return res.json();
    })

    .then(function(res) {
      if (res == 'name updated successfully') {
        document.location.reload();
        localStorage.setItem("add_info", JSON.stringify({name: updFname + " " + updLname}));
      } else {
        alert("Возникла ошибка при обновлении данных.");
      }
    });
}



// Experimenting with responsive design 

function adjustSize() {
  screen = window.innerWidth;
  if (screen <= 800) {
    document.getElementById("head-image").src = "/img/box-full-dark-font.png";
    if (localStorage.getItem("logged") == data.email) {
      document.getElementById("controls").style.width = "96%";
      document.getElementById("logOut").innerHTML = 
        `<i class="material-symbols-outlined">logout</i>`;

      if (buttonsShown) {
        document.getElementById("controls").style.opacity = "1";
        document.getElementById("controls").innerHTML = 
        `<button id="openArticle" onclick="openLink()"><i  class="material-symbols-outlined">open_in_browser</i>открыть</button> \
            <button id="changeStatus" onclick="updateLink()"><i  class="material-symbols-outlined">edit</i>редактировать</button> \
            <button id="deleteArticle" onclick="deleteLink()"><i  class="material-symbols-outlined">delete</i>удалить</button>`;
      } else {
        document.getElementById("controls").style.opacity = "0.63";
        document.getElementById("controls").innerHTML = 
        `<p id="temp">для начала работы выберите статью</p>`;
      }
    }

    
    if ([null, undefined].includes(localStorage.getItem("logged"))) {
      document.getElementById("btn2").innerHTML = '<i class="material-symbols-outlined">more_horiz</i>';
    }
  } else {
    document.getElementById("head-image").src = "/img/logo-white.svg";
    if (localStorage.getItem("logged") == data.email) {
      document.getElementById("controls").style.width = "70%";
      document.getElementById("logOut").innerHTML = 
        `выйти из аккаунта<i id="hidden" class="material-symbols-outlined">add_circle</i><i class="material-symbols-outlined">logout</i>`;

      if (buttonsShown) {
        document.getElementById("controls").style.opacity = "1";
        document.getElementById("controls").innerHTML = 
        `<button id="openArticle" onclick="openLink()"><i  class="material-symbols-outlined">open_in_browser</i><i id="hidden" class="material-symbols-outlined">add_circle</i>открыть статью</button> \
            <button id="changeStatus" onclick="updateLink()"><i  class="material-symbols-outlined">edit</i><i id="hidden" class="material-symbols-outlined">add_circle</i>редактировать статью</button> \
            <button id="deleteArticle" onclick="deleteLink()"><i  class="material-symbols-outlined">delete</i><i id="hidden" class="material-symbols-outlined">add_circle</i>удалить статью</button>`;
      } else {
        document.getElementById("controls").style.opacity = "0.63";
        document.getElementById("controls").innerHTML = 
        `<p id="temp">для начала работы выберите статью</p>`;
      }
    }


    if ([null, undefined].includes(localStorage.getItem("logged"))) {
      document.getElementById("btn2").innerHTML = 'для организаций';
    }
  }
}

adjustSize();
window.addEventListener("resize", adjustSize);






document.body.removeChild(document.getElementById("gen"));
document.body.style.visibility = "visible";
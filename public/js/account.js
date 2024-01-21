
var data = JSON.parse(document.getElementById("gen").innerHTML);
var foo = document.getElementById("foo");

if (localStorage.getItem("logged") !== data.email) {
  loadAccountView(data);
} else {
  loadAccountEdit(data);
}


function loadAccountView(details) {
document.getElementById("main").removeChild(document.getElementById("controls"));
  var header = document.getElementById("header");
  header.innerHTML = details.name.split(" ").join(" ");

  var paragraph = document.getElementById("paragraph");
  paragraph.innerHTML = "Проекты";

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
  document.body.removeChild(document.getElementById("hov1"));
  document.body.removeChild(document.getElementById("hov2"));
  document.getElementById("head").removeChild(document
.getElementById("toWorkshop"));
  document.getElementById("head").removeChild(document
.getElementById("logOut"));
  document.querySelectorAll("tr")[0].removeChild(document
  .querySelectorAll("th")[0]);
  document.querySelectorAll("th")[0].innerHTML = "Предпросмотр"
  document.querySelectorAll("tr")[0].removeChild(document
.querySelectorAll("th")[3]);

  
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
  

  var table = document.getElementById("table");
  table.style.width = "75%";
  for (i = 0; i < details.actions.length; i++) {
    if (details.actions[i].action_hidden == false) {
      
      var tr = document.createElement("tr");
      var tdNu = document.createElement("td");
      var tdNa = document.createElement("td");
      var tdDa = document.createElement("td");
      var imgNu = document.createElement("img");
      
      imgNu.src = details.actions[i].image;
      imgNu.setAttribute("data-header", "/" + details.email + "/" + details.actions[i].header);
      imgNu.setAttribute("id", "imgNu");
      imgNu.setAttribute("alt", "Изображение повреждено или недоступно");
      tdNu.fontSize = "20px";
      tdNu.appendChild(imgNu);
      
      tdNa.innerHTML = details.actions[i].header;
      tdDa.innerHTML = details.actions[i].today;

      tdNu.setAttribute("data-header", "/" + details.email + "/" + details.actions[i].header);
      tdNa.setAttribute("data-header", "/" + details.email + "/" + details.actions[i].header);
      tdDa.setAttribute("data-header", "/" + details.email + "/" + details.actions[i].header);
  
      tr.appendChild(tdNu);
      tr.appendChild(tdNa);
      tr.appendChild(tdDa);

      tr.classList.add("trHover");
  
      table.appendChild(tr);
    }
    
  }  
}


function loadAccountEdit(details) {
  var header = document.getElementById("header");
  header.innerHTML = "Привет, <span id='gold'>" + details.name.split(" ")[0] + "</span>!";

  var paragraph = document.getElementById("paragraph");
  paragraph.innerHTML = "Ваши проекты";

  var table = document.getElementById("table");
  for (i = 0; i < details.actions.length; i++) {
    var tr = document.createElement("tr");
    var choice = document.createElement("td");
    var tdNu = document.createElement("td");
    var tdNa = document.createElement("td");
    var tdDa = document.createElement("td");
    var tdHi = document.createElement("td");

    choice.setAttribute("class", "choice");
    choice.setAttribute("onmouseover", "choiceTitleOn()");
    choice.setAttribute("onmouseout", "choiceTitleOff()");
    tdHi.setAttribute("onmouseover", "statusTitleOn()");
    tdHi.setAttribute("onmouseout", "statusTitleOff()");

    choice.innerHTML = "<input name='inputChoice' type='radio' class='inputChoice' onclick='boxSelected()' ondblclick='unCheck()'>";
    tdNu.innerHTML = i + 1 + "";
    tdNa.innerHTML = details.actions[i].title;
    tdDa.innerHTML = details.actions[i].fullToday;
    tdHi.innerHTML = (details.actions[i].action_hidden) ? "Частный" : "Публичный";

    tr.appendChild(choice);
    tr.appendChild(tdNu);
    tr.appendChild(tdNa);
    tr.appendChild(tdDa);
    tr.appendChild(tdHi);

    tr.classList.remove("trHover");
    
    table.appendChild(tr);
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
}

function loadAccountMOD(details) {
  // code for MOD
}

window.onclick = e => {
  if (e.target.hasAttribute("data-header")) {
    location.href = e.target.getAttribute("data-header");
  }
} 


var openArticle = document.getElementById("openArticle");
var changeStatus = document.getElementById("changeStatus");
var deleteArticle = document.getElementById("deleteArticle");

function unCheck() {
  for (var j = 0; j < document.querySelectorAll(".inputChoice").length; j++) {
    if (document.querySelectorAll(".inputChoice")[j].checked) {
      document.querySelectorAll(".inputChoice")[j].checked = false;
      document.getElementById("controls").style.opacity = "0.63";
      document.getElementById("temp").style.display = "block";
      openArticle.style.display = "none";
      changeStatus.style.display = "none";
      deleteArticle.style.display = "none";
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


function boxSelected() {  
  localStorage.removeItem("id");
  document.getElementById("controls").style.opacity = "1";
  document.getElementById("temp").style.display = "none";
  openArticle.style.display = "flex";
  changeStatus.style.display = "flex";
  deleteArticle.style.display = "flex";
}


function openThisArticle() {
    for (var j = 0; j < document.querySelectorAll(".inputChoice").length; j++) {
      if (document.querySelectorAll(".inputChoice")[j].checked) {
        unCheck();
        document.location.href = "/" + data.email + "/" + data.actions[j].header;
      }
  }
}


function changeArticleStatus() {
  for (var j = 0; j < document.querySelectorAll(".inputChoice").length; j++) {
      if (document.querySelectorAll(".inputChoice")[j].checked) {
        var i = Number(j);
      }
  }

  
  fetch("/api", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      email_to_change: data.email,
      what_to_change: data.actions[i].header,
      do: "change"
    }) 
  })

    .then(function(res) {
      return res.json();
    })

    .then(function(res) {
      if (res == 'changed successfully') {
        document.location.reload();
      } else {
        alert("Возникла ошибка при изменении статуса. Повторите попытку позже.");
        alert(res);
      }
    })
  
}


function deleteThisArticle() {
  for (var j = 0; j < document.querySelectorAll(".inputChoice").length; j++) {
      if (document.querySelectorAll(".inputChoice")[j].checked) {
        var i = Number(j)
      }
  }

  if (confirm("Вы действительно хотите удалить статью «" + data.actions[i].title + "»? Это действие необратимо.")) {

  
    fetch("/api", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      email_to_change: data.email,
      what_to_change: data.actions[i].header,
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


function choiceTitleOn() {
  var hov = document.getElementById("hov1");
  hov.style.display = "block";
  hov.style.pointerEvents = "none";
  hov.style.position = "fixed";

  document.addEventListener('mousemove', function(ev) {
    hov.style.transform = 'translateY(' + (ev.clientY - 10) + 'px)';
    hov.style.transform += 'translateX(' + (ev.clientX + 40) + 'px)'; 
  }, false);
}

function choiceTitleOff() {
  var hov = document.getElementById("hov1");
  hov.style.display = "none";
}


function statusTitleOn() {
  var hov = document.getElementById("hov2");
  hov.style.display = "block";
  hov.style.pointerEvents = "none";
  hov.style.position = "fixed";

  document.addEventListener('mousemove', function(ev) {
    hov.style.transform = 'translateY(' + (ev.clientY - 10) + 'px)';
    hov.style.transform += 'translateX(' + (ev.clientX - 460) + 'px)'; 
  }, false);
}


function statusTitleOff() {
  var hov = document.getElementById("hov2");
  hov.style.display = "none";
}


function supOn() {
  var hov = document.getElementById("hov3");
  hov.style.display = "block";
  hov.style.pointerEvents = "none";
  hov.style.position = "fixed";

  document.addEventListener('mousemove', function(ev) {
    hov.style.transform = 'translateY(' + (ev.clientY - 100) + 'px)';
    hov.style.transform += 'translateX(' + (ev.clientX - 460) + 'px)'; 
  }, false);
}

function supOff() {
  var hov = document.getElementById("hov3");
  hov.style.display = "none";
}





document.body.removeChild(document.getElementById("gen"));
document.body.style.visibility = "visible";
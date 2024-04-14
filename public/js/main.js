
function getData() {
  fetch("/api", {
  method: "POST", 
  headers: {
    "Content-Type": "application/json" 
  },
  body: JSON.stringify({
    do: "fetch_data",
    prov_data: sessionStorage.getItem("pageNum")
  }) 
})

  .then(function(res) {
    return res.json();
  })

  .then(function(res) {
    var mainContent = document.getElementById("mainContent");
    var pinnedContent = document.getElementById("pinnedContent");
    
    mainContent.innerHTML = '<h1 id="articlesAll">Статьи от сообщества</h1>';
    pinnedContent.innerHTML = '<h1 id="pinnedArticles">Закрепленные статьи</h1>';

    document.getElementById("pageP").innerHTML = "- " + sessionStorage.getItem("pageNum") + " -";

    fdUpdate();
    bkUpdate();

    for (var i = 0; i < res.length; i++) {
      var divOut = document.createElement("div");
      var divInn = document.createElement("div");
      var img = document.createElement("img");
      var h1 = document.createElement("h1");
      var h2 = document.createElement("a");
      var p = document.createElement("p");

      divOut.classList.add("divOut");
      divOut.setAttribute("id", sessionStorage.getItem("pageNum") + "_" + i);
      divOut.setAttribute("data-header", "/" + res[i].author_email + "/" + res[i].id + "/" + res[i].add_info.dup);

      divInn.classList.add("divInn");
      divInn.setAttribute("id", sessionStorage.getItem("pageNum") + "_" + i);
      divInn.setAttribute("data-header", "/" + res[i].author_email + "/" + res[i].id + "/" + res[i].add_info.dup);

      img.classList.add("img");
      img.setAttribute("id", sessionStorage.getItem("pageNum") + "_" + i);
      img.setAttribute("data-header", "/" + res[i].author_email + "/" + res[i].id + "/" + res[i].add_info.dup);

      h1.classList.add("h1");
      h1.setAttribute("id", sessionStorage.getItem("pageNum") + "_" + i);
      h1.setAttribute("data-header", "/" + res[i].author_email + "/" + res[i].id + "/" + res[i].add_info.dup);

      h2.classList.add("h2");
      p.classList.add("p");

      if (/\.(jpeg|jpg|png|gif)\b/i.test(res[i].image)) {
        img.src = res[i].image;
      } else {
        img.src = "/img/corrupted-image.png";
      }
      img.alt = "Изображение повреждено или недоступно.";
      h1.innerHTML = res[i].header;
      let string = h1.innerHTML;
      h1.innerHTML = (string.split("").length < 100) ? string : string.split("").slice(0, 100).join("") + "...";
      h2.innerHTML = res[i].author_name;
      h2.href = "/" + res[i].author_email;
      p.innerHTML = "Опубликовано: " + res[i].today;

      divInn.append(h2, h1, p);
      divOut.append(divInn, img);

      (res[i].pinned == true) ? 
        pinnedContent.append(divOut) : 
        mainContent.append(divOut);      
    }
  });
}

window.addEventListener("load", getData);
sessionStorage.setItem("pageNum", 1);


window.onclick = e => {
  if (e.target.hasAttribute("data-header")) {
    location.href = e.target.getAttribute("data-header");
  }
} 


var btn_top_rt = document.getElementById("top-right-btn");
if (localStorage.getItem("logged") != undefined) {
    btn_top_rt.innerHTML = "<i class='material-symbols-outlined' style='margin-right:5%'>account_circle</i>" + JSON.parse(localStorage
.getItem("add_info")).name.split(" ")[0];
  btn_top_rt.classList.remove("btn-outline");
} else {
  btn_top_rt.innerHTML = "стать автором";
  btn_top_rt.classList.add("btn-outline");
}

document.getElementById("main-logo").addEventListener("click", () => {
  document.location.href = "/";
});

document.getElementById("top-left-btn").addEventListener("click", () => {
  // document.location.href = "#";
});

document.getElementById("top-right-btn").addEventListener("click", () => {
  document.location.href = "/login";
});


var fd = document.getElementById("fd");
var bk = document.getElementById("bk");

function fdUpdate() {
  if (true) {
    fd.classList.remove("inactive");
    fd.classList.add("active");
  }
}

function bkUpdate() {
  if (Number(sessionStorage.getItem("pageNum")) > 1) {
    bk.classList.remove("inactive");
    bk.classList.add("active");
    bk.setAttribute("onclick", "requestArticlesBk()");
  } else {
    bk.classList.remove("active");
    bk.classList.add("inactive");
    bk.removeAttribute("onclick");
  }
}

function requestArticlesFd() {
  sessionStorage.setItem("pageNum", Number(sessionStorage.getItem("pageNum")) + 1);
  getData();
}

function requestArticlesBk() {
  if (Number(sessionStorage.getItem("pageNum")) > 1) {  
    sessionStorage.setItem("pageNum", Number(sessionStorage.getItem("pageNum")) - 1);
    getData();
  }
}


function toMain() {
  document.location.href = "/";
}

function toIndex() {
  document.location.href = "/login";
}



// Experimenting with responsive design 

var btnSwtF = document.getElementById("buttonSwitchF");
var btnSwtB = document.getElementById("buttonSwitchB");
btnSwtB.style.display = "none";

function adjustSize() {
  if (window.innerWidth <= 750) {
    btnSwtF.style.display = "flex";
    document.getElementById("top-left-btn").innerHTML = '<i class="material-icons">more_horiz</i>';
  } else {
    btnSwtF.style.display = "none";
    btnSwtB.style.display = "none";
    document.getElementById("top-left-btn").innerHTML = 'для организаций';
  }
}

function showNavBox() {
  btnSwtF.style.display = "none";
  btnSwtB.style.display = "flex";
  document.getElementById("navBox").style.display = "flex";
  document.getElementById("content").style.display = "none";
  document.getElementById("sortBox").style.display = "none";
  document.getElementById("bottomControls").style.display = "none"
}

function hideNavBox() {
  btnSwtB.style.display = "none";
  btnSwtF.style.display = "flex";
  document.getElementById("navBox").style.display = "none";
  document.getElementById("content").style.display = "flex";
  document.getElementById("sortBox").style.display = "flex";
  document.getElementById("bottomControls").style.display = "flex";
}

adjustSize();
window.addEventListener("resize", adjustSize);





document.body.style.visibility = "visible";
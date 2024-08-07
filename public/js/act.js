
var data = JSON.parse(document.getElementById("gen").innerHTML);


function doThis(today, image, header, type, content, author_email, likes, downvotes) {

  document.title = header + " - конструктор";

  var newP = document.createElement("a");
  newP.innerHTML = author_email + " · " + today;
  newP.setAttribute("id", "newP");
  newP.setAttribute("href", "/" + author_email);
  root.appendChild(newP);

  var newH1 = document.createElement("h1");
  newH1.innerHTML = header;
  newH1.setAttribute("id", "newH1");
  root.appendChild(newH1);

  var newImg = document.createElement("img");
  if (/\.(jpeg|jpg|png|gif)\b/i.test(image)) {
    newImg.setAttribute("src", image);
  } else {
    newImg.setAttribute("src", "/img/corrupted-image.png");
  }
  newImg.setAttribute("id", "newImg");
  root.appendChild(newImg);

  var middleDiv = document.createElement("div");
  middleDiv.id = "middleDiv";

  var likeButton = document.createElement("button");
  var shareButton = document.createElement("button");
  var downvoteButton = document.createElement("button");

  var likePlusDownvote = document.createElement("div");
  likePlusDownvote.id = "likePlusDownvote";
  
  likeButton.id = "likeButton";
  likeButton.innerHTML = "<i class='material-symbols-outlined' style='margin-right:20%'>favorite</i>" + likes.length;
  if (likes.includes(localStorage.getItem("logged"))) {
    likeButton.classList.add("like");
  } else {
    likeButton.classList.remove("like");
  }
  likeButton.addEventListener("click", like);

  downvoteButton.id = "downvoteButton";
  downvoteButton.innerHTML = "<i class='material-symbols-outlined' style='margin-right:20%'>heart_broken</i>" + downvotes.length;
  downvoteButton.innerHTML = "<i class='material-symbols-outlined' style='margin-right:20%'>heart_broken</i>" + downvotes.length;
  if (downvotes.includes(localStorage.getItem("logged"))) {
    downvoteButton.classList.add("downvote");
  } else {
    downvoteButton.classList.remove("downvote");
  }
  downvoteButton.addEventListener("click", downvote);

  likePlusDownvote.appendChild(likeButton);
  likePlusDownvote.appendChild(downvoteButton);
  
  shareButton.id = "shareButton";
  shareButton.innerHTML = "<i class='material-symbols-outlined' style='margin-right:5%'>ios_share</i>" + "Поделиться";
  shareButton.addEventListener("click", share);
  middleDiv.appendChild(likePlusDownvote);
  middleDiv.appendChild(shareButton);
  root.append(middleDiv);

  var counter = article.type.length;

  for (var i = 0; i < counter; i++) {

  if (type[i] == "img") {

    if (!content[i]) {
      continue
    }

    var body = document.getElementById("body");
    var brN = document.createElement("span");
    var e = document.createElement(type[i]);
    e.setAttribute("src", content[i]);
    e.setAttribute("class", "createdI");
    root.appendChild(e);
    if (i < type.length - 1) {
      if (type[i + 1] == "h4") {
        brN.style.margin = "1%";
      }
    }
    root.appendChild(brN);

  } else if (type[i] == "a") {

    if (!content[i]) {
      continue
    }

    var body = document.getElementById("body");
    var brN = document.createElement("span");
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
    e.setAttribute("target", "_blank");

    root.appendChild(pN);
    root.appendChild(e);
    root.appendChild(brN);

  } else if (type[i] == "nope") {

    continue

  } else if (type[i] == "h2") {

    if (!content[i]) {
      continue
    }

    var body = document.getElementById("body");
    var brN = document.createElement("span");
    var e = document.createElement(type[i]);
    e.innerHTML = content[i];
    e.setAttribute("class", "createdH");
    root.appendChild(e);
    root.appendChild(brN);

  } else if (type[i] == "p") {

    if (!content[i]) {
      continue
    }

    var body = document.getElementById("body");
    var brN = document.createElement("span");
    var e = document.createElement(type[i]);
    e.innerHTML = content[i];
    e.setAttribute("class", "createdP");
    root.appendChild(e);
    root.appendChild(brN);

 } else if (type[i] == "blockquote") {

    if (!content[i]) {
      continue
    }

    var body = document.getElementById("body");
    var brN = document.createElement("span");
    var e = document.createElement(type[i]);
    e.innerHTML = content[i];
    e.setAttribute("class", "createdQ");
    root.appendChild(e);
    root.appendChild(brN);

  } else if (type[i] == "h4") {

    if (!content[i]) {
      continue
    }

    var body = document.getElementById("body");
    var brN = document.createElement("span");
    var e = document.createElement(type[i]);
    e.innerHTML = content[i];
    e.setAttribute("class", "createdH4");
    if (i > 0) {
      if (type[i - 1] == "h4") {
        e.style.textAlign = "justify";
      }
    } 
    if (i < type.length - 1) {
      if (type[i + 1] == "h4") {
        e.style.textAlign = "justify";
        brN.style.margin = "1%";
      }
    }
    root.appendChild(e);
    root.appendChild(brN);

  } else if (type[i] == "h3") {

    if (!content[i]) {
      continue
    }

    var body = document.getElementById("body");
    var brN = document.createElement("span");
    var e = document.createElement(type[i]);
    e.innerHTML = content[i];
    e.setAttribute("class", "createdH3");
    root.appendChild(e);
    root.appendChild(brN);

  } 
}

}

var root = document.getElementById("root");
var article = data;

doThis(article.today, article.image, article.header, article.type, article.content, article.author_email, article.stats.likes, article.stats.downvotes);

if (data.action_hidden && localStorage.getItem("logged") !== data.author_email) {
  var blurryDiv = document.createElement("div");
  blurryDiv.id = "blurryDiv";
  
  var blurryH1 = document.createElement("h1");
  blurryH1.innerHTML = "Автор этой статьи предпочел скрыть ее";
  
  var blurryBtn = document.createElement("button");
  blurryBtn.innerHTML = "Вернуться назад";
  blurryBtn.addEventListener("click", () => {
    window.history.back();
  });

  blurryDiv.appendChild(blurryH1);
  blurryDiv.appendChild(blurryBtn);

  document.body.appendChild(blurryDiv);
  document.body.style.overflow = "hidden";
  
  /*
  document.getElementById("newH1").innerHTML = "Эта статья была скрыта ее автором. Вы не можете просмотреть ее содержимое.";
  document.getElementById("newImg").src = "/img/act_hidden_" +
["1", "2", "3"][Math.floor(Math.random() * 3)] + ".webp";
  */
  // remove all elements except for two first ones
}


document.getElementById("pre-root-back").addEventListener("click", () => {
  window.history.back();
})

function toMain() {
  document.location.href = "/";
}

function toIndex() {
  document.location.href = "/login";
}

function like() {
  if (![null, undefined].includes(localStorage.getItem("logged"))) {
    document.body.style.cursor = "progress";
    fetch("/api", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        do: 'like',
        prov_data: [localStorage.getItem("logged"), data.author_email, data.id, data.add_info.dup]
      }) 
    })
  
      .then(function(res) {
        return res.json();
      })
  
      .then(function(res) {
        document.body.style.cursor = "auto";
        var res = JSON.parse(res);
        document.getElementById("likeButton").innerHTML = "<i class='material-symbols-outlined' style='margin-right:20%'>favorite</i>" + res[0].length;
        document.getElementById("downvoteButton").innerHTML = "<i class='material-symbols-outlined' style='margin-right:20%'>heart_broken</i>" + res[1].length;
        if (res[0].includes(localStorage.getItem("logged"))) {
          document.getElementById("likeButton").classList
            .add("like");
        } else if (!(res[0].includes(localStorage.getItem("logged")))) {
          document.getElementById("likeButton").classList
            .remove("like");
        } 
        if (res[1].includes(localStorage.getItem("logged"))) {
          document.getElementById("downvoteButton").classList
            .add("downvote");
        } else if (!(res[1].includes(localStorage.getItem("logged")))) {
          document.getElementById("downvoteButton").classList
            .remove("downvote");
        }
      });
  } else {
    window.open("/login", "_blank");
  }
}


function downvote() {
  document.body.style.cursor = "progress";
  if (![null, undefined].includes(localStorage.getItem("logged"))) {
    fetch("/api", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        do: 'downvote',
        prov_data: [localStorage.getItem("logged"), data.author_email, data.id, data.add_info.dup]
      }) 
    })

      .then(function(res) {
        return res.json();
      })

      .then(function(res) {
        document.body.style.cursor = "auto";
        var res = JSON.parse(res);
        document.getElementById("likeButton").innerHTML = "<i class='material-symbols-outlined' style='margin-right:20%'>favorite</i>" + res[0].length;
        document.getElementById("downvoteButton").innerHTML = "<i class='material-symbols-outlined' style='margin-right:20%'>heart_broken</i>" + res[1].length;
        if (res[0].includes(localStorage.getItem("logged"))) {
          document.getElementById("likeButton").classList
            .add("like");
        } else if (!(res[0].includes(localStorage.getItem("logged")))) {
          document.getElementById("likeButton").classList
            .remove("like");
        } 
        if (res[1].includes(localStorage.getItem("logged"))) {
          document.getElementById("downvoteButton").classList
            .add("downvote");
        } else if (!(res[1].includes(localStorage.getItem("logged")))) {
          document.getElementById("downvoteButton").classList
            .remove("downvote");
        }
      });
  } else {
    window.open("/login", "_blank");
  }
}


function share() {
  navigator.clipboard.writeText(
    decodeURIComponent(document.location.href).replaceAll(" ", "%20")
  );
  document.getElementById("copySuccess").style.display = "flex";
  setTimeout(() => {
    document.getElementById("copySuccess").style.display = "none";
  }, 1500);
}

document.getElementById("top-right-btn").addEventListener("click", () => {
  document.location.href = "/login";
});
if (![null, undefined].includes(localStorage.getItem("logged"))) {
  document.getElementById("top-right-btn").innerHTML = "<i class='material-symbols-outlined' style='margin-right:5%'>account_circle</i>" + JSON.parse(localStorage
    .getItem("add_info")).name.split(" ")[0];
  document.getElementById("top-right-btn").id = "top-right-btn-noborder";
} else {
  document.getElementById("top-right-btn").innerHTML = "стать автором";
  document.getElementById("top-right-btn").id = "top-right-btn";
}



// Experimenting with responsive design 

function adjustSize() {
  var headImg = document.getElementById("head-image");
  var forOrgs = document.getElementById("top-left-btn");
  var head = document.getElementById("head");
  var outer = document.getElementById("outer");
  var root = document.getElementById("root");
  var nav = document.getElementById("nav");
  
  if (window.innerWidth <= 750) {
    headImg.src = "/img/box-full-dark-font.png";
    forOrgs.innerHTML = '<i class="material-icons">more_horiz</i>';
    (window.innerWidth >= 450)
      ? outer.style.margin = "0.5% 7.5% 0 7.5%"
      : outer.style.margin = "0.5% 6.5% 0 6.5%";
    (window.innerWidth <= 374) 
      ? nav.style.width = "100%" 
      : nav.style.width = "75%"; 
  } else if (window.innerWidth <= 1100) {
    headImg.src = "/img/logo-white.svg";
    forOrgs.innerHTML = "для организаций";
    root.style.marginRight = "2%";
    nav.style.width = "40%";
    head.style.padding = "1.5% 4.5% 0 4.5%";
    outer.style.margin = "0.5% 4.5% 0 4.5%";
  } else {
    headImg.src = "/img/logo-white.svg";
    forOrgs.innerHTML = "для организаций";
    nav.style.width = "34%";
    root.style.marginRight = "8%";
    head.style.padding = "1.5% 6.5% 0 6.5%";
    outer.style.margin = "0.5% 6.5% 0 6.5%";
  }
}

adjustSize();
window.addEventListener("resize", adjustSize);





document.body.removeChild(document.getElementById("gen"));
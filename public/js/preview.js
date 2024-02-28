
if (localStorage.getItem("preview_action") != null) {
  sessionStorage.setItem("preview_action", localStorage.getItem("preview_action"));
  localStorage.removeItem("preview_action");
}


function doThis(today, image, header, type, content, author_email) {

  document.title = header + " - конструктор";

  var newP = document.createElement("a");
  newP.innerHTML = author_email + " · " + today;
  newP.setAttribute("id", "newP");
  root.appendChild(newP);

  var newH1 = document.createElement("h1");
  newH1.innerHTML = header;
  newH1.setAttribute("id", "newH1");
  root.appendChild(newH1);

  var newImg = document.createElement("img");
  newImg.setAttribute("src", image);
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
  likeButton.innerHTML = "<i class='material-symbols-outlined' style='margin-right:20%'>favorite</i>" + 0;

  downvoteButton.id = "downvoteButton";
  downvoteButton.innerHTML = "<i class='material-symbols-outlined' style='margin-right:20%'>thumb_down</i>" + 0;
  downvoteButton.innerHTML = "<i class='material-symbols-outlined' style='margin-right:20%'>thumb_down</i>" + 0;

  likePlusDownvote.appendChild(likeButton);
  likePlusDownvote.appendChild(downvoteButton);

  shareButton.id = "shareButton";
  shareButton.innerHTML = "<i class='material-symbols-outlined' style='margin-right:5%'>ios_share</i>" + "Поделиться";
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
var article = JSON.parse(sessionStorage.getItem("preview_action"));

doThis(article.today, article.image, article.header, article.type, article.content, article.author_email);


document.getElementById("pre-root-back").addEventListener("click", function(event) {
   event.preventDefault(); 
   if (confirm("Закрыть вкладку предпросмотра?")) {
      window.close();
   }
});
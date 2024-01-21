
var body = document.getElementById("body");

var main1 = document.getElementById("main1");
var main2 = document.getElementById("main2");

main2.style.display = "none";

var logIn1 = document.getElementById("logIn1");
var signUp1 = document.getElementById("signUp1");

var logIn2 = document.getElementById("logIn2");
var signUp2 = document.getElementById("signUp2");

signUp1.addEventListener("click", function() {
  main1.style.display = "none";
  main2.style.display = "";
});

logIn2.addEventListener("click", function() {
  main1.style.display = "";
  main2.style.display = "none";
});

function toMainPage() {
  document.location.href = "/";
}


// Logging into an account automatically if the user has given their right to do so. Otherwise, asking for email and password

if (localStorage.getItem("logged") != null) {
  location.href = "/" + localStorage.getItem("logged");
}

//  Fetch API

function harvestData() {
  var name = document.getElementById("text2").value.trim();
  var email = document.getElementById("email2").value.trim();
  var password = document.getElementById("password2").value.trim();

  function convertForSending(name, email, password) {
    var object = {
      name: name,
      email: email,
      password: password,
      role: "user",
      add_info: [],
      actions: []
    }
    return object
  }

  if (name !== "" && email !== "" && password !== "") {
    const object_to_send = convertForSending(name, email, password);

    fetch("/api", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        do: 'signup',
        prov_data: object_to_send
      }) 
    })
  
      .then(function(res) {
        return res.json();
      })
  
      .then(function(res) {
        if (res == 'account created') {
          alert("Аккаунт успешно создан. Теперь войдите в созданный аккаунт");
          document.location.reload()
        } else {
          alert("Аккаунт с такой почтой уже существует");
        }
      });
  
    document.getElementById("text2").value = "";
    document.getElementById("email2").value = "";
    document.getElementById("password2").value = "";
  } else {
    alert("Невозможно зарегистрироваться, так как заполнены не все поля");
  }
}


function checkData() {
  var email = document.getElementById("email1").value.trim();
  var password = document.getElementById("password1").value.trim();

  function convertForSending(email, password) {
    var object = {
      email: email,
      password: password
    }
    return object
  }

  if (email !== "" && password !== "") {
    const object_to_send = convertForSending(email, password);
  
    fetch("/api", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        do: 'login',
        prov_data: object_to_send
      }) 
    })
  
      .then(function(res) {
        return res.json();
      })
  
      .then(function(res) {
        if (res == 'failed to login') {
          alert("Неверная почта и/или пароль");
        } else if (res.logged_in == true) {
            localStorage.setItem("logged", res.email);
            localStorage.setItem("add_info", JSON.stringify({name: res.name}));
          location.href = "/" + res.email;
        } else {
          alert(JSON.stringify(res));
        }
      });
  
    document.getElementById("email1").value = "";
    document.getElementById("password1").value = "";
  } else {
    alert("Невозможно войти, так как заполнены не все поля");
  }
}





document.body.style.visibility = "visible";
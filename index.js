var express = require('express');
var app = express();

const fs = require('fs');

const crypto = require("crypto-js");
const key = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public/img'));


var readData = new Promise(function(resolve, reject) {
  fs.readFile('./database.json', 'utf8', (err, data) => {
    if (err) {
      reject(new Error(`Error reading file from disk: ${err}`))
    } else {
      resolve(JSON.parse(data));
    }
  })
});


var writeData = function(dataToWrite) {
  return new Promise(function(resolve, reject) {
    readData.then(function(data) {
      var key = dataToWrite.email;
      if (!(key in data)) {
        data[key] = dataToWrite;
        data = JSON.stringify(data);
        fs.writeFile('./database.json', data, 'utf8', err => {
          if (err) {
            reject(new Error(`Error while writing to file: ${err}`));
          } else {
            resolve("account created");
          }
        });
      } else {
        reject("user already exists")
      }
    });
  })
} 



app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/login', function(req, res) {
  res.render('pages/login');
});

app.get('/workshop', function(req, res) {
  res.render('pages/workshop');
});


app.get('/:user_email_id', function(req, res) {
  fs.readFile('./database.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var dbase = JSON.parse(data);
      if (req.params.user_email_id in dbase) {
        res.render('pages/account', {
          data: JSON.stringify(dbase[req.params.user_email_id])
        });
      } else {
        res.render('pages/404', {
          data: JSON.stringify("user not found")
        });
      }
    }
  })
});


function lookup(data, source) { 
  var flag = false;
  for (var i = 0; i < data.length; i++) {
    if (data[i]["header"] == source) {
      flag = true
      break
    } 
  }
  
  if (flag) {
    var articles = []
    for (var i = 0; i < data.length; i++) {
      articles.push(data[i]["header"]);
    }
    return [true, data[articles.indexOf(source)], articles.indexOf(source)]
  } else {
    return [false]
  }
}

app.get('/:user_email_id/:action_name', function(req, res) {
  fs.readFile('./database.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
  } else {
    var dbase = JSON.parse(data);
    if (req.params.user_email_id in dbase) {
      var call = lookup(dbase[req.params.user_email_id].actions, req.params.action_name);
      if (call[0]) {
        dt = call[1];
        res.render('pages/act', {
          data: JSON.stringify(dt)
        });
      } else {
        res.render('pages/404', {
          data: JSON.stringify("action not found")
        });
      }
    } else {
      res.render('pages/404', {
        data: JSON.stringify("user not found")
      });
    }
    }
  })
});


app.use(express.json());

app.post("/api", function(req, res) {
  console.log(req.body);
  if (req.body.do == "signup") {
    
    writeData(req.body.prov_data)
      .then(
        result => res.json('account created'),
        error => res.json(error)
      );
    
  } else if (req.body.do == "login") {
    
    readData.then(function(dbase) {
      var key = req.body.prov_data.email;
      if (key in dbase && dbase[key].password == req.body.prov_data.password) {
        res.json({
          logged_in: true,
          email: key,
          name: dbase[key].name
        });
      } else {
        res.json("failed to login")
      }
    })
    
  } else if (req.body.do == "delete") {
    
    fs.readFile('./database.json', 'utf8', (error, data1) => {
      if (error) {
        res.json("failed to delete");
      } else {
        var dbase = JSON.parse(data1);
        var call = lookup(dbase[req.body.email_to_change].actions, req.body.what_to_change);
        if (call[0]) {
          dbase[req.body.email_to_change].actions.splice(call[2], 1);
          fs.writeFile('./database.json', JSON.stringify(dbase, null, 4), err => {
            if (err) {
              res.json("failed to delete");
            } else {
              res.json("deleted successfully");
            }
          });
        } else {
          res.json("failed to delete");
        }
      }
    }); 
    
  } else if (req.body.do == "change") {

    fs.readFile('./database.json', 'utf8', (error, data1) => {
      if (error) {
        res.json("failed to change");
      } else {
        var dbase = JSON.parse(data1);
        var call = lookup(dbase[req.body.email_to_change].actions, req.body.what_to_change);
        if (call[0]) {
          dbase[req.body.email_to_change].actions[call[2]].action_hidden = !dbase[req.body.email_to_change].actions[call[2]].action_hidden;
          fs.writeFile('./database.json', JSON.stringify(dbase, null, 4), err => {
            if (err) {
              res.json("failed to change");
            } else {
              res.json("changed successfully");
            }
          });
        } else {
          res.json("failed to change");
        }
      }
    }); 
    
  } else if (req.body.do == "create_action") {

    fs.readFile('./database.json', 'utf8', (error, data1) => {
      if (error) {
        res.json("failed to create action");
      } else {
        var dbase = JSON.parse(data1);
        dbase[req.body.prov_data.author_email].actions
.push(req.body.prov_data);
        fs.writeFile('./database.json', JSON.stringify(dbase, null, 4), err => {
          if (err) {
            res.json("failed to create action");
          } else {
            res.json("action created successfully");
          }
        });
      }
    });
    
  } else if (req.body.do == "update_name") {

    fs.readFile('./database.json', 'utf8', (error, data1) => {
      if (error) {
        res.json("failed to update name");
      } else {
        var dbase = JSON.parse(data1);
        dbase[req.body.u_email].name = req.body.new_name;
        fs.writeFile('./database.json', JSON.stringify(dbase, null, 4), err => {
          if (err) {
            res.json("failed to update name");
          } else {
            res.json("name updated successfully");
          }
        });
      }
    });
    
  } else if (req.body.do == "like") {

    fs.readFile('./database.json', 'utf8', (error, data1) => {
      if (error) {
        res.json("failed to like");
      } else {
        var dbase = JSON.parse(data1);
        var call = lookup(dbase[req.body.prov_data[1]].actions, req.body.prov_data[2]);
        if (call[0]) {
          var act_l =
    dbase[req.body.prov_data[1]].actions[call[2]].stats.likes;
          var act_d = 
    dbase[req.body.prov_data[1]].actions[call[2]].stats.downvotes;
          if (act_d.includes(req.body.prov_data[0]) && !(act_l.includes(req.body.prov_data[0]))) {
            act_d.splice(act_d.indexOf(req.body.prov_data[0]), 1);
            act_l.push(req.body.prov_data[0]);
          } else if (act_l.includes(req.body.prov_data[0])) {
            act_l.splice(act_l.indexOf(req.body.prov_data[0]), 1);
          } else {
            act_l.push(req.body.prov_data[0]);
          }
          fs.writeFile('./database.json', JSON.stringify(dbase, null, 4), err => {
            if (err) {
              res.json("failed to like");
            } else {
              res.json(JSON.stringify([act_l, act_d]));
            }
          });
        } else {
          res.json("failed to like");
        }
      }
    });
    
  } else if (req.body.do == "downvote") {

    fs.readFile('./database.json', 'utf8', (error, data1) => {
      if (error) {
        res.json("failed to downvote");
      } else {
        var dbase = JSON.parse(data1);
        var call = lookup(dbase[req.body.prov_data[1]].actions, req.body.prov_data[2]);
        if (call[0]) {
          var act_l =
    dbase[req.body.prov_data[1]].actions[call[2]].stats.likes;
          var act_d =
    dbase[req.body.prov_data[1]].actions[call[2]].stats.downvotes;
          if (act_l.includes(req.body.prov_data[0]) && !(act_d.includes(req.body.prov_data[0]))) {
            act_l.splice(act_l.indexOf(req.body.prov_data[0]), 1);
            act_d.push(req.body.prov_data[0]);
          } else if (act_d.includes(req.body.prov_data[0])) {
            act_d.splice(act_d.indexOf(req.body.prov_data[0]), 1);
          } else {
            act_d.push(req.body.prov_data[0]);
          }
          fs.writeFile('./database.json', JSON.stringify(dbase, null, 4), err => {
            if (err) {
              res.json("failed to downvote");
            } else {
              res.json(JSON.stringify([act_l, act_d]));
            }
          });
        } else {
          res.json("failed to downvote");
        }
      }
    });
    
  } else if (req.body.do == "fetch_data") {

    fs.readFile('./database.json', 'utf8', (error, data1) => {
    if (error) {
      res.json("failed to fetch");
    } else {
      var fetched = [];
      data = JSON.parse(data1);
      var keys = Object.keys(data);
      
      for (var m = 0; m < keys.length; m++) {
        for (var n = 0; n < data[keys[m]].actions.length; n++) {
          if (data[keys[m]].actions[n].action_hidden == false) {
            const currArt = structuredClone(data[keys[m]].actions[n]);
            currArt.author_name = data[keys[m]].name;
            fetched.push(currArt);
          }
        }
      }

      fetched.sort((a, b) => {
        let convertedDate = [];
        let dateParts = a.fullToday.split(' ');
        let date = dateParts[0].split('.');
        let time = dateParts[1].split(':');

        convertedDate.push(new Date(date[2], date[1] - 1, date[0], time[0], time[1], time[2]));

        dateParts = b.fullToday.split(' ');
        date = dateParts[0].split('.');
        time = dateParts[1].split(':');

        convertedDate.push(new Date(date[2], date[1] - 1, date[0], time[0], time[1], time[2]));

        return convertedDate[1] - convertedDate[0]
      });

      var perPage = 10;

      console.log(fetched.slice( Number(0 + (perPage * (Number(req.body.prov_data) - 1))), Number(perPage + (perPage * (Number(req.body.prov_data) - 1))) ));
      res.json(fetched.slice( Number(0 + (perPage * (Number(req.body.prov_data) - 1))), Number(perPage + (perPage * (Number(req.body.prov_data) - 1))) ));
      
    }
    });
    
  }
});






/*
// Importing the crypto module
const data = "This is the data that need to be encrypted";


// Encrypte the data
const encrypted = crypto.AES.encrypt(data, key).toString();

// Printing the encrypted data
console.log(encrypted);

// Decrypting the data
const decrypted = crypto.AES.decrypt(encrypted, key)
                  .toString(crypto.enc.Utf8);
console.log(decrypted);
*/





app.listen(8080);
console.log('Server is listening on port 8080');
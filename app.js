// jshint esversion : 6

const express = require("express");
const request = require("request");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

// var port = 3000;

app.listen(process.env.PORT || 3000, ()=>{
  console.log("server started");
});

app.get("/",(req,res)=>{
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",(req,res)=>{
  var fn = req.body.fname;
  var ln = req.body.lname;
  var em = req.body.email;
  var data = {
    members : [
     {
       email_address : em,
       status : "subscribed",
       merge_fields : {
         FNAME : fn,
         LNAME : ln
       }
     }
  ]

};

app.post("/failure",(req,res)=>{
  res.redirect("/");
});

var jsonData = JSON.stringify(data);

  var options = {
    url : "https://us20.api.mailchimp.com/3.0/lists/9ca0b4c3df",
    method : "POST",
    headers : {
        "Authorization" : "nava e7ca6923ee9f5da874253d853a18a7d4-us20"
    },
    body : jsonData
  };

  request(options,(error,response,body)=>{
      if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
  });
});

var express=require("express");
var bodyparser=require("body-parser");
var validation=require("validator");
var mysql=require("mysql");

var app=express();
app.use(bodyparser());

app.get("/",function(req,res){


  var html= '<form action="/validateform" method="post">' +
		'Enter Emp ID:<input type="int" name ="empId"/>' +
		'<br>Enter Emp Name:<input type="text" name="empName" placeholder="name"/>'+
            	'<br>Enter Email:<input type="text" name="email" placeholder="Email"/>' +
               	'<br> <button type="submit">Submit</button>' +
            '</form>';

 
  res.send(html);

});

  
app.post("/validateform",function(req,res){


    var html;
    var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'roshandell',
  database : 'db'
  });

  connection.connect();

  var empID=req.body.empId;
  var empName=req.body.empName;
  var Email=req.body.email;

  var check=false;
  
  /*function isEmail(mail){

    if()
  }*/

  if(!validation.isAlpha(empName))
  {
                //True or false return by this function.
                check = true;
          res.send("Please Enter your name in correct format");
  } 
  else if(!validation.isEmail(Email))
  {
                //True or false return by this function.
                check=true;
          res.send("Please Enter your email in correct format !");
  }  

  if(!check)
  {
      connection.query('insert into emp_table values ("'+empID+'","'+empName+'","'+Email+'");', function(err, rows, fields) 
      {
      
        if (!err)
        {
            html='Inserted sucessfully';
            res.send(html);
        }
        else
        console.log('Error while performing Query.');
      }
    );
  }

  connection.end();
  });

app.listen(8080);

//binayak.mishra@paytm.com
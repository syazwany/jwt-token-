// import express
const express = require('express')

//start listening on port 3000
const app = express()  
const port = 3000
const jwt = require('jsonwebtoken');

let dbUser = [ 
  {
    username: "Ahmad",
    password: "secret",
    name: "aaahmad",
    email: "ahmadpeaceyow@gmail.com"
  },
  {
    username: "gugugaga",
    password: "999",
    name: "lady gaga",
    email: "ladygagadarkweb@gmail.com"
    }
] 
// enable json body parsing
app.use(express.json());

app.get('/hello', verifyToken, (req, res) => {
  console.log(req, res)
  res.send('Hello World!')
});

app.post('/bye', (req, res) => { 
  res.send('Post request' + data)
});

app.post('/login', (req, res) => {
    let data = req.body
    const user = login(data.username, data.password);

    res.send(generateToken(user))
} );

//post route to register a new user
app.post('/register', (req, res) => {
  let data = req.body
  res.send(
    register(
      data.username,
      data.password,
      data.name,
      data.email
    )
  )
 });
 
 //start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

function login(username, password) {
  console.log("Someone try to login with", username, password) //apa yang user akan masukkan

  let matched = dbUser.find(element =>
    element.username == username 
    
  )

  if (matched) {
    if(matched.password == password) {
      return matched
    } else {
      return "Password not matched"
    }
  }
  else {
    return "Username not found"
  }
}

function register( newusername, newpassword, newname, newemail) {
  dbUser.find(element => { console.log(element) })  // find element dalam array
  dbUser.push({
    username: newusername,
    password: newpassword,
    name: newname,
    email: newemail
  })
  return "success"
}
   
//To generate JWT Token
function generateToken( userProfile ) {
  return jwt.sign({
    userProfile,
  }, 'secret' ,
     { expiresIn: 60*60}
  );
}

function verifyToken(req, res, next) {
  let header = req.headers.authorization 
  console.log(header)

  let token = header.split(" ")[1]

  jwt.verify(token, 'secret', function(err,decoded){
    if(err) {
      res.send("Invalid Token !")
    }
/*if(err) {
  res.send("Invalid Token !")
}
req.user = decoded
  jwt.verify(token, 'secret', function(err, decoded)
  { console.log(decoded)// bar*/

  req.user = decoded
  next()
});
}
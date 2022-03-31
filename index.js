const express = require("express");
const app = express();
const port = 3030;

const cors = require("cors");
const morgan = require("morgan");

const data = require("./data");
const { use } = require("express/lib/application");
const { users } = require("./data");
const req = require("express/lib/request");
const res = require("express/lib/response");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//GET Method with URL = Endpoint
app.get("/users", (req, res) => {
//list can be anything e.g. fred. Calling the users array within the data.js file 
  res.json({users: data.users})
})

//GET Method with URL = Endpoint
// id: is a route parameter
app.get("/users/:userId", (req, res) => {
  //console log to see if param object returns
  console.log(req.params)
  //getting the userId parameter
  const userId = parseInt(req.params.userId)
// we create a variable and find the user.id within user and assign it the userId variable
  const user = data.users.find(user => user.id === userId )

 res.json({user: user})
})

//POST Method with URL = Endpoint
app.post("/users/", (req, res) => {
  //console log to check if req.body is being retruned in gitbash
  console.log("are you here:", req.body)
//Create a newUser object to create an id and email
// id is length+1 to make sure everytime a new user is added a new id is created
  const newUser = {
    id: data.users.length+1,
    email: req.body.email 
  }
  //pushing the newUser object into the users array
  data.users.push(newUser)
  res.json({user:newUser})
})




/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

require("dotenv").config()
const express = require("express")
const app = express()
const { SESSION_SECRET, SERVER_PORT } = process.env
const session = require("express-session")
const userCtrl = require("./controllers/usersCtrl")

// -- MIDDLEWARE -- //

app.use(express.json())

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

app.use((req, res, next) => {
  if (!req.session.users) {
    req.session.users = []
  }
  next()
})


app.use(express.static(`${__dirname}`));

app.listen(SERVER_PORT, () => {
  console.log(`listening on port ${SERVER_PORT}`)
})

// -- MIDDLEWARE FUNCTION -- //
var myLogger = function (req, res, next) {
  console.log("LOGGED")
  next()
}


// -- ENDPOINTS -- //

app.get("/api/users", myLogger, userCtrl.getUsers)
app.post("/api/adduser", userCtrl.addUser)
app.get("/api/getuser", userCtrl.getUser)
const express = require("express")
const session = require("express-session")
const bodyParser = require("body-parser")
const path = require("path")
require("dotenv").config()

const config = require("./config")
const authRoutes = require("./routing/authRoutes")
const taskRoutes = require("./routing/taskRoutes")
const { initializeStore } = require("./store/dataStore")

const app = express()
const PORT = process.env.PORT || config.server.port

//EJS 
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))


app.use(session(config.session))


initializeStore()


app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)


app.get("/", (req, res) => {
  if (req.session.userId) {
    res.redirect("/tasks")
  } else {
    res.redirect("/auth/login")
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

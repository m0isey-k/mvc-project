const User = require("../models/User")
const { OK, BAD_REQUEST } = require("../constants/statusCode")

const authController = {
  showLogin: (req, res) => {
    res.render("auth/login", {
      title: "Login",
      error: null,
    })
  },

  showRegister: (req, res) => {
    res.render("auth/register", {
      title: "Register",
      error: null,
    })
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body

      const user = User.findByEmail(email)
      if (!user) {
        return res.status(BAD_REQUEST).render("auth/login", {
          title: "Login",
          error: "Invalid email or password",
        })
      }

      const isValidPassword = await User.validatePassword(password, user.password)
      if (!isValidPassword) {
        return res.status(BAD_REQUEST).render("auth/login", {
          title: "Login",
          error: "Invalid email or password",
        })
      }

      req.session.userId = user.id
      req.session.username = user.username
      res.redirect("/tasks")
    } catch (error) {
      res.status(BAD_REQUEST).render("auth/login", {
        title: "Login",
        error: "An error occurred during login",
      })
    }
  },

  register: async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body

      
      if (password !== confirmPassword) {
        return res.status(BAD_REQUEST).render("auth/register", {
          title: "Register",
          error: "Passwords do not match",
        })
      }

      if (User.findByEmail(email)) {
        return res.status(BAD_REQUEST).render("auth/register", {
          title: "Register",
          error: "User with this email already exists",
        })
      }

      const user = await User.create({ username, email, password })
      req.session.userId = user.id
      req.session.username = user.username
      res.redirect("/tasks")
    } catch (error) {
      res.status(BAD_REQUEST).render("auth/register", {
        title: "Register",
        error: "An error occurred during registration",
      })
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error during logout:", err)
      }
      res.redirect("/auth/login")
    })
  },
}

module.exports =  authController 
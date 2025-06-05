const User = require("../models/User")
const { OK, BAD_REQUEST } = require("../constants/statusCode")

const authController = {
  // Show login form
  showLogin: (req, res) => {
    const theme = req.session.theme || "light"
    res.render("auth/login", {
      title: "Login",
      error: null,
      theme: theme,
    })
  },

  // Show registration form
  showRegister: (req, res) => {
    const theme = req.session.theme || "light"
    res.render("auth/register", {
      title: "Register",
      error: null,
      theme: theme,
    })
  },

  // Login process
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const theme = req.session.theme || "light"

      const user = User.findByEmail(email)
      if (!user) {
        return res.status(BAD_REQUEST).render("auth/login", {
          title: "Login",
          error: "Invalid email or password",
          theme: theme,
        })
      }

      const isValidPassword = await User.validatePassword(password, user.password)
      if (!isValidPassword) {
        return res.status(BAD_REQUEST).render("auth/login", {
          title: "Login",
          error: "Invalid email or password",
          theme: theme,
        })
      }

      req.session.userId = user.id
      req.session.username = user.username
      res.redirect("/tasks")
    } catch (error) {
      const theme = req.session.theme || "light"
      res.status(BAD_REQUEST).render("auth/login", {
        title: "Login",
        error: "An error occurred during login",
        theme: theme,
      })
    }
  },

  // Registration
  register: async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body
      const theme = req.session.theme || "light"

      // Validation
      if (password !== confirmPassword) {
        return res.status(BAD_REQUEST).render("auth/register", {
          title: "Register",
          error: "Passwords do not match",
          theme: theme,
        })
      }

      if (User.findByEmail(email)) {
        return res.status(BAD_REQUEST).render("auth/register", {
          title: "Register",
          error: "User with this email already exists",
          theme: theme,
        })
      }

      const user = await User.create({ username, email, password })
      req.session.userId = user.id
      req.session.username = user.username
      res.redirect("/tasks")
    } catch (error) {
      const theme = req.session.theme || "light"
      res.status(BAD_REQUEST).render("auth/register", {
        title: "Register",
        error: "An error occurred during registration",
        theme: theme,
      })
    }
  },

  // Logout
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error during logout:", err)
      }
      res.redirect("/auth/login")
    })
  },
}

module.exports = authController

const User = require("../models/User")
const { BAD_REQUEST } = require("../constants/statusCode")

const authController = {
  showLogin: (req, res) => {
    const theme = req.session?.theme || "light"
    res.render("auth/login", {
      title: "Login",
      error: null,
      theme: theme,
    })
  },

  showRegister: (req, res) => {
    const theme = req.session?.theme || "light"
    res.render("auth/register", {
      title: "Register",
      error: null,
      theme: theme,
    })
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const theme = req.session?.theme || "light"

      if (!email || !password) {
        return res.status(BAD_REQUEST).render("auth/login", {
          title: "Login",
          error: "Email and password are required",
          theme: theme,
        })
      }

      const user = User.findByEmail(email.trim().toLowerCase())
      if (!user || !user.password) {
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
      req.session.email = user.email

      res.redirect("/tasks")
    } catch (error) {
      console.error("Login error:", error)
      const theme = req.session?.theme || "light"
      res.status(BAD_REQUEST).render("auth/login", {
        title: "Login",
        error: "An error occurred during login",
        theme: theme,
      })
    }
  },

  register: async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body
      const theme = req.session?.theme || "light"

      if (!username || !email || !password || !confirmPassword) {
        return res.status(BAD_REQUEST).render("auth/register", {
          title: "Register",
          error: "All fields are required",
          theme: theme,
        })
      }

      if (password !== confirmPassword) {
        return res.status(BAD_REQUEST).render("auth/register", {
          title: "Register",
          error: "Passwords do not match",
          theme: theme,
        })
      }

      if (password.length < 6) {
        return res.status(BAD_REQUEST).render("auth/register", {
          title: "Register",
          error: "Password must be at least 6 characters long",
          theme: theme,
        })
      }

      const trimmedEmail = email.trim().toLowerCase()
      const trimmedUsername = username.trim()

      if (User.findByEmail(trimmedEmail)) {
        return res.status(BAD_REQUEST).render("auth/register", {
          title: "Register",
          error: "User with this email already exists",
          theme: theme,
        })
      }

      if (User.findByUsername(trimmedUsername)) {
        return res.status(BAD_REQUEST).render("auth/register", {
          title: "Register",
          error: "Username is already taken",
          theme: theme,
        })
      }

      const user = await User.create({
        username: trimmedUsername,
        email: trimmedEmail,
        password,
      })

      req.session.userId = user.id
      req.session.username = user.username
      req.session.email = user.email

      res.redirect("/tasks")
    } catch (error) {
      console.error("Registration error:", error)
      const theme = req.session?.theme || "light"
      res.status(BAD_REQUEST).render("auth/register", {
        title: "Register",
        error: error.message || "An error occurred during registration",
        theme: theme,
      })
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) console.error("Logout error:", err)
      res.redirect("/auth/login")
    })
  },

  toggleTheme: (req, res) => {
    const currentTheme = req.session?.theme || "light"
    const newTheme = currentTheme === "light" ? "dark" : "light"

    if (!req.session) {
      req.session = {}
    }

    req.session.theme = newTheme
    res.redirect(req.get("Referer") || "/auth/login")
  },
}

module.exports = authController

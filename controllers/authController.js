const User = require("../models/User")
const { OK, BAD_REQUEST } = require("../constants/statusCode")

const authController = {
  //login form
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

  //Login 
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const theme = req.session?.theme || "light"

      console.log(`[Login] Attempt for email: ${email}`)

      if (!email || !password) {
        return res.status(BAD_REQUEST).render("auth/login", {
          title: "Login",
          error: "Email and password are required",
          theme: theme,
        })
      }

      const user = User.findByEmail(email.trim().toLowerCase())
      if (!user) {
        console.log(`[Login] User not found for email: ${email}`)
        return res.status(BAD_REQUEST).render("auth/login", {
          title: "Login",
          error: "Invalid email or password",
          theme: theme,
        })
      }

      if (!user.password) {
        console.error("[Login] User password is missing!")
        return res.status(BAD_REQUEST).render("auth/login", {
          title: "Login",
          error: "Account error. Please contact support.",
          theme: theme,
        })
      }

      const isValidPassword = await User.validatePassword(password, user.password)
      if (!isValidPassword) {
        console.log(`[Login] Invalid password for user: ${user.username}`)
        return res.status(BAD_REQUEST).render("auth/login", {
          title: "Login",
          error: "Invalid email or password",
          theme: theme,
        })
      }

      req.session.userId = user.id
      req.session.username = user.username
      req.session.email = user.email
      req.session.loginTime = new Date()

      console.log(`[Login] ✅ Setting session data:`)
      console.log(`[Login]    User ID: ${req.session.userId}`)
      console.log(`[Login]    Username: ${req.session.username}`)
      console.log(`[Login]    Session ID: ${req.sessionID}`)

      req.session.save((err) => {
        if (err) {
          console.error("[Login] Session save error:", err)
          return res.status(BAD_REQUEST).render("auth/login", {
            title: "Login",
            error: "Session error. Please try again.",
            theme: theme,
          })
        }

        console.log(`[Login] ✅ Session saved successfully for user: ${user.username}`)
        res.redirect("/tasks")
      })
    } catch (error) {
      console.error("[Login] Error:", error)
      const theme = req.session?.theme || "light"
      res.status(BAD_REQUEST).render("auth/login", {
        title: "Login",
        error: "An error occurred during login",
        theme: theme,
      })
    }
  },

  //Registration
  register: async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body
      const theme = req.session?.theme || "light"

      console.log(`[Register] Attempt for username: ${username}, email: ${email}`)

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

      console.log(`[Register] ✅ New user created: ${user.username} (ID: ${user.id})`)

      req.session.userId = user.id
      req.session.username = user.username
      req.session.email = user.email
      req.session.loginTime = new Date()

      req.session.save((err) => {
        if (err) {
          console.error("[Register] Session save error:", err)
          return res.status(BAD_REQUEST).render("auth/register", {
            title: "Register",
            error: "Session error. Please try again.",
            theme: theme,
          })
        }

        console.log(`[Register] ✅ Session saved successfully for new user: ${user.username}`)
        res.redirect("/tasks")
      })
    } catch (error) {
      console.error("[Register] Error:", error)
      const theme = req.session?.theme || "light"
      res.status(BAD_REQUEST).render("auth/register", {
        title: "Register",
        error: error.message || "An error occurred during registration",
        theme: theme,
      })
    }
  },

  //Logout
  logout: (req, res) => {
    const username = req.session?.username
    console.log(`[Logout] User logging out: ${username}`)

    req.session.destroy((err) => {
      if (err) {
        console.error("[Logout] Error during logout:", err)
      } else {
        console.log(`[Logout] ✅ User logged out successfully: ${username}`)
      }
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

    req.session.save((err) => {
      if (err) {
        console.error("[Theme] Error saving theme:", err)
      } else {
        console.log(`[Theme] ✅ Theme changed to: ${newTheme}`)
      }
      res.redirect(req.get("Referer") || "/auth/login")
    })
  },
}

module.exports = authController

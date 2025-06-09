const { UNAUTHORIZED } = require("../constants/statusCode")

const authMiddleware = (req, res, next) => {
  console.log(`\n[Auth Check] ${req.method} ${req.originalUrl}`)
  console.log(`[Auth Check] Session ID: ${req.sessionID}`)
  console.log(`[Auth Check] Session exists: ${!!req.session}`)

  if (req.session) {
    console.log(`[Auth Check] User ID in session: ${req.session.userId}`)
    console.log(`[Auth Check] Username in session: ${req.session.username}`)
  }

  if (req.session && req.session.userId) {
    console.log(`[Auth Check] ✅ User authenticated: ${req.session.username} (ID: ${req.session.userId})`)
    next()
  } else {
    console.log(`[Auth Check] ❌ User not authenticated, redirecting to login`)
    res.status(UNAUTHORIZED).redirect("/auth/login")
  }
}

module.exports = authMiddleware

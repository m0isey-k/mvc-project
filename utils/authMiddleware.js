const { UNAUTHORIZED } = require("../constants/statusCode")

const authMiddleware = (req, res, next) => {
  if (req.session.userId) {
    next()
  } else {
    res.status(UNAUTHORIZED).redirect("/auth/login")
  }
}

module.exports = authMiddleware

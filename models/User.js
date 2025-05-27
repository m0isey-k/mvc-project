const bcrypt = require("bcryptjs")
const { getUsers, getNextUserId } = require("../store/dataStore")

class User {
  constructor(username, email, password) {
    this.id = getNextUserId()
    this.username = username
    this.email = email
    this.password = password
    this.createdAt = new Date()
  }

  static async create(userData) {
    const { username, email, password } = userData
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User(username, email, hashedPassword)
    getUsers().push(user)

    return user
  }

  static findByEmail(email) {
    return getUsers().find((user) => user.email === email)
  }

  static findById(id) {
    return getUsers().find((user) => user.id === Number.parseInt(id))
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }

  toJSON() {
    const { password, ...userWithoutPassword } = this
    return userWithoutPassword
  }
}

module.exports = User

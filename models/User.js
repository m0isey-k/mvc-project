const bcrypt = require("bcryptjs")
const { getUsers, addUser } = require("../store/dataStore")

class User {
  constructor(username, email, password, id = null) {
    this.id = id
    this.username = username
    this.email = email
    this.password = password
    this.createdAt = new Date()
  }

  static async create(userData) {
    const { username, email, password } = userData

    if (User.findByEmail(email)) {
      throw new Error("User with this email already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const { getNextUserId } = require("../store/dataStore")

    const user = new User(username, email, hashedPassword, getNextUserId())

    console.log(`Creating user with hashed password: ${!!user.password}`)

    addUser(user)

    return user
  }

  static findByEmail(email) {
    const users = getUsers()
    const user = users.find((user) => user.email === email)
    if (user) {
      console.log(`Found user by email: ${user.username}, password exists: ${!!user.password}`)
    }
    return user
  }

  static findById(id) {
    const users = getUsers()
    return users.find((user) => user.id === Number.parseInt(id))
  }

  static findByUsername(username) {
    const users = getUsers()
    return users.find((user) => user.username === username)
  }

  static async validatePassword(plainPassword, hashedPassword) {
    if (!plainPassword || !hashedPassword) {
      console.error("validatePassword: Missing arguments", {
        plainPassword: !!plainPassword,
        hashedPassword: !!hashedPassword,
      })
      throw new Error("Missing password arguments")
    }
    return await bcrypt.compare(plainPassword, hashedPassword)
  }

  static getAllUsers() {
    return getUsers()
  }

  static getUserStats(userId) {
    const { getTasks } = require("../store/dataStore")
    const userTasks = getTasks().filter((task) => task.userId === Number.parseInt(userId))

    return {
      totalTasks: userTasks.length,
      completedTasks: userTasks.filter((task) => task.status === "completed").length,
      pendingTasks: userTasks.filter((task) => task.status === "pending").length,
      overdueTasks: userTasks.filter((task) => task.status === "overdue").length,
    }
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
    }
  }
}

module.exports = User

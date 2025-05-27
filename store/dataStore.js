const users = []

let nextUserId = 1

const initializeStore = () => {
  users.push({
    id: 1,
    username: "admin",
    email: "admin@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    createdAt: new Date(),
  })

}

const getUsers = () => users
const getNextUserId = () => nextUserId++


module.exports = {
  initializeStore,
  getUsers,
  getNextUserId,
}
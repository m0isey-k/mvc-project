const users = []
const tasks = []
let nextUserId = 1
let nextTaskId = 1

const initializeStore = () => {
  // Sample user
  users.push({
    id: 1,
    username: "admin",
    email: "admin@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    createdAt: new Date(),
  })

  // Sample tasks 
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(14, 30, 0, 0) 

  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  yesterday.setHours(10, 0, 0, 0) 

  const today = new Date(now)
  today.setHours(16, 0, 0, 0) 

  tasks.push(
    {
      id: 1,
      userId: 1,
      title: "Vacuum the living room",
      description: "Thoroughly vacuum the entire living room including under furniture",
      dueDate: tomorrow,
      status: "pending",
      createdAt: new Date(),
    },
    {
      id: 2,
      userId: 1,
      title: "Wash the dishes",
      description: "Clean all dishes from lunch",
      dueDate: yesterday,
      status: "pending",
      createdAt: new Date(),
    },
    {
      id: 3,
      userId: 1,
      title: "Do laundry",
      description: "Wash and hang clothes",
      dueDate: today,
      status: "completed",
      createdAt: new Date(),
    },
  )

  nextUserId = 2
  nextTaskId = 4
}

const getUsers = () => users
const getTasks = () => tasks
const getNextUserId = () => nextUserId++
const getNextTaskId = () => nextTaskId++

module.exports = {
  initializeStore,
  getUsers,
  getTasks,
  getNextUserId,
  getNextTaskId,
}

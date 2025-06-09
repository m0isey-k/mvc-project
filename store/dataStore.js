const fs = require("fs")
const path = require("path")

const DATA_DIR = path.join(__dirname, "data")
const USERS_FILE = path.join(DATA_DIR, "users.json")
const TASKS_FILE = path.join(DATA_DIR, "tasks.json")
const COUNTERS_FILE = path.join(DATA_DIR, "counters.json")

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

let counters = {
  nextUserId: 1,
  nextTaskId: 1,
}

const loadUsers = () => {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, "utf8")
      const users = JSON.parse(data)
      console.log(`Loaded ${users.length} users from file`)
      users.forEach((user, index) => {
        console.log(`User ${index}: ${user.username}, password exists: ${!!user.password}`)
      })
      return users
    }
  } catch (error) {
    console.error("Error loading users:", error)
  }
  return []
}

const loadTasks = () => {
  try {
    if (fs.existsSync(TASKS_FILE)) {
      const data = fs.readFileSync(TASKS_FILE, "utf8")
      const tasks = JSON.parse(data)
      return tasks.map((task) => ({
        ...task,
        dueDate: new Date(task.dueDate),
        createdAt: new Date(task.createdAt),
      }))
    }
  } catch (error) {
    console.error("Error loading tasks:", error)
  }
  return []
}

const loadCounters = () => {
  try {
    if (fs.existsSync(COUNTERS_FILE)) {
      const data = fs.readFileSync(COUNTERS_FILE, "utf8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Error loading counters:", error)
  }
  return { nextUserId: 1, nextTaskId: 1 }
}

const saveUsers = (users) => {
  try {
    const usersToSave = users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password, 
      createdAt: user.createdAt,
    }))

    console.log(`Saving ${usersToSave.length} users to file`)
    usersToSave.forEach((user, index) => {
      console.log(`Saving user ${index}: ${user.username}, password exists: ${!!user.password}`)
    })

    fs.writeFileSync(USERS_FILE, JSON.stringify(usersToSave, null, 2))
  } catch (error) {
    console.error("Error saving users:", error)
    throw error
  }
}

const saveTasks = (tasks) => {
  try {
    const tasksForStorage = tasks.map((task) => ({
      ...task,
      dueDate: task.dueDate.toISOString(),
      createdAt: task.createdAt.toISOString(),
    }))
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasksForStorage, null, 2))
  } catch (error) {
    console.error("Error saving tasks:", error)
    throw error
  }
}

const saveCounters = (counters) => {
  try {
    fs.writeFileSync(COUNTERS_FILE, JSON.stringify(counters, null, 2))
  } catch (error) {
    console.error("Error saving counters:", error)
    throw error
  }
}
let users = []
let tasks = []

const initializeStore = () => {
  users = loadUsers()
  tasks = loadTasks()
  counters = loadCounters()

  if (users.length === 0) {
    console.log("No existing users found, creating sample data...")
    createSampleData()
  } else {
    console.log(`Loaded ${users.length} users and ${tasks.length} tasks from storage`)
  }
}

const createSampleData = () => {
  // Sample user
  const sampleUser = {
    id: getNextUserId(),
    username: "admin",
    email: "admin@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    createdAt: new Date(),
  }
  users.push(sampleUser)

  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(14, 30, 0, 0) 

  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  yesterday.setHours(10, 0, 0, 0) 

  const today = new Date(now)
  today.setHours(16, 0, 0, 0) 

  const sampleTasks = [
    {
      id: getNextTaskId(),
      userId: sampleUser.id,
      title: "Vacuum the living room",
      description: "Thoroughly vacuum the entire living room including under furniture",
      dueDate: tomorrow,
      status: "pending",
      createdAt: new Date(),
    },
    {
      id: getNextTaskId(),
      userId: sampleUser.id,
      title: "Wash the dishes",
      description: "Clean all dishes from lunch",
      dueDate: yesterday,
      status: "pending",
      createdAt: new Date(),
    },
    {
      id: getNextTaskId(),
      userId: sampleUser.id,
      title: "Do laundry",
      description: "Wash and hang clothes",
      dueDate: today,
      status: "completed",
      createdAt: new Date(),
    },
  ]

  tasks.push(...sampleTasks)

  saveUsers(users)
  saveTasks(tasks)
  saveCounters(counters)

  console.log("Sample data created and saved")
}

const getUsers = () => users

const getTasks = () => tasks

const getNextUserId = () => {
  const id = counters.nextUserId++
  saveCounters(counters)
  return id
}

const getNextTaskId = () => {
  const id = counters.nextTaskId++
  saveCounters(counters)
  return id
}

const addUser = (user) => {
  console.log(`Adding user to storage: ${user.username}, password exists: ${!!user.password}`)
  users.push(user)
  saveUsers(users)
  return user
}

const addTask = (task) => {
  tasks.push(task)
  saveTasks(tasks)
  return task
}

const updateTask = (taskId, updates) => {
  const taskIndex = tasks.findIndex((task) => task.id === Number.parseInt(taskId))
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates }
    saveTasks(tasks)
    return tasks[taskIndex]
  }
  return null
}

const deleteTask = (taskId) => {
  const taskIndex = tasks.findIndex((task) => task.id === Number.parseInt(taskId))
  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1)[0]
    saveTasks(tasks)
    return deletedTask
  }
  return null
}

module.exports = {
  initializeStore,
  getUsers,
  getTasks,
  getNextUserId,
  getNextTaskId,
  addUser,
  addTask,
  updateTask,
  deleteTask,
}

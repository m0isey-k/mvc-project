const { getTasks, getNextTaskId } = require("../store/dataStore")
const { PENDING, COMPLETED, OVERDUE } = require("../constants/taskStatus")


class Task {
  constructor(userId, title, description, dueDate) {
    this.id = getNextTaskId()
    this.userId = userId
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.status = PENDING
    this.createdAt = new Date()
  }
  static create(taskData) {
    const { userId, title, description, dueDate } = taskData
    const task = new Task(userId, title, description, dueDate)
    getTasks().push(task)
    return task
  }

  static findByUserId(userId) {
    return getTasks().filter((task) => task.userId === Number.parseInt(userId))
  }

  static findById(id) {
    return getTasks().find((task) => task.id === Number.parseInt(id))
  }

  static updateStatus(id, status) {
    const task = this.findById(id)
    if (task) {
      task.status = status
      return task
    }
    return null
  }

  static delete(id) {
    const tasks = getTasks()
    const index = tasks.findIndex((task) => task.id === Number.parseInt(id))
    if (index !== -1) {
      return tasks.splice(index, 1)[0]
    }
    return null
  }

  static getTasksWithStatus(userId, sortBy = "date_asc") {
    const userTasks = this.findByUserId(userId)
    const today = new Date().toISOString().split("T")[0]

    // Update 
    userTasks.forEach((task) => {
      if (task.status === PENDING && task.dueDate < today) {
        task.status = OVERDUE
      }
    })
    // Sort 
    return this.sortTasks(userTasks, sortBy)
  }

  static sortTasks(tasks, sortBy) {
    switch (sortBy) {
      case "date_asc":
        return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      case "date_desc":
        return tasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
      case "status":
        const statusOrder = { [OVERDUE]: 0, [PENDING]: 1, [COMPLETED]: 2 }
        return tasks.sort((a, b) => statusOrder[a.status] - statusOrder[b.status])
      case "title":
        return tasks.sort((a, b) => a.title.localeCompare(b.title))
      default:
        return tasks
    }
  }
}

module.exports = Task
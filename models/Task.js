const { getTasks, addTask, updateTask, deleteTask } = require("../store/dataStore")
const { PENDING, COMPLETED, OVERDUE } = require("../constants/taskStatus")

class Task {
  constructor(userId, title, description, dueDate, id = null) {
    this.id = id
    this.userId = userId
    this.title = title
    this.description = description
    this.dueDate = new Date(dueDate)
    this.status = PENDING
    this.createdAt = new Date()
  }

  static create(taskData) {
    const { userId, title, description, dueDate } = taskData
    const { getNextTaskId } = require("../store/dataStore")

    const task = new Task(userId, title, description, dueDate, getNextTaskId())

    addTask(task)

    return task
  }

  static findByUserId(userId) {
    const tasks = getTasks()
    return tasks.filter((task) => task.userId === Number.parseInt(userId))
  }

  static findById(id) {
    const tasks = getTasks()
    return tasks.find((task) => task.id === Number.parseInt(id))
  }

  static updateStatus(id, status) {
    const task = this.findById(id)
    if (task) {
      const updatedTask = updateTask(id, { status })
      return updatedTask
    }
    return null
  }

  static delete(id) {
    const task = this.findById(id)
    if (task) {
      return deleteTask(id)
    }
    return null
  }

  static getTasksWithStatus(userId, sortBy = "date_asc") {
    const userTasks = this.findByUserId(userId)
    const now = new Date()

    let hasChanges = false
    userTasks.forEach((task) => {
      if (task.status === PENDING && new Date(task.dueDate) < now) {
        task.status = OVERDUE
        updateTask(task.id, { status: OVERDUE })
        hasChanges = true
      }
    })

    if (hasChanges) {
      console.log("Updated overdue tasks status")
    }
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

  static searchTasks(userId, searchTerm) {
    const userTasks = this.findByUserId(userId)
    const term = searchTerm.toLowerCase().trim()

    if (!term) {
      return userTasks
    }

    return userTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(term) || (task.description && task.description.toLowerCase().includes(term)),
    )
  }

  static getTaskStats(userId) {
    const userTasks = this.findByUserId(userId)

    return {
      total: userTasks.length,
      completed: userTasks.filter((task) => task.status === COMPLETED).length,
      pending: userTasks.filter((task) => task.status === PENDING).length,
      overdue: userTasks.filter((task) => task.status === OVERDUE).length,
    }
  }
}

module.exports = Task

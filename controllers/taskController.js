const Task = require("../models/Task")
const { PENDING, COMPLETED, LABELS } = require("../constants/taskStatus")
const { LABELS: SORT_LABELS } = require("../constants/sortOptions")
const { BAD_REQUEST } = require("../constants/statusCode")

const taskController = {
  index: (req, res) => {
    try {
      if (!req.session || !req.session.userId) {
        return res.redirect("/auth/login")
      }

      const sortBy = req.query.sort || "date_asc"
      const searchTerm = req.query.search || ""
      const theme = req.session.theme || "light"

      let tasks
      if (searchTerm) {
        tasks = Task.searchTasks(req.session.userId, searchTerm)
        tasks = Task.sortTasks(tasks, sortBy)
      } else {
        tasks = Task.getTasksWithStatus(req.session.userId, sortBy)
      }

      const stats = Task.getTaskStats(req.session.userId)

      res.render("tasks/index", {
        title: "My Tasks",
        tasks,
        currentSort: sortBy,
        searchTerm,
        sortLabels: SORT_LABELS,
        statusLabels: LABELS,
        username: req.session.username,
        theme: theme,
        stats: stats,
      })
    } catch (error) {
      console.error("Error loading tasks:", error)
      res.status(500).render("error", {
        title: "Error",
        message: "Failed to load tasks",
        theme: req.session?.theme || "light",
      })
    }
  },

  showCreate: (req, res) => {
    if (!req.session || !req.session.userId) {
      return res.redirect("/auth/login")
    }

    const theme = req.session.theme || "light"
    res.render("tasks/create", {
      title: "Add Task",
      username: req.session.username,
      error: null,
      theme: theme,
    })
  },

  create: (req, res) => {
    try {
      if (!req.session || !req.session.userId) {
        return res.redirect("/auth/login")
      }

      const { title, description, dueDate } = req.body
      const theme = req.session.theme || "light"

      if (!title || !dueDate) {
        return res.status(BAD_REQUEST).render("tasks/create", {
          title: "Add Task",
          error: "Title and due date/time are required",
          username: req.session.username,
          theme: theme,
        })
      }

      const dueDateObj = new Date(dueDate)
      const now = new Date()

      if (dueDateObj < now) {
        return res.status(BAD_REQUEST).render("tasks/create", {
          title: "Add Task",
          error: "Due date and time cannot be in the past",
          username: req.session.username,
          theme: theme,
        })
      }

      Task.create({
        userId: req.session.userId,
        title: title.trim(),
        description: description ? description.trim() : "",
        dueDate,
      })

      res.redirect("/tasks")
    } catch (error) {
      console.error("Error creating task:", error)
      const theme = req.session?.theme || "light"
      res.status(BAD_REQUEST).render("tasks/create", {
        title: "Add Task",
        error: "An error occurred while creating the task",
        username: req.session?.username || "Unknown",
        theme: theme,
      })
    }
  },

  toggleComplete: (req, res) => {
    try {
      if (!req.session || !req.session.userId) {
        return res.redirect("/auth/login")
      }

      const taskId = req.params.id
      const task = Task.findById(taskId)

      if (task && task.userId === req.session.userId) {
        const newStatus = task.status === COMPLETED ? PENDING : COMPLETED
        Task.updateStatus(taskId, newStatus)
      }

      res.redirect("/tasks")
    } catch (error) {
      console.error("Error toggling task status:", error)
      res.redirect("/tasks")
    }
  },

  delete: (req, res) => {
    try {
      if (!req.session || !req.session.userId) {
        return res.redirect("/auth/login")
      }

      const taskId = req.params.id
      const task = Task.findById(taskId)

      if (task && task.userId === req.session.userId) {
        Task.delete(taskId)
      }

      res.redirect("/tasks")
    } catch (error) {
      console.error("Error deleting task:", error)
      res.redirect("/tasks")
    }
  },

  toggleTheme: (req, res) => {
    if (!req.session) {
      return res.redirect("/auth/login")
    }

    const currentTheme = req.session.theme || "light"
    req.session.theme = currentTheme === "light" ? "dark" : "light"
    res.redirect(req.get("Referer") || "/tasks")
  },
}

module.exports = taskController

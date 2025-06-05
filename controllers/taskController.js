const Task = require("../models/Task")
const { PENDING, COMPLETED, LABELS } = require("../constants/taskStatus")
const { LABELS: SORT_LABELS } = require("../constants/sortOptions")
const { OK, BAD_REQUEST } = require("../constants/statusCode")

const taskController = {
  //Task list
  index: (req, res) => {
    const sortBy = req.query.sort || "date_asc"
    const tasks = Task.getTasksWithStatus(req.session.userId, sortBy)
    const theme = req.session.theme || "light"

    res.render("tasks/index", {
      title: "My Tasks",
      tasks,
      currentSort: sortBy,
      sortLabels: SORT_LABELS,
      statusLabels: LABELS,
      username: req.session.username,
      theme: theme,
    })
  },

  //Create task form
  showCreate: (req, res) => {
    const theme = req.session.theme || "light"
    res.render("tasks/create", {
      title: "Add Task",
      username: req.session.username,
      error: null,
      theme: theme,
    })
  },

  //New task
  create: (req, res) => {
    try {
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
        title,
        description,
        dueDate,
      })

      res.redirect("/tasks")
    } catch (error) {
      const theme = req.session.theme || "light"
      res.status(BAD_REQUEST).render("tasks/create", {
        title: "Add Task",
        error: "An error occurred while creating the task",
        username: req.session.username,
        theme: theme,
      })
    }
  },

 
  toggleComplete: (req, res) => {
    try {
      const taskId = req.params.id
      const task = Task.findById(taskId)

      if (task && task.userId === req.session.userId) {
        const newStatus = task.status === COMPLETED ? PENDING : COMPLETED
        Task.updateStatus(taskId, newStatus)
      }

      res.redirect("/tasks")
    } catch (error) {
      res.redirect("/tasks")
    }
  },

  // Delete task
  delete: (req, res) => {
    try {
      const taskId = req.params.id
      const task = Task.findById(taskId)

      if (task && task.userId === req.session.userId) {
        Task.delete(taskId)
      }

      res.redirect("/tasks")
    } catch (error) {
      res.redirect("/tasks")
    }
  },

  //Theme
  toggleTheme: (req, res) => {
    const currentTheme = req.session.theme || "light"
    req.session.theme = currentTheme === "light" ? "dark" : "light"
    res.redirect(req.get("Referer") || "/tasks")
  },
}

module.exports = taskController

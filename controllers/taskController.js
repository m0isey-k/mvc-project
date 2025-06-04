const Task = require("../models/Task")
const { PENDING, COMPLETED, LABELS } = require("../constants/taskStatus")
const { LABELS: SORT_LABELS } = require("../constants/sortOptions")
const { OK, BAD_REQUEST } = require("../constants/statusCode")


const taskController = {
  index: (req, res) => {
    const sortBy = req.query.sort || "date_asc"
    const tasks = Task.getTasksWithStatus(req.session.userId, sortBy)
    res.render("tasks/index", {
      title: "My Tasks",
      tasks,
      currentSort: sortBy,
      sortLabels: SORT_LABELS,
      statusLabels: LABELS,
      username: req.session.username,
    })
  },

  showCreate: (req, res) => {
    res.render("tasks/create", {
      title: "Add Task",
      username: req.session.username,
      error: null,
    })
  },

  create: (req, res) => {
    try {
      const { title, description, dueDate } = req.body

      if (!title || !dueDate) {
        return res.status(BAD_REQUEST).render("tasks/create", {
          title: "Add Task",
          error: "Title and due date are required",
          username: req.session.username,
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
      res.status(BAD_REQUEST).render("tasks/create", {
        title: "Add Task",
        error: "An error occurred while creating the task",
        username: req.session.username,
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
}

module.exports = taskController

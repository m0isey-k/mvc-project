const express = require("express")
const taskController = require("../controllers/taskController")
const authMiddleware = require("../utils/authMiddleware")

const router = express.Router()

router.use(authMiddleware)

router.get("/", taskController.index)
router.get("/create", taskController.showCreate)
router.post("/create", taskController.create)
router.post("/:id/toggle", taskController.toggleComplete)
router.post("/:id/delete", taskController.delete)
router.post("/toggle-theme", taskController.toggleTheme)

module.exports = router

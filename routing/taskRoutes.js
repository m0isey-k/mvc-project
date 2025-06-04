const express = require("express")
const taskController = require("../controllers/taskController")
const authMiddleware = require("../utils/authMiddleware")

const router = express.Router()

//Routy dostępne po logowaniu
router.use(authMiddleware)

router.get("/", taskController.index)
router.get("/create", taskController.showCreate)
router.post("/create", taskController.create)
router.post("/:id/toggle", taskController.toggleComplete)
router.post("/:id/delete", taskController.delete)

module.exports = router

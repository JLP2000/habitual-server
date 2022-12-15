const express = require("express")
const habitsRouter = express.Router()
const habitsController = require("../controllers/habits")
const authenticator = require("../middleware/auth")

habitsRouter.get("/",authenticator, habitsController.index)
habitsRouter.get("/:id", authenticator,habitsController.show)
habitsRouter.post("/", authenticator,habitsController.create)
habitsRouter.put("/:id", authenticator,habitsController.update)
habitsRouter.delete("/:id", authenticator, habitsController.destroy)

module.exports = habitsRouter

const express= require("express")
const router = express.Router()
const {userRegister, userLogin, allUsers} = require("../controllers/userController")

router.post("/api/users/register", userRegister)
router.get("/api/users", allUsers)
router.post("/api/users/login", userLogin)


module.exports = router
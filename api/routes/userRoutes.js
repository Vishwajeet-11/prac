const express= require("express")
const router = express.Router()
const {userRegister, userLogin, allUsers} = require("../controllers/userController")
const validateToken = require("../middlewares/vaidateTokenHandler")

router.post("/api/users/register", userRegister)
router.get("/api/users",validateToken, allUsers)
router.post("/api/users/login", userLogin)


module.exports = router
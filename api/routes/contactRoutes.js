const express = require("express")
const router = express.Router()
const {getContacts, getContact, postContact, deleteContact} = require("../controllers/contactController")

router.get("/api/contacts", getContacts)
router.post("/api/contacts", postContact)
router.get("/api/contacts/:id", getContact)
router.delete("/api/contacts/:id", deleteContact)

module.exports = router
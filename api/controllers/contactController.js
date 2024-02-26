const Contacts = require("../models/contactModel")
const registerSchema = require("../utils/schemaValidation")
const getContacts = (req, res, next) => {
    Contacts.fetchAll()
    .then(([result]) => {
        res.status(200).json({
            message: "all Contacts",
            contacts: result
        })
    })
}

const getContact = (req, res, next) => {
    const id = req.params.id;
    Contacts.findById(id)
    .then(([result]) => {
        res.status(200).json({
            single_user_fetched: result
        })
    })
    .catch(error => console.log(error))
}

const postContact = (req, res, next) => {

    const {error} = registerSchema.validate(req.body)
    if(error){
        res.status(400)
        throw new Error("validation failed")
    }

    const {name, email, username, phone} = req.body;
    const contact = new Contacts(null, name, email, username, phone)
    contact.save()
    .then(([result]) => {
        res.status(201).json({
            message: "contact created",
            contact : {
                name : name,
                phone : phone
            }
        })
    })
}

const deleteContact = (req, res, next) => {
    const id = req.params.id;
    Contacts.deleteById(id)
    .then(([result]) => {
        res.status(400).json({
            message: "contact deleted",
            user : result
        })
    })
}

module.exports = {getContact, getContacts, postContact, deleteContact}
const db = require("../utils/database")

module.exports = class Contact{
    constructor(id, name, email, username, phone){
        this.id = id,
        this.name = name,
        this.email = email,
        this.username = username,
        this.phone = phone
    }

    save(){
        return db.execute('INSERT INTO contacts (name, email, username, phone) VALUES(?,?,?,?)',[this.name,this.email, this.username, this.phone])
    }

    static findById(id){
        return db.execute('SELECT * FROM contacts WHERE ID = ?', [id])
    }

    static fetchAll(){
        return db.execute('SELECT * FROM contacts')
    }

    static deleteById(id){
        return db.execute('DELETE FROM contacts where id = ?', [id])
    }
}
const db = require('../helpers/db')

module.exports = {
    register: (email, phone, password) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users(email, phone, password) VALUES( '${email}', '${phone}','${password}')`, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve({
                    email, phone
                })
            })
        })
    },
    login: (email, password) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT userId, email, password, userImage, role FROM users WHERE email='${email}'`, (error, result) => {
                if (error) {
                    reject({
                        success: false,
                        message: error.sqlMessage,
                    })
                }
                resolve(result)
            })
        })
    },
}
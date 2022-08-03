const db = require('../helpers/db')

module.exports = {
    countAlltransaction: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(transactionId) AS total FROM transactions', (err, result) => {
                if (err) reject(err)
                resolve(result[0].total)
            })
        })
    },
    add: (data) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO transactions SET ?', data, (err, result) => {
                if (err) {
                    reject({
                        success: false,
                        message: err.sqlMessage,
                    })
                }
                resolve(result)
            })
        })
    }

}
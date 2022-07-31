const db = require('../helpers/db')

module.exports = {
    countAllUser: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(userId) AS total FROM users', (err, result) => {
                if (err) reject(err)
                resolve(result[0].total)
            })
        })
    },
    getUserById: (userId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT email,name,userImage,dob,address,phone,gender,password,created_at,updated_at FROM users WHERE userId='${userId}'`, (error, result) => {
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
    getUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT email,name,userImage,dob,address,phone,gender,created_at,updated_at FROM users WHERE userId='${userId}'`, (error, result) => {
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
    getAllUser: (search, orderBy, limit, offset) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE email LIKE '%${search}%' OR name LIKE '%${search}%' OR address LIKE '%${search}%' OR dob LIKE '%${search}%' ORDER BY userId ${orderBy} LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
                if (error) {
                    // console.log(error);
                    reject({
                        success: false,
                        message: error.sqlMessage,
                    })
                }
                resolve(result)
            })
        })
    },
    update: async (userId, data) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET ? WHERE userId = ?`, [data, userId], (err, results) => {
                if (err) {
                    reject({
                        success: false, message: err.sqlMessage, data: {
                            errCode: err.code, errNo: err.errno
                        }
                    })
                }
                resolve({
                    userId,
                    ...data,
                })
            })
        })
    }
}
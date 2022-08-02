const db = require('../helpers/db')

module.exports = {
    countAllVoucher: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(voucherId) AS total FROM vouchers', (err, result) => {
                if (err) reject(err)
                resolve(result[0].total)
            })
        })
    },
    getVoucherById: (voucherId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM vouchers WHERE voucherId='${voucherId}'`, (error, result) => {
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
    getVoucherByCode: (code) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM vouchers WHERE voucherCode='${code}'`, (error, result) => {
                if (error) {
                    reject({
                        success: false,
                        message: error.sqlMessage,
                    })
                }
                resolve(result)
            })
        })
    }
    ,
    getAllVoucher: (search, orderBy, limit, offset) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM vouchers WHERE voucherCode LIKE '%${search}%' OR voucherName LIKE '%${search}%' OR voucherCode LIKE '%${search}%' OR voucherDesc LIKE '%${search}%' ORDER BY voucherId ${orderBy} LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
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
    add: async (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO vouchers SET ?`, data, (err, results) => {
                if (err) {
                    reject({
                        success: false, message: err.sqlMessage, data: {
                            errCode: err.code, errNo: err.errno
                        }
                    })
                }
                resolve(results)
            })
        })
    },
    update: async (data, voucherId) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE vouchers SET ? WHERE voucherId= ?`, [data, voucherId], (err, results) => {
                if (err) {
                    reject({
                        success: false, message: err.sqlMessage, data: {
                            errCode: err.code, errNo: err.errno
                        }
                    })
                }
                resolve({
                    voucherId,
                    ...data
                })
            })
        })
    },
    remove: async (voucherId) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM vouchers WHERE voucherId= ?`, voucherId, (err, results) => {
                if (err) {
                    reject({
                        success: false, message: err.sqlMessage, data: {
                            errCode: err.code, errNo: err.errno
                        }
                    })
                }
                resolve(results)
            })
        })
    }
}
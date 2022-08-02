const db = require('../helpers/db')

module.exports = {
    countAllProduct: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(productId) AS total FROM products', (err, result) => {
                if (err) reject(err)
                resolve(result[0].total)
            })
        })
    },
    getProductById: (productId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM products WHERE productId='${productId}'`, (error, result) => {
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
    getAllProduct: (search, orderBy, limit, offset, category) => {
        // console.log(category);
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM products WHERE productName LIKE '%${search}%' OR productDesc LIKE '%${search}%' ORDER BY productId ${orderBy} LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
                if (error) {
                    reject({
                        success: false,
                        message: error.sqlMessage,
                    })
                }
                if (result.length === 0) {
                    reject({
                        success: false,
                        message: 'Product not found',
                    })
                }
                resolve(result)

            })
        })
    },
    getProductBySlug: (slug) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM products WHERE slug='${slug}'`, (error, result) => {
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
    getProductByCategory: (category) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM products'`, (error, result) => {
                if (error) {
                    reject({
                        success: false,
                        message: error.sqlMessage,
                    })
                }

            })
        })
    }
    ,
    add: async (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO products SET ?`, data, (err, results) => {
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
    update: async (productId, data) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE products SET ? WHERE productId = ?`, [data, productId], (err, results) => {
                if (err) {
                    reject({
                        success: false, message: err.sqlMessage, data: {
                            errCode: err.code, errNo: err.errno
                        }
                    })
                }
                resolve({
                    productId,
                    ...data,
                })
            })
        })
    },
    remove: async (productId) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM products WHERE productId = ?`, productId, (err, results) => {
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
const jwt = require('jsonwebtoken')

module.exports = {
    isLogin: (req, res, next) => {
        if (req.headers.authorization) {
            let token = req.headers.authorization.split(' ')[1]
            jwt.verify(token, process.env.SECRET_KEY_JWT, function (err, result) {
                if (err) {
                    return res.status(403).json({ success: false, message: 'Access Forbidden' })
                }
                req.decodeToken = result
                next()
            })
        } else {
            return res.status(403).json({ success: false, message: 'Unauthorized access' })
        }
    },
    isAdmin: (req, res, next) => {
        if (req.decodeToken.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access Forbidden, Only admin can do this feature!' })
        }
        next()
    },
    isUser: (req, res, next) => {
        if (req.decodeToken.role !== 'users') {
            return res.status(403).json({ success: false, message: 'Access Forbidden' })
        }
        next()
    }

}
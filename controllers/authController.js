const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");
const Auth = require('../models/authModel');

module.exports = {
    register: async (req, res) => {
        try {
            let { email, phone, password } = req.body;
            email = email.toLowerCase()
            if (!email || !password || !phone) {
                return res.status(404).json({ success: false, message: "Error: Fields must be filled" })
            }
            if (password.length < 8) {
                return res.status(404).json({ success: false, message: "Error: Password must be more than 8 characters" })
            }
            password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY_CRYPT).toString()
            const result = await Auth.register(email, phone, password)
            return res.status(201).json({ success: true, message: 'Successfully Register!', data: result })
        } catch (error) {
			if(error.code == 'ER_DUP_ENTRY'){
				return res.status(500).json({ success: false, message: `Email already exists, please login!` })
			}
            return res.status(500).json({ success: false, message: `Error: ${error.code}` })
        }
    },
    login: async (req, res) => {
        try {
            let { email, password } = req.body
            email = email.toLowerCase()
            if (!email || !password) {
                return res.status(404).json({ success: false, message: "Error: Fields must be filled" })
            }
            const result = await Auth.login(email, password)
            if (result.length < 1) {
                return res.status(404).json({ success: false, message: 'Error: Wrong Email / Password' })
            }
            if (password < 8) {
                return res.status(404).json({ success: false, message: 'Error: Password must be more than 8 characters' })
            }
            const hash = CryptoJS.AES.decrypt(result[0].password, process.env.SECRET_KEY_CRYPT).toString(CryptoJS.enc.Utf8)
            if (password !== hash) {
                return res.status(404).json({ success: false, message: 'Error: Wrong Email / Password' })
            }
            const token = jwt.sign({ userId: result[0].userId, role: result[0].role, email: result[0].email }, process.env.SECRET_KEY_JWT, {
                expiresIn: '1 day'
            })
            return res.status(200).json({
                success: true,
                message: 'Success login', data: {
                    userId: result[0].userId,
                    image: result[0].userImage,
                    email: result[0].email,
                    token,
                }
            })
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` })
        }
    },
    verifyToken: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)
            return res.status(200).json({ success: true, message: 'Successfully verified!', data: decoded })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }
}
require('dotenv').config();
const CryptoJS = require("crypto-js");
const Users = require('../models/userModel');

module.exports = {
    getUserById: async (req, res) => {
        try {
            const userId = req.params.userId;
            const result = await Users.getUserById(userId);
            if (!result.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${userId} not found!`, data: []
                })
            }
            return res.status(200).json({ success: true, message: 'Success', data: { ...result[0], password: '' } });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    getUser: async (req, res) => {
        try {
            const userId = req.decodeToken.userId;
            const result = await Users.getUser(userId);
            if (!result.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${userId} not found!`, data: []
                })
            }
            return res.status(200).json({ success: true, message: 'Success', data: { ...result[0], password: '' } });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    getAllUser: async (req, res) => {
        try {
            let { search = '', orderBy = '' || 'asc', limit, page } = req.query
            limit = Number(limit) || 100
            page = Number(page) || 1
            const offset = (page - 1) * limit
            let totalAllData = await Users.countAllUser()
            const totalPage = Math.ceil(totalAllData / limit)
            const results = await Users.getAllUser(search, orderBy, limit, offset);
            const totalRows = results.length
            if (page > totalPage) {
                return res.status(404).json({ success: false, message: 'Error: Page not found', data: [] })
            }
            return res.status(200).json({ success: true, message: "Success show all users", data: { totalAllData, totalRows, totalPage, results } })
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    update: async (req, res) => {
        try {
            // console.log(req.file);
            const userId = req.decodeToken.userId;
            const checkData = await Users.getUserById(userId);
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${userId} not found!`, data: []
                })
            }
            let { userImage } = req.body
            userImage = req.file ? req.file.path : checkData[0].userImage
            let setData = {
                ...req.body, userImage
            }
            if (req.body.password) {
                return res.status(400).json({ success: false, message: 'Error: Password cannot be updated' })
            }
            const results = await Users.update(userId, setData);
            return res.status(200).json({ success: true, message: 'Success update data', data: results });

        } catch (err) {
            return res.status(500).json({ success: false, message: `Error: ${err.code}` });
        }
    },
    updateByAdmin: async (req, res) => {
        try {
            // console.log(req.file);
            const userId = req.params.userId;
            const checkData = await Users.getUserById(userId);
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${userId} not found!`, data: []
                })
            }
            let { userImage, password } = req.body
            userImage = req.file ? req.file.path : checkData[0].userImage
            let setData = {
                ...req.body,
                userImage,
            }
            if (password) {
                password = password ? CryptoJS.AES.encrypt(password, process.env.SECRET_KEY_CRYPT).toString() : checkData[0].password
                setData = {
                    ...setData,
                    password
                }
            }
            const results = await Users.update(userId, setData);
            return res.status(200).json({ success: true, message: 'Success update data', data: results });

        } catch (err) {
            return res.status(500).json({ success: false, message: `Error: ${err.code}` });
        }
    },
    updatePassword: async (req, res) => {
        try {
            const userId = req.decodeToken.userId;
            let { newPassword, confrimPassword } = req.body
            if (newPassword.length < 8) {
                return res.status(404).json({ success: false, message: 'Error: Password must be more than 8 characters' })
            }
            if (newPassword !== confrimPassword) {
                return res.status(400).json({ success: false, message: 'Error: New Password and Confrim Password must be same' })
            }
            password = CryptoJS.AES.encrypt(newPassword, process.env.SECRET_KEY_CRYPT).toString();
            const results = await Users.update(userId, { password });
            return res.status(200).json({ success: true, message: 'Success update password', data: results });
        } catch (err) {
            return res.status(500).json({ success: false, message: `Error: ${err.code}` });
        }
    },
    remove: async (req, res) => {
        try {
            const userId = req.params.userId;
            const checkData = await Users.getUserById(userId);
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${userId} not found!`, data: []
                })
            }
            const results = await Users.remove(userId);
            return res.status(200).json({ success: true, message: 'Success delete!', data: results });
        } catch (err) {
            return res.status(500).json({ success: false, message: `Error: ${err.code}` });
        }
    }
}
const Trans = require('../models/transModel')


module.exports = {
    add: async (req, res) => {
        try {
            const data = req.body
            const result = await Trans.add(data);
            return res.status(200).json({ success: true, message: 'Transaction Success', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
}
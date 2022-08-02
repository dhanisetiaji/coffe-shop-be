const Voucher = require('../models/voucherModel')


module.exports = {
    getVoucherById: async (req, res) => {
        try {
            const voucherId = req.params.voucherId;
            const result = await Voucher.getVoucherById(voucherId);
            if (!result.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${voucherId} not found!`, data: []
                })
            }
            return res.status(200).json({ success: true, message: 'Success', data: result[0] });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    getVoucherByCode: async (req, res) => {
        try {
            let voucherCode = req.query.code;
            if (req.query.code === undefined) {
                return res.status(400).json({
                    success: false, message: `Error: Code is required!`, data: []
                })
            }
            voucherCode = voucherCode.toUpperCase();
            const result = await Voucher.getVoucherByCode(voucherCode);
            if (!result.length) {
                return res.status(404).json({
                    success: false, message: `${voucherCode} not found!`, data: []
                })
            }
            return res.status(200).json({ success: true, message: 'Success', data: result[0] });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    getAllVoucher: async (req, res) => {
        try {
            let { search = '', orderBy = '' || 'asc', limit, page, category } = req.query
            limit = Number(limit) || 100
            page = Number(page) || 1
            const offset = (page - 1) * limit
            let totalAllData = await Voucher.countAllVoucher()
            const totalPage = Math.ceil(totalAllData / limit)
            const results = await Voucher.getAllVoucher(search, orderBy, limit, offset, category);
            const totalRows = results.length
            if (page > totalPage) {
                return res.status(404).json({ success: false, message: 'Error: Page not found', data: [] })
            }
            return res.status(200).json({ success: true, message: "Success show all vouchers", data: { totalAllData, totalRows, totalPage, results } })
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    add: async (req, res) => {
        try {
            const data = req.body
            const result = await Voucher.add(data);
            return res.status(200).json({ success: true, message: 'Success add new voucher', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    update: async (req, res) => {
        try {
            const voucherId = req.params.voucherId;
            const data = req.body;
            const result = await Voucher.update(data, voucherId);
            return res.status(200).json({ success: true, message: 'Success update voucher', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    remove: async (req, res) => {
        try {
            const voucherId = req.params.voucherId;
            const result = await Voucher.remove(voucherId);
            return res.status(200).json({ success: true, message: 'Success remove voucher', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    }

}
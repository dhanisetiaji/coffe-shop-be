const Products = require('../models/productModel');
const Slug = require('slugify');


module.exports = {
    getProductById: async (req, res) => {
        try {
            const productId = req.params.productId;
            const result = await Products.getProductById(productId);
            if (!result.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${productId} not found!`, data: []
                })
            }
            return res.status(200).json({ success: true, message: 'Success', data: result[0] });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    getAllProduct: async (req, res) => {
        try {
            let { search = '', orderBy = '' || 'asc', limit, page, category } = req.query
            limit = Number(limit) || 100
            page = Number(page) || 1
            const offset = (page - 1) * limit
            let totalAllData = await Products.countAllProduct()
            const totalPage = Math.ceil(totalAllData / limit)
            const results = await Products.getAllProduct(search, orderBy, limit, offset, category);
            const totalRows = results.length
            if (page > totalPage) {
                return res.status(404).json({ success: false, message: 'Error: Page not found', data: [] })
            }
            return res.status(200).json({ success: true, message: "Success show all products", data: { totalAllData, totalRows, totalPage, results } })
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    getProductBySlug: async (req, res) => {
        try {
            const slug = req.params.slug;
            const result = await Products.getProductBySlug(slug);
            if (!result.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${slug} not found!`, data: []
                })
            }
            return res.status(200).json({ success: true, message: 'Success', data: result[0] });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    }
    // ,
    // getProductBycategory: async (req, res) => {
    //     try {
    //         const category = req.query.category;
    //         const result = await Products.getProductBycategory(category);
    //         if (!result.length) {
    //             return res.status(404).json({
    //                 success: false, message: `Error: Data by ${category} not found!`, data: []
    //             })
    //         }
    //         return res.status(200).json({ success: true, message: 'Success', data: result });
    //     } catch (error) {
    //         return res.status(500).json({ success: false, message: `Error: ${error.code}` });
    //     }
    // }
    ,
    add: async (req, res) => {
        try {
            // const { productName, productPrice, productDesc, productImage } = req.body;
            const slug = Slug(req.body.productName, { lower: true });
            let setData = {
                ...req.body,
                productImage: req.file.path,
                slug
            }
            const result = await Products.add(setData);
            return res.status(200).json({ success: true, message: 'Success', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    update: async (req, res) => {
        try {
            const productId = req.params.productId;
            const checkData = await Products.getProductById(productId);
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${productId} not found!`, data: []
                })
            }
            let { productImage, productName } = req.body;
            productImage = req.file ? req.file.path : checkData[0].productImage;
            let setData = {
                ...req.body,
                productImage
            }
            if (productName) {
                setData.slug = Slug(productName, { lower: true });
            }

            const result = await Products.update(productId, setData);
            return res.status(200).json({ success: true, message: 'Success update!', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    remove: async (req, res) => {
        try {
            const productId = req.params.productId;
            const checkData = await Products.getProductById(productId);
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${productId} not found!`, data: []
                })
            }
            const result = await Products.remove(productId);
            return res.status(200).json({ success: true, message: 'Success delete!', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    }
}
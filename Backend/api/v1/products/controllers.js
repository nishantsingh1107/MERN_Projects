const { Product } = require("../../../models/product_schema.js");

const createProductController = async (req, res) => {
    try {
        const data = req.body;
        console.log("creating product...", data);

        Object.keys(data).forEach((key) => {
            if (data[key] == null || data[key] == "") {
                delete data.key;
            }
        });

        let newProduct = await Product.create(data);
        res.status(201).json({
            isSuccess: true,
            message: `Product created`,
            data: {
                product: newProduct,
            },
        });
    } catch (err) {
        if (err.name === "ValidationError" || err.code == "11000") {
            res.status(400).json({ isSuccess: false, message: `Err: ${err.message}`, data: {} });
        }
        console.log("🔴 Error in createProductController", err.message);
        res.status(501).json({ isSuccess: false, message: "Internal Server Error", data: {} });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.status(200).json({
            isSuccess: true,
            message: "Product List Fetched",
            data: {
                products: allProducts,
            },
        });
    } catch (err) {
        console.log("🔴 Error in getAllProducts ---> ", err.message);
        res.status(501).json({
            isSuccess: false,
            message: "Internal server Error",
            data: {},
        });
    }
};

const updateProductController = async (req, res) => {
    try {
        const { productId } = req.params;
        const newData = req.body;

        const newProduct = await Product.findByIdAndUpdate(productId, newData, {
            new: true,
            runValidators: true,
        });

        if (newProduct === null) {
            res.status(400);
            res.json({
                isSuccess: false,
                message: "Invalid Product ID",
                data: {},
            });
            return;
        }

        res.status(200).json({
            isSuccess: "true",
            message: "Product Updated",
            data: {
                product: newProduct,
            },
        });

    } catch (err) {
        console.log("🔴 Error in updateProductController ---> ", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal server Error",
            data: {},
        });
    }
};

const deleteProductController = async (req, res) => {
    try {
        const { productId } = req.params;
        const deleteProduct = await Product.findByIdAndDelete(productId);

        if (deleteProduct === null) {
            res.status(400).json({
                isSuccess: false,
                message: "Invalid Product Id",
                data: {},
            });
            return;
        }

        res.status(200).json({
            isSuccess: true,
            message: "Product Deleted Successfully",
            data: {
                product: deleteProduct,
            },
        });
    } catch (err) {
        console.log("🔴 Error in deleteProductController ---> ", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
        if (err.name === "ValidationError" || err.code == "11000") {
            res.status(400).json({ isSuccess: false, message: `Err: ${err.message}`, data: {} });
        } else {
            res.status(500).json({ isSuccess: false, message: "Internal Server Error", data: {} });
        }
    }
};

module.exports = { createProductController, getAllProducts, updateProductController, deleteProductController };
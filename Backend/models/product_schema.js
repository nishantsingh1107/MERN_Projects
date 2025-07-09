const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
    {
        description: String,
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        price: {
            type: Number,
            min: 0,
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        quantity: {
            type: Number,
            default: 1,
        },
        images: [String],
    },
    {
        versionKey: false,
        timestamps: true,
    }

);

const Product = model("product", productSchema);
module.exports = { Product };
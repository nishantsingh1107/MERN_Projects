const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
        },
        role: {
            type: String,
            enum: ["user", "admin", "super-admin"],
            default: "user",
        },
    },
    {
        versionKey: true,
        timestamps: true,
    },
);

const UserModel = model("user", userSchema);
module.exports = { UserModel };
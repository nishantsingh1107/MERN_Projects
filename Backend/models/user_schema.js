const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        Name: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            default: 0,
        },
        gender: {
            type: String,
            required: true,
            enum: ["male", "female"],
        },
        role: {
            type: String,
            enum: ["User", "Admin", "Super-Admin"],
            default: "User",
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const UserModel = model("user", userSchema);

module.exports = { UserModel };
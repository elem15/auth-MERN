"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String, required: true, select: false },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    img: { type: String, required: false },
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)('User', userSchema);

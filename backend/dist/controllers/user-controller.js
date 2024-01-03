"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.logout = exports.login = exports.signUp = exports.getUser = exports.getUsers = exports.getImage = exports.uploadImage = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const note_1 = require("../models/note");
const user_1 = require("../models/user");
const getAge_1 = require("../utils/getAge");
const images_upload_1 = require("../middleware/images-upload");
const uploadImage = (req, res, next) => {
    try {
        res.status(201).json({ filename: images_upload_1.filename });
    }
    catch (e) {
        next(e);
    }
};
exports.uploadImage = uploadImage;
const getImage = (req, res, next) => {
    images_upload_1.gfs
        .find({
        filename: req.params.filename,
    })
        .toArray((err, files) => {
        if (err) {
            (0, http_errors_1.default)(400, 'File loading error');
        }
        if (!files || files.length === 0) {
            (0, http_errors_1.default)(404, 'No image file exist');
        }
        images_upload_1.gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
};
exports.getImage = getImage;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authUserId = req.session.userId;
        const user = yield user_1.UserModel.findById(authUserId).select('+email').exec();
        if (!user) {
            throw (0, http_errors_1.default)(400, 'Invalid id');
        }
        const users = yield user_1.UserModel.find({ _id: { $ne: authUserId } })
            .select('+email')
            .exec();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authUserId = req.session.userId;
        if (!(0, note_1.idValidate)(authUserId)) {
            throw (0, http_errors_1.default)(400, 'Invalid id');
        }
        const user = yield user_1.UserModel.findById(authUserId).select('+email').exec();
        if (!user) {
            throw (0, http_errors_1.default)(404, 'User not found');
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, dateOfBirth, gender } = req.body;
        if (!name || !email || !password || !dateOfBirth || !gender) {
            throw (0, http_errors_1.default)(400, 'Name, email, password, dateOfBirth and gender are required');
        }
        const user = yield user_1.UserModel.findOne({ name }).exec();
        if (user) {
            throw (0, http_errors_1.default)(404, 'This name is already taken');
        }
        const userWithEmail = yield user_1.UserModel.findOne({ email }).exec();
        if (userWithEmail) {
            throw (0, http_errors_1.default)(404, 'User with this email already exist');
        }
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        if (isNaN(Date.parse(dateOfBirth))) {
            throw (0, http_errors_1.default)(400, 'Incorrect date format');
        }
        const date = new Date(dateOfBirth);
        const dateNow = new Date();
        const tooYang = date >= dateNow;
        const tooOld = (0, getAge_1.getAge)(dateNow, date) > 120;
        if (tooYang || tooOld) {
            throw (0, http_errors_1.default)(400, 'Incorrect date of birth');
        }
        const newUser = yield user_1.UserModel.create({
            name,
            email,
            password: passwordHash,
            dateOfBirth: date.toISOString(),
            gender,
            img: req.file && images_upload_1.filename,
        });
        req.session.userId = newUser._id;
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.signUp = signUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw (0, http_errors_1.default)(400, 'Email and password are required');
        }
        const user = yield user_1.UserModel.findOne({ email })
            .select('+password +email')
            .exec();
        if (!user) {
            throw (0, http_errors_1.default)(401, 'Email or password are incorrect');
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            throw (0, http_errors_1.default)(401, 'Email or password are incorrect');
        }
        req.session.userId = user._id;
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const logout = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            next(error);
        }
        else {
            res.sendStatus(200);
        }
    });
};
exports.logout = logout;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authUserId = req.session.userId;
        const { name, password } = req.body;
        if (!name && !password && !req.file) {
            throw (0, http_errors_1.default)(400, 'No fields for update');
        }
        if (!(0, note_1.idValidate)(authUserId)) {
            throw (0, http_errors_1.default)(400, 'Invalid id');
        }
        const user = yield user_1.UserModel.findById(authUserId)
            .select('+password +email')
            .exec();
        if (!user) {
            throw (0, http_errors_1.default)(404, 'User not found');
        }
        const userWithName = yield user_1.UserModel.findOne({ name })
            .select('+password')
            .exec();
        if (userWithName && name !== user.name) {
            throw (0, http_errors_1.default)(404, 'This name is already taken');
        }
        name && (user.name = name);
        images_upload_1.filename && req.file && (user.img = images_upload_1.filename);
        password && (user.password = yield bcrypt_1.default.hash(password, 10));
        const updatedUser = yield user.save();
        res.status(200).json(updatedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;

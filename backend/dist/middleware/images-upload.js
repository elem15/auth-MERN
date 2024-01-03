"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.filename = exports.gfs = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const crypto_1 = __importDefault(require("crypto"));
const multer_1 = __importDefault(require("multer"));
const http_errors_1 = __importDefault(require("http-errors"));
const mongoURI = validateEnv_1.default.MONGO_CONNECTION_STRING;
mongoose_1.default.set('strictQuery', true);
const conn = mongoose_1.default.createConnection(mongoURI);
conn.once('open', () => {
    exports.gfs = new mongoose_1.default.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads',
    });
});
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto_1.default.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                    return reject((0, http_errors_1.default)(422, 'Only img or png photo format is supported'));
                }
                exports.filename = Date.now() + '-' + file.originalname;
                const fileInfo = {
                    filename: exports.filename,
                    bucketName: 'uploads',
                };
                resolve(fileInfo);
            });
        });
    },
});
exports.upload = (0, multer_1.default)({ storage });

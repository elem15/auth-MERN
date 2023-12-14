"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const PORT = validateEnv_1.default.PORT;
mongoose_1.default.connect(validateEnv_1.default.MONGO_CONNECTION_STRING).then(() => {
    console.log('Connected');
    app_1.default.get("/net", (req, res) => {
        res.send("Connected");
    });
    app_1.default.listen(PORT, () => {
        console.log('Server start on port: localhost:' + PORT);
    });
}).catch((e) => console.error(e));

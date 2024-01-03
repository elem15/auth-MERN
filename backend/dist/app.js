"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_route_1 = __importDefault(require("./routes/users-route"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_errors_1 = __importDefault(require("http-errors"));
const errorHandlers_1 = require("./utils/errorHandlers");
const express_session_1 = __importDefault(require("express-session"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const path_1 = __importDefault(require("path"));
const serve_static_1 = __importDefault(require("serve-static"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ limit: '16mb', extended: true }));
app.use((0, express_session_1.default)({
    secret: validateEnv_1.default.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: connect_mongo_1.default.create({
        mongoUrl: validateEnv_1.default.MONGO_CONNECTION_STRING,
    }),
}));
app.use((0, serve_static_1.default)(path_1.default.join(__dirname, '../../frontend/dist/')));
app.use('/app/users', users_route_1.default);
app.use(() => {
    throw (0, http_errors_1.default)(404, 'Route not found!');
});
app.use(errorHandlers_1.logErrors);
app.use(errorHandlers_1.clientErrorHandler);
app.use(errorHandlers_1.errorHandler);
exports.default = app;

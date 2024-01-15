"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("./api/user"));
const auth_1 = __importDefault(require("./api/auth"));
const community_1 = __importDefault(require("./api/community"));
const donate_1 = __importDefault(require("./api/donate"));
const trash_1 = __importDefault(require("./api/trash"));
const body_parser_1 = __importDefault(require("body-parser"));
const ClientError_1 = __importDefault(require("./exceptions/ClientError"));
const express_favicon_1 = __importDefault(require("express-favicon"));
dotenv_1.default.config({ path: '.env' });
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080;
app.use(body_parser_1.default.json());
const errorHandlingMiddleware = (err, req, res, next) => {
    if (err instanceof ClientError_1.default) {
        res.status(err.statusCode).json({
            status: 'Failed',
            message: err.message
        });
    }
    res.status(500).json({
        status: 'Error',
        message: 'Internal Server Error'
    });
};
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '/views'));
app.use(express_1.default.static(path_1.default.join(__dirname, '/public')));
app.use((0, express_favicon_1.default)(path_1.default.join(__dirname, '/public/img/favicon.ico')));
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/auth/verifyemail', (req, res) => {
    res.render('verify');
});
app.use('/user', user_1.default);
app.use('/auth', auth_1.default);
app.use('/community', community_1.default);
app.use('/donate', donate_1.default);
app.use('/trash', trash_1.default);
app.use(errorHandlingMiddleware);
app.listen(port, () => {
    console.log(`[server]: Server is running at port: ${port}`);
});

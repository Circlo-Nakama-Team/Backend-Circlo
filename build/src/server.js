"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const EnvConfig_1 = __importDefault(require("./config/EnvConfig"));
dotenv_1.default.config({ path: '.env' });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./api/user"));
const auth_1 = __importDefault(require("./api/auth"));
const community_1 = __importDefault(require("./api/community"));
const donate_1 = __importDefault(require("./api/donate"));
const trash_1 = __importDefault(require("./api/trash"));
const body_parser_1 = __importDefault(require("body-parser"));
const ClientError_1 = __importDefault(require("./exceptions/ClientError"));
const app = (0, express_1.default)();
const port = EnvConfig_1.default.PORT;
// const sessionStore: any = new MySQLStore(dbConfig)
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// app.use(session({
//   store: sessionStore,
//   secret: 'session_cookie_secret',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: false,
//     // secure: true,
//     maxAge: 1000 * 60 * 60 * 24,
//     signed: false, // Set to false to use the plain session ID
//     // sameSite: 'none',
//   },
// }));
const errorHandlingMiddleware = (err, req, res, next) => {
    if (err instanceof ClientError_1.default) {
        return res.status(err.statusCode).json({
            status: 'Failed',
            message: err.message
        });
    }
    res.status(500).json({
        status: 'Error',
        message: err.message
    });
};
// app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, '/views'))
// app.use(express.static(path.join(__dirname, '/public')))
// app.use(favicon(path.join(__dirname, '/public/img/favicon.ico')))
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
// app.get('/auth/verifyemail', (req, res) => {
//   res.render('verify')
// })
app.use('/user', user_1.default);
app.use('/auth', auth_1.default);
app.use('/community', community_1.default);
app.use('/donate', donate_1.default);
app.use('/trash', trash_1.default);
app.use(errorHandlingMiddleware);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

import express, { type Express, type Request, type Response, type NextFunction } from 'express'
import config from './config/EnvConfig'

import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import UserAPI from './api/user'
import AuthAPI from './api/auth'
import CommunityAPI from './api/community'
import DonateAPI from './api/donate'
import TrashAPI from './api/trash'
import bodyParser from 'body-parser'
import ClientError from './exceptions/ClientError'
import favicon from 'express-favicon'

const app: Express = express()
const port = config.PORT
// const sessionStore: any = new MySQLStore(dbConfig)

app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors())

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

const errorHandlingMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): any => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      status: 'Failed',
      message: err.message
    })
  }

  res.status(500).json({
    status: 'Error',
    message: err.message
  })
}
// app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, '/views'))
// app.use(express.static(path.join(__dirname, '/public')))
// app.use(favicon(path.join(__dirname, '/public/img/favicon.ico')))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

// app.get('/auth/verifyemail', (req, res) => {
//   res.render('verify')
// })

app.use('/user', UserAPI)
app.use('/auth', AuthAPI)
app.use('/community', CommunityAPI)
app.use('/donate', DonateAPI)
app.use('/trash', TrashAPI)

app.use(errorHandlingMiddleware)
app.listen(port, () => {
  console.log(`[server]: Server is running at port ${port}`)
})

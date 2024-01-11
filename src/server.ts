import express, { type Express, type Request, type Response, type NextFunction } from 'express'
import dotenv from 'dotenv'
import path from 'path'
import UserAPI from './api/user'
import AuthAPI from './api/auth'
import CommunityAPI from './api/community'
import DonateAPI from './api/donate'
import TrashAPI from './api/trash'
import bodyParser from 'body-parser'
import ClientError from './exceptions/ClientError'
import favicon from 'express-favicon'

dotenv.config({ path: '.env' })
const app: Express = express()
const port = process.env.PORT ?? 8080

app.use(bodyParser.json())

const errorHandlingMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): any => {
  if (err instanceof ClientError) {
    res.status(err.statusCode).json({
      status: 'Failed',
      message: err.message
    })
  }

  res.status(500).json({
    status: 'Error',
    message: 'Internal Server Error'
  })
}
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/public')))
app.use(favicon(path.join(__dirname, '/public/img/favicon.ico')))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.get('/auth/verifyemail', (req, res) => {
  res.render('verify')
})

app.use('/user', UserAPI)
app.use('/auth', AuthAPI)
app.use('/community', CommunityAPI)
app.use('/donate', DonateAPI)
app.use('/trash', TrashAPI)

app.use(errorHandlingMiddleware)
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

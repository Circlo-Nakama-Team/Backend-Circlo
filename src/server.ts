import express, { type Express, type Request, type Response } from 'express'
import dotenv from 'dotenv'
import UserAPI from './api/user'
import AuthAPI from './api/auth'
import CommunityAPI from './api/community'
import bodyParser from 'body-parser'

dotenv.config({ path: '.env' })
const app: Express = express()
const port = process.env.PORT ?? 8080

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.use('/user', UserAPI)
app.use('/auth', AuthAPI)
app.use('/community', CommunityAPI)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

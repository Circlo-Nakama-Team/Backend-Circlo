import { Storage } from '@google-cloud/storage'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
const serviceKey = path.join(__dirname, '../../credentials.json')

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.PROJECT_ID
})

export default storage

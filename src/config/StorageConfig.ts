import { Storage } from '@google-cloud/storage'
import path from 'path'
import config from './EnvConfig'
const serviceKey = path.join(__dirname, '../../credentials.json')

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: config.PROJECT_ID
})

export default storage

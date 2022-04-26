import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
// Create express instance
const app = express()

app.use(cors({
  origin: '*'
}))
// Require API routes
import uploader from './routes/uploader'
app.use(bodyParser.json())
// Import API Routes
app.use(uploader)

// Export the server middleware
export const path = '/api'
export const handler = app
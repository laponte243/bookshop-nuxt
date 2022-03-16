import express from 'express'

// Create express instance
const app = express()

// Require API routes
import uploader from './routes/uploader'

// Import API Routes
app.use(uploader)

// Export the server middleware
export const path = '/api'
export const handler = app
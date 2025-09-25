import express from 'express'
import routes from './routes/index'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

app.use('/api', routes)

app.use(errorHandler)

export default app

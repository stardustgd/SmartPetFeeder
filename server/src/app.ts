import express from 'express'
import routes from './routes/index'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api', routes)

app.use(errorHandler)

export default app

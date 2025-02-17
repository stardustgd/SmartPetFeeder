import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

const PORT = process.env.PORT || 5050
const app = express()

app.use(
  cors({
    credentials: true,
    origin: '*',
  })
)
app.use(express.json())
app.use(cookieParser())

app.use('/api', routes)

app.use((err, _req, res, _next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

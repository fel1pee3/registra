import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js';
import  occurrenceRoute from './routes/occurrenceRoutes.js'

const app = express();
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/occurrence', occurrenceRoute)

app.listen(process.env.PORT, () => {
    console.log("Server is running")
})
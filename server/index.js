import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js';
import occurrenceRoute from './routes/occurrenceRoutes.js'
import reportRoute from './routes/reportRoutes.js'
import searchRouter from './routes/searchRoutes.js'
import profileRouter from './routes/profileRoutes.js'

const app = express();
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/occurrence', occurrenceRoute)
app.use('/report', reportRoute)
app.use('/search', searchRouter)
app.use('/profile', profileRouter)

app.listen(process.env.PORT, () => {
    console.log("Server is running")
})
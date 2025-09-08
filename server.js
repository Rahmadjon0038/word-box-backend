const express = require('express');
const cors = require('cors')
require('dotenv').config()
const app = express();
app.use(express.json())
app.use(cors())
const path = require('path');
const db = require('./config/db')

// ------------- Auth router -----------
const authRouter = require('./router/authRouter');
app.use('/api/auth', authRouter)
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// -------------- Video lessons router-----------------
const videoLessons = require('./router/videoLessonsRouter');
app.use('/api/video', videoLessons)


// -------------- Groups -----------------
const grouprouter = require('./router/groupRoutes');
app.use('/api/groups', grouprouter)

// -------------- Month -----------------
const monthRouter = require('./router/monthRoutes');
app.use('/api/month', monthRouter)

// -------------- Month Stydent -----------------
const monthStudent = require('./router/monthStudentRoutes');
app.use('/api/student', monthStudent)

// -------------- admin stats -----------------

const statisticsRoutes = require("./router/statistics");

app.use("/api/statistics", statisticsRoutes);


app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Web monitoring platfomasiga hush kelinsiz' })
})




app.listen(process.env.PORT, () => {
    console.log(`server ${process.env.PORT} - porda da ishga tushdi`)
})
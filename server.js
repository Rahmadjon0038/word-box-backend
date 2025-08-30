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
app.use('/auth', authRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Web monitoring platfomasiga hush kelinsiz' })
})



app.listen(process.env.PORT, () => {
    console.log(`server ${process.env.PORT} - porda da ishga tushdi`)
})
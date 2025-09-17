const express = require('express');
const cors = require('cors')
require('dotenv').config()
const app = express();
app.use(express.json())
app.use(cors())

// ------------- Auth router -----------
const authRouter = require('./router/authRouter');
app.use('/api/auth', authRouter)


// ------------- Product router -----------

const productrouter = require('./router/ProductRouter');
app.use('/api/product', productrouter)


app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Backendga hush kelibsiz hush kelinsiz' })
})


app.listen(process.env.PORT, () => {
    console.log(`server ${process.env.PORT} - porda da ishga tushdi`)
})
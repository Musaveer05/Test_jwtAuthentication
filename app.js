if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwtVerification = require('./middleware/jwt_auth')

const dbUrl = `mongodb://localhost:27017/SkyGoal` || process.env.db_url;
mongoose.set('strictQuery', false)

mongoose.connect(dbUrl, {
    serverSelectionTimeoutMS: 60000
})

const db = mongoose.connection
db.on('error', console.error.bind(console, "connection error"))
db.once('open', () =>{
    console.log('Database Connected')
})


app.use(bodyParser.urlencoded({extended:true}))


app.use('/register', require('./routers/register'));
app.use('/login', require('./routers/login'))
app.get('/', jwtVerification, (req,res) =>{ res.send('You are at Home Page')})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
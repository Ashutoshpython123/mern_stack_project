require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')




//App config
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.use('/api', require('./Routes'))

//db config
const connection_url = 'mongodb+srv://nebula:4CUaquhj0Z412auV@cluster0.pn9m1.mongodb.net/nebuladb?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
    })
}


//listener
const port = process.env.PORT || 8001
app.listen(port, ()=>{
    console.log(`listening port localhost : ${port}`);
})
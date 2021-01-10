const express = require('express')
const env = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express();

//routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')


//environment variables
env.config();

// DB connection setup 

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.tt1ex.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,{
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true   
}).then(()=>{
  console.log('DB Connected')
})

const PORT = process.env.PORT


//Middlewares
app.use(cors())
app.use(bodyParser())

// Router Middlewares
app.use('/api', authRoutes)
app.use('/api', adminRoutes)



app.listen(PORT,()=>{
console.log("Server is running on", PORT)
})   
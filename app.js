const express = require('express');
const authRoutes = require('./routers/auth.routes')
const postRoutes = require('./routers/post.routes')
const cookiesParser = require('cookie-parser')



const app = express();



app.use(cookiesParser());
app.use(express.json())
app.use('/api/auth' , authRoutes)
app.use('/api/posts' , postRoutes)


module.exports = app


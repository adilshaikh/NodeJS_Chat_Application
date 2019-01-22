const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000
var publicPath = path.join(__dirname, '/../public')

// console.log(__dirname + './../public');
// console.log(publicPath)
var app = express();
app.use(express.static(publicPath))


app.listen(port, ()=>{
    console.log(`Server is hosted on port ${port}`)
})
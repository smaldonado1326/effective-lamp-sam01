console.log('on node server');
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello node from Ex on local dev box')
})

app.listen(3000)

//test
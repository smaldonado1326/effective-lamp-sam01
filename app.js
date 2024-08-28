console.log('on node server');
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello node from Ex on local dev box')
})

app.use(express.static('./'))

app.listen(3000, () =>{

});


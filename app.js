console.log('on node server');
const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.join('./')));
app.get('/', function (req, res) {
  //res.send('Hello node from Ex on local dev box')
});




app.listen(3000, () =>{

});


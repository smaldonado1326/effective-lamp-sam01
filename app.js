

// console.log('on node server');
// const express = require('express');
// const path = require('path');
// const app = express();


// app.use(express.static(path.join('./')));
// app.get('/', function (req, res) {
 
// });




// app.listen(3000, () =>{

// });


console.log('im on a node server, yo');


const express = require('express');
const path = require('path');
const app = express();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.uri;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.use(express.static(path.join('./')));
app.get('/', function (req, res) {
  res.send('Hello Node from Ex on local dev box')
});

app.listen(3000);

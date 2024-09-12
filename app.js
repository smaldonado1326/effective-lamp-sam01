
require('dotenv').config()
console.log(process.env.MONGO_URI);
const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI; 




app.set('view engine', 'ejs')
app.use(express.static('./public/'))
console.log(uri);

console.log('im on a node server...');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    console.log("Pinged your deployment.connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// function whateverNameOfIt (params) {}
// ()=>{}

app.get('/mongo', async (req,res)=>{

  console.log('in /mongo');
  await client.connect();
  
  console.log('connected?');
  // Send a ping to confirm a successful connection
  
  let result = await client.db("Effective-lamp").collection("Effective-lamp").find({}).toArray();
  console.log(result); 

  res.render('mongo', {
    mongoResult : result
  });

})


app.get('/', function (req, res) {
  // res.send('Hello Node from Ex on local dev box')
  res.sendFile('index.html');
})

app.get('/ejs', (req, res) => {
  let result = {
    message: "This is some data from the server",
    value: 123
  }; // Corrected closing curly brace instead of parenthesis
  
  res.render('index', {
    ejsResult: result
  });

  // Can you get content from the client to console?
});

app.listen(3000)





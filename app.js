
require('dotenv').config()
console.log(process.env.MONGO_URI);
const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectID } = require('mongodb');
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
// Connect to MongoDB when the server starts
async function run() {
  try {
    // Connect the client to the server (only once when the server starts)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

// Run the MongoDB connection when the server starts
run().catch(console.dir);

// Handle the '/mongo' route
app.get('/mongo', async (req, res) => {
  console.log('in /mongo');
  
  try {
    // Use the existing MongoDB connection to fetch data directly from the client
    let result = await client.db("Effective-lamp").collection("Effective-lamp").find({}).toArray();
    console.log(result); 

    // Render the 'mongo.ejs' view with the fetched data
    res.render('mongo', {
      mongoResult: result
    });
  } catch (err) {
    console.error("Error fetching data from MongoDB:", err);
    res.status(500).send("Error fetching data from MongoDB");
  }
});



app.get('/', (req, res) => {
  const ejsResult = [
      { post: 'First post' },
      { post: 'Second post' }
  ];
  res.render('index', { ejsResult, myServerVariable: "Server value" });
});


app.get('/ejs', (req, res) => {
  let result = {
    message: "This is some data from the server",
    value: 123
  }; // Corrected closing curly brace instead of parenthesis
  
  res.render('index', {
    ejsResult: result,
    myServerVariable: 'another value from server'
  });

  // Can you get content from the client to console?
});





app.get('/insert', async (req, res)=>{
  
  console.log('in/ insert');
  await client.connect();
  await client.db("Effective-lamp").collection("Effective-lamp").insertOne({post: 'hardcoded post insert'});
  res.render('insert');
  console.log(result); 

});

app.post('/update/:id', async (req, res) => {
  console.log("req.params.id: ", req.params.id);
  try {
    const collection = client.db("Effective-lamp").collection("Effective-lamp");
    let result = await collection.findOneAndUpdate(
      { "_id": new ObjectId(req.params.id) }, // Ensure ObjectId is used correctly
      { $set: { "post": "NEW POST" } }
    );
    console.log(result);
    res.redirect('/read');
  } catch (err) {
    console.error("Error updating data in MongoDB:", err);
    res.status(500).send("Error updating data in MongoDB");
  }
});


app.get('/read', async (req, res) => {
  console.log('in /read');
  try {
    let result = await client.db("Effective-lamp").collection("Effective-lamp").find({}).toArray();
    console.log(result);
    res.render('mongo', {
      postData: result
    });
  } catch (err) {
    console.error("Error fetching data for /read route:", err);
    res.status(500).send("Error fetching data for /read route");
  }
});



app.get('/update', async (req, res) => {
  console.log('in /update');
  try {
    await client.db("Effective-lamp").collection("Effective-lamp").findOneAndUpdate(
      { "post": "another day" },
      { $set: { "post": "the next other day" } }
    );
    res.render('update', {
      postData: "Data has been updated"  // Adjust the data passed to the view
    });
  } catch (err) {
    console.error("Error updating data in MongoDB:", err);
    res.status(500).send("Error updating data in MongoDB");
  }
});

app.listen(3000)



//t

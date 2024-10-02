
// require('dotenv').config()
// console.log(process.env.MONGO_URI);
// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser')
// const { urlencoded } = require('body-parser')
// const { ObjectId } = require('mongodb')
// const { MongoClient, ServerApiVersion,} = require('mongodb');
// const uri = process.env.MONGO_URI; 


// app.use(bodyParser.urlencoded({ extended: true }))
// app.set('view engine', 'ejs')
// app.use(express.static('./public/'))

// console.log(uri);



// app.set('view engine', 'ejs')
// app.use(express.static('./public/'))
// console.log(uri);
// console.log('im on a node server...');

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// run().catch(console.dir);

// app.get('/read', async (req, res) => {
//   console.log('in /read');
  
//   try {
//     // Use the existing MongoDB connection to fetch data directly from the client
//     let result = await client.db("Effective-lamp").collection("Effective-lamp").find({}).toArray();
//     console.log(result); 

//     // Render the 'mongo.ejs' view with the fetched data
//     res.render('read', {
//       mongoResult: result
//     });
//   } catch (err) {
//     console.error("Error fetching data from MongoDB:", err);
//     res.status(500).send("Error fetching data from MongoDB");
//   }
// });



// app.get('/', (req, res) => {
//   const ejsResult = [
//       { post: 'First post' },
//       { post: 'Second post' }
//   ];
//   res.render('index', { ejsResult, myServerVariable: "Server value" });
// });


// app.get('/ejs', (req, res) => {
//   let result = {
//     message: "This is some data from the server",
//     value: 123
//   }; 
  
//   res.render('index', {
//     ejsResult: result,
//     myServerVariable: 'another value from server'
//   });

// });


// app.post('/insert', async (req, res)=>{
  
//   console.log('in/ insert');
//   await client.connect();
//   await client.db("Effective-lamp").collection("Effective-lamp").insertOne({post: 'hardcoded post insert'});
//   res.redirect('read');
//   console.log(result); 

// });

// app.post('/update/:id', async (req, res) => {
//   console.log("req.params.id: ", req.params.id);
//   try {
//     const collection = client.db("Effective-lamp").collection("Effective-lamp");
//     let result = await collection.findOneAndUpdate(
//       { "_id": new ObjectId(req.params.id) }, 
//       { $set: { "post": "NEW POST" } }
//     );
//     console.log('Update result:', result);
//     res.redirect('/read');
//   } catch (err) {
//     console.error("Error updating data in MongoDB:", err);
//     res.status(500).send("Error updating data in MongoDB");
//   }
// });

// app.post('/delete/:id', async (req,res)=>{

//   console.log("req.parms.id: ", req.params.id)

//   client.connect; 
//   const collection = client.db("Effective-lamp").collection("Effective-lamp");
//   let result = await collection.findOneAndDelete( 
//   {"_id": new ObjectId(req.params.id)})

// .then(result => {
//   console.log(result); 
//   res.redirect('/read');
// })

//   //insert into it

// })


// app.get('/read', async (req, res) => {
//   console.log('in /read');
//   try {
//     let result = await client.db("Effective-lamp").collection("Effective-lamp").find({}).toArray();
//     console.log(result);
//     res.render('read', {
//       postData: result
//     });
//   } catch (err) {
//     console.error("Error fetching data for /read route:", err);
//     res.status(500).send("Error fetching data for /read route");
//   }
// });



// app.get('/update', async (req, res) => {
//   console.log('in /update');
//   try {
//     await client.db("Effective-lamp").collection("Effective-lamp").findOneAndUpdate(
//       { "post": "another day" },
//       { $set: { "post": "the next other day" } }
//     );
//     res.render('update', {
//       postData: "Data has been updated" 
//     });
//   } catch (err) {
//     console.error("Error updating data in MongoDB:", err);
//     res.status(500).send("Error updating data in MongoDB");
//   }
// });

// app.listen(3000)

require('dotenv').config()
console.log(process.env.MONGO_URI);
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion,} = require('mongodb');
const uri = process.env.MONGO_URI; 

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('./public/'))

console.log(uri);

console.log('im on a node server change that and that tanad f, yo');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// function whateverNameOfIt (params) {}
// ()=>{}

app.get('/', function (req, res) {
  // res.send('Hello Node from Ex on local dev box')
  res.sendFile('index.html');
})

app.get('/ejs', (req,res)=>{
``
  res.render('index', {
    myServerVariable : "something from server"
  });

  //can you get content from client...to console? 
})

app.get('/read', async (req,res)=>{

  console.log('in /read');
  await client.connect();

  console.log('connected?');
  // Send a ping to confirm a successful connection

  let result = await client.db("Effective-lamp").collection("Effective-lamp")
    .find({}).toArray(); 
  console.log(result); 

  res.render('read', {
    postData : result
  });

})

app.post('/insert', async (req,res)=> {

  console.log('in /insert');

  console.log('request', req.body);
  console.log('request', req.body.newPost);

  //connect to db,
  await client.connect();
  //point to the collection 
  await client.db("Effective-lamp").collection("Effective-lamp").insertOne({ post: req.body.newPost});
  // await client.db("barrys-db").collection("whatever-collection").insertOne({ iJustMadeThisUp: 'hardcoded new key '});
  //insert into it
  res.redirect('read');

}); 

app.post('/update/:id', async (req,res)=>{

  console.log("req.parms.id: ", req.params.id)

  client.connect; 
  const collection = client.db("Effective-lamp").collection("Effective-lamp");
  let result = await collection.findOneAndUpdate( 
  {"_id": new ObjectId(req.params.id)}, { $set: {"post": "NEW POST" } }
)
.then(result => {
  console.log(result); 
  res.redirect('/read');
})
}); 

app.post('/delete/:id', async (req,res)=>{

  console.log("req.parms.id: ", req.params.id)

  client.connect; 
  const collection = client.db("Effective-lamp").collection("Effective-lamp");
  let result = await collection.findOneAndDelete( 
  {"_id": new ObjectId(req.params.id)})

.then(result => {
  console.log(result); 
  res.redirect('/read');
})

  //insert into it

})

app.listen(3000);

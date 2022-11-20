const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
//MIDDLEWARE
app.use(cors());
app.use(express.json())
//passs CwAiUCbMHOyxsAZi
//user:online-delivery


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@crud-app.22noo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    try {
      const database = client.db("online-delivary-service").collection('services');
      const addserviceDatacollection = client.db('online-delivary-service').collection('addedservice')
      const reviewcollection = client.db('online-delivary-service').collection('reviews')
    //   // create a document to insert
    //   const addService = {
    //     service:'Book a chef for Birthday party',
    //     time: '7.00pm'
    //   }
    //   const result = await addserviceDatacollection.insertOne(addService)
    //   console.log(result)
      app.get('/services',async(req,res)=>{
          const query ={}
          const coursur =database.find(query)
          const service =await coursur.toArray()
          res.send(service)
        
        
    });
     //data post in server
     app.post('/services',async(req,res)=>{
              const service = req.body;
              console.log(service)
              const result =await database.insertOne(service)
              res.send(service)
     })
     app.post('/reviews',async(req,res)=>{
        const review = req.body;
              console.log(review)
              const result =await reviewcollection.insertOne(review)
              res.send(review)
     });
     app.get('/reviews',async(req,res)=>{
        const query ={}
        const coursur =reviewcollection.find(query)
        const review =await coursur.toArray()
        res.send(review)
      
      
  });
  app.delete('/reviews/:id',  async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await reviewcollection.deleteOne(query);
    res.send(result);
})
app.get ('/reviews/:id',async(req,res)=>{
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const review = await reviewcollection.findOne(query);
  res.send(review);
})
app.put('/reviews/:id', async(req,res)=>{
  const id =req.params.id;
  const review =req.body;
  const query ={_id:ObjectId(id)}
  
  const option = {upsert: true};
  const updateDoc={
    $set:{
      serviceName:review.serviceName,
      email: review.email,
      date:review.date,
      textarea:review.textarea
    }
 
  }
  const result = await reviewcollection.updateOne(query,updateDoc);
  res.send(result)
})
    app.get('/threeservice',async(req,res)=>{
        const query ={}
        const coursor = database.find(query)
        const service = await coursor.limit(3).toArray();
        res.send(service)
      
      
  });
    //id
     app.get('/service/:id',async(req,res)=>{
        const id = req.params.id;
        const query ={_id: ObjectId(id)};
        const service = await database.findOne(query);
        res.send(service);
     })
    } finally {
      
    }
  
 


app.get('/',(req,res)=>{
    res.send('server is running')
})
app.listen(port,()=>{
    console.log('server is running on port',{port})
})

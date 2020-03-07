const express = require('express'),
      MongoClient = require('mongodb').MongoClient,
      url = process.env.MONGODB_URI || 'mongodb://localhost:27017/',
      router = express.Router();



router.get('/', (req, res, next) => {
    MongoClient.connect(url, (err,db) => {
      if(err) throw err ;
      const dbo = db.db("todo");
      dbo.collection("todolist").find().toArray((error,todolist) => {
        if(error) throw error ;
        res.send(todolist);
        db.close();
      });
    });
});
  
router.post('/add', (req, res, next) => {
    const name = req.body.name ;
    MongoClient.connect(url, (err,db) => {
      if(err) throw err ;
      const dbo = db.db("todo");
      dbo.collection("todolist").find({name:name}).toArray((error, result) => {
        if(error) throw error ;
        if(result.length > 0) res.send("Already Added !!");
        else {
          dbo.collection("todolist").insertOne({name:name},(er, ress) => {
            if(er) throw err ;
            res.send("");
          });
        }
        db.close();
      });
    });
});
  
router.delete('/del/:name', (req, res, next) => {
    const name = req.params.name;
    MongoClient.connect(url, (err,db) => {
      if(err) throw err;
      const dbo = db.db("todo");
      dbo.collection("todolist").deleteOne({name:name},(error,result) => {
        if(error) throw error ;
        res.send("");
        db.close();
      });
    });
});

module.exports = router ;
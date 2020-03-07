const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/";
const PORT = process.env.PORT || 5000 ;
const apis = require('./routes/api')

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/',apis);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));

  app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname,'../client','build','index.html'));
  });
}

app.listen(PORT, () => {
  console.log('Server listening at port : ${PORT}');
});

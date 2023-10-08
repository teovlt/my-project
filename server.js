import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';

//express app
const app = express();

//middleware
app.use((req, res, next) => {
   console.log(req.path, req.method);
   next();
});

//routes
app.get('/', (req, res) => {
   res.json({ msg: 'Welcome to our app' });
});

//Connect to DB
mongoose
   .connect(process.env.MONG_URI)
   .then(() => {
      //listen for requests
      app.listen(process.env.PORT, () => {
         console.log('connected to db & listening on port', process.env.PORT);
      });
   })
   .catch((err) => {
      console.log(err);
   });

import express from 'express';
import 'dotenv/config';

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

//listen for requests
app.listen(process.env.PORT, () => {
   console.log('listening on port 3000');
});

const express=require('express');
const port=2025;

const app=express();
const db=require('./Config/db')
const session=require('express-session');
const cors=require('cors');


app.use(cors({ origin : 'http://localhost:5173',credentials : true}));
app.use(express.json());

app.use(express.urlencoded());

app.use(session({
  name : "Mern-demo",
  secret: 'keyboard',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge : 100 * 100 * 60 }
}))

app.use("/",require('./Routes/index'));

app.listen(port,console.log(`Server Started on port : ${port}`));

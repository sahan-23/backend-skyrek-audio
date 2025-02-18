//-------------------import the dependencies-------------------
import express from 'express';// import express fremwork
import bodyParser from 'body-parser'; // auto refresh the server
import mongoos, { Mongoose } from 'mongoose'; // import mongoose to connect to mongodb
import studentRouter from './routes/studentRoutes.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import jwt from "jsonwebtoken"; // generate token to
import dotenv from "dotenv"; // import the dotenv
import reviewRouter from './routes/reviewRouter.js';
import inquiryRouter from './routes/inquiryRouter.js';
import cors from 'cors'; // import the cors

dotenv.config(); // configure the dotenv 

const app = express(); // create an instance of express
app.use(cors()); // use the cors
// middleware
app.use(bodyParser.json()); // filter the json data (request)

app.use((req, res, next)=>{
  console.log("request is here");
  //next();// go to the next middleware ,it is a function
  let token = req.header
  ("Authorization");
  if(token != null){
    token = token.replace("Bearer ", "");
  }
  jwt.verify(token, process.env.JWT_SECRET,
    (error, decoded)=>{
      if(!error){
        req.user = decoded;
      }
    })
  next();
})

//-------------------mongodb connection-------------------
// mongodb url
let mongourl = process.env.MONGO_URL;
// mongodb connect with the url
mongoos.connect(mongourl);
// get the connection
const connection = mongoos.connection;
// check the connection
connection.once("open", ()=>{
  console.log("MongoDB Connection Established Successfully");
});
//------------------------------------------------------------
//--------------- Routers---------==========
app.use("/students", studentRouter);  // use the student router)

app.use("/api/users", userRouter); // use the user router

app.use("/api/products", productRouter); // use the product router
app.use("/api/reviews", reviewRouter);
app.use("/api/inquirys", inquiryRouter);
// //-------------------mongodb schema-------------------
// //-------------------get method-----------------------
// app.get("/",
//   (req, res)=>{
//     // import the student model from the student.js file
//     // get all the students from the database
//     Student.find().then(
//       (result)=>{
//         res.json(result);
//       }
//     ).catch(
//       ()=>{
//         res.json({"message" : "An Error Occured"});
//       }
//     )  
//   }
// );
// //-------------------post method-------------------
// app.post("/",
//   (req, res)=>{
//     // import the student model from the student.js file
//     // create a new student
//     let newStudent = req.body;
//     let student = new Student(newStudent);
//     // save the student in the database
//     student.save().then(
//       ()=>{
//         res.json({"message" : "Student Created Successfully"});
//       }
//     ).catch(
//       ()=>{
//         res.json({"message" : "An Error Occured"});
//       }
//     )
//   }
// )
// app.delete("/",
//   (req, res)=>{
//     console.log("that is the delete request");
//   }
// )



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});         



// sahan2000.com 1234 customer
// sandeepa.com 1234 admin
const express =require('express');
const router =require('./backend/routes/api')
const app=new express;


const rateLimit=new express();
const helmet =require ('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const xss =require('xss-clean');
const hpp=require ('hpp');
const cors =require ('cors');
const cookieParser =require('cookieParser');
const mongoose =require('mongoose');
const path =require('path');

let URL="mongodb+srv://<usernsme>:<db_password>@cluster1.iyufu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
let option={user:'alamin', pass:"2233",autoIndex:true};
 mongoose.connect(URL,option).then((res)=>{
  console.log("Database Connected")
 }).catch((err)=>{
  console.log(err)
 })

 app.use(cookieParser());
 app.use(cors());
 app.use(helmet());
 app.use(mongoSanitize())
 app.use(xss())
 app.use(hpp())

 app.use(express.json({limit: '50mb'}));
 app.use(express.urlencoded({limit: '50mb'}));

 const limiter= rateLimit({windowMs:15*60*1000, max:3000})
 app.use(limiter)

app.use("/api/v1",router)

app.use(express.static('Frontend/dist'));

app.get('*',function (req,res){
  res.sendFile(path.resolve(__dirname,'Frontend','dist' , 'index.html'))
})

module.exports=app;
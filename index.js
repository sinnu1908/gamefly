const express=require("express");
const { connection } = require("./db");
require("dotenv").config();
const cors=require("cors");
const { adminRouter } = require("./routes/admin.routes");

const productRoute = require("./routes/productRoutes");

const userRoute = require("./routes/user.routes");

require("dotenv").config();

const app=express();
app.use(cors()); 

// app.use(cors());   install later


app.use(express.json());
app.use("/user",userRoute);


app.use("/admin",adminRouter)


app.use(productRoute);

app.listen(process.env.port,async()=>{
    try{
        await connection;
        // console.log("Server is running and db is connected");
        console.log(`server is running at ${process.env.port}`);
        console.log("database is connected");
    }catch(err){
        console.log(err)
    }
})
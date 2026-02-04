import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "../Backend/src/db/DataBassConnection.js"

dotenv.config({ path: './.env' })

const app = express()

/*app.get("/",(req,res) =>
{
    // res.send("hello ji")

    return res.status(200).json({message : "welcome to api",timestamp: new Date().toISOString,success : true});
})  */

//  dont allow of another domines

app.use(cors({
  origin: "http://localhost:5173", // ✅ your React app URL
  credentials: true,               // ✅ allow cookies/authorization headers
}));


// api data limite
app.use(express.json())
// url me jo + - ka symbol hote hai wo sub ke lea hai 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const port = 5001

// ✅ Correct
import router from "./src/routes/user.route.js";
import Companyrouter from "../Backend/src/routes/company.route.js"
import jobrouter from "../Backend/src/routes/job.route.js"
import application_route from "../Backend/src/routes/application.route.js"


app.use("/api/v1/users", router)
// http://localhost:8000/api/v1/users/register
app.use("/api/v1/company", Companyrouter)
app.use("/api/v1/job", jobrouter)
app.use("/api/v1/application", application_route)



app.listen( process.env.PORT ||port,async (req,res) =>
{
    await connectDB(); 
    console.log(`server are running of port : ${process.env.PORT || port}`);
})
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corOptions = {
  origin: "http://localhost:5173",
  credentials: true,
}
app.use(cors(corOptions));

const PORT = process.env.PORT || 8000;

//api's
app.use("/api/v1/user",userRoute);
// "http://localhost:8000/api/v1/user/login" #login
// "http://localhost:8000/api/v1/user/logout" #logout
// "http://localhost:8000/api/v1/user/register" #register
// "http://localhost:8000/api/v1/user/profile/update" #update profile
app.use("/api/v1/company",companyRoute);
// http://localhost:8000/api/v1/company/register #register company
// http://localhost:8000/api/v1/company/get get #all companies
// http://localhost:8000/api/v1/company/get/:id  #get company by id
// http://localhost:8000/api/v1/company/update/:id  #update company by id
app.use("/api/v1/job",jobRoute);
// http://localhost:8000/api/v1/job/post #post job
// http://localhost:8000/api/v1/job/get  #get all jobs
// http://localhost:8000/api/v1/job/getadminjobs #get admin jobs
// http://localhost:8000/api/v1/job/get/+idJob #get job by id
app.use("/api/v1/application",applicationRoute);
// http://localhost:8000/api/v1/application/apply/:idJob #apply for job
// http://localhost:8000/api/v1/application/get #get all applied jobs
// http://localhost:8000/api/v1/application/:idJob/applicants #get all applicants for job
// http://localhost:8000/api/v1/application/status/:idApplication/update #update status for application


app.listen(PORT,()=>{
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
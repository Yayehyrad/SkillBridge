import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user/user.route";
import courseRouter from "./routes/instructor/instructor.course.route";
import mediaRouter  from "./routes/instructor/instructor.media";



const app = express();

app.use(cors(
    // {
    //     origin : process.env.CLIENT_URL,
    //     methods : ["GET" , 'POST' , 'PUT' , 'DELETE'],
    //     allowedHeaders: ["Content-Type" , "Authorization"]
    // }
));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/v1/users' , userRouter)
app.use('/api/v1/course' , courseRouter)
app.use('/api/v1/instructor' , mediaRouter)
// app.get("/", (req , res) => {
//   res.send("Hello World!");
// });

export = app;

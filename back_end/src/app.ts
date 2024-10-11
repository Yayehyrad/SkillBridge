import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors(
    {
        origin : process.env.CLIENT_URL,
        methods : ["GET" , 'POST' , 'PUT' , 'DELETE'],
        allowedHeaders: ["Content-Type" , "Authorization"]
    }
));
app.use(bodyParser.json());
app.use(cookieParser());
// app.get("/", (req , res) => {
//   res.send("Hello World!");
// });

export = app;

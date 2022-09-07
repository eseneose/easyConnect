import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import AuthRoute from "./Routes/AuthRoute.js"
import UserRoute from "./Routes/UserRoute.js"
import PostRoute from "./Routes/PostRoute.js"
import UploadRoute from "./Routes/UploadRoute.js"
import cors from 'cors'
import dotenv from 'dotenv'


//Routes
const app = express();
//Serve images from public
app.use(express.static('public'))
app.use('/images', express.static('images'))

//Middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
dotenv.config()


mongoose.connect("mongodb+srv://easyitpro:Felicita1991.@cluster1.x8ihjhq.mongodb.net/EasyCOnnect?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => app.listen(5000, () => console.log("Listening")))

//Route usage
app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/post', PostRoute)
app.use('/upload', UploadRoute)
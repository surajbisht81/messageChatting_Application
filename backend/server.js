
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import Messages from "./messages.js";
import dynamicModel from "./messagesRoom.js";
import cors from "cors";


// app configuration

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1183689",
    key: "c9fa659fc6b359a23989",
    secret: "9da56a5db535e10c7d95",
    cluster: "eu",
    useTLS: true
});

//middleware
app.use(express.json());
app.use(cors());

// DB Configuration

const url = "mongodb+srv://suraj_bisht_99:zoe6B82AZjaLXgw7@cluster0.zp9dc.mongodb.net/Whatsapp_MERN";
mongoose.connect(url, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=> console.log('mongoDB is connected'))
        .then(err => console.log(err));


const db = mongoose.connection;

db.once('open', () => {
     console.log("DB is connected");

     const msgCollection = db.collection('messagecontents');
     const changeStream = msgCollection.watch();

     changeStream.on('change', (change) => {
         console.log(change);

         if(change.operationType === 'insert'){
             const msgDetails = change.fullDocument;

             pusher.trigger('messages', 'inserted',
             {
                 name: msgDetails.name,
                 message: msgDetails.message,
                 timestamp: msgDetails.timestamp,
                 received: msgDetails.received,
             })
         }
         else{
             console.log('Error triggering pusher');
         }
     })
})

// API routes

app.get("/", (req, res) => {
    res.status(200).send("Hello World");
})


app.get("/messages/sync", async (req, res) => {
        await Messages.find( (err, data) => {
            if(err){
                console.log(err);
                res.status(500).send(err);
            }else{
                res.status(200).send(data);
            }
        })
})

app.get('/collections', (req, res, next)=>{
    mongoose.connection.db.listCollections().toArray().then(collection => {
        res.status(200).send(collection);
        next();
    });
})


app.post("/messages/new", async (req, res) => {
     
    try{
        const newMessage = new Messages(req.body);
        const newMessageCreated = await newMessage.save();
        res.status(201).send(newMessageCreated);
    }
    catch(err){
        res.status(400).send(err);
    }
});

app.post("/room/new", async (req, res) => {
    try{
        const user_name = req.body.room;
        const Model  = dynamicModel(user_name);
        
        if(!Model){
             console.log("error is occured");
        }else{
             const newMessage = new Model({
                "message": "Welcome to new Group",
                "name": "Bot",
                "timestamp": Date.now(),
                "received": "false",
             });
            const newMessageCreated = newMessage.save();
            res.status(201).send(newMessageCreated);
        }
    }
    catch(err){
        res.status(400).send(err);
    }
})

// listening part 

app.listen(port, () => console.log(`listening on port number ${port}`));
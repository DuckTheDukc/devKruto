import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function startServer() {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    console.log("Подключение к in-memory MongoDB...");
    await mongoose.connect(uri);

    const app = express();
    app.use(express.json());

    // ...
    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Имя обязательно"],
        },
        email: {
            type: String,
            required: [true, "Email обязателен пон?"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/.+@.+\..+/, "неверный формат Email" ]
        },
        age:{
            type: Number,
            required:true,
            min: [0, "меньше 0 не может быть пон?"]
        }

    });
const User = mongoose.model("User", userSchema);

app.post("/users", async (req, res)=> {

        const user = await User.create(req.body);
        res.status(201).json(user);

}) ;
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

app.get("/users/:id", async (req, res) =>{
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
    const user = await User.findById(req.params.id);
    if(user){
        res.status(200).json(user);
        return
    }else{
        res.status(404).json("нет такого");
    }
    
    }
    else{
        res.status(400).json("формат не правильный, бро");
    }
});

app.put("/users/:id", async (req, res) =>{
     if(mongoose.Types.ObjectId.isValid(req.params.id)){
const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
    
if(user){
        res.status(200).json(user);
        return
    }else{
        res.status(404).json("нет такого");
    }
     }
         else{
        res.status(400).json("формат не правильный, бро");
    }
});

app.delete("/users/:id", async (req, res) =>{
     if(mongoose.Types.ObjectId.isValid(req.params.id)){
const user = await User.findByIdAndDelete(req.params.id, req.body);
    
if(user){
        res.status(200).json(user);
        return
    }else{
        res.status(404).json("нет такого");
    }
     }
         else{
        res.status(400).json("формат не правильный, бро");
    }
});

    app.use((req, res) => {
        res.status(404).send({ error: "Not found" });
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: err.message });
    });

    app.listen(3001, () => {
        console.log("Сервер запущен на http://localhost:3001");
    });
}

startServer().catch(console.error);

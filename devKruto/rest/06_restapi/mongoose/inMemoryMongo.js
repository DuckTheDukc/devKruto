import express from "express";
import mongoose from "mongoose";
// npm install --save-dev mongodb-memory-server
import { MongoMemoryServer } from "mongodb-memory-server";

async function startServer() {
    const mongod = await MongoMemoryServer.create(); // создаём in-memory сервер
    const uri = mongod.getUri(); // URI для подключения

    console.log("Подключение к in-memory MongoDB...");
    await mongoose.connect(uri);

    const app = express();
    app.use(express.json());

    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Имя обязательно"],
        },
        email: {
            type: String,
            required: [true, "Email обязателен"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/.+@.+\..+/, "Неверный формат email"], // простая проверка формата
        },
        age: {
            type: Number,
            required: true,
            min: [0, "Возраст не может быть отрицательным"],
        },
    });

    const User = mongoose.model("User", userSchema);

    // Без валидации
    // const User = mongoose.model(
    //     "User",
    //     new mongoose.Schema({
    //         name: String,
    //         email: String,
    //         age: Number,
    //     })
    // );

    app.get("/users", async (req, res) => {
        const users = await User.find();
        res.json(users);
    });

    app.post("/users", async (req, res) => {
        const user = await User.create(req.body);
        res.status(201).json(user);
    });

    app.listen(3001, () => {
        console.log("Сервер запущен на http://localhost:3001");
    });
}

startServer().catch(console.error);

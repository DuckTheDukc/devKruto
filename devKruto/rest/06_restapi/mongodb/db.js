import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

export async function connectDB() {
    try {
        await client.connect();
        console.log("Подключено к MongoDB");
        return client.db("student_db"); // создаём/берём БД student_db
    } catch (err) {
        console.error("Ошибка подключения:", err);
    }
}

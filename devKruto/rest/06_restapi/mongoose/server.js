// mongooseExample.js
import mongoose from "mongoose";

await mongoose.connect("mongodb://localhost:27017/student_db");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, match: /.+\@.+\..+/ },
    age: { type: Number, min: 0 },
});

const User = mongoose.model("User", userSchema);

// CRUD
const alice = await User.create({ name: "Alice", email: "alice@mail.com", age: 20 });
console.log("Создан:", alice);

const found = await User.findOne({ name: "Alice" });
console.log("Найден:", found);

await User.updateOne({ name: "Alice" }, { age: 22 });
console.log("Обновлён");

await User.deleteOne({ name: "Alice" });
console.log("Удалён");

await mongoose.disconnect();
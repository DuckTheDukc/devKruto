import { connectDB } from "./db.js";

const run = async () => {
    const db = await connectDB();
    const users = db.collection("users");

    const newUser = { name: "Alice", email: "alice@mail.com", age: 20 };
    const { insertedId } = await users.insertOne(newUser);

    const user = await users.findOne({ name: "Alice" });

    await users.updateOne({ _id: insertedId }, { $set: { age: 21 } });

    await users.deleteOne({ _id: insertedId });
};

run();

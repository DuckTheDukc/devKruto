import { connectDB } from "./db.js";

const run = async () => {
    const db = await connectDB();

    await db.createCollection("users", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "email"],
                properties: {
                    name: { bsonType: "string" },
                    email: { bsonType: "string", pattern: "^.+@.+$" },
                    age: { bsonType: "int", minimum: 0 },
                },
            },
        },
    });

    console.log("Коллекция users создана");
};

run();

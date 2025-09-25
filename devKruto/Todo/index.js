import express from "express";

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.static('public'))


app.listen(port, () => {
console.log(`server running on port localhost:${port}`);
})
let tasks = [
    { id: 1, title: "Купить хлеб" },
    { id: 2, title: "Сделать домашку" },
];

app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
    const task = { id: tasks.length + 1, title: req.body.taskTitle };
    tasks.push(task);
    res.status(201).json(tasks);
});
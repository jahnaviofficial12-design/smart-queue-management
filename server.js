const express = require("express");

const app = express();

const PORT = 3000;

let queue = [];
let nextNumber = 1;

app.use(express.json());

app.use(express.static("public"));

app.get("/api/queue", (req, res) => {
    res.json(queue);
});

app.post("/api/queue", (req, res) => {

    const { name, service } = req.body;

    if (!name || !service) {
        return res.status(400).json({
            message: "Please enter name and service"
        });
    }

    const person = {
        number: nextNumber,
        name: name,
        service: service
    };

    queue.push(person);

    nextNumber++;

    res.json({
        message: "Added to queue",
        person: person
    });
});

app.delete("/api/queue/next", (req, res) => {

    if (queue.length === 0) {
        return res.status(404).json({
            message: "Queue is empty"
        });
    }

    const person = queue.shift();

    res.json({
        message: "Now serving",
        person: person
    });
});

app.delete("/api/queue", (req, res) => {

    queue = [];

    res.json({
        message: "Queue cleared"
    });
});

app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});

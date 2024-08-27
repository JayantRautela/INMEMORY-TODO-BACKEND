const express = require('express');

const app = express();

const port = 3000;

app.use(express.json());

//Accept todo-description and tod-number from the user.
const todo = [];

app.get('/all-todos', (req, res) => {
    if(todo.length == 0){
        return res.send("No todos to show")
    }
    res.json(todo);
    //sending json response.
})

app.post('/add-todo', (req, res) => {
    const {id, description} = req.body;
    if(!id || !description){
        console.log("Empty fields");
        return res.status(400).send("Empty fields");
    }
    const todoObj = {
        id: parseInt(id),
        description: description
    };
    todo.push(todoObj);
    res.send("Todo added")
})

app.put("/update-todo", (req, res) => {
    if(todo.length == 0){
        return res.send("No todos to show")
    }
    const {id, description} = req.body;
    if(!id || !description){
        console.log("Empty fields");
        return res.status(400).send("Empty fields");
    }
    const update_todo = todo.find(t => t.id === parseInt(id));
    if(!update_todo){
        return res.status(404).send("Error while finding todo")
    }

    update_todo.description = description;
    res.send("Todo updated");
})

app.delete("/delete-todo", (req, res) => {
    if(todo.length == 0){
        return res.send("No todos to show")
    }   
    const {id} = req.body;
    if(!id){
        console.log("Empty field");
        return res.status(400).send("Empty fields");
    }
    const index = todo.findIndex(t => t.id === parseInt(id));
    if (index === -1) {
        return res.status(404).send("Todo not found");
    }

    todo.splice(index, 1);
    res.send(`Todo deleted`);
})


app.listen(port, () => {
    console.log(`Server Started at port : ${port}`);
});
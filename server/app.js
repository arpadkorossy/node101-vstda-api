const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')

const app = express();

// add your code here
// app.use(morgan('combined'))
app.use(bodyParser.json());

let todoItems = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];

app.get('/', (req, res) => {
    console.log('GET /')
    res.status(200).json({status: "ok"});
});

app.get('/api/TodoItems', (req, res) => {
    console.log('GET /api/TodoItems')
    res.status(200).json(todoItems);
});

app.get('/api/TodoItems/:number', (req, res) => {
    console.log('GET /api/TodoItems/:number')
    for (let i in todoItems) {
        if (todoItems[i].todoItemId == req.params.number) {
            res.status(200).send(todoItems[i]);
        }
    }
});

app.post('/api/TodoItems/', (req, res) => {
    console.log('POST api/TodoItems/')
    newToDo = true;
    for (let i in todoItems) {
        console.log(todoItems[i]);
        if (todoItems[i].todoItemId == req.query.todoItemId) {
            console.log("Replaced item");
            todoItems[i] = req.query;
            res.status(201).send(todoItems[i]);
            newToDo = false;
        }
    }
    if (newToDo) {
        console.log('Added item')
        todoItems.push(req.query);
        console.log(todoItems);
        
        // Passes tests with:
        // res.status(201).json(req.body);
        // But correct response seen in Postman for:
        // res.status(201).send(todoItems[todoItems.length-1]);
       
        // res.status(201).json(req.body);
        res.status(201).send(todoItems[todoItems.length-1]);
    }
});

app.delete('/api/TodoItems/:number', (req, res) => {
    console.log('DELETE /api/TodoItems/:number')
    let count = 0;
    for (let i in todoItems) {
            if (todoItems[i].todoItemId == req.params.number) {
            res.status(200).send(todoItems[i]);
            console.log(todoItems);
            todoItems.splice(count, 1);
            console.log(todoItems);
            console.log('Deleted item');
        }
        count++;
    }
});

module.exports = app;

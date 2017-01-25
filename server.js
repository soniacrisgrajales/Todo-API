var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('Todo API Root');
});

// GET /todos
app.get('/todos', function(req, res){
	res.json(todos);
});

// GET /todos/:id
app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var todoItem = _.findWhere(todos, {id:todoId});

	if(todoItem) {
		res.json(todoItem);
	} else {
		res.status(404).send();
	}
});

// POST /todos
app.post('/todos', function(req, res){
	var body = _.pick(req.body, 'description', 'completed');

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}

	body.id = todoNextId++;
	body.description = body.description.trim();
	todos.push(body);

	res.json(body);
});

// DELETE /todos/:id
app.delete('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var todoItem = _.findWhere(todos, { id: todoId });

	if(!todoItem) {
		res.status(404).json({ "error": "no todo found with that id" });
	} else {
		todos = _.without(todos, todoItem);
		res.json(todoItem); 
	}
});

app.listen(PORT, function(){
	console.log('Express listenint on port ' + PORT + '!');
});
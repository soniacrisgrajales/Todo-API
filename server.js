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
	var queryParams = req.query;
	var filteredTodos = todos;

	console.log(queryParams);

	if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'true'){
		filteredTodos = _.where(todos, { completed: true });
	} else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
		filteredTodos = _.where(todos, { completed: false });
	}

	res.json(filteredTodos);
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

// PUT /todos/:id
app.put('/todos/:id', function(req, res) {
	var body = _.pick(req.body, 'description', 'completed');
	var todoId = parseInt(req.params.id);
	var todoItem = _.findWhere(todos, {id: todoId});
	var validAttributes = {};

	if(!todoItem) {
		return res.status(404).send();
	}

	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttributes.completed = body.completed;
	} else if(body.hasOwnProperty('completed')) {
		return res.status(404).send();
	}

	if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description
	} else if(body.hasOwnProperty('description')) {
		return res.status(404).send();
	}

	_.extend(todoItem, validAttributes);

	res.json(validAttributes);
});


app.listen(PORT, function(){
	console.log('Express listenint on port ' + PORT + '!');
});
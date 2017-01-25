var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todosFinder = require('./todosFinder.js');
var todos = [{
	id: 1,
	description: 'Finish section 6 of nodejs course',
	completed: true
}, {
	id: 2,
	description: 'Vocal technique exercises',
	completed: false
}, {
	id: 3, 
	description: 'Go to the church',
	completed: false
}];

app.get('/', function(req, res){
	res.send('Todo API Root');
});

app.get('/todos', function(req, res){
	res.json(todos);
});

app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id);
	var todoItem;

	todos.forEach(function(todo){
		if(todo.id === todoId){
			todoItem = todo;
		}
	});

	if(todoItem) {
		res.json(todoItem);
	} else {
		res.status(404).send();
	}
});

app.listen(PORT, function(){
	console.log('Express listenint on port ' + PORT + '!');
});
var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});

//model todo
var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

// force:true is used to recreate all the tables
sequelize.sync({
	//force:true
}).then(function(){
//return Todo.findById(1);

	// console.log('Everything is synced');
	// Todo.create({
	// 	description: 'Take out trash'
	// }).then(function(){
	// 	Todo.create({
	// 		description: 'Go to the church'
	// 	});
	// }).then(function(){
	// 	//return Todo.findById(1)
	// 	return Todo.findAll({
	// 		where: {
	// 			description: {
	// 				$like: '%office%'
	// 			}
	// 		}
	// 		// where: {
	// 		// 	completed:false
	// 		// }
	// 	});
	// }).then(function(todos){
	// 	todos.forEach(function(todo){
	// 		console.log(todo.toJSON());
	// 	})
	// }).catch(function(e){
	// 	console.log(e);
	// })
// }).then(function(todo){
// 	if(todo){
// 		console.log(todo.toJSON());
// 	} else {
// 		console.log('Item not found');
// 	}
	Todo.findById(3).then(function(todo){
		if(todo) {
			console.log(todo.toJSON());
		} else {
			console.log('Item not found');
		}
	})
});
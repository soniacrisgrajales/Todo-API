var person = {
	name: 'Sonia',
	age: '32'
};

function updatePerson(obj) {
	// obj = {
	// 	name: 'Sonia',
	// 	age: '30'
	// };
	obj.age = 30;
}

updatePerson(person);
console.log(person.age);


var arrayFruits = ['orange', 'apple', 'banana', 'pineapple'];

function updateFruits(fruits) {
	fruits.push('mango');
}


updateFruits(arrayFruits);

console.log(arrayFruits);
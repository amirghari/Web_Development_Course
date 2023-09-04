const person = { name: "Alice", age: 30, city: "New York" };

const { name, age } = person;

console.log("Name:", name);
console.log("Age:", age);

//More

function greetUser({ name, age }) {
  console.log(`Hello, ${name}! You're ${age} years old.`);
}

greetUser({ name: "Bob", age: 25 });

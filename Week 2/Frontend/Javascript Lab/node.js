const name = "Amir";
const message = `Hello my name is ${name}.`;
console.log(message);

//Part 2

const person = { name: "John", age: 25, email: "john@example.com" };
const jsonPerson = JSON.stringify(person);
console.log(jsonPerson);

const jsonString = '{"name": "Alice", "age": 30, "email": "alice@example.com"}';
const parsedPerson = JSON.parse(jsonString);
console.log(parsedPerson);

//Part 3

const add = (x, y) => {
  return x + y;
};
const calculate = add;
const sum = calculate(5, 3);
console.log(`sum = ${sum}`);

const operate = (x, y, operate) => {
  return operate(x, y);
};
const multiply = (x, y) => {
  return x * y;
};
const result = operate(5, 4, multiply);

console.log(`multiplication = ${result}`);

function greetPrefix(prefix) {
  return function (name) {
    console.log(`${prefix}, ${name}!`);
  };
}

const greetHello = greetPrefix("Hello");
const greetHi = greetPrefix("Hi");

greetHello("Alice");
greetHi("Bob");

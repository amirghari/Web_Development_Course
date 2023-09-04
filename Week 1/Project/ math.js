function add(a, b) {
  return a + b;
}

module.exports = add;

const add = require("./math");

test("adds 1 + 2 to equal 3", () => {
  expect(add(1, 2)).toBe(3);
});

function add(a, b) {
  return _.add(a, b);
}

module.exports = add;

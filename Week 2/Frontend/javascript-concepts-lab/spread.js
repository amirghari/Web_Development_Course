const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const combinedArray = [...arr1, ...arr2];

console.log("Array 1:", arr1);
console.log("Array 2:", arr2);
console.log("Combined Array:", combinedArray);

//More

const originalArray = [10, 20, 30];
const newArray = [...originalArray, 40, 50];

console.log("Original Array:", originalArray);
console.log("New Array with Additional Elements:", newArray);

//More

const arr11 = [1, 2, 3];
const arr22 = [4, 5, 6];
const arr33 = [7, 8, 9];

const mergedArray = [...arr11, ...arr22, ...arr33];

console.log("Array 1:", arr11);
console.log("Array 2:", arr22);
console.log("Array 3:", arr33);
console.log("Merged Array:", mergedArray);

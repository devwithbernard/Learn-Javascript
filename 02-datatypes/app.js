// Number
let n = 123;
n = 12.253;
console.log(`Typeof ${n} ==> ${typeof n}`);

// Operators
const operators = [
  {
    text: "addition",
    sign: "+",
  },
  {
    text: "subtraction",
    sign: "-",
  },
  {
    text: "multiplication",
    sign: "x",
  },
  {
    text: "division",
    sign: "/",
  },
];

const randomNumbers = [];
while (randomNumbers.length < 100) {
  for (let i = 0; i < 100; i++) {
    const randomNumber = Math.floor(Math.random() * 100);
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }
}

const randomTwoIndexes = [];
while (true) {
  if (randomTwoIndexes.length === 2) {
    break;
  }
  const randomIndex = Math.floor(Math.random() * 100);
  randomTwoIndexes.push(randomIndex);
}
const number1 = randomNumbers[randomTwoIndexes[0]];
const number2 = randomNumbers[randomTwoIndexes[1]];
console.log(`
    ==> ${number1} + ${number2} = ${number1 + number2},
    ==> ${number1} - ${number2} = ${number1 - number2},
    ==> ${number1} x ${number2} = ${number1 * number2},
    ==> ${number1} / ${number2} = ${number1 / number2}
`);

console.log(`1/0 ==> ${1 / 0}.`);

// string
const hello = "Hello";
const name = "Jean";
const greeting = `${hello} ${name}`;
console.log(greeting);

// boolean
const numberStates = [];
let isEven = (number) => {
  return number % 2 === 0;
};

randomNumbers.forEach((number) => {
  if (isEven(number)) {
    numberStates.push({
      number,
      state: true,
    });
  } else {
    numberStates.push({
      number,
      state: false,
    });
  }
});
console.table(numberStates);

// null
const currentUser = null;
console.log(currentUser); // null

// undefined
let age;
const undefinedFunction = () => {
  console.log('Return undefined');
};
const returnValue = undefinedFunction();
console.log(
    `
      returnValue ==> ${returnValue},
      age ==> ${age}
    `
);
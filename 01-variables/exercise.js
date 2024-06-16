// Exercise 1
let admin;
let name = "john";
admin = name;
console.log(`Name ==> ${name}\nAdmin ==> ${admin}`);

// Exercise 2
const OURPLANET = "EARTH";
let currentUsername = "Jane";
console.table({ OURPLANET, currentUsername });

// Exercise 3
const BIRTHDAY = "18.04.1982";
const age = someCode(BIRTHDAY);
console.log(age);
/**
 * Calculate the age of a user
 * @param {string} birthday
 * @return {string}
 */
function someCode(birthday) {
  const birthdayFormatted = birthday.split(".").reverse().join("/");

  const birthDate = new Date(birthdayFormatted);
  const currentDate = new Date();
  const { years, months, days } = dateDiff(birthDate, currentDate);

  return `Your age is ${years} years ${months} months ${days} days.`;
}
/**
 *
 * @param {Date} d1
 * @param {Date} d2
 */
function dateDiff(d1, d2) {
  const diff = d2.getTime() - d1.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  const leftDays = days - years * 365 - 30 * months;

  return { years, months, days: leftDays };
}

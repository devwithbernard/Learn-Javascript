"use strict"

let message; // declaration
console.log(message);
message = 'I love programming in Javascript'; // affectation
console.log(message);

// fusion de la declaration
let nickName = 'Jack';
console.log(`My name is ${nickName}.`);


//Declaration de variable multiple
let user = 'Jack Doe'
let age = 24;
let job = 'Web Developer';
console.table({user, age, job});

let response = await fetch('http://jsonplaceholder.typicode.com/users', {
    method: "GET",
    "Content-Type": "application/json"
});
let users = await response.json();

// Analogie avec la vie réelle
let boite;
boite = "4 billes";
console.log(boite);
boite = "3 tomates";
console.log(boite);

// copie d'une variable dans une autre
let hello = 'Hello world';
let word;

word = hello;
console.log(`
    from 'hello' => ${hello},
    from 'word' => ${word}
`);

// Exercices
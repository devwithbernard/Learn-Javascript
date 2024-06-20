// If Statement
let age = prompt('What age Jamie Lannister are ?');

if (Number(age) === 43) {
    alert("You're right");
}else{
    alert('😥😥 Wrong answer.');
}

// Boolean Conversion
if (!0) {
    alert('0 is falsy');
}
if (!"") {
    alert('Empty String is falsy');
}
if (!undefined) {
    alert("'Undefined' is falsy");
}
if (!NaN) {
    alert("NaN is falsy");
}

// Boolean Evaluation
const currentUser = 'Jane';
const isConnected = currentUser.toLowerCase() === 'jane';

if (isConnected) {
    alert('Jane is connected');
}else {
    alert("😒😒 You're not connected./nSign up please");
}

// Else If Statement
let age = parseInt(prompt('What age do you have?'));
if (age < 0) {
    alert('Impossible');
}else if (age < 12) {
    alert('Too young');
} else if (age < 18) {
    alert('Not allow Yet');
}else if (age < 50) {
    alert('Allow to watch');
}else{
    alert("You're an older man.");
}
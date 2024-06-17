// Message
alert("Hello world");

// Prompt
const age = prompt('Your age: ', 10);

if (!isNaN(age) && age !== null) {
    if (Number(age) < 12) {
        alert('Vous êtes mineur.');
    } else {
        alert('Vous êtes majeur.');
    }
} else if (age === null) {
    alert('Saisie annulée.');
} else {
    alert("L'age saisi est incorrect.");
}
while (true) {
    const response = confirm('Fin du processus ?: (Ok/Annuler)');
    if (response) {
        alert('Fin du processus.');
        break;
    } else {
        alert('Le processus continue...');
    }
}

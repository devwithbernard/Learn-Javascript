// Check Login

const PASSWORD = 'theMaster';

const result = prompt("Who's there?");

if (!result) {
    alert('Canceled');
}

if (result.toLowerCase() === 'admin') {
    let userPassword = prompt('Your password?');
    if (!userPassword) {
        alert('Canceled');
    } else if (userPassword !== PASSWORD) {
        alert('Wrong Password');
    } else if (userPassword === PASSWORD) {
        alert('Welcome Admin!');
    }
}
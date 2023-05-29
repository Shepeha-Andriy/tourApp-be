import zxcvbn from 'zxcvbn'

const password = 'Baneblad20';
const passwordStrength = zxcvbn(password).score;

console.log(passwordStrength);
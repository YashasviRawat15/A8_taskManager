// Import the dotenv package
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Now you can access the environment variables using process.env
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;
const jwtSecret = process.env.JWT_SECRET;

console.log(`DB Host: ${dbHost}`);
console.log(`DB User: ${dbUser}`);
console.log(`DB Password: ${dbPassword}`);
console.log(`DB Database: ${dbDatabase}`);
console.log(`JWT Secret: ${jwtSecret}`);

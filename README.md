# Backend App

## Overview

This is the backend application for a project. It is built using Node.js and Express, along with several dependencies for handling HTTP requests, email sending, and database interactions.

## Installation

1. Clone the repository: `git clone https://github.com/manthanank/backend-app.git`
2. Navigate to the project directory: `cd backend-app`
3. Install dependencies: `npm install`

## Usage

### Development

Run the following command to start the development server with nodemon:

```bash
npm run dev
```

This will automatically restart the server whenever changes are made.

### Production

To start the server in production, use:

```bash
npm start
```

## Dependencies

- [axios](https://www.npmjs.com/package/axios): Promise-based HTTP client for the browser and Node.js
- [body-parser](https://www.npmjs.com/package/body-parser): Node.js body parsing middleware
- [cors](https://www.npmjs.com/package/cors): Middleware for enabling Cross-Origin Resource Sharing (CORS)
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file
- [express](https://www.npmjs.com/package/express): Web framework for Node.js
- [mongoose](https://www.npmjs.com/package/mongoose): MongoDB object modeling tool designed to work in an asynchronous environment
- [multer](https://www.npmjs.com/package/multer): Middleware for handling `multipart/form-data`, used for file uploads
- [nodemailer](https://www.npmjs.com/package/nodemailer): Send emails with Node.js
- [helmet](https://www.npmjs.com/package/helmet): Secure Express apps by setting various HTTP headers to protect against well-known web vulnerabilities.
- [@notionhq/client](https://www.npmjs.com/package/@notionhq/client): Official Notion API client for Node.js.
- [randomstring](https://www.npmjs.com/package/randomstring): Generate random strings.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): An implementation of JSON Web Tokens.
- [bcrypt](https://www.npmjs.com/package/bcrypt): A library to help you hash passwords.
- [winston](https://www.npmjs.com/package/winston): A logger for just about everything.
- [moment](https://www.npmjs.com/package/moment): Parse, validate, manipulate, and display dates and times in JavaScript.
- [lodash](https://www.npmjs.com/package/lodash): A modern JavaScript utility library delivering modularity, performance & extras.
- [express-validator](https://www.npmjs.com/package/express-validator): Express middleware for validation and sanitization.
- [compression](https://www.npmjs.com/package/compression): Compression middleware for Express responses.
- [morgan](https://www.npmjs.com/package/morgan): HTTP request logger middleware for Node.js.
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit): Basic rate-limiting middleware for Express.

## Development Dependencies

- [nodemon](https://www.npmjs.com/package/nodemon): Utility that automatically restarts the server during development

## Node and NPM Versions

- Node.js: 16.15.1
- NPM: 8.12.1

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

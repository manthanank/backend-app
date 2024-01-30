# Backend App

## Overview

This is the backend application for a project. It is built using Node.js and Express, along with several dependencies for handling HTTP requests, email sending, and database interactions.

## Installation

1. Clone the repository: `git clone <repository-url>`
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

## Development Dependencies

- [nodemon](https://www.npmjs.com/package/nodemon): Utility that automatically restarts the server during development

## Node and NPM Versions

- Node.js: 16.15.1
- NPM: 8.12.1

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# @shaon07/express-log

## Introduction
**@shaon07/express-log** is a middleware function for Express.js that mimics Laravel's `dd()` function. It allows developers to dump data directly to the console in a similar way to Laravel's `dd()`, making debugging easier and more efficient.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Scripts](#scripts)
- [Configuration](#configuration)
- [Documentation](#documentation)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

## Installation
To install **@shaon07/express-log**, run the following command:

```bash
npm install @shaon07/express-log
```

## Usage
To use the middleware in your Express.js application, include it and apply it as follows:

```javascript
import express from 'express';
import expressLog from '@shaon07/express-log';

const app = express();

app.use(expressLog);

app.get('/', (req, res) => {
  // Your code here
  req.log("Hello world")
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## Features
- Mimics Laravel's `dd()` function.
- Dumps data directly to the console.
- Helps in debugging Express.js applications efficiently.

## Dependencies
**@shaon07/express-log** relies on the following npm packages:
- `express`: ^4.19.2
- `nodemon`: ^3.1.4
- `util`: ^0.12.5

## Scripts
The following scripts are defined in the `package.json`:

- `start`: Runs the application using Node.js.
  ```bash
  npm start
  ```

- `dev`: Runs the application using Nodemon for automatic restarts.
  ```bash
  npm run dev
  ```

- `test`: Placeholder for running tests.
  ```bash
  npm test
  ```

## Configuration
There are no additional configuration steps required for **@shaon07/express-log**. Simply import and use it in your Express.js application.

## Documentation
For more detailed documentation, visit the [homepage](https://github.com/shaon07/express-log#readme).

## Examples
You can find example usage in the [Usage](#usage) section.

## Troubleshooting
If you encounter any issues or bugs, please report them on the [GitHub issues page](https://github.com/shaon07/express-log/issues).

## Contributors
Developed by [shaon07](https://github.com/shaon07).

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/shaon07/express-log/blob/main/LICENSE) file for details.

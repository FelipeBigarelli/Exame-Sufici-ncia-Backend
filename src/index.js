const express = require('express');

const routes = require('./shared/routes/routes');
const AppError = require('./shared/errors/AppError');

const uploadConfig = require('./app/config/upload');

require('./shared/database/index');

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// eslint-disable-next-line no-unused-vars
app.use((err, request, response, next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3000, () => console.log('Server started at http://localhost:3000.'));

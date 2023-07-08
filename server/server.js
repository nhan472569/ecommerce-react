const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

// process.on('uncaughtException', err => {
//   console.log(err.name, err.message);
//   console.log('UNCAUGHT EXCEPTION. Shutting down...');

//   process.exit(1);
// });

const app = require('./app');
// Connect database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB, () => {
  console.log('connect db successfully');
});
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () =>
  console.log(`Server is listening at port ${PORT}`)
);

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION. Shutting down...');

  server.close(() => {
    process.exit(1);
  });
});

module.exports = server;

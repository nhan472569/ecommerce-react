const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const bookRouter = require('./routes/book.route');
const userRouter = require('./routes/user.route');
const authorRouter = require('./routes/author.route');
const reviewRouter = require('./routes/review.route');
const slugRouter = require('./routes/slug.route');
const favorRouter = require('./routes/favor.route');

const app = express();
app.use(cors());
// cors({
//   origin: process.env.CORS_DOMAIN,
//   credentials: true,
// })

// Add some security headers
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// limit request to server
const limitter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request to this server, please try again after 1 hour.',
});
app.use('/api', limitter);

// Sanitize data before execute query
app.use(mongoSanitize());
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['name', 'ratingsAverage', 'ratingsQuantity', 'price'],
  })
);

// Router
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/authors', authorRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/slug', slugRouter);
app.use('/api/v1/favors', favorRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server.`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);
module.exports = app;

// express 모듈
const express = require('express');
const app = express();

// dotenv 모듈
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

app.listen(process.env.PORT);

const userRouter = require('./src/routes/users');
const bookRouter = require('./src/routes/books');
const categoryRouter = require('./src/routes/cagegory');
const cartRouter = require('./src/routes/carts');
const likeRouter = require('./src/routes/likes');
const orderRouter = require('./src/routes/orders');
const { errorHandler } = require('./src/middlewares/errorHandler');

app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use('/category', categoryRouter);
app.use('/cart', cartRouter);
app.use('/likes', likeRouter);
app.use('/orders', orderRouter);

app.use(errorHandler);

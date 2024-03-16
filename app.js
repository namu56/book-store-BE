// express 모듈
const express = require('express');
const app = express();
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000', // 요청을 허용할 도메인 지정, 프론트엔드 개발 서버
    credentials: true,
};

app.use(cors(corsOptions));

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

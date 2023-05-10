import express from 'express';
import { json } from 'body-parser';
import loginRouter from './routers/login';
import errorMiddleware from './middlewares/error.middleware';
import bodyParser from 'body-parser';
import registerRouter from './routers/register';
import userRouter from './routers/user';
import productsRouter from './routers/products';
import authMiddleware from './middlewares/auth.middleware'
import ordersRouter from './routers/orders';
import cors from 'cors'

const app = express()
app.use(cors())

app.use(express.json());


app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/user', userRouter)
app.use('/products', authMiddleware, productsRouter)
app.use('/orders', authMiddleware, ordersRouter)



app.use(errorMiddleware);

export default app;

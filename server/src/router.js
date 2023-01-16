import bodyParser from 'body-parser'
import express from 'express';

import userRoutes from './routes/user.route'
import expensesRoutes from './routes/expense.route'

const app = express();

/**
 * Set request configurations
 */
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Default router
 */
app.get("/", (request, response, next) => {
    response.json({ message: "Hey! server works!" });
    next();
});

/**
 * Routing apps
 */
app.use('/', userRoutes)
app.use('/', expensesRoutes)

export default app
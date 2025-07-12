import './config/instrument.js'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js';
import bodyParser from 'body-parser';

//initialize express
const app = express()

// connect to database
await connectDB()

//middlewares
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(cors())

// Use raw body parser for /webhooks route BEFORE express.json()
app.use('/webhooks', bodyParser.raw({ type: '*/*' }));

app.use(express.json())

//routes
app.get('/', (req, res) => {
    console.log("Root endpoint hit");
    res.send("API working!");
});
app.post('/webhooks', clerkWebhooks);

// port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
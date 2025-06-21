import './config/instrument.js'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js';
// import userRoutes from './routes/user. 

//initialize express
const app=express()

// connect to database
await connectDB()

//middlewares
app.use(cors())
app.use(express.json())

//routes
app.get('/', (req, res) => res.send("API working!"))
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post('/webhooks' , clerkWebhooks)


// port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
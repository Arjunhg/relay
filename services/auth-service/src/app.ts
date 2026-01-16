import express, { type Application } from "express";
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from "@/middleware/error-handler";

export const createApp = (): Application => {

    const app = express();

    app.use(helmet());
    app.use(
        cors({
            origin: '*',
            credentials: true,
        })
    );
    // credentials: true allows cookies to be sent in CORS requests
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // to handle unknown routes
    app.use((_req, res) => {
        res.status(404).json({ message: "Not Found" });
    })

    app.use(errorHandler);

    return app;
};
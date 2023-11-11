import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';

import { AppDataSource } from "./data-source";
import { config, LoadConfig } from './config';
LoadConfig()


AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(cors())

    app.use(morgan("dev"))
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // routes

    app.set('port', config.port)

    const server = http.createServer(app);
    server.on('listening', onListening);
    server.listen(config.port);

    function onListening() {
        const addr = server.address();
        console.log('Listening on ', addr);
    }
}).catch(error => console.log(error))

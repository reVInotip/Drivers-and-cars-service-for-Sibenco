import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';

import { config, LoadConfig } from './config';

LoadConfig()

import { AppDataSource } from "./data-source";
import carRouter from './routes/car.router';
import driverRouter from './routes/driver.router';
import vangerRouter from './routes/vanger.router';
import swaggerDocs from './utils/swagger';


AppDataSource.initialize().then(async () => {
    console.log("Data Source has been initialized!")
}).catch(error => {
    console.error("Error during Data Source initialization:", error)
})

const app = express();
app.use(cors())

app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use('/cars', carRouter);
app.use('/drivers', driverRouter);
app.use('/vangers', vangerRouter);

//Swagger
swaggerDocs(app, config.port);

app.set('port', config.port)

const server = http.createServer(app);
server.on('listening', onListening);
server.listen(config.port);

function onListening() {
    const addr = server.address();
    console.log('Listening on ', addr);
}
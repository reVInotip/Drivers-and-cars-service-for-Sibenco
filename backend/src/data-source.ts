import "reflect-metadata"
import {DataSource} from 'typeorm';
import Car from './entity/car';
import Driver from './entity/driver';
import Vanger from './entity/vanger';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgres",
    port: process.env.PORT_DB ? Number(process.env.PORT_DB) : 5432,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: true,
    entities: [
        Car, Driver, Vanger
    ]
})
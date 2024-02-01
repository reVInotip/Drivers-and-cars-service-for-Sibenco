import "reflect-metadata"
import {DataSource} from 'typeorm';
import Car from './entity/car';
import Driver from './entity/driver';
import Vanger from './entity/vanger';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST || "postgres",
    port: process.env.PORT_DB ? Number(process.env.PORT_DB) : 5432,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    migrations: ["src/migration/*.{js,ts}"],
    synchronize: false,
    logging: true,
    entities: [
        Car, Driver, Vanger
    ]
})
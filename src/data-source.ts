import "reflect-metadata"
import { DataSource } from 'typeorm';
import Car from './entity/car';
import Driver from './entity/driver';
import Vanger from './entity/vanger';


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST || "localhost",
    port: process.env.PORT_DB ? Number(process.env.PORT_DB) : 5432,
    username: process.env.PG_USERNAME || "admin" ,
    password: process.env.PG_PASSWORD || "ab4dsF5hpli1",
    database: process.env.PG_DATABASE || "vangers",
    migrations: ["src/migration/*.{js,ts}"],
    synchronize: false,
    logging: true,
    entities: [
        Car, Driver, Vanger
    ]
})

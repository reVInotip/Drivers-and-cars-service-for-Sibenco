import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import Car from './car';
import Driver from "./driver";

//rename
export type TOrderSpecificationType = {
    maxNumberOfPassengers: number,
    maxAmountOfCargo: number,
    numberOfPassengers: number,
    amountOfCargo: number,
    beginDate: number, //unixtime
    endDate: number, //unixtime
    location: string
}

@Entity()
export default class Vanger {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @OneToOne(() => Car)
    @JoinColumn()
    car: Car

    @OneToOne(() => Driver)
    @JoinColumn()
    driver: Driver
}
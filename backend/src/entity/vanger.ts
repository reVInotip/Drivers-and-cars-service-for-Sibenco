import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import Car from './car';
import Driver from "./driver";

//rename
export type TVangerType = {
    maxNumberOfPassengers: number,
    maxAmountOfCargo: number,
    numberOfPassengers: number,
    amountOfCargo: number
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
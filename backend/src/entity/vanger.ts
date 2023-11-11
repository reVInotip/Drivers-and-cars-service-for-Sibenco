import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import Car from './car';
import Driver from "./driver";

@Entity()
export default class Vanger {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @OneToOne(() => Car)
    @JoinColumn()
    car: Car

    @OneToOne(() => Car)
    @JoinColumn()
    driver: Driver
}
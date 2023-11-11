import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

/*type ECarType = {
    title: string,
    loadCapacity: number,
    numberOfPassengersInCar: number,
    amountOfCargoInCar: number
}*/

@Entity()
export default class Car {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    numberOfTransport: number

    @Column()
    title: string

    @Column()
    loadCapacity: number

    @Column()
    numberOfPassengersInCar: number

    @Column()
    amountOfCargoInCar: number
}
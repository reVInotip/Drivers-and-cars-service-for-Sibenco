import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

type CarStatusType = "Busy" | "Ready"

@Entity()
export default class Car {
    @PrimaryGeneratedColumn("uuid")
    id: string

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

    @Column({
        type: "enum",
        enum: ["Busy", "Ready"],
        default: "Ready"
    })
    status: CarStatusType
}
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

type CarStatusType = "B" | "Ready"
/**
 * B - занят
 * F - ждёт работы
 * C - сломана
 */

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

    @Column('number', {default: 0})
    numberOfPassengersInCar: number

    @Column('number', {default: 0})
    amountOfCargoInCar: number

    @Column()
    location: string

    @Column('simple-array')
    timetable: CarStatusType[366]
}
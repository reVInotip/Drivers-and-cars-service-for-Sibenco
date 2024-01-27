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

    @Column('int', {default: 0})
    numberOfPassengersInCar: number

    @Column('float', {default: 0})
    amountOfCargoInCar: number

    @Column('text', {default: 'New-York'})
    location: string

    @Column('simple-array', {default: 'F'})
    timetable: CarStatusType[366]
}
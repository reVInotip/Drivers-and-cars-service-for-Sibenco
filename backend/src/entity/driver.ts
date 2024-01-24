import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

type DriverStatusType = "H" | "S" | "F" | "B";
/*
H - выходной
S - больничный
F - ждёт работы
B - занят
*/

export type TDriver = {
    id: string,
    status: DriverStatusType,
    firstName: string,
    lastName: string,
    category: string
}

@Entity()
export default class Driver {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    category: string

    @Column()
    location: string

    @Column("simple-array")
    timetable: DriverStatusType[366]
}
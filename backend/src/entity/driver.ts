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

    @Column({
        type: "enum",
        enum: ["H", "S", "F", "B"],
        default: "F"
    })
    status: DriverStatusType

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    category: string

    @Column("simple-array")
    timetable: DriverStatusType[366]
}
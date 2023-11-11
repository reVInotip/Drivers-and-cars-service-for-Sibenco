import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

type DriverStatusType = "H" | "S" | "F" | "B";
/*
H - выходной
S - больничный
F - ждёт работы
B - занят
*/

@Entity()
export default class Driver {
    @PrimaryGeneratedColumn("uuid")
    id: number

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

    @Column({
        type: "enum",
        enum: ["H", "S", "F", "B"],
        default: "F"
    })
    timetable: DriverStatusType[]

}
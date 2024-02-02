import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import Vanger from "./vanger";

type DriverStatusType = "H" | "S" | "F" | "B";
/*
H - выходной
S - больничный
F - ждёт работы
B - занят
*/

export type TDriver = {
    firstName: string,
    lastName: string,
    category: string,
    location: string
}

export type DriverTimetableType = {
    status: DriverStatusType,
    beginDate: number, //unixtime
    endDate: number //unixtime
}

/**
 * @openapi
 * components:
 *  schemas:
 *      Driver:
 *          type: object
 *          required:
 *              - id
 *              - firstName
 *              - lastName
 *              - category
 *              - location
 *              - timetable
 *          properties:
 *              id:
 *                  type: string
 *                  default: 12345-aa
 *              firstName:
 *                  type: string
 *                  default: "Иван"
 *              lastName:
 *                  type: string
 *                  default: "Иванов"
 *              category:
 *                  type: string
 *                  description: "Категория водительского удостоверения"
 *                  enum:
 *                      - A
 *                      - B
 *                      - C
 *                      - D
 *                      - M
 *                  default: C
 *              location:
 *                  type: string
 *                  default: Altai region, Barnaul, Lenin street
 *              timetable:
 *                  type: array
 *                  description: "Расписание водителя по дням года"
 *                  items:
 *                      type: string
 *                      description: "H - выходной, S - больничный, F - ждёт работы, B - занят"
 *                      enum:
 *                          - H
 *                          - S
 *                          - F
 *                          - B
 *                      default: F
 *      CreateDriver:
 *          type: object
 *          required:
 *              - firstName
 *              - lastName
 *              - category
 *              - location
 *              - timetable
 *          properties:
 *              firstName:
 *                  type: string
 *                  default: "Иван"
 *              lastName:
 *                  type: string
 *                  default: "Иванов"
 *              category:
 *                  type: string
 *                  description: "Категория водительского удостоверения"
 *                  enum:
 *                      - A
 *                      - B
 *                      - C
 *                      - D
 *                      - M
 *                  default: C
 *              location:
 *                  type: string
 *                  default: Altai region, Barnaul, Lenin street
 *              timetable:
 *                  type: array
 *                  description: "Расписание водителя по дням года"
 *                  items:
 *                      type: string
 *                      description: "H - выходной, S - больничный, F - ждёт работы, B - занят"
 *                      enum:
 *                          - H
 *                          - S
 *                          - F
 *                          - B
 *                      default: F
 *      PatchDriver:
 *          type: object
 *          properties:
 *              firstName:
 *                  type: string
 *                  default: "Иван"
 *              lastName:
 *                  type: string
 *                  default: "Иванов"
 *              category:
 *                  type: string
 *                  description: "Категория водительского удостоверения"
 *                  enum:
 *                      - A
 *                      - B
 *                      - C
 *                      - D
 *                      - M
 *                  default: C
 *              location:
 *                  type: string
 *                  default: Altai region, Barnaul, Lenin street
 *      PatchDriverTimetable:
 *          type: object
 *          required:
 *              - status
 *              - beginDate
 *              - endDate
 *          properties:
 *              status:
 *                  type: string
 *                  description: "Новый статус водителя H - выходной, S - больничный, F - ждёт работы, B - занят"
 *              beginDate:
 *                  type: integer
 *                  format: int64
 *                  description: "Время начала поездки в формате unixtime"
 *                  default: 555555
 *              endDate:
 *                  type: integer
 *                  format: int64
 *                  description: "Время окончания поездки в формате unixtime"
 *                  default: 666666
 *      DriverBySomething:
 *          type: object
 *          properties:
 *              firstName:
 *                  type: string
 *                  default: "Иван"
 *              lastName:
 *                  type: string
 *                  default: "Иванов"
 *              category:
 *                  type: string
 *                  description: "Категория водительского удостоверения"
 *                  enum:
 *                      - A
 *                      - B
 *                      - C
 *                      - D
 *                      - M
 *                  default: C
 *              location:
 *                  type: string
 *                  default: Altai region, Barnaul, Lenin street
 */
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

    @Column('text', {default: 'New-York'})
    location: string

    @Column('simple-array', {default: 'F'})
    timetable: DriverStatusType[366]

    @OneToMany(() => Vanger, (vanger) => vanger.car)
    vangers: Vanger[]
}
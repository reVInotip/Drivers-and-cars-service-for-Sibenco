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
    name: string,
    category: string,
    latitude: string,
    longitude: string,
    phoneNumber: string,
    mail: string
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
 *              - name
 *              - phoneNumber
 *              - mail
 *              - category
 *              - latitude
 *              - longitude
 *              - timetable
 *          properties:
 *              id:
 *                  type: string
 *                  default: 12345-aa
 *              name:
 *                  type: string
 *                  description: "ФИО водителя"
 *                  default: "Иванов Иван Иванович"
 *              phoneNumber:
 *                  type: string
 *                  description: "Номер телефона"
 *                  default: "88005553535"
 *              mail:
 *                  type: string
 *                  description: "Почта"
 *                  default: "ivanov@govnoogle.ru"
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
 *              latitude:
 *                  type: string
 *                  description: "Широта"
 *                  default: 0.0
 *              longitude:
 *                  type: string
 *                  description: "Долгота"
 *                  default: 0.0
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
 *              - name
 *              - phoneNumber
 *              - mail
 *              - category
 *              - latitude
 *              - longitude
 *              - timetable
 *          properties:
 *              name:
 *                  type: string
 *                  description: "ФИО водителя"
 *                  default: "Иванов Иван Иванович"
 *              phoneNumber:
 *                  type: string
 *                  description: "Номер телефона"
 *                  default: "88005553535"
 *              mail:
 *                  type: string
 *                  description: "Почта"
 *                  default: "ivanov@govnoogle.ru"
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
 *              latitude:
 *                  type: string
 *                  description: "Широта"
 *                  default: 0.0
 *              longitude:
 *                  type: string
 *                  description: "Долгота"
 *                  default: 0.0
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
 *              name:
 *                  type: string
 *                  description: "ФИО водителя"
 *                  default: "Иванов Иван Иванович"
 *              phoneNumber:
 *                  type: string
 *                  description: "Номер телефона"
 *                  default: "88005553535"
 *              mail:
 *                  type: string
 *                  description: "Почта"
 *                  default: "ivanov@govnoogle.ru"
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
 *              latitude:
 *                  type: string
 *                  description: "Широта"
 *                  default: 0.0
 *              longitude:
 *                  type: string
 *                  description: "Долгота"
 *                  default: 0.0
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
 *              name:
 *                  type: string
 *                  description: "ФИО водителя"
 *                  default: "Иванов Иван Иванович"
 *              phoneNumber:
 *                  type: string
 *                  description: "Номер телефона"
 *                  default: "88005553535"
 *              mail:
 *                  type: string
 *                  description: "Почта"
 *                  default: "ivanov@govnoogle.ru"
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
 *              latitude:
 *                  type: string
 *                  description: "Широта"
 *                  default: 0.0
 *              longitude:
 *                  type: string
 *                  description: "Долгота"
 *                  default: 0.0
 */
@Entity()
export default class Driver {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column('text', {default: 'Иванов Иван Иванович'})
    name: string

    @Column('text', {default: '88005553535'})
    phoneNumber: string

    @Column('text', {default: 'ivanov@govnoogle.com'})
    mail: string

    @Column()
    category: string

    @Column('text', {default: '0.0'})
    latitude: string

    @Column('text', {default: '0.0'})
    longitude: string

    @Column('simple-array', {default: 'F'})
    timetable: DriverStatusType[366]

    @OneToMany(() => Vanger, (vanger) => vanger.car)
    vangers: Vanger[]
}
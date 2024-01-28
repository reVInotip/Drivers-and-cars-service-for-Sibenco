import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
 *                  type: integer
 *                  format: int64
 *                  default: 12345
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
 *      DriverByCategory:
 *          type: object
 *          required:
 *              - category
 *          properties:
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

    @Column("simple-array")
    timetable: DriverStatusType[366]
}
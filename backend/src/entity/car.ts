import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

type CarStatusType = "B" | "F" | "C";
/**
 * B - занята
 * F - ждёт работы
 * C - сломана
 */

export type CarTitleType = "human" | "cargo" | "all";
 // "human" - пассажирская, "cargo" - грузовая, "all" - грузопассажирская

export type TCar = {
    numberOfTransport: number,
    title: CarTitleType,
    loadCapacity: number,
    numberOfPassengersInCar: number,
    amountOfCargoInCar: number,
    location: string
}

/**
 * @openapi
 * components:
 *  schemas:
 *      Car:
 *          type: object
 *          required:
 *              - id
 *              - numberOfTransport
 *              - title
 *              - loadCapacity
 *              - numberOfPassengersInCar
 *              - amountOfCargoInCar
 *              - location
 *              - timetable
 *          properties:
 *              id:
 *                  type: integer
 *                  format: int64
 *                  default: 12345
 *              numberOfTransport:
 *                  type: integer
 *                  description: "Номер транспорта"
 *                  format: int64
 *                  default: 8000
 *              title:
 *                  type: string
 *                  description: "Тип грузоперевозки: human - пассажирский, cargo - грузовой, all - грузопассажирский"
 *                  enum:
 *                      - human
 *                      - cargo
 *                      - all
 *                  default: all
 *              loadCapacity:
 *                  type: float
 *                  description: "Общая ёмкость: пассажиры + груз"
 *                  default: 1000
 *              numberOfPassengersInCar:
 *                  type: ineger
 *                  description: "Текущее число пассажиров в машине"
 *                  format: int64
 *                  default: 0
 *              amountOfCargoInCar:
 *                  type: float
 *                  description: "Текущее количество груза в машине"
 *                  default: 0.0
 *              location:
 *                  type: string
 *                  description: "Местоположение"
 *                  default: Altai region, Barnaul, Lenin street
 *              timetable:
 *                  type: array
 *                  description: "Расписание машины по дням года"
 *                  items:
 *                      type: string
 *                      description: "B - занята, F - ждёт работы, C - сломана"
 *                      enum:
 *                          - B
 *                          - F
 *                          - C
 *                      default: F
 *      CreateCar:
 *          type: object
 *          required:
 *              - numberOfTransport
 *              - title
 *              - loadCapacity
 *              - location
 *              - timetable
 *          properties:
 *              numberOfTransport:
 *                  type: integer
 *                  description: "Номер транспорта"
 *                  format: int64
 *                  default: 8000
 *              title:
 *                  type: string
 *                  description: "Тип грузоперевозки: human - пассажирский, cargo - грузовой, all - грузопассажирский"
 *                  enum:
 *                      - human
 *                      - cargo
 *                      - all
 *                  default: all
 *              loadCapacity:
 *                  type: float
 *                  description: "Общая ёмкость: пассажиры + груз"
 *                  default: 1000
 *              location:
 *                  type: string
 *                  description: "Местоположение"
 *                  default: Altai region, Barnaul, Lenin street
 *              timetable:
 *                  type: array
 *                  description: "Расписание машины по дням года"
 *                  items:
 *                      type: string
 *                      description: "B - занята, F - ждёт работы, C - сломана"
 *                      enum:
 *                          - B
 *                          - F
 *                          - C
 *                      default: F
 *      CarByTitle:
 *          type: object
 *          required:
 *              - title
 *          properties:
 *              title:
 *                  type: string
 *                  description: "Тип грузоперевозки: human - пассажирский, cargo - грузовой, all - грузопассажирский"
 *                  enum:
 *                      - human
 *                      - cargo
 *                      - all
 *                  default: all
 */
@Entity()
export default class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('int')
    numberOfTransport: number

    @Column('text', {default: 'all'})
    title: CarTitleType

    @Column('float')
    loadCapacity: number

    @Column('int', {default: 0})
    numberOfPassengersInCar: number

    @Column('float', {default: 0})
    amountOfCargoInCar: number

    @Column('text', {default: 'New-York'})
    location: string
    /**
     * Возможно лучше под местоположение сделать табличку с полями: Регион, Город, Улица
     */

    @Column('simple-array', {default: 'F'})
    timetable: CarStatusType[366]
}
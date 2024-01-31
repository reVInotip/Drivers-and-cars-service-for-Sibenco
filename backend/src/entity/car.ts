import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import Vanger from "./vanger";

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

export type CarTimetableType = {
    status: CarStatusType,
    beginDate: number, //unixtime
    endDate: number //unixtime
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
 *                  type: string
 *                  default: 12345-aa
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
 *      PatchCar:
 *          type: object
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
 *      PatchCarTimetable:
 *          type: object
 *          required:
 *              - status
 *              - beginDate
 *              - endDate
 *          properties:
 *              status:
 *                  type: string
 *                  description: "Новый статус машины B - занята, F - ждёт работы, C - сломана"
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

    @Column('float', {default: 0})
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

    @OneToMany(() => Vanger, (vanger) => vanger.car)
    vangers: Vanger[]
}
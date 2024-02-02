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
    maxNumberOfPassengersInCar: number,
    maxAmountOfCargoInCar: number
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
 *              - maxNumberOfPassengersInCar
 *              - maxAmountOfCargoInCar
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
 *              maxNumberOfPassengersInCar:
 *                  type: ineger
 *                  description: "Максимальное число пассажиров в машине"
 *                  format: int64
 *                  default: 1000
 *              maxAmountOfCargoInCar:
 *                  type: float
 *                  description: "Максимольное количество груза в машине (кг)"
 *                  default: 1000
 *              numberOfPassengersInCar:
 *                  type: ineger
 *                  description: "Текущее число пассажиров в машине"
 *                  format: int64
 *                  default: 0
 *              amountOfCargoInCar:
 *                  type: float
 *                  description: "Текущее количество груза в машине (кг)"
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
 *              - maxNumberOfPassengersInCar
 *              - maxAmountOfCargoInCar
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
 *              maxNumberOfPassengersInCar:
 *                  type: ineger
 *                  description: "Максимальное число пассажиров в машине"
 *                  format: int64
 *                  default: 1000
 *              maxAmountOfCargoInCar:
 *                  type: float
 *                  description: "Максимальное количество груза в машине (кг)"
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
 *              maxNumberOfPassengersInCar:
 *                  type: ineger
 *                  description: "Максимальное число пассажиров в машине"
 *                  format: int64
 *                  default: 1000
 *              maxAmountOfCargoInCar:
 *                  type: float
 *                  description: "Максимальное количество груза в машине (кг)"
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
 *      CarBySomething:
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
 *              maxNumberOfPassengersInCar:
 *                  type: ineger
 *                  description: "Максимальное число людей для перевозки (будут выдани результаты с такой же ёмкостью или больше)"
 *                  format: int64
 *                  default: 1000
 *              maxAmountOfCargoInCar:
 *                  type: float
 *                  description: "Максимальное количество груза для перевозки (будут выдани результаты с такой же ёмкостью или больше) (кг)"
 *                  default: 1000
 *              numberOfPassengersInCar:
 *                  type: ineger
 *                  description: "Текущее число пассажиров в машине"
 *                  format: int64
 *                  default: 0
 *              amountOfCargoInCar:
 *                  type: float
 *                  description: "Текущее количество груза в машине (кг)"
 *                  default: 0.0
 *              location:
 *                  type: string
 *                  description: "Местоположение"
 *                  default: Altai region, Barnaul, Lenin street
 */
@Entity()
export default class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('int')
    numberOfTransport: number

    @Column('text', {default: 'all'})
    title: CarTitleType

    @Column('int', {default: 0})
    maxNumberOfPassengersInCar: number

    @Column('float', {default: 0})
    maxAmountOfCargoInCar: number

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
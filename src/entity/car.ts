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
    numberOfTransport: string,
    title: CarTitleType,
    maxNumberOfPassengersInCar: number,
    maxAmountOfCargoInCar: number
    numberOfPassengersInCar: number,
    amountOfCargoInCar: number,
    latitude: string,
    longitude: string
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
 *              - name
 *              - title
 *              - maxNumberOfPassengersInCar
 *              - maxAmountOfCargoInCar
 *              - numberOfPassengersInCar
 *              - amountOfCargoInCar
 *              - latitude
 *              - longitude
 *              - timetable
 *          properties:
 *              id:
 *                  type: string
 *                  default: 12345-aa
 *              numberOfTransport:
 *                  type: string
 *                  description: "Номер транспорта"
 *                  default: 8000a
 *              name:
 *                  type: string
 *                  description: "Название машины"
 *                  default: "lada granta"
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
 *              - name
 *              - title
 *              - maxNumberOfPassengersInCar
 *              - maxAmountOfCargoInCar
 *              - latitude
 *              - longitude
 *              - timetable
 *          properties:
 *              numberOfTransport:
 *                  type: string
 *                  description: "Номер транспорта"
 *                  default: 8000a
 *              name:
 *                  type: string
 *                  description: "Название машины"
 *                  default: "lada granta"
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
 *                  type: string
 *                  description: "Номер транспорта"
 *                  default: 8000a
 *              name:
 *                  type: string
 *                  description: "Название машины"
 *                  default: "lada granta"
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
 *              latitude:
 *                  type: string
 *                  description: "Широта"
 *                  default: 0.0
 *              longitude:
 *                  type: string
 *                  description: "Долгота"
 *                  default: 0.0
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
 *                  type: string
 *                  description: "Номер транспорта"
 *                  default: 8000a
 *              name:
 *                  type: string
 *                  description: "Название машины"
 *                  default: "lada granta"
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
export default class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text', {default: "8000a"})
    numberOfTransport: string

    @Column('text', {default: "lada granta"})
    name: string

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

    @Column('text', {default: '0.0'})
    latitude: string

    @Column('text', {default: '0.0'})
    longitude: string

    @Column('simple-array', {default: 'F'})
    timetable: CarStatusType[366]

    @OneToMany(() => Vanger, (vanger) => vanger.car)
    vangers: Vanger[]
}
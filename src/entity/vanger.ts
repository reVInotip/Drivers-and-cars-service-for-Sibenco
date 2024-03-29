import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Car, { CarTitleType } from './car';
import Driver from "./driver";

/*
export type RouteSpecificationType = {
    maxNumberOfPassengers: number,
    maxAmountOfCargo: number,
    numberOfPassengers: number,
    amountOfCargo: number,
    location: string,
    beginDate: number,
    endDate: number
}
*/

type LocationBorders = {
    latitude: {
        min: string,
        max: string
    },
    longitude: {
        min: string,
        max: string
    }
}

export type OrderSpecificationType = {
    maxNumberOfPassengers: number,
    maxAmountOfCargo: number,
    title: CarTitleType,
    beginDate: number,
    endDate: number,
    locationBorders: LocationBorders
}

export type TimeType = {
    timeBegin: number, //unixtime
    timeEnd: number //unixtime
}

export type TVanger = {
    CarID: string,
    DriverID: string,
    timeBegin: number,
    timeEnd: number,
    locationBorders: LocationBorders
}


/**
 * @openapi
 * components:
 *  schemas:
 *      Vanger:
 *          description: "Машина + водитель"
 *          type: object
 *          required:
 *              - id
 *              - Car
 *              - Driver
 *              - timeBegin
 *              - timeEnd
 *          properties:
 *              id:
 *                  type: string
 *                  default: 12345-aa
 *              Car:
 *                  $ref: '#components/schemas/Car'
 *                  description: "Машина из таблицы машин"
 *              Driver:
 *                  $ref: '#components/schemas/Driver'
 *                  description: "Водитель из таблицы водителей"
 *              timeBegin:
 *                  type: integer
 *                  format: int64
 *                  description: "Время, на которое назначено начало поездки для вангера в формате unixtime"
 *                  default: 555555
 *              timeEnd:
 *                  type: integer
 *                  format: int64
 *                  description: "Время, на которое назначено окончание поездки для вангера в формате unixtime"
 *                  default: 666666
 *      CreateVanger:
 *          type: object
 *          required:
 *              - CarID
 *              - DriverID
 *              - timeEnd
 *              - locationBorders
 *          properties:
 *              CarID:
 *                  type: string
 *                  description: "ID машины из таблицы машин"
 *                  default: 1236
 *              DriverID:
 *                  type: string
 *                  description: "ID водителя из таблицы водителей"
 *                  default: 1237
 *              timeBegin:
 *                  type: integer
 *                  format: int64
 *                  description: "Время, на которое назначено начало поездки для вангера в формате unixtime"
 *                  default: 555555
 *              timeEnd:
 *                  type: integer
 *                  format: int64
 *                  description: "Время, на которое назначено окончание поездки для вангера в формате unixtime"
 *                  default: 666666
 *              locationBorders:
 *                  type: object
 *                  required:
 *                      - latitude
 *                      - longitude
 *                  properties:
 *                      latitude:
 *                          type: object
 *                          description: "Широта"
 *                          required:
 *                              - min
 *                              - max
 *                          properties:
 *                              min:
 *                                  type: string
 *                                  description: "Минимальное значение для широты"
 *                              max:
 *                                  type: string
 *                                  description: "Максимальное значение для широты"
 *                      longitude:
 *                          type: object
 *                          description: "Долгота"
 *                          required:
 *                              - min
 *                              - max
 *                          properties:
 *                              min:
 *                                  type: string
 *                                  description: "Минимальное значение для долготы"
 *                              max:
 *                                  type: string
 *                                  description: "Максимальное значение для долготы"
 *      PatchVanger:
 *          description: "Машина + водитель"
 *          type: object
 *          required:
 *          properties:
 *              Car:
 *                  $ref: '#components/schemas/Car'
 *                  description: "Машина из таблицы машин"
 *              Driver:
 *                  $ref: '#components/schemas/Driver'
 *                  description: "Водитель из таблицы водителей"
 *              timeBegin:
 *                  type: integer
 *                  format: int64
 *                  description: "Время, на которое назначено начало поездки для вангера в формате unixtime"
 *                  default: 555555
 *              timeEnd:
 *                  type: integer
 *                  format: int64
 *                  description: "Время, на которое назначено окончание поездки для вангера в формате unixtime"
 *                  default: 666666
 *      GetVangerByTime:
 *          type: object
 *          required:
 *              - timeBegin
 *              - timeEnd
 *          properties:
 *              timeBegin:
 *                  type: integer
 *                  format: int64
 *                  description: "Время начала поездки в формате unixtime"
 *                  default: 555555
 *              timeEnd:
 *                  type: integer
 *                  format: int64
 *                  description: "Время окончания поездки в формате unixtime"
 *                  default: 666666
 *      GetSuitableVangerByParams:
 *          type: object
 *          description: "Схема для запроса на получение подходящих под параметры машин и водителей"
 *          required:
 *              - maxNumberOfPassengers
 *              - maxAmountOfCargo
 *              - title
 *              - beginDate
 *              - endDate
 *              - locationBorders
 *          properties:
 *              maxNumberOfPassengers:
 *                  type: integer
 *                  format: int64
 *                  description: "Максимальное число пассажиров для машины"
 *              maxAmountOfCargo:
 *                  type: number
 *                  description: "Максимальное число груза для машины"
 *              title:
 *                  type: string
 *                  description: "Тип"
 *              latitude:
 *                  type: string
 *                  description: "Широта"
 *                  default: 0.0
 *              longitude:
 *                  type: string
 *                  description: "Долгота"
 *                  default: 0.0
 *              beginDate:
 *                  type: integer
 *                  format: int64
 *                  description: "Дата начала перевозки (unixtime)"
 *              endDate:
 *                  type: integer
 *                  format: int64
 *                  description: "Дата конца перевозки (unixtime)"
 *              locationBorders:
 *                  type: object
 *                  required:
 *                      - latitude
 *                      - longitude
 *                  properties:
 *                      latitude:
 *                          type: object
 *                          description: "Широта"
 *                          required:
 *                              - min
 *                              - max
 *                          properties:
 *                              min:
 *                                  type: string
 *                                  description: "Минимальное значение для широты"
 *                              max:
 *                                  type: string
 *                                  description: "Максимальное значение для широты"
 *                      longitude:
 *                          type: object
 *                          description: "Долгота"
 *                          required:
 *                              - min
 *                              - max
 *                          properties:
 *                              min:
 *                                  type: string
 *                                  description: "Минимальное значение для долготы"
 *                              max:
 *                                  type: string
 *                                  description: "Максимальное значение для долготы"
 *      DriversAndCars:
 *          type: object
 *          required:
 *              - Cars
 *              - Drivers
 *          properties:
 *              Cars:
 *                  type: array
 *                  items:
 *                      $ref: '#components/schemas/Car'
 *              Drivers:
 *                  type: array
 *                  items:
 *                      $ref: '#components/schemas/Driver'
 */
@Entity()
export default class Vanger {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => Car, (car) => car.vangers, {eager: true})
    car: Car

    @ManyToOne(() => Driver, (driver) => driver.vangers, {eager: true})
    driver: Driver

    @Column('int', {default: 0})
    timeBegin: number //unixtime

    @Column('int', {default: 0})
    timeEnd: number //unixtime
}

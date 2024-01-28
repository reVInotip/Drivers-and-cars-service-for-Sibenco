import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import Car, { CarTitleType } from './car';
import Driver from "./driver";

export type RouteSpecificationType = {
    maxNumberOfPassengers: number,
    maxAmountOfCargo: number,
    numberOfPassengers: number,
    amountOfCargo: number,
    location: string
}

export type OrderSpecificationType = {
    maxNumberOfPassengers: number,
    maxAmountOfCargo: number,
    title: CarTitleType,
    location: string
}

export type RequestRouteSpecificationType = {
    maxNumberOfPassengers: number,
    maxAmountOfCargo: number,
    numberOfPassengers: number,
    amountOfCargo: number,
    location: string,
    beginDate: number, //unixtime
    endDate: number //unixtime
}

export type RequestOrderSpecificationType = {
    maxNumberOfPassengers: number,
    maxAmountOfCargo: number,
    title: CarTitleType,
    location: string,
    beginDate: number, //unixtime
    endDate: number //unixtime
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
 *          properties:
 *              id:
 *                  type: integer
 *                  format: int64
 *                  default: 12345
 *              Car:
 *                  $ref: '#components/schemas/Car'
 *                  description: "Машина из таблицы машин"
 *              Driver:
 *                  $ref: '#components/schemas/Driver'
 *                  description: "Водитель из таблицы водителей"
 *      CreateVanger:
 *          type: object
 *          required:
 *              - CarID
 *              - DriverID
 *          properties:
 *              CarID:
 *                  type: string
 *                  description: "ID машины из таблицы машин"
 *                  default: 1236
 *              DriverID:
 *                  type: string
 *                  description: "ID водителя из таблицы водителей"
 *                  default: 1237
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

    @OneToOne(() => Car)
    @JoinColumn()
    car: Car

    @OneToOne(() => Driver)
    @JoinColumn()
    driver: Driver
}

export type RequestVanger = {
    vanger: Vanger,
    beginDate: number, //unixtime
    endDate: number //unixtime
}

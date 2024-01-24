import { AppDataSource } from "../data-source";
import { LessThan, MoreThanOrEqual, ArrayContains } from "typeorm";
import Car from "../entity/car";
import Driver from "../entity/driver";
import { config } from "../config";
import { TOrderSpecificationType } from "../entity/vanger";


export default async function GetSuitableDriverAndCarForOrder(order: TOrderSpecificationType, timeBegin: number, timeEnd: number) {
    let cars = await AppDataSource.getRepository(Car).findBy({
        loadCapacity: MoreThanOrEqual(order.maxAmountOfCargo + order.maxNumberOfPassengers),
        numberOfPassengersInCar: LessThan(order.maxNumberOfPassengers - order.numberOfPassengers),
        amountOfCargoInCar: LessThan(order.maxAmountOfCargo - order.amountOfCargo),
        timetable: ArrayContains(['F']),
        location: order.location
    });

    let drivers = await AppDataSource.getRepository(Driver).findBy({
        timetable: ArrayContains(['F']),
        location: order.location
    })

    let driverForOrder: Driver = null;
    let carForOrder: Car = null;

    drivers.forEach (function (driver) {
        let isApproach: boolean = true;
        for (let i: number = timeBegin - 1; i < timeEnd; ++i) {
            if (driver.timetable[i] != 'F') {
                isApproach = false;
                break;
            }
        }
        if (isApproach) {
            driverForOrder = driver;
            return;
        }
    });

    if (!driverForOrder) {
        throw new Error(config.errors.NotFound + 'drivers for this order');
    }

    cars.forEach (function (car) {
        let isApproach: boolean = true;
        for (let i: number = timeBegin - 1; i < timeEnd; ++i) {
            if (car.timetable[i] != 'F') {
                isApproach = false;
                break;
            }
        }
        if (isApproach) {
            carForOrder = car;
            return;
        }
    });

    if (!carForOrder) {
        throw new Error(config.errors.NotFound + 'cars for this order');
    }

    return {car: carForOrder, driver: driverForOrder};
}
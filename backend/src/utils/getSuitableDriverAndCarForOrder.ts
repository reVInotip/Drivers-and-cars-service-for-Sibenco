import { AppDataSource } from "../data-source";
import { LessThan, MoreThanOrEqual, ArrayContains } from "typeorm";
import Car from "../entity/car";
import Driver from "../entity/driver";
import { config } from "../config";
import { OrderSpecificationType, RouteSpecificationType } from "../entity/vanger";

export async function GetSuitableDriversAndCarsForOrder(order: OrderSpecificationType, timeBegin: number, timeEnd: number, one: boolean) {
    let cars = await AppDataSource.getRepository(Car).findBy({
        loadCapacity: MoreThanOrEqual(order.maxAmountOfCargo + order.maxNumberOfPassengers),
        numberOfPassengersInCar: 0,
        amountOfCargoInCar: 0.0,
        timetable: ArrayContains(['F']),
        location: order.location,
        title: order.title
    });

    let drivers = await AppDataSource.getRepository(Driver).findBy({
        timetable: ArrayContains(['F']),
        location: order.location
    })

    let driversForOrder: Driver[] = null;
    let carsForOrder: Car[] = null;

    drivers.forEach ((driver) => {
        let isApproach: boolean = true;
        for (let i: number = timeBegin - 1; i < timeEnd; ++i) {
            if (driver.timetable[i] != 'F') {
                isApproach = false;
                break;
            }
        }
        if (isApproach) {
            driversForOrder.push(driver);
            if (one) {
                return;
            }
        }
    });

    if (!driversForOrder) {
        throw new Error(config.errors.NotFound + 'drivers for this order');
    }

    cars.forEach ((car) => {
        let isApproach: boolean = true;
        for (let i: number = timeBegin - 1; i < timeEnd; ++i) {
            if (car.timetable[i] != 'F') {
                isApproach = false;
                break;
            }
        }
        if (isApproach) {
            carsForOrder.push(car);
            if (one) {
                return;
            }
        }
    });

    if (!carsForOrder) {
        throw new Error(config.errors.NotFound + 'cars for this order');
    }

    if (one) {
        return {car: carsForOrder[0], driver: driversForOrder[0]};
    } else {
        return {cars: carsForOrder, drivers: driversForOrder};
    }
}


export async function GetSuitableDriversAndCarsForRoute(route: RouteSpecificationType, timeBegin: number, timeEnd: number) {
    let cars = await AppDataSource.getRepository(Car).findBy({
        loadCapacity: MoreThanOrEqual(route.maxAmountOfCargo + route.maxNumberOfPassengers),
        numberOfPassengersInCar: LessThan(route.maxNumberOfPassengers - route.numberOfPassengers),
        amountOfCargoInCar: LessThan(route.maxAmountOfCargo - route.amountOfCargo),
        timetable: ArrayContains(['F']),
        location: route.location
    });

    let drivers = await AppDataSource.getRepository(Driver).findBy({
        timetable: ArrayContains(['F']),
        location: route.location
    })

    let driversForOrder: Driver[] = null;
    let carsForOrder: Car[] = null;

    drivers.forEach ((driver) => {
        let isApproach: boolean = true;
        for (let i: number = timeBegin - 1; i < timeEnd; ++i) {
            if (driver.timetable[i] != 'F') {
                isApproach = false;
                break;
            }
        }
        if (isApproach) {
            driversForOrder.push(driver);
        }
    });

    if (!driversForOrder) {
        throw new Error(config.errors.NotFound + 'drivers for this order');
    }

    cars.forEach ((car) => {
        let isApproach: boolean = true;
        for (let i: number = timeBegin - 1; i < timeEnd; ++i) {
            if (car.timetable[i] != 'F') {
                isApproach = false;
                break;
            }
        }
        if (isApproach) {
            carsForOrder.push(car);
        }
    });

    if (!carsForOrder) {
        throw new Error(config.errors.NotFound + 'cars for this order');
    }

    return {cars: carsForOrder, drivers: driversForOrder};
}
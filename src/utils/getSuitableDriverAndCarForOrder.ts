import { AppDataSource } from "../data-source";
import { MoreThanOrEqual, Between } from "typeorm";
import Car from "../entity/car";
import Driver from "../entity/driver";
import { config } from "../config";
import { OrderSpecificationType } from "../entity/vanger";

export async function GetSuitableDriversAndCarsForOrder(order: OrderSpecificationType, one: boolean) {
    let cars = await AppDataSource.getRepository(Car).findBy({
        maxNumberOfPassengersInCar: MoreThanOrEqual(order.maxNumberOfPassengers),
        maxAmountOfCargoInCar: MoreThanOrEqual(order.maxAmountOfCargo),
        numberOfPassengersInCar: 0,
        amountOfCargoInCar: 0.0,
        latitude: Between(order.locationBorders.latitude.min, order.locationBorders.latitude.max),
        longitude: Between(order.locationBorders.longitude.min, order.locationBorders.longitude.max),
        title: order.title
    });

    let drivers = await AppDataSource.getRepository(Driver).findBy({
        latitude: Between(order.locationBorders.latitude.min, order.locationBorders.latitude.max),
        longitude: Between(order.locationBorders.longitude.min, order.locationBorders.longitude.max),
    })

    let driversForOrder: Driver[] = [];
    let carsForOrder: Car[] = [];

    drivers.forEach ((driver) => {
        let isApproach: boolean = true;
        for (let i: number = order.beginDate - 1; i < order.endDate; ++i) {
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

    if (!driversForOrder.length) {
        throw new Error(config.errors.NotFound + 'drivers for this order');
    }

    cars.forEach ((car) => {
        let isApproach: boolean = true;
        for (let i: number = order.beginDate - 1; i < order.endDate; ++i) {
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

    if (!carsForOrder.length) {
        throw new Error(config.errors.NotFound + 'cars for this order');
    }

    if (one) {
        return {car: carsForOrder[0], driver: driversForOrder[0]};
    } else {
        return {cars: carsForOrder, drivers: driversForOrder};
    }
}

/*
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
*/
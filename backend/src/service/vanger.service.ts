import Vanger, { TOrderSpecificationType } from "../entity/vanger";
import { AppDataSource } from "../data-source";
import { config } from "../config";
import { LessThan, MoreThanOrEqual } from "typeorm";
import { PatchCar } from "./car.service";
import { PatchDriver } from "./driver.service";
import Car from "../entity/car";
import Driver from "../entity/driver";
import DaysInMonth from "../utils/daysInMonth";

export async function CreateVanger(data: Vanger) {
    let vanger = await AppDataSource.getRepository(Vanger).create(data);
    await AppDataSource.getRepository(Vanger).save(vanger);

    vanger.car.status = "Busy";
    vanger.driver.status = "B";
    await PatchCar(vanger.car.id, vanger.car);
    await PatchDriver(vanger.driver.id, vanger.driver);

    return vanger;
}

export async function GetAllVangers(page: number, pageSize: number) {
    const vangers = await AppDataSource.getRepository(Vanger).find({
        take: pageSize,
        skip: page * pageSize,
    });

    if (!vangers.length) {
        throw new Error(config.errors.NotFound + 'vangers');
    }
    return vangers;
}

export async function DeleteVanger(id: string) {
    let vanger = await GetVangerById(id);
    if (!vanger) {
        return 0;
    }
    
    vanger.car.status = "Ready";
    vanger.driver.status = "F";
    await PatchCar(vanger.car.id, vanger.car);
    await PatchDriver(vanger.driver.id, vanger.driver);

    const result = await AppDataSource.getRepository(Vanger).delete(id);
    return result.affected;
}

export async function PatchVanger(id:string, data: Vanger) {
    const result = await AppDataSource.getRepository(Vanger).update(id, data);
    return result.affected;
}

export async function GetVangerById(id: string) {
    return await AppDataSource.getRepository(Vanger).findOneBy({id: id});
}

export async function GetSuitableDriversAndCarsForOrder(order: TOrderSpecificationType) {
    let carsForOrder = await AppDataSource.getRepository(Car).findBy({
        loadCapacity: MoreThanOrEqual(order.maxAmountOfCargo + order.maxNumberOfPassengers),
        numberOfPassengersInCar: LessThan(order.maxNumberOfPassengers - order.numberOfPassengers),
        amountOfCargoInCar: LessThan(order.maxAmountOfCargo - order.amountOfCargo),
        status: "Ready"
    });

    let drivers = await AppDataSource.getRepository(Driver).findBy({
        status: "F"
    })

    if (!carsForOrder.length || !drivers.length) {
        throw new Error(config.errors.NotFound + 'cars or drivers for this order');
    }

    let driversForOrder: Driver[] = [];
    const date = new Date();
    const days = DaysInMonth(date.getFullYear(), date.getMonth());
    const todayDateInDays = date.getDate() + (date.getMonth() - 1) * days;
    for (let i: number = 0; i < drivers.length; ++i) {
        if (drivers[i].timetable[todayDateInDays] != "F") {
            continue;
        }
        driversForOrder.push(drivers[i]);
    }

    if (!driversForOrder.length) {
        throw new Error(config.errors.NotFound + 'drivers for this order');
    }

    return {car: carsForOrder, driver: driversForOrder};
}


export async function GetSuitableVangersForOrder(order: TOrderSpecificationType) {
    const vangersForOrder = await AppDataSource.getRepository(Vanger).findBy({
        car: {
            loadCapacity: MoreThanOrEqual(order.maxAmountOfCargo + order.maxNumberOfPassengers),
            numberOfPassengersInCar: LessThan(order.maxNumberOfPassengers - order.numberOfPassengers),
            amountOfCargoInCar: LessThan(order.maxAmountOfCargo - order.amountOfCargo),
        }
    })

    if (!vangersForOrder.length) {
        throw new Error(config.errors.NotFound + 'vangers');
    }

    return vangersForOrder;
}
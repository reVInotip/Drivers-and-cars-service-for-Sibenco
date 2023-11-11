import Vanger, { TVangerType } from "../entity/vanger";
import { AppDataSource } from "../data-source";
import { config } from "../config";
import { LessThan, MoreThanOrEqual } from "typeorm";
import { PatchCar } from "./car.service";
import { PatchDriver } from "./driver.service";
import Car from "../entity/car";
import Driver from "../entity/driver";

export async function CreateVanger(data: Vanger) {
    let vanger = await AppDataSource.getRepository(Vanger).create(data);
    await AppDataSource.getRepository(Vanger).save(vanger);

    vanger.car.status = "Busy";
    vanger.driver.status = "B";
    await PatchCar(vanger.car.id, vanger.car);
    await PatchDriver(vanger.driver.id, vanger.driver);
}

export async function GetAllVangers(page: number, pageSize: number) {
    const vangers = await AppDataSource.getRepository(Vanger).find({
        take: pageSize,
        skip: page * pageSize,
    });

    if (!vangers) {
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

function DaysInMonth(year: number, month: number): number {
    const date1 = new Date(year, month, 1);
    const date2 = new Date(year, month + 1, 1);
    return Math.round((date2.getTime() - date1.getTime()) / 1000 / 3600 / 24);
}

export async function GetVangersSuitableVangersForOrder(vanger: TVangerType) {
    let carsForOrder = await AppDataSource.getRepository(Car).findBy({
        loadCapacity: MoreThanOrEqual(vanger.maxAmountOfCargo + vanger.maxNumberOfPassengers),
        numberOfPassengersInCar: LessThan(vanger.maxNumberOfPassengers - vanger.numberOfPassengers),
        amountOfCargoInCar: LessThan(vanger.maxAmountOfCargo - vanger.amountOfCargo),
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

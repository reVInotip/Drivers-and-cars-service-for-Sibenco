import Vanger, { OrderSpecificationType, TVanger, TimeType } from "../entity/vanger";
import { AppDataSource } from "../data-source";
import { config } from "../config";
import { GetCarById, PatchCarTimetable } from "./car.service";
import { GetDriverById, PatchDriverTimetable } from "./driver.service";
import { GetSuitableDriversAndCarsForOrder } from "../utils/getSuitableDriverAndCarForOrder";
import UnixtimeToDays from "../utils/unixtimeToDays";
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import Car, { CarTimetableType } from "../entity/car";
import Driver, { DriverTimetableType } from "../entity/driver";

export async function CreateVanger(data: TVanger) {
    let carTimetable: CarTimetableType = {
        status: 'B',
        beginDate: data.timeBegin,
        endDate: data.timeEnd
    }

    let driverTimetable: DriverTimetableType = {
        status: 'B',
        beginDate: data.timeBegin,
        endDate: data.timeEnd
    }

    let car: Car = await GetCarById(data.CarID);
    let driver: Driver = await GetDriverById(data.DriverID);
    if ((car.latitude != driver.latitude) || (car.longitude != driver.longitude)) {
        return "";
    }

    await PatchCarTimetable(data.CarID, carTimetable);
    await PatchDriverTimetable(data.DriverID, driverTimetable);

    let vanger = {
        car: car,
        driver: driver,
        timeBegin: data.timeBegin,
        timeEnd: data.timeEnd
    }
    let vangerObject = await AppDataSource.getRepository(Vanger).create(<Vanger>vanger);
    vangerObject = await AppDataSource.getRepository(Vanger).save(vanger);
    return vangerObject.id;
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

export async function GetSuitableVangerBySomething(order: OrderSpecificationType) {
    const timeInDays = UnixtimeToDays(order.endDate, order.beginDate);
    const timeBegin = order.beginDate;
    const timeEnd = order.endDate;
    order.beginDate = timeInDays.begin;
    order.endDate = timeInDays.end;

    let vanger: Vanger = <Vanger>await GetSuitableDriversAndCarsForOrder(order, true);
    vanger.timeBegin = timeBegin;
    vanger.timeEnd = timeEnd;

    let carTimetable: CarTimetableType = {
        status: 'B',
        beginDate: vanger.timeBegin,
        endDate: vanger.timeEnd
    }

    let driverTimetable: DriverTimetableType = {
        status: 'B',
        beginDate: vanger.timeBegin,
        endDate: vanger.timeEnd
    }

    await PatchCarTimetable(vanger.car.id, carTimetable);
    await PatchDriverTimetable(vanger.driver.id, driverTimetable);

    vanger = await AppDataSource.getRepository(Vanger).create(vanger);
    await AppDataSource.getRepository(Vanger).save(vanger);

    return vanger;
}

export async function GetSuitableDriversAndCars(order: OrderSpecificationType, page: number, pageSize: number) {
    const timeInDays = UnixtimeToDays(order.endDate, order.beginDate);
    order.beginDate = timeInDays.begin;
    order.endDate = timeInDays.end;

    let carsAndDrivers = await GetSuitableDriversAndCarsForOrder(order, false);
    return {
        cars: carsAndDrivers.cars.slice(page * pageSize - 1, page * pageSize + pageSize),
        drivers: carsAndDrivers.drivers.slice(page * pageSize - 1, page * pageSize + pageSize)
    };
}

export async function DeleteVanger(id: string) {
    let vanger = await GetVangerById(id);
    if (!vanger) {
        return 0;
    }

    let carTimetable: CarTimetableType = {
        status: 'F',
        beginDate: vanger.timeBegin,
        endDate: vanger.timeEnd
    }

    let driverTimetable: DriverTimetableType = {
        status: 'F',
        beginDate: vanger.timeBegin,
        endDate: vanger.timeEnd
    }

    await PatchCarTimetable(vanger.car.id, carTimetable);
    await PatchDriverTimetable(vanger.driver.id, driverTimetable);

    const result = await AppDataSource.getRepository(Vanger).delete(id);
    return result.affected;
}

export async function GetVangersByDriverIdAndTimeInterval(driverId: string, time: TimeType, page: number, pageSize: number) {
    let vangers: Vanger[];
    if (!time.timeBegin && !time.timeEnd) {
        console.log("here");
        vangers = await AppDataSource.getRepository(Vanger).find({
            where: {
                driver: {
                    id: driverId
                }
            },
            take: pageSize,
            skip: page * pageSize,
        })
    } else {
        vangers = await AppDataSource.getRepository(Vanger).find({
            where: {
                driver: {
                    id: driverId
                },
                timeEnd: MoreThanOrEqual(time.timeBegin),
                timeBegin: LessThanOrEqual(time.timeEnd)
            },
            take: pageSize,
            skip: page * pageSize,
        })
    }

    return vangers;
}

export async function GetVangersByCarIdAndTimeInterval(carId: string, time: TimeType, page: number, pageSize: number) {
    const vangers: Vanger[] = await AppDataSource.getRepository(Vanger).find({
        where: {
            car: {
                id: carId
            },
            timeEnd: MoreThanOrEqual(time.timeBegin),
            timeBegin: LessThanOrEqual(time.timeEnd)
        },
        take: pageSize,
        skip: page * pageSize,
    })

    return vangers;
}

/**
 * TO-DO: Как быть с изменением маршрута при мёрдже?
 */
export async function PatchVanger(id:string, data: Vanger) {
    const result = await AppDataSource.getRepository(Vanger).update(id, data);
    return result.affected;
}

export async function GetVangerById(id: string) {
    return await AppDataSource.getRepository(Vanger).findOneBy({id: id});
}

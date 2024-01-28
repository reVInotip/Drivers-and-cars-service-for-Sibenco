import Vanger, { RequestOrderSpecificationType, RequestRouteSpecificationType, RequestVanger } from "../entity/vanger";
import { AppDataSource } from "../data-source";
import { config } from "../config";
import { PatchCar } from "./car.service";
import { PatchDriver } from "./driver.service";
import { GetSuitableDriversAndCarsForOrder, GetSuitableDriversAndCarsForRoute } from "../utils/getSuitableDriverAndCarForOrder";
import UnixtimeToDays from "../utils/unixtimeToDays";

export async function CreateVanger(data: RequestVanger) {
    const timeInDays = UnixtimeToDays(data.beginDate, data.endDate);

    let carTimetable = Array.from(data.vanger.car.timetable);
    let driverTimetable = Array.from(data.vanger.driver.timetable);
    for (let i: number = timeInDays.begin - 1; i < timeInDays.end; ++i) {
        carTimetable[i] = 'B';
        driverTimetable[i] = 'B';
    }
    data.vanger.car.timetable = carTimetable.join('');
    data.vanger.driver.timetable = driverTimetable.join('');

    await PatchCar(data.vanger.car.id, data.vanger.car);
    await PatchDriver(data.vanger.driver.id, data.vanger.driver);

    const driver = await AppDataSource.getRepository(Vanger).create(data.vanger);
    await AppDataSource.getRepository(Vanger).save(driver);
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

export async function GetSuitableVangerByTitle(order: RequestOrderSpecificationType) {
    const timeInDays = UnixtimeToDays(order.beginDate, order.endDate);

    let vanger: Vanger = <Vanger>await GetSuitableDriversAndCarsForOrder(order, timeInDays.begin, timeInDays.end, true);
    let ReqVanger: RequestVanger = {
        vanger: vanger,
        beginDate: order.beginDate,
        endDate: order.endDate
    }

    await CreateVanger(ReqVanger);

    return vanger;
}

export async function GetSuitableDriversAndCars(order: RequestOrderSpecificationType, page: number, pageSize: number) {
    const timeInDays = UnixtimeToDays(order.beginDate, order.endDate);

    let carsAndDrivers = await GetSuitableDriversAndCarsForOrder(order, timeInDays.begin, timeInDays.end, false);
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

    const result = await AppDataSource.getRepository(Vanger).delete(id);
    return result.affected;
}

/**
 * TO-DO: Что делать, если водитель заболел? Как быть с изменением маршрута при мёрдже?
 */
export async function PatchVanger(id:string, data: Vanger) {
    const result = await AppDataSource.getRepository(Vanger).update(id, data);
    return result.affected;
}

export async function GetVangerById(id: string) {
    return await AppDataSource.getRepository(Vanger).findOneBy({id: id});
}

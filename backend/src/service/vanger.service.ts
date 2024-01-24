import Vanger, { TOrderSpecificationType } from "../entity/vanger";
import { AppDataSource } from "../data-source";
import { config } from "../config";
import { PatchCar } from "./car.service";
import { PatchDriver } from "./driver.service";
import GetSuitableDriverAndCarForOrder from "../utils/getSuitableDriverAndCarForOrder";
import TodayDateInDays from "../utils/todayDateInDays";

export async function CreateVanger(order: TOrderSpecificationType) {
    const secondsInDay: number = 86400;
    let timeBegin: number;
    if (order.beginDate) {
        timeBegin = Math.ceil(order.beginDate / secondsInDay);
    } else {
        timeBegin = TodayDateInDays();
    }
    const timeEnd: number = Math.ceil(order.endDate / secondsInDay);

    let vanger: Vanger = <Vanger>await GetSuitableDriverAndCarForOrder(order, timeBegin, timeEnd);

    let carTimetable = Array.from(vanger.car.timetable);
    let driverTimetable = Array.from(vanger.driver.timetable);
    for (let i: number = timeBegin - 1; i < timeEnd; ++i) {
        carTimetable[i] = 'B';
        driverTimetable[i] = 'B';
    }
    vanger.car.timetable = carTimetable.join('');
    vanger.driver.timetable = driverTimetable.join('');

    await PatchCar(vanger.car.id, vanger.car);
    await PatchDriver(vanger.driver.id, vanger.driver);

    await AppDataSource.getRepository(Vanger).save(vanger);

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

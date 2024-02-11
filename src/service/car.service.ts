import Car, { TCar, CarTimetableType } from "../entity/car";
import { AppDataSource } from "../data-source";
import { MoreThanOrEqual } from "typeorm";
import { config } from "../config";
import UnixtimeToDays from "../utils/unixtimeToDays";

export async function CreateCar(data: Car) {
    let car = await AppDataSource.getRepository(Car).create(data);
    car = await AppDataSource.getRepository(Car).save(car);
    return car.id
}

export async function GetAllCars(page: number, pageSize: number) {
    const cars = await AppDataSource.getRepository(Car).find({
        take: pageSize,
        skip: page * pageSize,
    });

    if (!cars) {
        throw new Error(config.errors.NotFound + 'cars');
    }
    return cars;
}

export async function DeleteCar(id: string) {
    const result = await AppDataSource.getRepository(Car).delete(id);
    return result.affected;
}

export async function PatchCar(id:string, data: TCar) {
    const result = await AppDataSource.getRepository(Car).update(id, data);
    return result.affected;
}

export async function GetCarById(id: string) {
    return await AppDataSource.getRepository(Car).findOneBy({id: id});
}

export async function PatchCarTimetable(id: string, data: CarTimetableType) {
    let car = await GetCarById(id);
    if (!car) {
        return 0;
    }

    const timeInDays = UnixtimeToDays(data.endDate, data.beginDate);
    if (timeInDays.begin >= 366 || timeInDays.end >= 366) {
        throw Error("Time begin or time end is too long");
    }

    let carTimetable = Array.from(car.timetable);
    for (let i: number = timeInDays.begin - 1; i < timeInDays.end; ++i) {
        carTimetable[i] = data.status;
    }
    car.timetable = carTimetable.join(',');

    const result = await AppDataSource.getRepository(Car).update(id, car);
    return result.affected;
}

export async function GetCarsByParams(data: TCar, page: number, pageSize: number) {
    return await AppDataSource.getRepository(Car).find({
        where: {
            numberOfTransport: data.numberOfTransport,
            title: data.title,
            maxNumberOfPassengersInCar: MoreThanOrEqual(data.maxNumberOfPassengersInCar),
            maxAmountOfCargoInCar: MoreThanOrEqual(data.maxAmountOfCargoInCar),
            numberOfPassengersInCar: data.numberOfPassengersInCar,
            amountOfCargoInCar: data.amountOfCargoInCar,
            latitude: data.latitude,
            longitude: data.longitude
        },
        take: pageSize,
        skip: page * pageSize,
    });
}

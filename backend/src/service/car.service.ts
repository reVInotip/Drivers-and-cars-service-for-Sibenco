import Car, { TCar } from "../entity/car";
import { AppDataSource } from "../data-source";
import { config } from "../config";

export async function CreateCar(data: Car) {
    const car = await AppDataSource.getRepository(Car).create(data);
    await AppDataSource.getRepository(Car).save(car);
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

export async function PatchCar(id:string, data: Car) {
    const result = await AppDataSource.getRepository(Car).update(id, data);
    return result.affected;
}

export async function GetCarById(id: string) {
    return await AppDataSource.getRepository(Car).findOneBy({id: id});
}

export async function GetCarsByParams(data: TCar, page: number, pageSize: number) {
    return await AppDataSource.getRepository(Car).find({
        where: {
            numberOfTransport: data.numberOfTransport,
            title: data.title,
            loadCapacity: data.loadCapacity,
            numberOfPassengersInCar: data.numberOfPassengersInCar,
            amountOfCargoInCar: data.amountOfCargoInCar,
            location: data.location
        },
        take: pageSize,
        skip: page * pageSize,
    });
}

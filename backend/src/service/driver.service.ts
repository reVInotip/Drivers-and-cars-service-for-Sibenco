import Driver, { TDriver } from "../entity/driver";
import { AppDataSource } from "../data-source";
import { config } from "../config";

export async function CreateDriver(data: Driver) {
    const driver = await AppDataSource.getRepository(Driver).create(data);
    await AppDataSource.getRepository(Driver).save(driver);
}

export async function GetAllDrivers(page: number, pageSize: number) {
    const drivers = await AppDataSource.getRepository(Driver).find({
        take: pageSize,
        skip: page * pageSize,
    });

    if (!drivers) {
        throw new Error(config.errors.NotFound + 'drivers');
    }
    return drivers;
}

export async function DeleteDriver(id: string) {
    const result = await AppDataSource.getRepository(Driver).delete(id);
    return result.affected;
}

export async function PatchDriver(id:string, data: Driver) {
    const result = await AppDataSource.getRepository(Driver).update(id, data);
    return result.affected;
}

export async function GetDriverById(id: string) {
    return await AppDataSource.getRepository(Driver).findOneBy({id: id});
}

export async function GetDriversByParams(data: TDriver) {
    return await AppDataSource.getRepository(Driver).findBy(data);
}


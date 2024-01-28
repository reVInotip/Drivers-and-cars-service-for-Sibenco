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

// TO-DO безопасно ли?
export async function GetDriversByParams(data: TDriver, page: number, pageSize: number) {
    return await AppDataSource.getRepository(Driver).find({
        where: {
            firstName: data.firstName,
            lastName: data.lastName,
            category: data.category,
            location: data.location
        },
        take: pageSize,
        skip: page * pageSize
    });
}


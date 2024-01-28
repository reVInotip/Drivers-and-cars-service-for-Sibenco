import { Request } from "express";
import { config } from "../config";
import SampleController from "./sampleOfController";
import * as carService from "../service/car.service";

export const CreateCar = SampleController(
    async (req: Request) => {
        carService.CreateCar(req.body)
        return {code: 200, body: config.messages.successCreate};
    }
);

export const GetAllCars = SampleController(
    async (req: Request) => {
        const page: number =
          typeof req.query.page == 'string' ? Number(req.query.page) : 0;
        const pageSize: number =
          typeof req.query.page_size == 'string'
            ? Number(req.query.page_size)
            : config.PAGE_SIZE;
        return {code: 200, body: await carService.GetAllCars(page, pageSize)};
      }
)

export const DeleteCar = SampleController(
    async(req: Request) => {
        if(!req.params.id) {
            return {code: 400, body: config.errors.BadId};
        }

        const result = await carService.DeleteCar(req.params.id);
        if (!result) {
            return {code: 400, body: config.errors.BadId};
        }
        return {code: 200, body: config.messages.successDelete};
    }
)

export const PatchCar = SampleController(
    async(req: Request) => {
        if(!req.params.id) {
            return {code: 400, body: config.errors.BadId};
        }

        const result = await carService.PatchCar(req.params.id, req.body);
        if (!result) {
            return {code: 400, body: config.errors.BadId};
        }
        return {code: 200, body: config.messages.successUpdate};
    }
)

export const GetCarById = SampleController(
    async(req: Request) => {
        if(!req.params.id) {
            return {code: 400, body: config.errors.BadId};
        }

        const result = await carService.GetCarById(req.params.id);
        if (!result) {
            return {code: 400, body: config.errors.BadId};
        } 
        return {code: 200, body: result};
    }
)

export const GetCarsByParams = SampleController(
    async(req: Request) => {
        const page: number =
          typeof req.query.page == 'string' ? Number(req.query.page) : 0;
        const pageSize: number =
          typeof req.query.page_size == 'string'
            ? Number(req.query.page_size)
            : config.PAGE_SIZE;
        return {code: 200, body: await carService.GetCarsByParams(req.body, page, pageSize)};
    }
)
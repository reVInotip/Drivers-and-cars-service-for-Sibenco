import { Request } from "express";
import { config } from "../config";
import SampleController from "./sampleOfController";
import * as vangerService from "../service/vanger.service";
import Vanger from "../entity/vanger";

export const CreateVanger = SampleController(
    async (req: Request) => {
        const isNotOk = await vangerService.CreateVanger(req.body);
        if (isNotOk) {
            return {code: 400, body: config.errors.Create + 'vanger, bad args!'};
        }
        return {code: 200, body: config.messages.successCreate};
    }
);

export const GetAllVangers = SampleController(
    async (req: Request) => {
        const page: number =
          typeof req.query.page == 'string' ? Number(req.query.page) : 0;
        const pageSize: number =
          typeof req.query.page_size == 'string'
            ? Number(req.query.page_size)
            : config.PAGE_SIZE;
        return {code: 200, body: await vangerService.GetAllVangers(page, pageSize)};
      }
)

export const GetSuitableVangerBySomething = SampleController(
    async (req: Request) => {
        return {code: 200, body: await vangerService.GetSuitableVangerBySomething(req.body)};
    }
)

export const GetSuitableDriversAndCars = SampleController(
    async (req: Request) => {
        const page: number =
          typeof req.query.page == 'string' ? Number(req.query.page) : 0;
        const pageSize: number =
          typeof req.query.page_size == 'string'
            ? Number(req.query.page_size)
            : config.PAGE_SIZE;
        return {code: 200, body: await vangerService.GetSuitableDriversAndCars(req.body, page, pageSize)};
    }
)

export const GetVangersByDriverIdAndTimeInterval = SampleController(
    async (req: Request) => {
        if(!req.params.id) {
            return {code: 400, body: config.errors.BadId};
        }
        
        const page: number =
          typeof req.query.page == 'string' ? Number(req.query.page) : 0;
        const pageSize: number =
          typeof req.query.page_size == 'string'
            ? Number(req.query.page_size)
            : config.PAGE_SIZE;
        const vangers: Vanger[] = await vangerService.GetVangersByDriverIdAndTimeInterval(req.params.id, req.body, page, pageSize);
        if (!vangers.length) {
            return {code: 400, body: config.errors.NotFound};
        }
        return {code: 200, body: vangers};
    }
)

export const GetVangersByCarIdAndTimeInterval = SampleController(
    async (req: Request) => {
        if(!req.params.id) {
            return {code: 400, body: config.errors.BadId};
        }

        const page: number =
          typeof req.query.page == 'string' ? Number(req.query.page) : 0;
        const pageSize: number =
          typeof req.query.page_size == 'string'
            ? Number(req.query.page_size)
            : config.PAGE_SIZE;
        const vangers: Vanger[] = await vangerService.GetVangersByCarIdAndTimeInterval(req.params.id, req.body, page, pageSize);
        if (!vangers.length) {
            return {code: 400, body: config.errors.NotFound};
        }
        return {code: 200, body: vangers};
    }
)

export const DeleteVanger = SampleController(
    async(req: Request) => {
        if(!req.params.id) {
            return {code: 400, body: config.errors.BadId};
        }

        const result = await vangerService.DeleteVanger(req.params.id);
        if (!result) {
            return {code: 400, body: config.errors.BadId};
        }
        return {code: 200, body: config.messages.successDelete};
    }
)

export const PatchVanger = SampleController(
    async(req: Request) => {
        if(!req.params.id) {
            return {code: 400, body: config.errors.BadId};
        }

        const result = await vangerService.PatchVanger(req.params.id, req.body);
        if (!result) {
            return {code: 400, body: config.errors.BadId};
        }
        return {code: 200, body: config.messages.successUpdate};
    }
)


export const GetVangerById = SampleController(
    async(req: Request) => {
        if(!req.params.id) {
            return {code: 400, body: config.errors.BadId};
        }

        const result = await vangerService.GetVangerById(req.params.id);
        if (!result) {
            return {code: 400, body: config.errors.BadId};
        } 
        return {code: 200, body: result};
    }
)

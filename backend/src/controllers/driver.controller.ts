import { Request } from "express";
import { config } from "../config";
import SampleController from "./sampleOfController";
import * as driverService from "../service/driver.service";

export const CreateDriver = SampleController(
    async (req: Request) => {
        driverService.CreateDriver(req.body)
        return {code: 200, body: config.messages.successCreate};
    }
);

export const GetAllDrivers = SampleController(
    async (req: Request) => {
        const page: number =
          typeof req.query.page == 'string' ? Number(req.query.page) : 0;
        const pageSize: number =
          typeof req.query.page_size == 'string'
            ? Number(req.query.page_size)
            : config.PAGE_SIZE;
        return {code: 200, body: await driverService.GetAllDrivers(page, pageSize)};
      }
)

export const DeleteDriver = SampleController(
    async(req: Request) => {
        if(!req.params.id) {
            return {code: 400, body: config.errors.BadId};
        }

        const result = await driverService.DeleteDriver(req.params.id);
        if (!result) {
            return {code: 400, body: config.errors.BadId};
        }
        return {code: 200, body: config.messages.successDelete};
    }
)

export const PatchDriver = SampleController(
    async(req: Request) => {
        if(!req.params.id) {
            return {code: 400, body: config.errors.BadId};
        }

        const result = await driverService.PatchDriver(req.params.id, req.body);
        if (!result) {
            return {code: 400, body: config.errors.BadId};
        }
        return {code: 200, body: config.messages.successUpdate};
    }
)

export const PatchDriverTimetable = SampleController(
    async(req: Request) => {
        if(!req.params.id) {
            return {code: 400, body: config.errors.BadId};
        }

        const result = await driverService.PatchDriverTimetable(req.params.id, req.body);
        if (!result) {
            return {code: 400, body: config.errors.BadId};
        }
        return {code: 200, body: config.messages.successUpdate};
    }
)

export const GetDriverById = SampleController(
    async(req: Request) => {
        if(!req.params.id) {
            return {code: 400, body: config.errors.BadId};
        }

        const result = await driverService.GetDriverById(req.params.id);
        if (!result) {
            return {code: 400, body: config.errors.BadId};
        } 
        return {code: 200, body: result};
    }
)

export const GetDriversByParams = SampleController(
    async(req: Request) => {
        const page: number =
          typeof req.query.page == 'string' ? Number(req.query.page) : 0;
        const pageSize: number =
          typeof req.query.page_size == 'string'
            ? Number(req.query.page_size)
            : config.PAGE_SIZE;
        return {code: 200, body: await driverService.GetDriversByParams(req.body, page, pageSize)};
    }
)
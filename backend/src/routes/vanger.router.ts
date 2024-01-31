import express from 'express'
import * as vangerController from '../controllers/vanger.controller';

const router = express.Router();

/**
 * @openapi
 * /vangers:
 *  post:
 *      tags:
 *          - Vanger
 *      description: "Запрос на создание вангера"
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/CreateVanger'
 *      responses:
 *          200:
 *              description: created successfully
 *          500:
 *              description: some error message
 */
router.post('/', vangerController.CreateVanger);

/**
 * @openapi
 * /vangers/all:
 *  get:
 *      tags:
 *          - Vanger
 *      description: "Запрос на получение всех вангеров"
 *      responses:
 *          200:
 *              description: "Список всех вангеров"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Vanger'
 *          500:
 *              description: some error message
 */
router.get('/all', vangerController.GetAllVangers);

/**
 * @openapi
 * /vangers/{id}:
 *  delete:
 *      tags:
 *          - Vanger
 *      description: "Запрос на удаление вангера по id"
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: deleted successfully
 *          400:
 *              description: bad id
 *          500:
 *              description: some error message
 *  patch:
 *      tags:
 *          - Vanger
 *      description: "Запрос на изменение параметров вангера по id"
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *               type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/PatchVanger'
 *      responses:
 *          200:
 *              description: updated successfully
 *          400:
 *              description: bad id
 *          500:
 *              description: some error message
 *  get:
 *      tags:
 *          - Vanger
 *      description: "Запрос на получение вангера по id"
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: "Вангер с соответсвующим id"
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Vanger'
 *          400:
 *              description: bad id
 *          500:
 *              description: some error message
 */
router.delete('/:id', vangerController.DeleteVanger);
router.patch('/:id', vangerController.PatchVanger);
router.get('/:id', vangerController.GetVangerById);

/**
 * @openapi
 * /vangers/{driverId}/by_driver:
 *  post:
 *      tags:
 *          - Vanger
 *      description: "Запрос на получение вангеров, за которыми закреплён соответсвующий водитель (именно его id указывается в пути запроса) и по дате начала и конца поездки (в формате unixtime)"
 *      parameters:
 *          - name: driverId
 *            in: path
 *            required: true
 *            schema:
 *               type: string
 *      requestBody:
 *          required: flase
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/GetVangerByTime'
 *      responses:
 *          200:
 *              description: "Вангеры с соответсвующим водителем и временем назначения"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Vanger'
 *          400:
 *              description: bad id
 *          500:
 *              description: some error message
 */
router.post('/:id/by_driver', vangerController.GetVangersByDriverIdAndTimeInterval);

/**
 * @openapi
 * /vangers/{carId}/by_car:
 *  post:
 *      tags:
 *          - Vanger
 *      description: "Запрос на получение вангеров, за которыми закреплёна соответсвующая машина (именно его id указывается в пути запроса) и по дате начала и конца поездки (в формате unixtime)"
 *      parameters:
 *          - name: carId
 *            in: path
 *            required: true
 *            schema:
 *               type: string
 *      requestBody:
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/GetVangerByTime'
 *      responses:
 *          200:
 *              description: "Вангеры с соответсвующей машиной и временем назначения"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Vanger'
 *          400:
 *              description: bad id
 *          500:
 *              description: some error message
 */
router.post('/:id/by_car', vangerController.GetVangersByCarIdAndTimeInterval);

/**
 * @openapi
 * /vangers/suitable/drivers_and_cars:
 *  post:
 *      tags:
 *          - Vanger
 *      description: "Запрос на получение подходящих под заказ водителей и машин"
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/GetSuitableCarsAndDriversByParams'
 *      responses:
 *          200:
 *              description: "Списки всех подходящих под заказ водителей и машин"
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/DriversAndCars'
 *          500:
 *              description: some error message
 */
router.post('/suitable/drivers_and_cars', vangerController.GetSuitableDriversAndCars);

/**
 * @openapi
 * /vangers/suitable/vanger:
 *  post:
 *      tags:
 *          - Vanger
 *      description: "Запрос на получение подходящего под заказ вангера"
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/GetSuitableCarsAndDriversByParams'
 *      responses:
 *          200:
 *              description: "Список всех подходящих под заказ вангеров"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Vanger'
 *          500:
 *              description: some error message
 */
router.post('/suitable/vanger', vangerController.GetSuitableVangerBySomething);

export default router
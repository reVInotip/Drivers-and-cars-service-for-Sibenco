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
 * /vangers/:id:
 *  delete:
 *      tags:
 *          - Vanger
 *      description: "Запрос на удаление вангера по id"
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *               type: integer
 *               format: int64
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
 *               type: integer
 *               format: int64
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
 *               type: integer
 *               format: int64
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
 * /vangers/suitable/drivers_and_cars:
 *  get:
 *      tags:
 *          - Vanger
 *      description: "Запрос на получение подходящих под заказ водителей и машин"
 *      parameters:
 *          - name: maxNumberOfPassengers
 *            required: true
 *            in: body
 *            schema:
 *              type: integer
 *              format: int64
 *            description: "Максимальное число пассажиров для машины"
 *          - name: maxAmountOfCargo
 *            required: true
 *            in: body
 *            schema:
 *              type: float
 *            description: "Максимальное число груза для машины"
 *          - name: title
 *            required: true
 *            in: body
 *            schema:
 *              type: string
 *            description: "Тип"
 *          - name: location
 *            required: true
 *            in: body
 *            schema:
 *              type: string
 *            description: "Местоположение"
 *          - name: beginDate
 *            required: true
 *            in: body
 *            schema:
 *              type: integer
 *              format: int64
 *            description: "Дата начала перевозки (unixtime)"
 *          - name: endDate
 *            required: true
 *            in: body
 *            schema:
 *              type: integer
 *              format: int64
 *            description: "Дата конца перевозки (unixtime)"
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
router.get('/suitable/drivers_and_cars', vangerController.GetSuitableDriversAndCars);

/**
 * @openapi
 * /vangers/suitable/vanger:
 *  get:
 *      tags:
 *          - Vanger
 *      description: "Запрос на получение подходящего под заказ вангера"
 *      parameters:
 *          - name: maxNumberOfPassengers
 *            required: true
 *            in: body
 *            schema:
 *              type: integer
 *              format: int64
 *            description: "Максимальное число пассажиров для машины"
 *          - name: maxAmountOfCargo
 *            required: true
 *            in: body
 *            schema:
 *              type: float
 *            description: "Максимальное число груза для машины"
 *          - name: title
 *            required: true
 *            in: body
 *            schema:
 *              type: string
 *            description: "Тип"
 *          - name: location
 *            required: true
 *            in: body
 *            schema:
 *              type: string
 *            description: "Местоположение"
 *          - name: beginDate
 *            required: true
 *            in: body
 *            schema:
 *              type: integer
 *              format: int64
 *            description: "Дата начала перевозки (unixtime)"
 *          - name: endDate
 *            required: true
 *            in: body
 *            schema:
 *              type: integer
 *              format: int64
 *            description: "Дата конца перевозки (unixtime)"
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
router.get('/suitable/vanger', vangerController.GetSuitableVangerByTitle);

export default router
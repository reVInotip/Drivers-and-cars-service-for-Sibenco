import express from 'express'
import * as carController from '../controllers/car.controller';

const router = express.Router();

/**
 * @openapi
 * /cars:
 *  post:
 *      tags:
 *          - Car
 *      description: "Запрос на создание машины"
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/CreateCar'
 *      responses:
 *          200:
 *              description: created successfully
 *          500:
 *              description: some error message
 */
/**
 * @openapi
 * /cars/find_by_something:
 *  get:
 *      tags:
 *          - Car
 *      description: "Запрос на получение машины по определённым параметрам (в том числе по типу)"
 *      parameters:
 *          - name: numberOfTransport
 *            in: body
 *            schema:
 *              type: integer
 *              format: int64
 *            description: "Номер транспорта"
 *          - name: title
 *            in: body
 *            schema:
 *              type: string
 *            description: "Тип"
 *          - name: loadCapacity
 *            in: body
 *            schema:
 *              type: number
 *            description: "Общая ёмкость: пассажиры + груз"
 *          - name: numberOfPassengersInCar
 *            in: body
 *            schema:
 *              type: integer
 *              format: int64
 *            description: "Текущее число пассажиров в машине"
 *          - name: amountOfCargoInCar
 *            in: body
 *            schema:
 *              type: number
 *            description: "Текущее количество груза в машине"
 *          - name: location
 *            in: body
 *            schema:
 *              type: string
 *            description: "Местоположение"
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/CarByTitle'
 *      responses:
 *          200:
 *              description: "Список всех машин соответсвующих параметрам"
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Car'
 *          500:
 *              description: some error message
 */
router.post('/', carController.CreateCar);
router.post('/find_by_something', carController.GetCarsByParams);

/**
 * @openapi
 * /cars/all:
 *  get:
 *      tags:
 *          - Car
 *      description: "Запрос на получение всех машин"
 *      responses:
 *          200:
 *              description: "Список всех машин"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Car'
 *          500:
 *              description: some error message
 */
router.get('/all', carController.GetAllCars);

/**
 * @openapi
 * /cars/{id}:
 *  delete:
 *      tags:
 *          - Car
 *      description: "Запрос на удаление машины по id"
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
 *          - Car
 *      description: "Запрос на изменение параметров машины по id"
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
 *                      $ref: '#components/schemas/PatchCar'
 *      responses:
 *          200:
 *              description: updated successfully
 *          400:
 *              description: bad id
 *          500:
 *              description: some error message
 *  get:
 *      tags:
 *          - Car
 *      description: "Запрос на получение машины по id"
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: "Машина с соответсвующим id"
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Car'
 *          400:
 *              description: bad id
 *          500:
 *              description: some error message
 */
router.delete('/:id', carController.DeleteCar);
router.patch('/:id', carController.PatchCar);
router.get('/:id', carController.GetCarById);

/**
 * @openapi
 * /cars/{id}/timetable:
 *  patch:
 *      tags:
 *          - Car
 *      description: "Запрос на установление определённого стутуса (см status) на промежуток времени для машины по id НЕ использовать без предварительного выполения запроса /vangers/:carId/by_car с теми же параметрами!!!"
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
 *                      $ref: '#components/schemas/PatchCarTimetable'
 *      responses:
 *          200:
 *              description: updated successfully
 *          400:
 *              description: bad id
 *          500:
 *              description: some error message
 */
router.patch('/:id/timetable', carController.PatchCarTimetable)

export default router;
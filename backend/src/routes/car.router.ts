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
 *              type: float
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
 *              type: float
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
router.get('/', carController.GetCarsByParams);

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
 * /cars/:id:
 *  delete:
 *      tags:
 *          - Car
 *      description: "Запрос на удаление машины по id"
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
 *          - Car
 *      description: "Запрос на изменение параметров машины по id"
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
 *          - Car
 *      description: "Запрос на получение машины по id"
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *               type: integer
 *               format: int64
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

export default router;
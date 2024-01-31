import express from 'express'
import * as driverController from '../controllers/driver.controller';

const router = express.Router();

/**
 * @openapi
 * /drivers:
 *  post:
 *      tags:
 *          - Driver
 *      description: "Запрос на создание водителя"
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/CreateDriver'
 *      responses:
 *          200:
 *              description: created successfully
 *          500:
 *              description: some error message
 */
router.post('/', driverController.CreateDriver);

/**
 * @openapi
 * /drivers/find_by_something:
 *  post:
 *      tags:
 *          - Driver
 *      description: "Запрос на получение водителя по определённым параметрам"
 *      parameters:
 *          - name: firstName
 *            in: body
 *            schema:
 *              type: string
 *          - name: lastName
 *            in: body
 *            schema:
 *              type: string
 *          - name: category
 *            in: body
 *            schema:
 *              type: string
 *            description: "Категория водительского удостоверения"
 *          - name: location
 *            in: body
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/DriverByCategory'
 *      responses:
 *          200:
 *              description: "Список всех водителей соответсвующих параметрам"
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Driver'
 *          500:
 *              description: some error message
 */
router.post('/find_by_something', driverController.GetDriversByParams);

/**
 * @openapi
 * /drivers/all:
 *  get:
 *      tags:
 *          - Driver
 *      description: "Запрос на получение всех водителей"
 *      responses:
 *          200:
 *              description: "Список всех водителей"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Driver'
 *          500:
 *              description: some error message
 */
router.get('/all', driverController.GetAllDrivers);

/**
 * @openapi
 * /drivers/{id}:
 *  delete:
 *      tags:
 *          - Driver
 *      description: "Запрос на удаление водителя по id"
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
 *          - Driver
 *      description: "Запрос на изменение параметров водителя по id"
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
 *                      $ref: '#components/schemas/PatchDriver'
 *      responses:
 *          200:
 *              description: updated successfully
 *          400:
 *              description: bad id
 *          500:
 *              description: some error message
 *  get:
 *      tags:
 *          - Driver
 *      description: "Запрос на получение водителя по id"
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *               type: string
 *      responses:
 *          200:
 *              description: "Водитель с соответсвующим id"
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/Driver'
 *          400:
 *              description: bad id
 *          500:
 *              description: some error message
 */
router.delete('/:id', driverController.DeleteDriver);
router.patch('/:id', driverController.PatchDriver);
router.get('/:id', driverController.GetDriverById);

/**
 * @openapi
 * /drivers/{id}/timetable:
 *  patch:
 *      tags:
 *          - Driver
 *      description: "Запрос на установление определённого стутуса (см status) на промежуток времени для водителя по id НЕ использовать без предварительного выполения запроса /vangers/:driverId/by_driver с теми же параметрами!!!"
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
 *                      $ref: '#components/schemas/PatchDriverTimetable'
 *      responses:
 *          200:
 *              description: updated successfully
 *          400:
 *              description: bad id
 *          500:
 *              description: some error message
 */
router.patch('/:id/timetable', driverController.PatchDriverTimetable)

export default router;
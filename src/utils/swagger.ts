import { Express, Request, Response } from "express";
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { version } from "../../package.json";
import { AddressInfo } from "net";

const options: swaggerJsDoc.Options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'REST API docs',
            version
        }
    },
    apis: ['./src/routes/*.ts', './src/entity/*.ts']
}

const swaggerSpec = swaggerJsDoc(options);

export default function swaggerDocs(app: Express, port: number) {
    //Swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    //Docs in json format
    app.get('docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Documentation availible at port: ${port}`);
}
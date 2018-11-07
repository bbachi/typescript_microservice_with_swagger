import * as express from 'express';
import * as bodyParser from 'body-parser';
import { OutagesRouter } from './src/router';
import { APPInterceptor, ErrorInterceptor } from './src/interceptors';
import swaggerUi = require('swagger-ui-express');
import yaml = require('yamljs');
import fs = require('fs');
const errors = require('throw.js');


class App {

    public express: express.Application;
    public appInterceptor: APPInterceptor = new APPInterceptor();
    public errorInterceptor: ErrorInterceptor = new ErrorInterceptor();
    public outagesRouter: OutagesRouter = new OutagesRouter();

    /* Swagger files start */
    private swaggerFile: any = (process.cwd()+"/src/swagger/swagger.yaml");
    private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
    private customCss = fs.readFileSync((process.cwd()+"/src/swagger/docs.css"), 'utf8');
    private swaggerDocument = yaml.parse(this.swaggerData);
    /* Swagger files end */

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.outagesRouter.init();
        this.express.set('view engine','pug');
        this.express.set('views', process.cwd()+'/views');
        this.errorHandlers();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(this.appInterceptor.beforeEachRequest);
    }

    // Configure Error handlers for the app.
    private errorHandlers(): void {
        this.express.use(this.errorInterceptor.notFoundErrorHandler);
        this.express.use(this.errorInterceptor.appErrorHandler);
    }

    // Configure Routes for the app.
    private routes(): void {
        let outagesAPIRouter = express.Router();
        // placeholder route handler
        outagesAPIRouter.get('/', (req, res, next) => {
            res.sendFile(process.cwd() + '/build/index.html');
        });

        this.express.use('/api/docs', swaggerUi.serve,swaggerUi.setup(this.swaggerDocument, false, null, this.customCss));
        this.express.use('/api', this.outagesRouter.router);
    }

}


export default new App().express;

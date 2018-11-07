import { Router } from "express";
import { ErrorController, StatusController, SystemController } from "../controllers";
const errors = require("throw.js");

export class OutagesRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        const statusController = new StatusController();
        const systemController = new SystemController();
        const errorController = new ErrorController();

        this.router.get("/status", statusController.getStatus);
        this.router.get("/system", systemController.getSystem);
        this.router.get("/error/:error", errorController.handleError);

        this.router.use((req, res, next) => next(new errors.NotFound()));
    }

}

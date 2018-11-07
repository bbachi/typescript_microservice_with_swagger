import { NextFunction, Request, Response } from "express";
import { StatusHelper } from "../helpers/status.helper";
import LoggerUtil from "./../logs/log";


export class StatusController {

    public getStatus(req: Request, res: Response, next: NextFunction) {
        LoggerUtil.info("StatusController::::::>>>>>getting status");
        const statusHelper = new StatusHelper();
        res.json(statusHelper.getStatus());
    }

}

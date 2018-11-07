import { NextFunction, Request, Response } from "express";
import { SystemHelper } from "../helpers/system.helper";
import LoggerUtil from "./../logs/log";


export class SystemController {

    public getSystem(req: Request, res: Response, next: NextFunction) {
        LoggerUtil.info("SystemController::::::>>>>>getting system");
        const systemHelper = new SystemHelper();
        res.json(systemHelper.getSystem());
    }

}

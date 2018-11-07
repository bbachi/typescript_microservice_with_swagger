import {NextFunction, Request, Response} from "express";
import LoggerUtil from "./../logs/log";

export class APPInterceptor {

    public beforeEachRequest(req: Request, res: Response, next: NextFunction) {

        const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
        LoggerUtil.info(`${req.method} ${fullUrl}`);
        next();
    }

    public afterEachRequest() {

        LoggerUtil.info("Completed");
    }
}

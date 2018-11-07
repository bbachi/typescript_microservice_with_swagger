import {NextFunction, Request, Response} from "express";
import LoggerUtil from "./../logs/log";
const errors = require("throw.js");

export class ErrorInterceptor {

    private static getRenderFile(status: any, message: string, error: any): any {

        return `
            <!DOCTYPE html>
            <html>
              <head>
                <title>Error ${status}</title>
              </head>
              <body>
                <h1>${status}</h1>
                <h1>${message}</h1>
                <h2>${error}</h2>
              <body>
            </html>
          `;
    }

    public notFoundErrorHandler(req: Request, res: Response, next: NextFunction) {
        next(new errors.NotFound("Not Found"));
    }

    public appErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {

        LoggerUtil.info("Something went wrong:", err.message);
        LoggerUtil.error(`${err.statusCode || 500} ${err}`);
        res.status(err.statusCode || 500).json(err);
        // res.status(err.statusCode || 500);
        // res.send(ErrorInterceptor.getRenderFile(err.statusCode, err.message, err));
    }

}

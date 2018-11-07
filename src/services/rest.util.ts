import * as request from "request";
import Promise = require("tspromise");
import { ServiceError } from "../models";
import { CommonUtil } from "../util/common.util";
import LoggerUtil from "./../logs/log";

export class RestUtil {

    public post(url: string, postData: any): Promise<any> {
        LoggerUtil.info("CALLING SERVICE FOR THE URL:::" + url);
        const p = new Promise((resolve, reject) => {
                request.post(url, this.getOptions(postData), (err, response, data) => {
                  try {
                    if (err) {
                        LoggerUtil.error(err.toString());
                        resolve(this.getErrorObj(2, err.toString));
                    }
                    const parsedData: any = CommonUtil.isJSONString(data) ? JSON.parse(data) : {};
                    if (response.statusCode === 200 && parsedData.error === undefined) {
                        const resBody = CommonUtil.isJSONString(response.body) ?
                          JSON.parse(response.body) : response.body;
                        resolve(resBody);
                    } else {
                        LoggerUtil.info(parsedData.error);
                        resolve(this.getErrorObj(2, parsedData.error));
                    }
                  } catch (err) {
                    LoggerUtil.info("ERROR calling API===" + url + "===" + err.message);
                    resolve({error: err.message});
                  }
                });
            });
        return p;
    }

    public get(url: string): Promise<any> {
        const p = new Promise((resolve, reject) => {
                request.get(url, this.getOptions(null), (err, response, data) => {
                    if (err) {
                        LoggerUtil.error(err.toString());
                        resolve(this.getErrorObj(2, err.toString));
                    }
                    const parsedData: any = CommonUtil.isJSONString(data) ? JSON.parse(data) : {};
                    if (response.statusCode === 200 && parsedData.error === undefined) {
                        const resBody = JSON.parse(response.body);
                        LoggerUtil.info("Response from Rest Call is::::::" + resBody);
                        resolve(resBody);
                    } else {
                        LoggerUtil.info(parsedData.error);
                        resolve(this.getErrorObj(2, parsedData.error));
                    }
                });
            });
        return p;
    }


    private getErrorObj(errCode: number, errMsg: string): ServiceError {

        const error  = new ServiceError(errCode, JSON.stringify(errMsg));
        return error;
    }

    private getOptions(postData: any): request.CoreOptions {
        const headers: request.Headers = {"content-type": "application/json"};
        let options: request.CoreOptions;
        if (null != postData) {
            options = {body: JSON.stringify(postData)};
            options.headers = headers;
        } else {
            options = {};
        }
        return options;
    }
}

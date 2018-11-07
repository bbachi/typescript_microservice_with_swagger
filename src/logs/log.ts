import { configure, getLogger } from "log4js";
import { EnvironmentConfig } from "../../environment/environment";
import * as log4jsConfig from "../config/log4js-config";

export class LoggerUtil {

    private static isProdEnvironment(): boolean {
        const environment = EnvironmentConfig.getEnvConfig().environment;
        return environment === "prod";
    }

    public logger: any;

    constructor() {
        this.logger = getLogger("main");
        configure(LoggerUtil.isProdEnvironment() ? log4jsConfig.LOG4JS : log4jsConfig.LOG4JS_TEST);
    }

    public info(logText: any, msgType?: string): void {
        this.logger.info(logText);
    }

    public error(logText: any, msgType?: string): void {
        this.logger.error(logText);
    }

    private getDateFormat(): string {
        const date = new Date();
        const returnStr = date.getMonth() + 1 + "/" + date.getDate() + "/" +
        date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
        return returnStr;
    }
}

// Create the loggerUtil, and export its instance
const loggerUtil = new LoggerUtil();
export default loggerUtil;

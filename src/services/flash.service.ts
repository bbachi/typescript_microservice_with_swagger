import * as request from "request";
import Promise = require("tspromise");
import * as cst from "../util/constants";
import LoggerUtil from "./../logs/log";
import { BaseService } from "./base.service";


export class FlashService extends BaseService {

    constructor() {
        super();
    }

    public getFlashList(): Promise<any> {
        const url = `${cst.OASIS_API_BASE_URL}${cst.OASIS_API_FLASHES}?userId=${cst.OASIS_API_USER}`;
        return this.restUtil.get(url);
    }


    public getFlashDetails(flashNum: any): Promise<any> {
        const url = `${cst.OASIS_API_BASE_URL}${cst.OASIS_API_FLASHES}/${flashNum}?userId=${cst.OASIS_API_USER}`;
        return this.restUtil.get(url);
    }


}

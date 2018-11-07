import { RestUtil } from "./rest.util";

export class BaseService {

    public restUtil: RestUtil;
    constructor() {
        this.restUtil = new RestUtil();
    }
}

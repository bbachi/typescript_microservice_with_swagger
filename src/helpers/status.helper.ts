import { Status } from "../models";
import LoggerUtil from "./../logs/log";
const v8 = require("v8");

export class StatusHelper {

    public getStatus(): Status {

        const status = new Status();
        status.cachedDataVersionTag = (v8.cachedDataVersionTag) ? v8.cachedDataVersionTag() : null;
        status.heapSpaceStatistics = v8.getHeapSpaceStatistics() || null;
        status.heapStatistics = v8.getHeapStatistics() || null;
        LoggerUtil.info("StatusHelper::::::>>>>>>>returning");
        return status;
    }
}

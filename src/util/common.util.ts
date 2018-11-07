import { isString, trim } from "lodash";

export class CommonUtil {

    public static isJSONString(val: string): boolean {
        try {
            JSON.parse(val);
            return true;
        } catch (err) {
            return false;
        }
    }

    public static isNotBlank(val: string): boolean {

        if (isString(val) && trim(val).length > 0 && undefined !== val && "null" !== val && null !== val) {
            return true;
        }
        return false;
    }

    public static toUpperCase(val: string): string {
        return val.toUpperCase();
    }

    public static isArrayContains(arry: any[], val: string): boolean {
        return (arry.indexOf(val) > -1);
    }

}

export class Error {

    public errorCode: number;
    public errorMessage: string;

    constructor(errorCode: number, errorMessage: string) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}

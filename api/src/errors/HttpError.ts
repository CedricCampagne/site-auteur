export class HttpError extends Error {
    statusCode:number;

    constructor(statusCode:number, message:string) {
        super(message);
        this.statusCode = statusCode;

        // L’objet this (l’instance de HttpError) doit avoir HttpError.prototype comme prototype.”
        // pour etre sur que err instanceof HttpError tjr → true
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}
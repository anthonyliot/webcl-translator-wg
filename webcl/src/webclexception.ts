import { WebCLConstants } from "./webclconstants";

export class WebCLException extends Error {
    id: number; // Unique identifier for the error

    constructor(id: WebCLConstants, message: string) {
        super(message);
        this.id = id;
        this.name = this.constructor.name;
        // Restore prototype chain
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

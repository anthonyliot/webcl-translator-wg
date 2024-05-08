import { WebCLConstantStr, WebCLConstants } from "./webclconstants";
import { WebCLException } from "./webclexception";
import { CLenum } from "./webcltype";

export class WebCLMemoryObject {
    getInfo(name: CLenum): any {
        switch (name) {
            default:
                throw new WebCLException(WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLMemoryObject.getInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }
    release(): void { }
}

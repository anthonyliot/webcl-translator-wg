import { WebCLConstantStr, WebCLConstants } from "./webclconstants";
import { WebCLException } from "./webclexception";
import { CLenum } from "./webcltype";

export class WebCLSampler {
    getInfo(name: CLenum): any {
        switch (name) {
            default:
                throw new WebCLException(WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLSampler.getInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }

    release(): void { }
}

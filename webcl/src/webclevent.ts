import { WebCLConstantStr, WebCLConstants } from "./webclconstants";
import { WebCLException } from "./webclexception";
import { CLenum, CLulong, WebCLCallback } from "./webcltype";

export class WebCLEvent {

    getInfo(name: CLenum): any {
        switch (name) {
            default:
                throw new WebCLException(WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLEvent.getInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }

    getProfilingInfo(name: CLenum): CLulong {
        switch (name) {
            default:
                throw new WebCLException(WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLEvent.getProfilingInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
        return 0;
    }

    setCallback(commandExecCallbackType: CLenum, notify: WebCLCallback): void {
        commandExecCallbackType;
        notify;
    }

    release(): void {

    }
}

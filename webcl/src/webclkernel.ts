import { WebCLDevice } from "./webcldevice";
import { CLenum, CLuint } from "./webcltype";
import { WebCLKernelArgInfo } from './webclkernelarginfo';
import { WebCLBuffer } from "./webclbuffer";
import { WebCLImage } from "./webclimage";
import { WebCLSampler } from "./webclsampler";
import { WebCLConstantStr, WebCLConstants } from "./webclconstants";
import { WebCLException } from "./webclexception";

export class WebCLKernel {
    getInfo(name: CLenum): any {
        switch (name) {
            default:
                throw new WebCLException(WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLKernel.getInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }
    getWorkGroupInfo(device: WebCLDevice | null, name: CLenum): any {
        device;

        switch (name) {
            default:
                throw new WebCLException(WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLKernel.getWorkGroupInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }
    getArgInfo(index: CLuint): WebCLKernelArgInfo {
        switch (index) {
            default:
                throw new WebCLException(WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLKernel.getArgInfo(): unknown parameter '" + index + "'");
        }
    }


    setArg(index: CLuint, arg: WebCLBuffer | WebCLImage | WebCLSampler | ArrayBufferView): void {
        index;
        arg;
    }

    release(): void { }

}

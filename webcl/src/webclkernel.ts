import { WebCLDevice } from "./webcldevice";
import { CLenum, CLuint } from "./webcltype";
import { WebCLKernelArgInfo } from './webclkernelarginfo';
import { WebCLBuffer } from "./webclbuffer";
import { WebCLImage } from "./webclimage";
import { WebCLSampler } from "./webclsampler";
import { WebCLConstantStr, WebCLConstants } from "./webclconstants";
import { WebCLException } from "./webclexception";
import { WebCLProgram } from "./webclprogram";
import { WebCLContext } from "./webclcontext";

export class WebCLKernel {
    // WebCL objects
    wclProgram: WebCLProgram;
    wclDevice: WebCLDevice;
    wclContext: WebCLContext;

    // Other objects
    kernelSig: Array<WebCLKernelArgInfo>;
    kernelName: string;
    kernelBody: string;

    constructor(wcl_device: WebCLDevice, wcl_context: WebCLContext, wcl_program: WebCLProgram, kernel_name: string, kernel_sig: Array<WebCLKernelArgInfo>, kernel_body: string) {
        this.kernelSig = kernel_sig;
        this.kernelName = kernel_name;
        this.kernelBody = kernel_body;
        this.wclContext = wcl_context;
        this.wclDevice = wcl_device;
        this.wclProgram = wcl_program;
    }

    getInfo(name: CLenum): any {
        switch (name) {
            case WebCLConstants.KERNEL_FUNCTION_SIG:
                return this.kernelSig;
            case WebCLConstants.KERNEL_FUNCTION_NAME:
                return this.kernelName;
            case WebCLConstants.KERNEL_NUM_ARGS:
                return this.kernelSig.length;
            case WebCLConstants.KERNEL_CONTEXT:
                return this.wclContext;
            case WebCLConstants.KERNEL_PROGRAM:
                return this.wclProgram;
            default:
                throw new WebCLException(WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLKernel.getInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }
    getWorkGroupInfo(_: WebCLDevice | null, name: CLenum): any {
        switch (name) {
            case WebCLConstants.KERNEL_WORK_GROUP_SIZE:
                return this.wclDevice.getInfo(WebCLConstants.DEVICE_MAX_WORK_GROUP_SIZE);
            default:
                throw new WebCLException(WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLKernel.getWorkGroupInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }
    getArgInfo(index: CLuint): WebCLKernelArgInfo {
        if (index < 0 || index >= this.kernelSig.length) {
            throw new WebCLException(WebCLConstants.INVALID_ARG_INDEX, "[INVALID_ARG_INDEX] WebCLKernel.getArgInfo(): invalid index '" + index + "'");
        }

        return this.kernelSig[index];
    }


    setArg(index: CLuint, arg: WebCLBuffer | WebCLImage | WebCLSampler | ArrayBufferView): void {
        index;
        arg;
    }

    release(): void { }

}

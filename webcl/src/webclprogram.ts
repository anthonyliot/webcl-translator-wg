import { WebCLDevice } from "./webcldevice";
import { CLenum, WebCLCallback } from "./webcltype";
import { WebCLKernel } from './webclkernel';
import { WebCLException } from "./webclexception";
import { WebCLConstantStr, WebCLConstants } from "./webclconstants";
import { WebCLPlatform } from "./webclplatform";
import { WebCLContext } from "./webclcontext";

export class WebCLProgram {
    // WebCL Objects
    wclPlatform: WebCLPlatform;
    wclContext: WebCLContext;

    // Others
    source: string;

    constructor(wcl_platform: WebCLPlatform, wcl_context: WebCLContext, source: string) {
        this.wclPlatform = wcl_platform;
        this.wclContext = wcl_context;
        this.source = source;
    }

    getInfo(name: CLenum): any {
        switch (name) {
            case WebCLConstants.PROGRAM_NUM_DEVICES:
                return this.wclPlatform.getDevices().length;
            case WebCLConstants.PROGRAM_DEVICES:
                return this.wclPlatform.getDevices();
            case WebCLConstants.PROGRAM_CONTEXT:
                return this.wclContext;
            case WebCLConstants.PROGRAM_SOURCE:
                return this.source;
            default:
                throw new WebCLException(WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLProgram.getInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }
    getBuildInfo(device: WebCLDevice, name: CLenum): any {
        device;

        switch (name) {
            case WebCLConstants.PROGRAM_BUILD_STATUS:
            case WebCLConstants.PROGRAM_BUILD_OPTIONS:
            case WebCLConstants.PROGRAM_BUILD_LOG:
            default:
                throw new WebCLException(WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLProgram.getBuildInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }
    build(devices?: Array<WebCLDevice> | null, options?: string | null, whenFinished?: WebCLCallback): void {
        devices;
        options;
        whenFinished;
    }
    createKernel(kernelName: string): WebCLKernel {
        kernelName;
        return new WebCLKernel();
    }
    createKernelsInProgram(): Array<WebCLKernel> {
        return [];
    }
    release(): void { }
}

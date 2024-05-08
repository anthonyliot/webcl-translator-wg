import { WebCLConstantStr, WebCLConstants } from './webclconstants';
import { CLenum, CLboolean } from './webcltype';
import { WebCLDevice } from './webcldevice';
import { WebCLException } from './webclexception';

class WebCLPlatform {
    // WebGPU objects
    private wgpuInfo: GPUAdapterInfo;

    // WebCL objects
    private wclDevice: WebCLDevice;

    constructor(wgpu_info: GPUAdapterInfo, wgpu_device: GPUDevice) {
        this.wgpuInfo = wgpu_info;
        this.wclDevice = new WebCLDevice(this, wgpu_info, wgpu_device)
    }

    getInfo(name: CLenum): any {
        switch (name) {
            case WebCLConstants.PLATFORM_PROFILE:
                return "WEBCL_PROFILE " + this.wgpuInfo.vendor;
            case WebCLConstants.PLATFORM_VERSION:
                return "WebCL 1.0 " + this.wgpuInfo.vendor;
            case WebCLConstants.PLATFORM_NAME:
                return this.wgpuInfo.vendor;
            case WebCLConstants.PLATFORM_VENDOR:
                return this.wgpuInfo.vendor;
            case WebCLConstants.PLATFORM_EXTENSIONS:
                return this.getSupportedExtensions().join(" ");
            default:
                throw new WebCLException(WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLPlatform.getInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }

    getDevices(_?: CLenum): Array<WebCLDevice> {
        return [this.wclDevice]
    }

    getSupportedExtensions(): Array<string> | null {
        return ["KHR_gl_sharing", "KHR_fp16"];
    }

    enableExtension(extensionName: string): CLboolean {
        return this.getSupportedExtensions().includes(extensionName);
    }
}

export { WebCLPlatform };

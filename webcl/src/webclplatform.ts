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
                throw new WebCLException(WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLPlatform.getInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }

    getDevices(deviceType?: CLenum): Array<WebCLDevice> {
        if (this.wclDevice == null) {
            throw new WebCLException(WebCLConstants.DEVICE_NOT_FOUND, "[DEVICE_NOT_FOUND] WebCLPlatform.getDevices(): Device not found");
        }
        else if (deviceType != null && deviceType != WebCLConstants.DEVICE_TYPE_CPU &&
            deviceType != WebCLConstants.DEVICE_TYPE_GPU &&
            deviceType != WebCLConstants.DEVICE_TYPE_ACCELERATOR &&
            deviceType != WebCLConstants.DEVICE_TYPE_DEFAULT &&
            deviceType != WebCLConstants.DEVICE_TYPE_ALL) {
            throw new WebCLException(WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLPlatform.getDevices(): unknown deviceType '" + deviceType + "'");
        }

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

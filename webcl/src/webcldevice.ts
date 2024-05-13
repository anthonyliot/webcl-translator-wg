import { WebCLConstantStr, WebCLConstants } from "./webclconstants";
import { WebCLException } from "./webclexception";
import { WebCLPlatform } from "./webclplatform";
import { CLboolean, CLenum } from "./webcltype";

export class WebCLDevice {
    // WebGPU Objects
    wgpuInfo: GPUAdapterInfo;
    wgpuDevice: GPUDevice;

    // WebCL Objects
    wclPlatform: WebCLPlatform;

    constructor(wcl_platform: WebCLPlatform, wgpu_info: GPUAdapterInfo, wgpu_device: GPUDevice) {
        this.wclPlatform = wcl_platform;
        this.wgpuInfo = wgpu_info;
        this.wgpuDevice = wgpu_device;
    }

    fnv1a(str: string): number {
        let hash = 2166136261; // FNV offset basis
        for (let i = 0; i < str.length; i++) {
            hash ^= str.charCodeAt(i);
            hash *= 16777619; // FNV prime
        }
        return hash >>> 0; // Ensure unsigned 32-bit integer
    }

    getInfo(name: CLenum): any {
        switch (name) {
            case WebCLConstants.DEVICE_TYPE:
                return WebCLConstants.DEVICE_TYPE_GPU;
            case WebCLConstants.DEVICE_VENDOR_ID:
                return this.fnv1a(this.wgpuInfo.vendor);
            case WebCLConstants.DEVICE_MAX_COMPUTE_UNITS:
                return this.wgpuDevice.limits.maxBindGroups;
            case WebCLConstants.DEVICE_MAX_WORK_ITEM_DIMENSIONS:
                return 3;
            case WebCLConstants.DEVICE_MAX_WORK_GROUP_SIZE:
                return this.wgpuDevice.limits.maxComputeInvocationsPerWorkgroup;
            case WebCLConstants.DEVICE_MAX_WORK_ITEM_SIZES:
                return [
                    this.wgpuDevice.limits.maxComputeWorkgroupSizeX,
                    this.wgpuDevice.limits.maxComputeWorkgroupSizeY,
                    this.wgpuDevice.limits.maxComputeWorkgroupSizeZ,
                ];
            case WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_CHAR:
                return 1;
            case WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_SHORT:
                return 1;
            case WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_INT:
                return 1;
            case WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_LONG:
                return 1;
            case WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_FLOAT:
                return 1;
            case WebCLConstants.DEVICE_MAX_CLOCK_FREQUENCY:
                return 0;
            case WebCLConstants.DEVICE_ADDRESS_BITS:
                return 32;
            case WebCLConstants.DEVICE_MAX_READ_IMAGE_ARGS:
                return 8;
            case WebCLConstants.DEVICE_MAX_WRITE_IMAGE_ARGS:
                return 1;
            case WebCLConstants.DEVICE_MAX_MEM_ALLOC_SIZE:
                return this.wgpuDevice.limits.maxBufferSize;
            case WebCLConstants.DEVICE_IMAGE2D_MAX_WIDTH:
                return this.wgpuDevice.limits.maxTextureDimension2D;
            case WebCLConstants.DEVICE_IMAGE2D_MAX_HEIGHT:
                return this.wgpuDevice.limits.maxTextureDimension2D;
            case WebCLConstants.DEVICE_IMAGE3D_MAX_WIDTH:
                return this.wgpuDevice.limits.maxTextureDimension3D;
            case WebCLConstants.DEVICE_IMAGE3D_MAX_HEIGHT:
                return this.wgpuDevice.limits.maxTextureDimension3D;
            case WebCLConstants.DEVICE_IMAGE3D_MAX_DEPTH:
                return this.wgpuDevice.limits.maxTextureDimension3D;
            case WebCLConstants.DEVICE_IMAGE_SUPPORT:
                return true;
            case WebCLConstants.DEVICE_MAX_PARAMETER_SIZE:
                return 256;
            case WebCLConstants.DEVICE_MAX_SAMPLERS:
                return 8;
            case WebCLConstants.DEVICE_MEM_BASE_ADDR_ALIGN:
                return 16 * 32;
            case WebCLConstants.DEVICE_SINGLE_FP_CONFIG:
                return 0;
            case WebCLConstants.DEVICE_GLOBAL_MEM_CACHE_TYPE:
                return WebCLConstants.READ_WRITE_CACHE;
            case WebCLConstants.DEVICE_GLOBAL_MEM_CACHELINE_SIZE:
                return 0;
            case WebCLConstants.DEVICE_GLOBAL_MEM_CACHE_SIZE:
                return 0;
            case WebCLConstants.DEVICE_GLOBAL_MEM_SIZE:
                return 1024 * 1024;
            case WebCLConstants.DEVICE_MAX_CONSTANT_BUFFER_SIZE:
                return 1024;
            case WebCLConstants.DEVICE_MAX_CONSTANT_ARGS:
                return 4;
            case WebCLConstants.DEVICE_LOCAL_MEM_TYPE:
                return WebCLConstants.LOCAL;
            case WebCLConstants.DEVICE_LOCAL_MEM_SIZE:
                return 1024;
            case WebCLConstants.DEVICE_ERROR_CORRECTION_SUPPORT:
                return false;
            case WebCLConstants.DEVICE_PROFILING_TIMER_RESOLUTION:
                return 0;
            case WebCLConstants.DEVICE_ENDIAN_LITTLE:
                return true;
            case WebCLConstants.DEVICE_AVAILABLE:
                return true;
            case WebCLConstants.DEVICE_COMPILER_AVAILABLE:
                return true;
            case WebCLConstants.DEVICE_EXECUTION_CAPABILITIES:
                return WebCLConstants.EXEC_KERNEL;
            case WebCLConstants.DEVICE_QUEUE_PROPERTIES:
                return 0;
            case WebCLConstants.DEVICE_NAME:
                return this.wgpuInfo.device;
            case WebCLConstants.DEVICE_VENDOR:
                return this.wgpuInfo.vendor;
            case WebCLConstants.DRIVER_VERSION:
                return "1.0";
            case WebCLConstants.DEVICE_PROFILE:
                return "WEBCL_PROFILE " + this.wgpuInfo.vendor;
            case WebCLConstants.DEVICE_VERSION:
                return "WEBCL 1.0 " + this.wgpuInfo.vendor;
            case WebCLConstants.DEVICE_EXTENSIONS:
                return this.getSupportedExtensions().join(" ");
            case WebCLConstants.DEVICE_PLATFORM:
                return this.wclPlatform;
            case WebCLConstants.DEVICE_HOST_UNIFIED_MEMORY:
                return false;
            case WebCLConstants.DEVICE_NATIVE_VECTOR_WIDTH_CHAR:
                return 1;
            case WebCLConstants.DEVICE_NATIVE_VECTOR_WIDTH_SHORT:
                return 1;
            case WebCLConstants.DEVICE_NATIVE_VECTOR_WIDTH_INT:
                return 1;
            case WebCLConstants.DEVICE_NATIVE_VECTOR_WIDTH_LONG:
                return 1;
            case WebCLConstants.DEVICE_NATIVE_VECTOR_WIDTH_FLOAT:
                return 1;
            case WebCLConstants.DEVICE_OPENCL_C_VERSION:
                return "WEBCL C 1.0 " + this.wgpuInfo.vendor;
            case WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_DOUBLE:
                return 0;
            case WebCLConstants.DEVICE_MIN_DATA_TYPE_ALIGN_SIZE:
                return 0;
            default:
                throw new WebCLException(WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLDevice.getInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }

    getSupportedExtensions(): Array<string> | null {
        return this.wclPlatform.getSupportedExtensions();
    }

    enableExtension(extensionName: string): CLboolean {
        return this.wclPlatform.enableExtension(extensionName);
    }
}

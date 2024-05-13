import { CLboolean, CLenum, CLuint } from "./webcltype";
import { WebCLBuffer } from './webclbuffer';
import { WebCLCommandQueue } from './webclcommandqueue';
import { WebCLDevice } from "./webcldevice";
import { WebCLImage } from './webclimage';
import { WebCLImageDescriptor } from './webclimagedescriptor';
import { WebCLProgram } from './webclprogram';
import { WebCLSampler } from './webclsampler';
import { WebCLException } from "./webclexception";
import { WebCLConstantStr, WebCLConstants } from "./webclconstants";
import { WebCLUserEvent } from './webcluserevent';
import { WebCLPlatform } from "./webclplatform";

export class WebCLContext {
    // WebCL Object
    wclPlatform: WebCLPlatform;
    wclDevice: WebCLDevice;

    constructor(wcl_platform: WebCLPlatform, wcl_device: WebCLDevice) {
        this.wclPlatform = wcl_platform;
        this.wclDevice = wcl_device;
    }

    createBuffer(memFlags: CLenum, sizeInBytes: CLuint, hostPtr?: ArrayBufferView | null): WebCLBuffer {
        if (memFlags != WebCLConstants.MEM_READ_WRITE && memFlags != WebCLConstants.MEM_WRITE_ONLY && memFlags != WebCLConstants.MEM_READ_ONLY) {
            throw new WebCLException(WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLContext.createBuffer()");
        }
        if (sizeInBytes == 0 || sizeInBytes > this.wclDevice.getInfo(WebCLConstants.DEVICE_MAX_MEM_ALLOC_SIZE)) {
            throw new WebCLException(WebCLConstants.INVALID_BUFFER_SIZE, "[INVALID_BUFFER_SIZE] WebCLContext.createBuffer()");
        }
        if (hostPtr != null && hostPtr.byteLength < sizeInBytes) {
            throw new WebCLException(WebCLConstants.INVALID_HOST_PTR, "[INVALID_HOST_PTR] WebCLContext.createBuffer()");
        }

        return new WebCLBuffer(this, memFlags, sizeInBytes, hostPtr);
    }

    createCommandQueue(_?: WebCLDevice | null, properties?: CLenum): WebCLCommandQueue {

        // Exceptions:
        // `INVALID_OPERATION` -- if this function is called from a WebCLCallback
        // `INVALID_DEVICE` -- if `device` is invalid or not associated with this context
        // `INVALID_VALUE` -- if values specified in `properties` are not valid
        // `INVALID_QUEUE_PROPERTIES` -- if values specified in `properties` are valid but not supported by the device

        return new WebCLCommandQueue(this.wclDevice, properties);
    }

    createImage(memFlags: CLenum, descriptor: WebCLImageDescriptor, hostPtr?: ArrayBufferView): WebCLImage {
        memFlags;
        descriptor;
        hostPtr;

        // Exceptions:
        // `INVALID_VALUE` -- if `memFlags` is not`MEM_READ_WRITE`, `MEM_WRITE_ONLY`, or`MEM_READ_ONLY`
        // `INVALID_IMAGE_SIZE` -- if descriptor.width == 0 || descriptor.width > DEVICE_IMAGE2D_MAX_WIDTH
        // `INVALID_IMAGE_SIZE` -- if descriptor.height == 0 || descriptor.height > DEVICE_IMAGE2D_MAX_HEIGHT
        // `INVALID_IMAGE_SIZE` -- if hostPtr === null && descriptor.rowPitch !== 0
        // `INVALID_IMAGE_SIZE` -- if hostPtr !== null && descriptor.rowPitch > 0 && descriptor.rowPitch < descriptor.width * bytesPerPixel
        // `INVALID_HOST_PTR` -- if hostPtr.byteLength < descriptor.rowPitch * descriptor.height
        // `INVALID_IMAGE_FORMAT_DESCRIPTOR` -- if `descriptor.channelOrder` or `descriptor.channelType` is not valid
        // `IMAGE_FORMAT_NOT_SUPPORTED` -- if the given combination`channelOrder`, `channelType` and `memFlags` is not supported by this WebCLContext

        return null;
    }

    createProgram(source: string): WebCLProgram {
        // Exceptions:
        // `INVALID_VALUE` -- if `source` is `null` or empty

        return new WebCLProgram(this.wclPlatform, this.wclDevice, this, source);
    }


    createSampler(normalizedCoords: CLboolean, addressingMode: CLenum, filterMode: CLenum): WebCLSampler {
        normalizedCoords;
        addressingMode;
        filterMode;

        // Exceptions:
        // `INVALID_VALUE` -- if `addressingMode` is not`ADDRESS_CLAMP`, `ADDRESS_CLAMP_TO_EDGE`, `ADDRESS_REPEAT`, or`ADDRESS_MIRRORED_REPEAT`
        // `INVALID_VALUE` -- if `filterMode` is not `FILTER_NEAREST` or`FILTER_LINEAR`
        // `INVALID_VALUE` -- if `normalizedCoords` is `false` and `addressingMode` is `ADDRESS_REPEAT` or`ADDRESS_MIRRORED_REPEAT`

        return new WebCLSampler();

    }

    createUserEvent(): WebCLUserEvent {
        return new WebCLUserEvent();
    }

    getInfo(name: CLenum): any {
        switch (name) {
            default:
                throw new WebCLException(WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLContext.getInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }

    getSupportedImageFormats(memFlags?: CLenum): Array<WebCLImageDescriptor> | null {
        if (memFlags != null && memFlags != WebCLConstants.MEM_READ_WRITE && memFlags != WebCLConstants.MEM_WRITE_ONLY && memFlags != WebCLConstants.MEM_READ_ONLY) {
            throw new WebCLException(WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLContext.getSupportedImageFormats(): unknown parameter '" + (memFlags) + "'");
        }

        return null;
    }

    release(): void {

    }

    releaseAll(): void {

    }
}

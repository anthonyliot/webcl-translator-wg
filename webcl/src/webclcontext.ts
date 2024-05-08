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

    constructor(wcl_platform: WebCLPlatform) {
        this.wclPlatform = wcl_platform;
    }

    createBuffer(memFlags: CLenum, sizeInBytes: CLuint, hostPtr?: ArrayBufferView): WebCLBuffer {
        memFlags;
        sizeInBytes;
        hostPtr;

        return new WebCLBuffer();
    }

    createCommandQueue(device?: WebCLDevice | null, properties?: CLenum): WebCLCommandQueue {
        device;
        properties;

        return new WebCLCommandQueue();
    }

    createImage(memFlags: CLenum, descriptor: WebCLImageDescriptor, hostPtr?: ArrayBufferView): WebCLImage {
        memFlags;
        descriptor;
        hostPtr;

        return new WebCLImage();
    }

    createProgram(source: string): WebCLProgram {
        return new WebCLProgram(this.wclPlatform, this, source);
    }


    createSampler(normalizedCoords: CLboolean, addressingMode: CLenum, filterMode: CLenum): WebCLSampler {
        normalizedCoords;
        addressingMode;
        filterMode;

        return new WebCLSampler();

    }

    createUserEvent(): WebCLUserEvent {
        return new WebCLUserEvent();
    }

    getInfo(name: CLenum): any {
        switch (name) {
            default:
                throw new WebCLException(WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLContext.getInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }

    getSupportedImageFormats(memFlags?: CLenum): Array<WebCLImageDescriptor> | null {
        memFlags;

        return null;
    }

    release(): void {

    }

    releaseAll(): void {

    }
}

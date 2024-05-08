import { WebCLBuffer } from "./webclbuffer";
import { WebCLConstantStr, WebCLConstants } from "./webclconstants";
import { WebCLException } from "./webclexception";
import { WebCLEvent } from "./webclevent";
import { WebCLImage } from "./webclimage";
import { WebCLKernel } from "./webclkernel";
import { CLboolean, CLenum, CLuint, WebCLCallback } from "./webcltype";

export class WebCLCommandQueue {

    enqueueCopyBuffer(srcBuffer: WebCLBuffer, dstBuffer: WebCLBuffer, srcOffset: CLuint, dstOffset: CLuint, numBytes: CLuint, eventWaitList?: Array<WebCLEvent> | null, event?: WebCLEvent | null): void {
        srcBuffer;
        dstBuffer;
        srcOffset;
        dstOffset;
        numBytes;
        eventWaitList;
        event;
    }
    enqueueCopyBufferRect(srcBuffer: WebCLBuffer, dstBuffer: WebCLBuffer, srcOrigin: Array<CLuint>, dstOrigin: Array<CLuint>, region: Array<CLuint>, srcRowPitch: CLuint, srcSlicePitch: CLuint, dstRowPitch: CLuint, dstSlicePitch: CLuint, eventWaitList?: Array<WebCLEvent> | null, event?: WebCLEvent | null): void {
        srcBuffer;
        dstBuffer;
        srcOrigin;
        dstOrigin;
        region;
        srcRowPitch;
        srcSlicePitch;
        dstRowPitch;
        dstSlicePitch;
        eventWaitList;
        event;
    }
    enqueueCopyImage(srcImage: WebCLImage, dstImage: WebCLImage, srcOrigin: Array<CLuint>, dstOrigin: Array<CLuint>, region: Array<CLuint>, eventWaitList?: Array<WebCLEvent> | null, event?: WebCLEvent | null): void {
        srcImage;
        dstImage;
        srcOrigin;
        dstOrigin;
        region;
        eventWaitList;
        event;
    }
    enqueueCopyImageToBuffer(srcImage: WebCLImage, dstBuffer: WebCLBuffer, srcOrigin: Array<CLuint>, srcRegion: Array<CLuint>, dstOffset: CLuint, eventWaitList?: Array<WebCLEvent> | null, event?: WebCLEvent | null): void {
        srcImage;
        dstBuffer;
        srcOrigin;
        srcRegion;
        dstOffset;
        eventWaitList;
        event;
    }
    enqueueCopyBufferToImage(srcBuffer: WebCLBuffer, dstImage: WebCLImage, srcOffset: CLuint, dstOrigin: Array<CLuint>, dstRegion: Array<CLuint>, eventWaitList?: Array<WebCLEvent> | null, event?: WebCLEvent | null): void {
        srcBuffer;
        dstImage;
        srcOffset;
        dstOrigin;
        dstRegion;
        eventWaitList;
        event;
    }
    enqueueReadBuffer(buffer: WebCLBuffer, blockingRead: CLboolean, bufferOffset: CLuint, numBytes: CLuint, hostPtr: ArrayBufferView, eventWaitList?: Array<WebCLEvent> | null, event?: WebCLEvent | null): void {
        buffer;
        blockingRead;
        bufferOffset;
        numBytes;
        hostPtr;
        eventWaitList;
        event;
    }
    enqueueReadBufferRect(buffer: WebCLBuffer, blockingRead: CLboolean, bufferOrigin: Array<CLuint>, hostOrigin: Array<CLuint>, region: Array<CLuint>, bufferRowPitch: CLuint, bufferSlicePitch: CLuint, hostRowPitch: CLuint, hostSlicePitch: CLuint, hostPtr: ArrayBufferView, eventWaitList?: Array<WebCLEvent> | null, event?: WebCLEvent | null): void {
        buffer;
        blockingRead;
        bufferOrigin;
        hostOrigin;
        region;
        bufferRowPitch;
        bufferSlicePitch;
        hostRowPitch;
        hostSlicePitch;
        hostPtr;
        eventWaitList;
        event;
    }
    enqueueReadImage(image: WebCLImage, blockingRead: CLboolean, origin: Array<CLuint>, region: Array<CLuint>, hostRowPitch: CLuint, hostPtr: ArrayBufferView, eventWaitList?: Array<WebCLEvent> | null, event?: WebCLEvent | null): void {
        image;
        blockingRead;
        origin;
        region;
        hostRowPitch;
        hostPtr;
        eventWaitList;
        event;
    }
    enqueueWriteBuffer(buffer: WebCLBuffer, blockingWrite: CLboolean, bufferOffset: CLuint, numBytes: CLuint, hostPtr: ArrayBufferView, eventWaitList?: Array<WebCLEvent> | null, event?: WebCLEvent | null): void {
        buffer;
        blockingWrite;
        bufferOffset;
        numBytes;
        hostPtr;
        eventWaitList;
        event;
    }
    enqueueWriteBufferRect(buffer: WebCLBuffer, blockingWrite: CLboolean, bufferOrigin: Array<CLuint>, hostOrigin: Array<CLuint>, region: Array<CLuint>, bufferRowPitch: CLuint, bufferSlicePitch: CLuint, hostRowPitch: CLuint, hostSlicePitch: CLuint, hostPtr: ArrayBufferView, eventWaitList?: Array<WebCLEvent> | null, event?: WebCLEvent | null): void {
        buffer;
        blockingWrite;
        bufferOrigin;
        hostOrigin;
        region;
        bufferRowPitch;
        bufferSlicePitch;
        hostRowPitch;
        hostSlicePitch;
        hostPtr;
        eventWaitList;
        event;
    }
    enqueueWriteImage(image: WebCLImage, blockingWrite: CLboolean, origin: Array<CLuint>, region: Array<CLuint>, hostRowPitch: CLuint, hostPtr: ArrayBufferView, eventWaitList?: Array<WebCLEvent> | null, event?: WebCLEvent | null): void {
        image;
        blockingWrite;
        origin;
        region;
        hostRowPitch;
        hostPtr;
        eventWaitList;
        event;
    }
    enqueueNDRangeKernel(kernel: WebCLKernel, workDim: CLuint, globalWorkOffset: Array<CLuint> | null, globalWorkSize: Array<CLuint>, localWorkSize?: Array<CLuint> | null, eventWaitList?: Array<WebCLEvent> | null, event?: WebCLEvent | null): void {
        kernel;
        workDim;
        globalWorkOffset;
        globalWorkSize;
        localWorkSize;
        eventWaitList;
        event;
    }
    enqueueMarker(event: WebCLEvent): void {
        event;
    }
    enqueueBarrier(): void {

    }
    enqueueWaitForEvents(eventWaitList: Array<WebCLEvent>): void {
        eventWaitList;
    }
    finish(whenFinished?: WebCLCallback): void {
        whenFinished;
    }
    flush(): void {

    }
    getInfo(name: CLenum): any {
        switch (name) {
            default:
                throw new WebCLException(WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLCommandQueue.getInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }
    release(): void {

    }

}

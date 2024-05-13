import { WebCLBuffer } from "./webclbuffer";
import { WebCLConstantStr, WebCLConstants } from "./webclconstants";
import { WebCLException } from "./webclexception";
import { WebCLEvent } from "./webclevent";
import { WebCLImage } from "./webclimage";
import { WebCLKernel } from "./webclkernel";
import { CLboolean, CLenum, CLuint, WebCLCallback, WebCLTypedArray } from "./webcltype";
import { WebCLDevice } from "./webcldevice";

export class WebCLCommandQueue {

    // WebCL Objects
    wclDevice: WebCLDevice;

    // Object
    properties: CLenum;

    constructor(wcl_device: WebCLDevice, properties?: CLenum) {
        this.wclDevice = wcl_device;
        this.properties = properties
    }

    createCopyWithSameType(host_ptr: WebCLTypedArray, mappedRange: ArrayBuffer): WebCLTypedArray {
        let copy;
        if (host_ptr instanceof Int8Array) {
            copy = new Int8Array(mappedRange);
        } else if (host_ptr instanceof Uint8Array) {
            copy = new Uint8Array(mappedRange);
        } else if (host_ptr instanceof Int16Array) {
            copy = new Int16Array(mappedRange);
        } else if (host_ptr instanceof Uint16Array) {
            copy = new Uint16Array(mappedRange);
        } else if (host_ptr instanceof Int32Array) {
            copy = new Int32Array(mappedRange);
        } else if (host_ptr instanceof Uint32Array) {
            copy = new Uint32Array(mappedRange);
        } else if (host_ptr instanceof Float32Array) {
            copy = new Float32Array(mappedRange);
        } else if (host_ptr instanceof Float64Array) {
            copy = new Float64Array(mappedRange);
        } else {
            // Unknown or unsupported type
            throw new WebCLException(WebCLConstants.INVALID_HOST_PTR, "[INVALID_HOST_PTR] WebCLCommandQueue.createCopyWithSameType()");
        }
        return copy;
    }

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
    enqueueReadBuffer(buffer: WebCLBuffer, blockingRead: CLboolean, bufferOffset: CLuint, numBytes: CLuint, hostPtr: WebCLTypedArray, eventWaitList?: Array<WebCLEvent> | null, event?: WebCLEvent | null): void {
        buffer;
        blockingRead;
        bufferOffset;
        numBytes;
        hostPtr;
        eventWaitList;
        event;

        // this.wclDevice.wgpuDevice.pushErrorScope("validation");
        // if (buffer.wgpuReadBuffer == null) {
        //     buffer.wgpuReadBuffer = this.wclDevice.wgpuDevice.createBuffer({
        //         size: numBytes + bufferOffset,
        //         usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
        //         mappedAtCreation: blockingRead,
        //     });
        // }

        // // Map the buffer for reading
        // const mappedRange = buffer.wgpuReadBuffer.getMappedRange();
        // // Create a TypedArray view of the mapped range
        // const mappedArray = this.createCopyWithSameType(hostPtr, mappedRange);
        // // Copy the data from the mapped buffer to the host pointer
        // hostPtr.set(mappedArray);

        // // Unmap the buffer
        // buffer.wgpuReadBuffer.unmap();

        // this.wclDevice.wgpuDevice.popErrorScope().then((error) => {
        //     if (error) {
        //         // There was an error creating the sampler, so discard it.
        //         console.error(
        //             `An error occured while creating inputBuffer: ${error.message}`
        //         );
        //     }
        // });

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
    enqueueWriteBuffer(buffer: WebCLBuffer, blockingWrite: CLboolean, bufferOffset: CLuint, numBytes: CLuint, hostPtr: WebCLTypedArray, eventWaitList?: Array<WebCLEvent> | null, event?: WebCLEvent | null): void {
        buffer;
        blockingWrite;
        bufferOffset;
        numBytes;
        hostPtr;
        eventWaitList;
        event;

        this.wclDevice.wgpuDevice.pushErrorScope("validation");
        if (buffer.wgpuWriteBuffer == null) {
            buffer.wgpuWriteBuffer = this.wclDevice.wgpuDevice.createBuffer({
                size: numBytes + bufferOffset,
                usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
                mappedAtCreation: blockingWrite,
            });
        }
        // Get a mapped range of the buffer
        const mappedRange = buffer.wgpuWriteBuffer.getMappedRange();
        // Create a Float32Array view of the mapped range
        const mappedArray = this.createCopyWithSameType(hostPtr, mappedRange);
        // Copy the floatArray data into the mapped array
        mappedArray.set(hostPtr);
        // Unmap the buffer
        buffer.wgpuWriteBuffer.unmap();
        this.wclDevice.wgpuDevice.popErrorScope().then((error) => {
            if (error) {
                // There was an error creating the sampler, so discard it.
                console.error("[ERROR] WebCLCommandQueue.enqueueWriteBuffer(): " + error.message);
            }
        });
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
                throw new WebCLException(WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLCommandQueue.getInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }
    release(): void {

    }

}

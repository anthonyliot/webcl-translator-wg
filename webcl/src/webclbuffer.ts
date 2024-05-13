
import { WebCLConstants } from './webclconstants';
import { WebCLContext } from './webclcontext';
import { WebCLMemoryObject } from './webclmemoryobject';
import { CLenum, CLuint } from './webcltype';

export class WebCLBuffer extends WebCLMemoryObject {
    // WebGPU Objects
    wgpuReadBuffer: GPUBuffer;
    wgpuWriteBuffer: GPUBuffer;

    // Objects
    hostPtr: ArrayBufferView | null;

    constructor(wcl_context: WebCLContext, mem_flags: CLenum, size_in_bytes: CLuint, host_ptr: ArrayBufferView | null, parent_buffer?: WebCLBuffer | null) {
        super(
            wcl_context,
            WebCLConstants.MEM_OBJECT_BUFFER,
            mem_flags,
            size_in_bytes,
            0,
            parent_buffer
        );

        this.hostPtr = host_ptr;
        this.wgpuReadBuffer = null; // WebclCommandQueue Read/Write Buffer will create the webgpu buffer
        this.wgpuWriteBuffer = null; // WebclCommandQueue Read/Write Buffer will create the webgpu buffer
    }

    createSubBuffer(mem_flags: CLenum, origin: CLuint, size_in_bytes: CLuint): WebCLBuffer {
        mem_flags;
        origin;
        size_in_bytes;
        return null;
    }
}

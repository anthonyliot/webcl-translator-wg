import { WebCLBuffer } from "./webclbuffer";
import { WebCLConstantStr, WebCLConstants } from "./webclconstants";
import { WebCLContext } from "./webclcontext";
import { WebCLException } from "./webclexception";
import { CLenum, CLuint } from "./webcltype";

export class WebCLMemoryObject {
    protected wclBuffer: WebCLBuffer;
    protected wclContext: WebCLContext;

    memoryType: CLenum;
    memoryFlags: CLenum;
    memorySize: CLuint;
    memoryOffset: CLuint;

    constructor(
        wcl_context: WebCLContext,
        memory_type: CLenum,
        memory_flags: CLenum,
        memory_size: CLuint,
        memory_offset: CLuint,
        memory_object: WebCLBuffer,
    ) {
        this.wclContext = wcl_context;
        this.memoryType = memory_type;
        this.memoryFlags = memory_flags;
        this.memorySize = memory_size;
        this.memoryOffset = memory_offset;
        this.wclBuffer = memory_object;
    }

    getInfo(name: CLenum): any {
        switch (name) {
            case WebCLConstants.MEM_TYPE:
                return this.memoryType;
            case WebCLConstants.MEM_FLAGS:
                return this.memoryFlags;
            case WebCLConstants.MEM_SIZE:
                return this.memorySize;
            case WebCLConstants.MEM_CONTEXT:
                return this.wclContext;
            case WebCLConstants.MEM_ASSOCIATED_MEMOBJECT:
                return this.wclBuffer;
            case WebCLConstants.MEM_OFFSET:
                return this.memoryOffset;
            default:
                throw new WebCLException(WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLMemoryObject.getInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }
    release(): void { }
}

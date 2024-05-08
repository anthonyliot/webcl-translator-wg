
import { WebCLMemoryObject } from './webclmemoryobject';
import { CLenum, CLuint } from './webcltype';

export class WebCLBuffer extends WebCLMemoryObject {
    createSubBuffer(memFlags: CLenum, origin: CLuint, sizeInBytes: CLuint): WebCLBuffer {
        memFlags;
        origin;
        sizeInBytes;

        return new WebCLBuffer();
    }
}

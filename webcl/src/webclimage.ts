import { WebCLImageDescriptor } from "./webclimagedescriptor";
import { WebCLMemoryObject } from "./webclmemoryobject";

export class WebCLImage extends WebCLMemoryObject {
    getInfo(): WebCLImageDescriptor {
        return new WebCLImageDescriptor();
    }
}

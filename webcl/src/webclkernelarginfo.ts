import { WebCLConstants } from "./webclconstants";

export class WebCLKernelArgInfo {
    name?: string;
    typeName?: string; // 'char', 'float', 'uint4', 'image2d_t', 'sampler_t', etc.
    addressQualifier?: string; // 'global', 'local', 'constant', or 'private'
    accessQualifier?: string; // 'read_only', 'write_only', or 'none'
    //
    type: WebCLConstants;
    pointer: boolean; //
}

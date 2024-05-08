import { CLenum, CLuint } from "./webcltype";

export class WebCLImageDescriptor {
    channelOrder?: CLenum;
    channelType?: CLenum;
    width?: CLuint;
    height?: CLuint;
    rowPitch?: CLuint;
}

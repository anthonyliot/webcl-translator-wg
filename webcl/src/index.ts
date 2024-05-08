// Export all the class WebCL
export { WebCLBuffer } from './webclbuffer';
export { WebCLCommandQueue } from './webclcommandqueue';
export { WebCLContext } from './webclcontext';
export { WebCLDevice } from './webcldevice'
export { WebCLException } from './webclexception';
export { WebCLEvent } from './webclevent';
export { WebCLImage } from './webclimage';
export { WebCLImageDescriptor } from './webclimagedescriptor';
export { WebCLKernel } from './webclkernel';
export { WebCLKernelArgInfo } from './webclkernelarginfo';
export { WebCLMemoryObject } from './webclmemoryobject';
export { WebCLPlatform } from './webclplatform';
export { WebCLProgram } from './webclprogram';
export { WebCLSampler } from './webclsampler';
export { WebCLUserEvent } from './webcluserevent';
export { WebCLConstants } from './webclconstants'

export { WebCL } from './webcl';

// Make it accessible via navigator.webcl
import { WebCL } from './webcl';

declare global {
    interface Navigator {
        webcl: typeof WebCL;
    }
}

// Get navigator.webcl.getPlatforms()
if (typeof navigator !== 'undefined') {
    navigator.webcl = WebCL;
}

// Get WebCL.getPlatforms()
export const getPlatforms = WebCL.getPlatforms;
export const webcl = WebCL;

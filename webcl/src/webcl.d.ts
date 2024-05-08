import { CLenum, CLboolean, WebCLCallback } from './webcltype';
import { WebCLConstants } from './webclconstants';
import { WebCLPlatform } from './webclplatform';
import { WebCLContext } from './webclcontext';
import { WebCLDevice } from './webcldevice';
import { WebCLEvent } from './webclevent';


// Define the WebCL namespace with constants and function
declare const WebCL: typeof WebCLConstants & {
    initialize(callback: WebCLCallback): Promise<CLboolean>;
    getPlatforms(): WebCLPlatform[];
    createContext(deviceType?: CLenum): WebCLContext;
    createContext(platform: WebCLPlatform, deviceType?: CLenum): WebCLContext;
    createContext(device: WebCLDevice): WebCLContext;
    createContext(devices: Array<WebCLDevice>): WebCLContext;
    getSupportedExtensions(): Array<string> | null;
    enableExtension(extensionName: string): CLboolean;
    waitForEvents(eventWaitList: Array<WebCLEvent>, whenFinished?: WebCLCallback): void;
    releaseAll(): void;
};

export = WebCL;


// declare module Module {
//     class WebCL {
//         readonly DEVICE_PREFERRED_VECTOR_WIDTH_HALF: CLenum;
//         readonly DEVICE_NATIVE_VECTOR_WIDTH_HALF: CLenum;
//     }
//     class WebCL {
//         readonly DEVICE_PREFERRED_VECTOR_WIDTH_DOUBLE: CLenum;
//         readonly DEVICE_NATIVE_VECTOR_WIDTH_DOUBLE: CLenum;
//     }
//     class WebCL {
//         createContext(gl: WebGLRenderingContext, deviceType?: CLenum): WebCLContext;
//         createContext(gl: WebGLRenderingContext, platform: WebCLPlatform, deviceType?: CLenum): WebCLContext;
//         createContext(gl: WebGLRenderingContext, device: WebCLDevice): WebCLContext;
//         createContext(gl: WebGLRenderingContext, devices: Array<WebCLDevice>): WebCLContext;
//         readonly INVALID_GL_OBJECT: CLenum;
//         readonly INVALID_MIP_LEVEL: CLenum;
//         readonly INVALID_GL_SHAREGROUP_REFERENCE_KHR: CLenum;
//         readonly COMMAND_ACQUIRE_GL_OBJECTS: CLenum;
//         readonly COMMAND_RELEASE_GL_OBJECTS: CLenum;
//         readonly GL_OBJECT_BUFFER: CLenum;
//         readonly GL_OBJECT_TEXTURE2D: CLenum;
//         readonly GL_OBJECT_RENDERBUFFER: CLenum;
//         readonly GL_TEXTURE_TARGET: CLenum;
//         readonly GL_MIPMAP_LEVEL: CLenum;
//     }
//     class WebCLContext {
//         getGLContext(): WebGLRenderingContext;
//         createFromGLBuffer(memFlags: CLenum, buffer: WebGLBuffer): WebCLBuffer;
//         createFromGLRenderbuffer(memFlags: CLenum, renderbuffer: WebGLRenderbuffer): WebCLImage;
//         createFromGLTexture(memFlags: CLenum, textureTarget: GLenum, miplevel: CLint, texture: WebGLTexture): WebCLImage;
//     }
//     class WebCLCommandQueue {
//         enqueueAcquireGLObjects(memObjects: Array<WebCLMemoryObject>, eventWaitList?: Array<WebCLEvent> | null, event?: WebCLEvent | null): void;
//         enqueueReleaseGLObjects(memObjects: Array<WebCLMemoryObject>, eventWaitList?: Array<WebCLEvent> | null, event?: WebCLEvent | null): void;
//     }
//     class WebCLMemoryObject {
//         getGLObjectInfo(): WebCLGLObjectInfo;
//     }
//     class WebCLGLObjectInfo {
//         glObject?: any;
//         type?: CLenum;
//         textureTarget?: GLenum;
//         mipmapLevel?: CLint;
//     }
// }

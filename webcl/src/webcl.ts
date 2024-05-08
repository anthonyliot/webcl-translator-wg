/// <reference types="@webgpu/types" />

import { CLenum, CLboolean, WebCLCallback } from './webcltype';
import { WebCLConstants } from './webclconstants';
import { WebCLPlatform } from './webclplatform';
import { WebCLContext } from './webclcontext';
import { WebCLDevice } from './webcldevice';
import { WebCLEvent } from './webclevent';

let platform: WebCLPlatform | null = null;

// Define the WebCL namespace with constants and function
export const WebCL = {
    ...WebCLConstants,
    async initialize(callback: WebCLCallback): Promise<CLboolean> {
        // Check to ensure the user agent supports WebGPU.
        if (!("gpu" in navigator)) {
            reportError({ message: "User agent doesn’t support WebGPU." });
            return false;
        }

        if (platform != undefined) {
            reportError({ message: "WebCL has already been initialized." });
            return false;
        }

        // Request an adapter.
        var wgpu_platform = await navigator.gpu.requestAdapter();
        var wgpu_info = await wgpu_platform.requestAdapterInfo();
        // requestAdapter may resolve with null if no suitable adapters are found.
        if (!wgpu_platform) {
            reportError({ message: "No WebGPU adapters found." });
            return false;
        }

        // Request a device.
        var wgpu_device = await wgpu_platform.requestDevice();
        wgpu_device.addEventListener("uncapturederror", (event: any) => {
            // Re-surface the error.
            reportError({
                message: `A WebGPU error was not captured: ${event.message}}`
            });
        });

        wgpu_device.lost.then((info: { message: any; reason: string; }) => {
            reportError({ message: `WebGPU device was lost: ${info.message}` });
            wgpu_device = null;
            if (info.reason != "destroyed") {
                this.initialize(callback);
            }
        });

        platform = new WebCLPlatform(wgpu_info, wgpu_device);
        callback(WebCL.SUCCESS, undefined);
        return true;
    },
    getPlatforms(): WebCLPlatform[] {
        if (platform != null) {
            return [platform];
        }
        return [];
    },
    createContext(_: WebCLPlatform | WebCLDevice | WebCLDevice[] | CLenum, __?: CLenum): WebCLContext {
        return new WebCLContext(platform);
    },
    getSupportedExtensions(): string[] | null {
        if (platform != null) {
            return platform.getSupportedExtensions();
        }
        return null;
    },
    enableExtension(extensionName: string): CLboolean {
        if (platform != null) {
            return platform.enableExtension(extensionName);
        }
        return false;// Replace with actual implementation
    },
    waitForEvents(eventWaitList: WebCLEvent[], whenFinished?: WebCLCallback): void {
        // Implement the logic to wait for events
        eventWaitList;
        whenFinished;
    },
    releaseAll(): void {
        // Implement the logic to release all resources
    }

};

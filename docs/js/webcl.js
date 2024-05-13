/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/webcl.ts":
/*!**********************!*\
  !*** ./src/webcl.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/// <reference types="@webgpu/types" />
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebCL = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var webclconstants_1 = __webpack_require__(/*! ./webclconstants */ "./src/webclconstants.ts");
var webclplatform_1 = __webpack_require__(/*! ./webclplatform */ "./src/webclplatform.ts");
var webclcontext_1 = __webpack_require__(/*! ./webclcontext */ "./src/webclcontext.ts");
var platform = null;
// Define the WebCL namespace with constants and function
exports.WebCL = tslib_1.__assign(tslib_1.__assign({}, webclconstants_1.WebCLConstants), { initialize: function (callback) {
        return tslib_1.__awaiter(this, void 0, Promise, function () {
            var wgpu_platform, wgpu_info, wgpu_device;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Check to ensure the user agent supports WebGPU.
                        if (!("gpu" in navigator)) {
                            reportError({ message: "User agent doesn’t support WebGPU." });
                            return [2 /*return*/, false];
                        }
                        if (platform != undefined) {
                            reportError({ message: "WebCL has already been initialized." });
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, navigator.gpu.requestAdapter()];
                    case 1:
                        wgpu_platform = _a.sent();
                        return [4 /*yield*/, wgpu_platform.requestAdapterInfo()];
                    case 2:
                        wgpu_info = _a.sent();
                        // requestAdapter may resolve with null if no suitable adapters are found.
                        if (!wgpu_platform) {
                            reportError({ message: "No WebGPU adapters found." });
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, wgpu_platform.requestDevice()];
                    case 3:
                        wgpu_device = _a.sent();
                        wgpu_device.addEventListener("uncapturederror", function (event) {
                            // Re-surface the error.
                            reportError({
                                message: "A WebGPU error was not captured: ".concat(event.message, "}")
                            });
                        });
                        wgpu_device.lost.then(function (info) {
                            reportError({ message: "WebGPU device was lost: ".concat(info.message) });
                            wgpu_device = null;
                            if (info.reason != "destroyed") {
                                _this.initialize(callback);
                            }
                        });
                        platform = new webclplatform_1.WebCLPlatform(wgpu_info, wgpu_device);
                        callback(exports.WebCL.SUCCESS, undefined);
                        return [2 /*return*/, true];
                }
            });
        });
    }, getPlatforms: function () {
        if (platform != null) {
            return [platform];
        }
        return [];
    }, createContext: function (_, __) {
        return new webclcontext_1.WebCLContext(platform, platform.getDevices()[0]);
    }, getSupportedExtensions: function () {
        if (platform != null) {
            return platform.getSupportedExtensions();
        }
        return null;
    }, enableExtension: function (extensionName) {
        if (platform != null) {
            return platform.enableExtension(extensionName);
        }
        return false; // Replace with actual implementation
    }, waitForEvents: function (eventWaitList, whenFinished) {
        // Implement the logic to wait for events
        eventWaitList;
        whenFinished;
    }, releaseAll: function () {
        // Implement the logic to release all resources
    } });


/***/ }),

/***/ "./src/webclbuffer.ts":
/*!****************************!*\
  !*** ./src/webclbuffer.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebCLBuffer = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var webclconstants_1 = __webpack_require__(/*! ./webclconstants */ "./src/webclconstants.ts");
var webclmemoryobject_1 = __webpack_require__(/*! ./webclmemoryobject */ "./src/webclmemoryobject.ts");
var WebCLBuffer = /** @class */ (function (_super) {
    tslib_1.__extends(WebCLBuffer, _super);
    function WebCLBuffer(wcl_context, mem_flags, size_in_bytes, host_ptr, parent_buffer) {
        var _this = _super.call(this, wcl_context, webclconstants_1.WebCLConstants.MEM_OBJECT_BUFFER, mem_flags, size_in_bytes, 0, parent_buffer) || this;
        _this.hostPtr = host_ptr;
        _this.wgpuReadBuffer = null; // WebclCommandQueue Read/Write Buffer will create the webgpu buffer
        _this.wgpuWriteBuffer = null; // WebclCommandQueue Read/Write Buffer will create the webgpu buffer
        return _this;
    }
    WebCLBuffer.prototype.createSubBuffer = function (mem_flags, origin, size_in_bytes) {
        mem_flags;
        origin;
        size_in_bytes;
        return null;
    };
    return WebCLBuffer;
}(webclmemoryobject_1.WebCLMemoryObject));
exports.WebCLBuffer = WebCLBuffer;


/***/ }),

/***/ "./src/webclcommandqueue.ts":
/*!**********************************!*\
  !*** ./src/webclcommandqueue.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebCLCommandQueue = void 0;
var webclconstants_1 = __webpack_require__(/*! ./webclconstants */ "./src/webclconstants.ts");
var webclexception_1 = __webpack_require__(/*! ./webclexception */ "./src/webclexception.ts");
var WebCLCommandQueue = /** @class */ (function () {
    function WebCLCommandQueue(wcl_device, properties) {
        this.wclDevice = wcl_device;
        this.properties = properties;
    }
    WebCLCommandQueue.prototype.createCopyWithSameType = function (host_ptr, mappedRange) {
        var copy;
        if (host_ptr instanceof Int8Array) {
            copy = new Int8Array(mappedRange);
        }
        else if (host_ptr instanceof Uint8Array) {
            copy = new Uint8Array(mappedRange);
        }
        else if (host_ptr instanceof Int16Array) {
            copy = new Int16Array(mappedRange);
        }
        else if (host_ptr instanceof Uint16Array) {
            copy = new Uint16Array(mappedRange);
        }
        else if (host_ptr instanceof Int32Array) {
            copy = new Int32Array(mappedRange);
        }
        else if (host_ptr instanceof Uint32Array) {
            copy = new Uint32Array(mappedRange);
        }
        else if (host_ptr instanceof Float32Array) {
            copy = new Float32Array(mappedRange);
        }
        else if (host_ptr instanceof Float64Array) {
            copy = new Float64Array(mappedRange);
        }
        else {
            // Unknown or unsupported type
            throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_HOST_PTR, "[INVALID_HOST_PTR] WebCLCommandQueue.createCopyWithSameType()");
        }
        return copy;
    };
    WebCLCommandQueue.prototype.enqueueCopyBuffer = function (srcBuffer, dstBuffer, srcOffset, dstOffset, numBytes, eventWaitList, event) {
        srcBuffer;
        dstBuffer;
        srcOffset;
        dstOffset;
        numBytes;
        eventWaitList;
        event;
    };
    WebCLCommandQueue.prototype.enqueueCopyBufferRect = function (srcBuffer, dstBuffer, srcOrigin, dstOrigin, region, srcRowPitch, srcSlicePitch, dstRowPitch, dstSlicePitch, eventWaitList, event) {
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
    };
    WebCLCommandQueue.prototype.enqueueCopyImage = function (srcImage, dstImage, srcOrigin, dstOrigin, region, eventWaitList, event) {
        srcImage;
        dstImage;
        srcOrigin;
        dstOrigin;
        region;
        eventWaitList;
        event;
    };
    WebCLCommandQueue.prototype.enqueueCopyImageToBuffer = function (srcImage, dstBuffer, srcOrigin, srcRegion, dstOffset, eventWaitList, event) {
        srcImage;
        dstBuffer;
        srcOrigin;
        srcRegion;
        dstOffset;
        eventWaitList;
        event;
    };
    WebCLCommandQueue.prototype.enqueueCopyBufferToImage = function (srcBuffer, dstImage, srcOffset, dstOrigin, dstRegion, eventWaitList, event) {
        srcBuffer;
        dstImage;
        srcOffset;
        dstOrigin;
        dstRegion;
        eventWaitList;
        event;
    };
    WebCLCommandQueue.prototype.enqueueReadBuffer = function (buffer, blockingRead, bufferOffset, numBytes, hostPtr, eventWaitList, event) {
        buffer;
        blockingRead;
        bufferOffset;
        numBytes;
        hostPtr;
        eventWaitList;
        event;
        // this.wclDevice.wgpuDevice.pushErrorScope("validation");
        // if (buffer.wgpuBuffer == null) {
        //     buffer.wgpuBuffer = this.wclDevice.wgpuDevice.createBuffer({
        //         size: numBytes + bufferOffset,
        //         usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
        //         mappedAtCreation: blockingRead,
        //     });
        // }
        // // Map the buffer for reading
        // const mappedRange = buffer.wgpuBuffer.getMappedRange();
        // // Create a TypedArray view of the mapped range
        // const mappedArray = this.createCopyWithSameType(hostPtr, mappedRange);
        // // Copy the data from the mapped buffer to the host pointer
        // hostPtr.set(mappedArray);
        // // Unmap the buffer
        // buffer.wgpuBuffer.unmap();
        // this.wclDevice.wgpuDevice.popErrorScope().then((error) => {
        //     if (error) {
        //         // There was an error creating the sampler, so discard it.
        //         console.error(
        //             `An error occured while creating inputBuffer: ${error.message}`
        //         );
        //     }
        // });
    };
    WebCLCommandQueue.prototype.enqueueReadBufferRect = function (buffer, blockingRead, bufferOrigin, hostOrigin, region, bufferRowPitch, bufferSlicePitch, hostRowPitch, hostSlicePitch, hostPtr, eventWaitList, event) {
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
    };
    WebCLCommandQueue.prototype.enqueueReadImage = function (image, blockingRead, origin, region, hostRowPitch, hostPtr, eventWaitList, event) {
        image;
        blockingRead;
        origin;
        region;
        hostRowPitch;
        hostPtr;
        eventWaitList;
        event;
    };
    WebCLCommandQueue.prototype.enqueueWriteBuffer = function (buffer, blockingWrite, bufferOffset, numBytes, hostPtr, eventWaitList, event) {
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
        var mappedRange = buffer.wgpuWriteBuffer.getMappedRange();
        // Create a Float32Array view of the mapped range
        var mappedArray = this.createCopyWithSameType(hostPtr, mappedRange);
        // Copy the floatArray data into the mapped array
        mappedArray.set(hostPtr);
        // Unmap the buffer
        buffer.wgpuWriteBuffer.unmap();
        this.wclDevice.wgpuDevice.popErrorScope().then(function (error) {
            if (error) {
                // There was an error creating the sampler, so discard it.
                console.error("[ERROR] WebCLCommandQueue.enqueueWriteBuffer(): " + error.message);
            }
        });
    };
    WebCLCommandQueue.prototype.enqueueWriteBufferRect = function (buffer, blockingWrite, bufferOrigin, hostOrigin, region, bufferRowPitch, bufferSlicePitch, hostRowPitch, hostSlicePitch, hostPtr, eventWaitList, event) {
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
    };
    WebCLCommandQueue.prototype.enqueueWriteImage = function (image, blockingWrite, origin, region, hostRowPitch, hostPtr, eventWaitList, event) {
        image;
        blockingWrite;
        origin;
        region;
        hostRowPitch;
        hostPtr;
        eventWaitList;
        event;
    };
    WebCLCommandQueue.prototype.enqueueNDRangeKernel = function (kernel, workDim, globalWorkOffset, globalWorkSize, localWorkSize, eventWaitList, event) {
        kernel;
        workDim;
        globalWorkOffset;
        globalWorkSize;
        localWorkSize;
        eventWaitList;
        event;
    };
    WebCLCommandQueue.prototype.enqueueMarker = function (event) {
        event;
    };
    WebCLCommandQueue.prototype.enqueueBarrier = function () {
    };
    WebCLCommandQueue.prototype.enqueueWaitForEvents = function (eventWaitList) {
        eventWaitList;
    };
    WebCLCommandQueue.prototype.finish = function (whenFinished) {
        whenFinished;
    };
    WebCLCommandQueue.prototype.flush = function () {
    };
    WebCLCommandQueue.prototype.getInfo = function (name) {
        switch (name) {
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLCommandQueue.getInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
    };
    WebCLCommandQueue.prototype.release = function () {
    };
    return WebCLCommandQueue;
}());
exports.WebCLCommandQueue = WebCLCommandQueue;


/***/ }),

/***/ "./src/webclconstants.ts":
/*!*******************************!*\
  !*** ./src/webclconstants.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebCLConstantStr = exports.WebCLConstants = void 0;
var WebCLConstants;
(function (WebCLConstants) {
    WebCLConstants[WebCLConstants["SUCCESS"] = 0] = "SUCCESS";
    WebCLConstants[WebCLConstants["DEVICE_NOT_FOUND"] = -1] = "DEVICE_NOT_FOUND";
    WebCLConstants[WebCLConstants["DEVICE_NOT_AVAILABLE"] = -2] = "DEVICE_NOT_AVAILABLE";
    WebCLConstants[WebCLConstants["DEVICE_COMPILER_NOT_AVAILABLE"] = -3] = "DEVICE_COMPILER_NOT_AVAILABLE";
    WebCLConstants[WebCLConstants["MEM_OBJECT_ALLOCATION_FAILURE"] = -4] = "MEM_OBJECT_ALLOCATION_FAILURE";
    WebCLConstants[WebCLConstants["OUT_OF_RESOURCES"] = -5] = "OUT_OF_RESOURCES";
    WebCLConstants[WebCLConstants["OUT_OF_HOST_MEMORY"] = -6] = "OUT_OF_HOST_MEMORY";
    WebCLConstants[WebCLConstants["PROFILING_INFO_NOT_AVAILABLE"] = -7] = "PROFILING_INFO_NOT_AVAILABLE";
    WebCLConstants[WebCLConstants["MEM_COPY_OVERLAP"] = -8] = "MEM_COPY_OVERLAP";
    WebCLConstants[WebCLConstants["IMAGE_FORMAT_MISMATCH"] = -9] = "IMAGE_FORMAT_MISMATCH";
    WebCLConstants[WebCLConstants["IMAGE_FORMAT_NOT_SUPPORTED"] = -10] = "IMAGE_FORMAT_NOT_SUPPORTED";
    WebCLConstants[WebCLConstants["BUILD_PROGRAM_FAILURE"] = -11] = "BUILD_PROGRAM_FAILURE";
    WebCLConstants[WebCLConstants["MAP_FAILURE"] = -12] = "MAP_FAILURE";
    WebCLConstants[WebCLConstants["INVALID_VALUE"] = -30] = "INVALID_VALUE";
    WebCLConstants[WebCLConstants["INVALID_DEVICE_TYPE"] = -31] = "INVALID_DEVICE_TYPE";
    WebCLConstants[WebCLConstants["INVALID_PLATFORM"] = -32] = "INVALID_PLATFORM";
    WebCLConstants[WebCLConstants["INVALID_DEVICE"] = -33] = "INVALID_DEVICE";
    WebCLConstants[WebCLConstants["INVALID_CONTEXT"] = -34] = "INVALID_CONTEXT";
    WebCLConstants[WebCLConstants["INVALID_QUEUE_PROPERTIES"] = -35] = "INVALID_QUEUE_PROPERTIES";
    WebCLConstants[WebCLConstants["INVALID_COMMAND_QUEUE"] = -36] = "INVALID_COMMAND_QUEUE";
    WebCLConstants[WebCLConstants["INVALID_HOST_PTR"] = -37] = "INVALID_HOST_PTR";
    WebCLConstants[WebCLConstants["INVALID_MEM_OBJECT"] = -38] = "INVALID_MEM_OBJECT";
    WebCLConstants[WebCLConstants["INVALID_IMAGE_FORMAT_DESCRIPTOR"] = -39] = "INVALID_IMAGE_FORMAT_DESCRIPTOR";
    WebCLConstants[WebCLConstants["INVALID_IMAGE_SIZE"] = -40] = "INVALID_IMAGE_SIZE";
    WebCLConstants[WebCLConstants["INVALID_SAMPLER"] = -41] = "INVALID_SAMPLER";
    WebCLConstants[WebCLConstants["INVALID_BINARY"] = -42] = "INVALID_BINARY";
    WebCLConstants[WebCLConstants["INVALID_BUILD_OPTIONS"] = -43] = "INVALID_BUILD_OPTIONS";
    WebCLConstants[WebCLConstants["INVALID_PROGRAM"] = -44] = "INVALID_PROGRAM";
    WebCLConstants[WebCLConstants["INVALID_PROGRAM_EXECUTABLE"] = -45] = "INVALID_PROGRAM_EXECUTABLE";
    WebCLConstants[WebCLConstants["INVALID_KERNEL_NAME"] = -46] = "INVALID_KERNEL_NAME";
    WebCLConstants[WebCLConstants["INVALID_KERNEL_DEFINITION"] = -47] = "INVALID_KERNEL_DEFINITION";
    WebCLConstants[WebCLConstants["INVALID_KERNEL"] = -48] = "INVALID_KERNEL";
    WebCLConstants[WebCLConstants["INVALID_ARG_INDEX"] = -49] = "INVALID_ARG_INDEX";
    WebCLConstants[WebCLConstants["INVALID_ARG_VALUE"] = -50] = "INVALID_ARG_VALUE";
    WebCLConstants[WebCLConstants["INVALID_ARG_SIZE"] = -51] = "INVALID_ARG_SIZE";
    WebCLConstants[WebCLConstants["INVALID_KERNEL_ARGS"] = -52] = "INVALID_KERNEL_ARGS";
    WebCLConstants[WebCLConstants["INVALID_WORK_DIMENSION"] = -53] = "INVALID_WORK_DIMENSION";
    WebCLConstants[WebCLConstants["INVALID_WORK_GROUP_SIZE"] = -54] = "INVALID_WORK_GROUP_SIZE";
    WebCLConstants[WebCLConstants["INVALID_WORK_ITEM_SIZE"] = -55] = "INVALID_WORK_ITEM_SIZE";
    WebCLConstants[WebCLConstants["INVALID_GLOBAL_OFFSET"] = -56] = "INVALID_GLOBAL_OFFSET";
    WebCLConstants[WebCLConstants["INVALID_EVENT_WAIT_LIST"] = -57] = "INVALID_EVENT_WAIT_LIST";
    WebCLConstants[WebCLConstants["INVALID_EVENT"] = -58] = "INVALID_EVENT";
    WebCLConstants[WebCLConstants["INVALID_OPERATION"] = -59] = "INVALID_OPERATION";
    WebCLConstants[WebCLConstants["INVALID_GL_OBJECT"] = -60] = "INVALID_GL_OBJECT";
    WebCLConstants[WebCLConstants["INVALID_BUFFER_SIZE"] = -61] = "INVALID_BUFFER_SIZE";
    WebCLConstants[WebCLConstants["INVALID_MIP_LEVEL"] = -62] = "INVALID_MIP_LEVEL";
    WebCLConstants[WebCLConstants["VERSION_1_0"] = 1] = "VERSION_1_0";
    WebCLConstants[WebCLConstants["FALSE"] = 0] = "FALSE";
    WebCLConstants[WebCLConstants["TRUE"] = 1] = "TRUE";
    WebCLConstants[WebCLConstants["PLATFORM_PROFILE"] = 2304] = "PLATFORM_PROFILE";
    WebCLConstants[WebCLConstants["PLATFORM_VERSION"] = 2305] = "PLATFORM_VERSION";
    WebCLConstants[WebCLConstants["PLATFORM_NAME"] = 2306] = "PLATFORM_NAME";
    WebCLConstants[WebCLConstants["PLATFORM_VENDOR"] = 2307] = "PLATFORM_VENDOR";
    WebCLConstants[WebCLConstants["PLATFORM_EXTENSIONS"] = 2308] = "PLATFORM_EXTENSIONS";
    WebCLConstants[WebCLConstants["DEVICE_TYPE_DEFAULT"] = 1] = "DEVICE_TYPE_DEFAULT";
    WebCLConstants[WebCLConstants["DEVICE_TYPE_CPU"] = 2] = "DEVICE_TYPE_CPU";
    WebCLConstants[WebCLConstants["DEVICE_TYPE_GPU"] = 4] = "DEVICE_TYPE_GPU";
    WebCLConstants[WebCLConstants["DEVICE_TYPE_ACCELERATOR"] = 8] = "DEVICE_TYPE_ACCELERATOR";
    WebCLConstants[WebCLConstants["DEVICE_TYPE_DEBUG"] = 22] = "DEVICE_TYPE_DEBUG";
    WebCLConstants[WebCLConstants["DEVICE_TYPE_ALL"] = 4294967295] = "DEVICE_TYPE_ALL";
    WebCLConstants[WebCLConstants["DEVICE_TYPE"] = 4096] = "DEVICE_TYPE";
    WebCLConstants[WebCLConstants["DEVICE_VENDOR_ID"] = 4097] = "DEVICE_VENDOR_ID";
    WebCLConstants[WebCLConstants["DEVICE_MAX_COMPUTE_UNITS"] = 4098] = "DEVICE_MAX_COMPUTE_UNITS";
    WebCLConstants[WebCLConstants["DEVICE_MAX_WORK_ITEM_DIMENSIONS"] = 4099] = "DEVICE_MAX_WORK_ITEM_DIMENSIONS";
    WebCLConstants[WebCLConstants["DEVICE_MAX_WORK_GROUP_SIZE"] = 4100] = "DEVICE_MAX_WORK_GROUP_SIZE";
    WebCLConstants[WebCLConstants["DEVICE_MAX_WORK_ITEM_SIZES"] = 4101] = "DEVICE_MAX_WORK_ITEM_SIZES";
    WebCLConstants[WebCLConstants["DEVICE_PREFERRED_VECTOR_WIDTH_CHAR"] = 4102] = "DEVICE_PREFERRED_VECTOR_WIDTH_CHAR";
    WebCLConstants[WebCLConstants["DEVICE_PREFERRED_VECTOR_WIDTH_SHORT"] = 4103] = "DEVICE_PREFERRED_VECTOR_WIDTH_SHORT";
    WebCLConstants[WebCLConstants["DEVICE_PREFERRED_VECTOR_WIDTH_INT"] = 4104] = "DEVICE_PREFERRED_VECTOR_WIDTH_INT";
    WebCLConstants[WebCLConstants["DEVICE_PREFERRED_VECTOR_WIDTH_LONG"] = 4105] = "DEVICE_PREFERRED_VECTOR_WIDTH_LONG";
    WebCLConstants[WebCLConstants["DEVICE_PREFERRED_VECTOR_WIDTH_FLOAT"] = 4106] = "DEVICE_PREFERRED_VECTOR_WIDTH_FLOAT";
    WebCLConstants[WebCLConstants["DEVICE_PREFERRED_VECTOR_WIDTH_DOUBLE"] = 4107] = "DEVICE_PREFERRED_VECTOR_WIDTH_DOUBLE";
    WebCLConstants[WebCLConstants["DEVICE_MAX_CLOCK_FREQUENCY"] = 4108] = "DEVICE_MAX_CLOCK_FREQUENCY";
    WebCLConstants[WebCLConstants["DEVICE_ADDRESS_BITS"] = 4109] = "DEVICE_ADDRESS_BITS";
    WebCLConstants[WebCLConstants["DEVICE_MAX_READ_IMAGE_ARGS"] = 4110] = "DEVICE_MAX_READ_IMAGE_ARGS";
    WebCLConstants[WebCLConstants["DEVICE_MAX_WRITE_IMAGE_ARGS"] = 4111] = "DEVICE_MAX_WRITE_IMAGE_ARGS";
    WebCLConstants[WebCLConstants["DEVICE_MAX_MEM_ALLOC_SIZE"] = 4112] = "DEVICE_MAX_MEM_ALLOC_SIZE";
    WebCLConstants[WebCLConstants["DEVICE_IMAGE2D_MAX_WIDTH"] = 4113] = "DEVICE_IMAGE2D_MAX_WIDTH";
    WebCLConstants[WebCLConstants["DEVICE_IMAGE2D_MAX_HEIGHT"] = 4114] = "DEVICE_IMAGE2D_MAX_HEIGHT";
    WebCLConstants[WebCLConstants["DEVICE_IMAGE3D_MAX_WIDTH"] = 4115] = "DEVICE_IMAGE3D_MAX_WIDTH";
    WebCLConstants[WebCLConstants["DEVICE_IMAGE3D_MAX_HEIGHT"] = 4116] = "DEVICE_IMAGE3D_MAX_HEIGHT";
    WebCLConstants[WebCLConstants["DEVICE_IMAGE3D_MAX_DEPTH"] = 4117] = "DEVICE_IMAGE3D_MAX_DEPTH";
    WebCLConstants[WebCLConstants["DEVICE_IMAGE_SUPPORT"] = 4118] = "DEVICE_IMAGE_SUPPORT";
    WebCLConstants[WebCLConstants["DEVICE_MAX_PARAMETER_SIZE"] = 4119] = "DEVICE_MAX_PARAMETER_SIZE";
    WebCLConstants[WebCLConstants["DEVICE_MAX_SAMPLERS"] = 4120] = "DEVICE_MAX_SAMPLERS";
    WebCLConstants[WebCLConstants["DEVICE_MEM_BASE_ADDR_ALIGN"] = 4121] = "DEVICE_MEM_BASE_ADDR_ALIGN";
    WebCLConstants[WebCLConstants["DEVICE_MIN_DATA_TYPE_ALIGN_SIZE"] = 4122] = "DEVICE_MIN_DATA_TYPE_ALIGN_SIZE";
    WebCLConstants[WebCLConstants["DEVICE_SINGLE_FP_CONFIG"] = 4123] = "DEVICE_SINGLE_FP_CONFIG";
    WebCLConstants[WebCLConstants["DEVICE_GLOBAL_MEM_CACHE_TYPE"] = 4124] = "DEVICE_GLOBAL_MEM_CACHE_TYPE";
    WebCLConstants[WebCLConstants["DEVICE_GLOBAL_MEM_CACHELINE_SIZE"] = 4125] = "DEVICE_GLOBAL_MEM_CACHELINE_SIZE";
    WebCLConstants[WebCLConstants["DEVICE_GLOBAL_MEM_CACHE_SIZE"] = 4126] = "DEVICE_GLOBAL_MEM_CACHE_SIZE";
    WebCLConstants[WebCLConstants["DEVICE_GLOBAL_MEM_SIZE"] = 4127] = "DEVICE_GLOBAL_MEM_SIZE";
    WebCLConstants[WebCLConstants["DEVICE_MAX_CONSTANT_BUFFER_SIZE"] = 4128] = "DEVICE_MAX_CONSTANT_BUFFER_SIZE";
    WebCLConstants[WebCLConstants["DEVICE_MAX_CONSTANT_ARGS"] = 4129] = "DEVICE_MAX_CONSTANT_ARGS";
    WebCLConstants[WebCLConstants["DEVICE_LOCAL_MEM_TYPE"] = 4130] = "DEVICE_LOCAL_MEM_TYPE";
    WebCLConstants[WebCLConstants["DEVICE_LOCAL_MEM_SIZE"] = 4131] = "DEVICE_LOCAL_MEM_SIZE";
    WebCLConstants[WebCLConstants["DEVICE_ERROR_CORRECTION_SUPPORT"] = 4132] = "DEVICE_ERROR_CORRECTION_SUPPORT";
    WebCLConstants[WebCLConstants["DEVICE_PROFILING_TIMER_RESOLUTION"] = 4133] = "DEVICE_PROFILING_TIMER_RESOLUTION";
    WebCLConstants[WebCLConstants["DEVICE_ENDIAN_LITTLE"] = 4134] = "DEVICE_ENDIAN_LITTLE";
    WebCLConstants[WebCLConstants["DEVICE_AVAILABLE"] = 4135] = "DEVICE_AVAILABLE";
    WebCLConstants[WebCLConstants["DEVICE_COMPILER_AVAILABLE"] = 4136] = "DEVICE_COMPILER_AVAILABLE";
    WebCLConstants[WebCLConstants["DEVICE_EXECUTION_CAPABILITIES"] = 4137] = "DEVICE_EXECUTION_CAPABILITIES";
    WebCLConstants[WebCLConstants["DEVICE_QUEUE_PROPERTIES"] = 4138] = "DEVICE_QUEUE_PROPERTIES";
    WebCLConstants[WebCLConstants["DEVICE_NAME"] = 4139] = "DEVICE_NAME";
    WebCLConstants[WebCLConstants["DEVICE_VENDOR"] = 4140] = "DEVICE_VENDOR";
    WebCLConstants[WebCLConstants["DRIVER_VERSION"] = 4141] = "DRIVER_VERSION";
    WebCLConstants[WebCLConstants["DEVICE_PROFILE"] = 4142] = "DEVICE_PROFILE";
    WebCLConstants[WebCLConstants["DEVICE_VERSION"] = 4143] = "DEVICE_VERSION";
    WebCLConstants[WebCLConstants["DEVICE_EXTENSIONS"] = 4144] = "DEVICE_EXTENSIONS";
    WebCLConstants[WebCLConstants["DEVICE_PLATFORM"] = 4145] = "DEVICE_PLATFORM";
    WebCLConstants[WebCLConstants["DEVICE_DOUBLE_FP_CONFIG"] = 4146] = "DEVICE_DOUBLE_FP_CONFIG";
    WebCLConstants[WebCLConstants["DEVICE_PREFERRED_VECTOR_WIDTH_HALF"] = 4148] = "DEVICE_PREFERRED_VECTOR_WIDTH_HALF";
    WebCLConstants[WebCLConstants["DEVICE_HOST_UNIFIED_MEMORY"] = 4149] = "DEVICE_HOST_UNIFIED_MEMORY";
    WebCLConstants[WebCLConstants["DEVICE_NATIVE_VECTOR_WIDTH_CHAR"] = 4150] = "DEVICE_NATIVE_VECTOR_WIDTH_CHAR";
    WebCLConstants[WebCLConstants["DEVICE_NATIVE_VECTOR_WIDTH_SHORT"] = 4151] = "DEVICE_NATIVE_VECTOR_WIDTH_SHORT";
    WebCLConstants[WebCLConstants["DEVICE_NATIVE_VECTOR_WIDTH_INT"] = 4152] = "DEVICE_NATIVE_VECTOR_WIDTH_INT";
    WebCLConstants[WebCLConstants["DEVICE_NATIVE_VECTOR_WIDTH_LONG"] = 4153] = "DEVICE_NATIVE_VECTOR_WIDTH_LONG";
    WebCLConstants[WebCLConstants["DEVICE_NATIVE_VECTOR_WIDTH_FLOAT"] = 4154] = "DEVICE_NATIVE_VECTOR_WIDTH_FLOAT";
    WebCLConstants[WebCLConstants["DEVICE_NATIVE_VECTOR_WIDTH_DOUBLE"] = 4155] = "DEVICE_NATIVE_VECTOR_WIDTH_DOUBLE";
    WebCLConstants[WebCLConstants["DEVICE_NATIVE_VECTOR_WIDTH_HALF"] = 4156] = "DEVICE_NATIVE_VECTOR_WIDTH_HALF";
    WebCLConstants[WebCLConstants["DEVICE_OPENCL_C_VERSION"] = 4157] = "DEVICE_OPENCL_C_VERSION";
    WebCLConstants[WebCLConstants["DEVICE_LINKER_AVAILABLE"] = 4158] = "DEVICE_LINKER_AVAILABLE";
    WebCLConstants[WebCLConstants["DEVICE_BUILT_IN_KERNELS"] = 4159] = "DEVICE_BUILT_IN_KERNELS";
    WebCLConstants[WebCLConstants["DEVICE_IMAGE_MAX_BUFFER_SIZE"] = 4160] = "DEVICE_IMAGE_MAX_BUFFER_SIZE";
    WebCLConstants[WebCLConstants["DEVICE_IMAGE_MAX_ARRAY_SIZE"] = 4161] = "DEVICE_IMAGE_MAX_ARRAY_SIZE";
    WebCLConstants[WebCLConstants["DEVICE_PARENT_DEVICE"] = 4162] = "DEVICE_PARENT_DEVICE";
    WebCLConstants[WebCLConstants["DEVICE_PARTITION_MAX_SUB_DEVICES"] = 4163] = "DEVICE_PARTITION_MAX_SUB_DEVICES";
    WebCLConstants[WebCLConstants["DEVICE_PARTITION_PROPERTIES"] = 4164] = "DEVICE_PARTITION_PROPERTIES";
    WebCLConstants[WebCLConstants["DEVICE_PARTITION_AFFINITY_DOMAIN"] = 4165] = "DEVICE_PARTITION_AFFINITY_DOMAIN";
    WebCLConstants[WebCLConstants["DEVICE_PARTITION_TYPE"] = 4166] = "DEVICE_PARTITION_TYPE";
    WebCLConstants[WebCLConstants["DEVICE_REFERENCE_COUNT"] = 4167] = "DEVICE_REFERENCE_COUNT";
    WebCLConstants[WebCLConstants["DEVICE_PREFERRED_INTEROP_USER_SYNC"] = 4168] = "DEVICE_PREFERRED_INTEROP_USER_SYNC";
    WebCLConstants[WebCLConstants["DEVICE_PRINTF_BUFFER_SIZE"] = 4169] = "DEVICE_PRINTF_BUFFER_SIZE";
    WebCLConstants[WebCLConstants["DEVICE_IMAGE_PITCH_ALIGNMENT"] = 4170] = "DEVICE_IMAGE_PITCH_ALIGNMENT";
    WebCLConstants[WebCLConstants["DEVICE_IMAGE_BASE_ADDRESS_ALIGNMENT"] = 4171] = "DEVICE_IMAGE_BASE_ADDRESS_ALIGNMENT";
    WebCLConstants[WebCLConstants["DEVICE_ADDRESS_32_BITS"] = 1] = "DEVICE_ADDRESS_32_BITS";
    WebCLConstants[WebCLConstants["DEVICE_ADDRESS_64_BITS"] = 2] = "DEVICE_ADDRESS_64_BITS";
    WebCLConstants[WebCLConstants["FP_DENORM"] = 1] = "FP_DENORM";
    WebCLConstants[WebCLConstants["FP_INF_NAN"] = 2] = "FP_INF_NAN";
    WebCLConstants[WebCLConstants["FP_ROUND_TO_NEAREST"] = 4] = "FP_ROUND_TO_NEAREST";
    WebCLConstants[WebCLConstants["FP_ROUND_TO_ZERO"] = 8] = "FP_ROUND_TO_ZERO";
    WebCLConstants[WebCLConstants["FP_ROUND_TO_INF"] = 22] = "FP_ROUND_TO_INF";
    WebCLConstants[WebCLConstants["FP_FMA"] = 50] = "FP_FMA";
    WebCLConstants[WebCLConstants["NONE"] = 0] = "NONE";
    WebCLConstants[WebCLConstants["READ_ONLY_CACHE"] = 1] = "READ_ONLY_CACHE";
    WebCLConstants[WebCLConstants["READ_WRITE_CACHE"] = 2] = "READ_WRITE_CACHE";
    WebCLConstants[WebCLConstants["LOCAL"] = 1] = "LOCAL";
    WebCLConstants[WebCLConstants["GLOBAL"] = 2] = "GLOBAL";
    WebCLConstants[WebCLConstants["EXEC_KERNEL"] = 1] = "EXEC_KERNEL";
    WebCLConstants[WebCLConstants["EXEC_NATIVE_KERNEL"] = 2] = "EXEC_NATIVE_KERNEL";
    WebCLConstants[WebCLConstants["QUEUE_OUT_OF_ORDER_EXEC_MODE_ENABLE"] = 1] = "QUEUE_OUT_OF_ORDER_EXEC_MODE_ENABLE";
    WebCLConstants[WebCLConstants["QUEUE_PROFILING_ENABLE"] = 2] = "QUEUE_PROFILING_ENABLE";
    WebCLConstants[WebCLConstants["CONTEXT_REFERENCE_COUNT"] = 4224] = "CONTEXT_REFERENCE_COUNT";
    WebCLConstants[WebCLConstants["CONTEXT_NUM_DEVICES"] = 4225] = "CONTEXT_NUM_DEVICES";
    WebCLConstants[WebCLConstants["CONTEXT_DEVICES"] = 4226] = "CONTEXT_DEVICES";
    WebCLConstants[WebCLConstants["CONTEXT_PROPERTIES"] = 4227] = "CONTEXT_PROPERTIES";
    WebCLConstants[WebCLConstants["CONTEXT_PLATFORM"] = 4228] = "CONTEXT_PLATFORM";
    WebCLConstants[WebCLConstants["QUEUE_CONTEXT"] = 4240] = "QUEUE_CONTEXT";
    WebCLConstants[WebCLConstants["QUEUE_DEVICE"] = 4241] = "QUEUE_DEVICE";
    WebCLConstants[WebCLConstants["QUEUE_REFERENCE_COUNT"] = 4242] = "QUEUE_REFERENCE_COUNT";
    WebCLConstants[WebCLConstants["QUEUE_PROPERTIES"] = 4243] = "QUEUE_PROPERTIES";
    WebCLConstants[WebCLConstants["MEM_READ_WRITE"] = 1] = "MEM_READ_WRITE";
    WebCLConstants[WebCLConstants["MEM_WRITE_ONLY"] = 2] = "MEM_WRITE_ONLY";
    WebCLConstants[WebCLConstants["MEM_READ_ONLY"] = 4] = "MEM_READ_ONLY";
    WebCLConstants[WebCLConstants["MEM_USE_HOST_PTR"] = 8] = "MEM_USE_HOST_PTR";
    WebCLConstants[WebCLConstants["MEM_ALLOC_HOST_PTR"] = 22] = "MEM_ALLOC_HOST_PTR";
    WebCLConstants[WebCLConstants["MEM_COPY_HOST_PTR"] = 50] = "MEM_COPY_HOST_PTR";
    WebCLConstants[WebCLConstants["R"] = 4272] = "R";
    WebCLConstants[WebCLConstants["A"] = 4273] = "A";
    WebCLConstants[WebCLConstants["RG"] = 4274] = "RG";
    WebCLConstants[WebCLConstants["RA"] = 4275] = "RA";
    WebCLConstants[WebCLConstants["RGB"] = 4276] = "RGB";
    WebCLConstants[WebCLConstants["RGBA"] = 4277] = "RGBA";
    WebCLConstants[WebCLConstants["BGRA"] = 4278] = "BGRA";
    WebCLConstants[WebCLConstants["ARGB"] = 4279] = "ARGB";
    WebCLConstants[WebCLConstants["INTENSITY"] = 4280] = "INTENSITY";
    WebCLConstants[WebCLConstants["LUMINANCE"] = 4281] = "LUMINANCE";
    WebCLConstants[WebCLConstants["SNORM_INT8"] = 4304] = "SNORM_INT8";
    WebCLConstants[WebCLConstants["SNORM_INT16"] = 4305] = "SNORM_INT16";
    WebCLConstants[WebCLConstants["UNORM_INT8"] = 4306] = "UNORM_INT8";
    WebCLConstants[WebCLConstants["UNORM_INT16"] = 4307] = "UNORM_INT16";
    WebCLConstants[WebCLConstants["UNORM_SHORT_565"] = 4308] = "UNORM_SHORT_565";
    WebCLConstants[WebCLConstants["UNORM_SHORT_555"] = 4309] = "UNORM_SHORT_555";
    WebCLConstants[WebCLConstants["UNORM_INT_101010"] = 4310] = "UNORM_INT_101010";
    WebCLConstants[WebCLConstants["SIGNED_INT8"] = 4311] = "SIGNED_INT8";
    WebCLConstants[WebCLConstants["SIGNED_INT16"] = 4312] = "SIGNED_INT16";
    WebCLConstants[WebCLConstants["SIGNED_INT32"] = 4313] = "SIGNED_INT32";
    WebCLConstants[WebCLConstants["UNSIGNED_INT8"] = 4314] = "UNSIGNED_INT8";
    WebCLConstants[WebCLConstants["UNSIGNED_INT16"] = 4315] = "UNSIGNED_INT16";
    WebCLConstants[WebCLConstants["UNSIGNED_INT32"] = 4316] = "UNSIGNED_INT32";
    WebCLConstants[WebCLConstants["HALF_FLOAT"] = 4317] = "HALF_FLOAT";
    WebCLConstants[WebCLConstants["FLOAT"] = 4318] = "FLOAT";
    WebCLConstants[WebCLConstants["POINTER"] = 4319] = "POINTER";
    WebCLConstants[WebCLConstants["MEM_OBJECT_BUFFER"] = 4336] = "MEM_OBJECT_BUFFER";
    WebCLConstants[WebCLConstants["MEM_OBJECT_IMAGE2D"] = 4337] = "MEM_OBJECT_IMAGE2D";
    WebCLConstants[WebCLConstants["MEM_OBJECT_IMAGE3D"] = 4338] = "MEM_OBJECT_IMAGE3D";
    WebCLConstants[WebCLConstants["MEM_TYPE"] = 4352] = "MEM_TYPE";
    WebCLConstants[WebCLConstants["MEM_FLAGS"] = 4353] = "MEM_FLAGS";
    WebCLConstants[WebCLConstants["MEM_SIZE"] = 4354] = "MEM_SIZE";
    WebCLConstants[WebCLConstants["MEM_HOST_PTR"] = 4355] = "MEM_HOST_PTR";
    WebCLConstants[WebCLConstants["MEM_MAP_COUNT"] = 4356] = "MEM_MAP_COUNT";
    WebCLConstants[WebCLConstants["MEM_REFERENCE_COUNT"] = 4357] = "MEM_REFERENCE_COUNT";
    WebCLConstants[WebCLConstants["MEM_CONTEXT"] = 4358] = "MEM_CONTEXT";
    WebCLConstants[WebCLConstants["MEM_ASSOCIATED_MEMOBJECT"] = 4359] = "MEM_ASSOCIATED_MEMOBJECT";
    WebCLConstants[WebCLConstants["MEM_OFFSET"] = 4360] = "MEM_OFFSET";
    WebCLConstants[WebCLConstants["IMAGE_FORMAT"] = 4368] = "IMAGE_FORMAT";
    WebCLConstants[WebCLConstants["IMAGE_ELEMENT_SIZE"] = 4369] = "IMAGE_ELEMENT_SIZE";
    WebCLConstants[WebCLConstants["IMAGE_ROW_PITCH"] = 4370] = "IMAGE_ROW_PITCH";
    WebCLConstants[WebCLConstants["IMAGE_SLICE_PITCH"] = 4371] = "IMAGE_SLICE_PITCH";
    WebCLConstants[WebCLConstants["IMAGE_WIDTH"] = 4372] = "IMAGE_WIDTH";
    WebCLConstants[WebCLConstants["IMAGE_HEIGHT"] = 4373] = "IMAGE_HEIGHT";
    WebCLConstants[WebCLConstants["IMAGE_DEPTH"] = 4374] = "IMAGE_DEPTH";
    WebCLConstants[WebCLConstants["ADDRESS_NONE"] = 4400] = "ADDRESS_NONE";
    WebCLConstants[WebCLConstants["ADDRESS_CLAMP_TO_EDGE"] = 4401] = "ADDRESS_CLAMP_TO_EDGE";
    WebCLConstants[WebCLConstants["ADDRESS_CLAMP"] = 4402] = "ADDRESS_CLAMP";
    WebCLConstants[WebCLConstants["ADDRESS_REPEAT"] = 4403] = "ADDRESS_REPEAT";
    WebCLConstants[WebCLConstants["FILTER_NEAREST"] = 4416] = "FILTER_NEAREST";
    WebCLConstants[WebCLConstants["FILTER_LINEAR"] = 4417] = "FILTER_LINEAR";
    WebCLConstants[WebCLConstants["SAMPLER_REFERENCE_COUNT"] = 4432] = "SAMPLER_REFERENCE_COUNT";
    WebCLConstants[WebCLConstants["SAMPLER_CONTEXT"] = 4433] = "SAMPLER_CONTEXT";
    WebCLConstants[WebCLConstants["SAMPLER_NORMALIZED_COORDS"] = 4434] = "SAMPLER_NORMALIZED_COORDS";
    WebCLConstants[WebCLConstants["SAMPLER_ADDRESSING_MODE"] = 4435] = "SAMPLER_ADDRESSING_MODE";
    WebCLConstants[WebCLConstants["SAMPLER_FILTER_MODE"] = 4436] = "SAMPLER_FILTER_MODE";
    WebCLConstants[WebCLConstants["MAP_READ"] = 1] = "MAP_READ";
    WebCLConstants[WebCLConstants["MAP_WRITE"] = 2] = "MAP_WRITE";
    WebCLConstants[WebCLConstants["PROGRAM_REFERENCE_COUNT"] = 4448] = "PROGRAM_REFERENCE_COUNT";
    WebCLConstants[WebCLConstants["PROGRAM_CONTEXT"] = 4449] = "PROGRAM_CONTEXT";
    WebCLConstants[WebCLConstants["PROGRAM_NUM_DEVICES"] = 4450] = "PROGRAM_NUM_DEVICES";
    WebCLConstants[WebCLConstants["PROGRAM_DEVICES"] = 4451] = "PROGRAM_DEVICES";
    WebCLConstants[WebCLConstants["PROGRAM_SOURCE"] = 4452] = "PROGRAM_SOURCE";
    WebCLConstants[WebCLConstants["PROGRAM_BINARY_SIZES"] = 4453] = "PROGRAM_BINARY_SIZES";
    WebCLConstants[WebCLConstants["PROGRAM_BINARIES"] = 4454] = "PROGRAM_BINARIES";
    WebCLConstants[WebCLConstants["PROGRAM_BUILD_STATUS"] = 4481] = "PROGRAM_BUILD_STATUS";
    WebCLConstants[WebCLConstants["PROGRAM_BUILD_OPTIONS"] = 4482] = "PROGRAM_BUILD_OPTIONS";
    WebCLConstants[WebCLConstants["PROGRAM_BUILD_LOG"] = 4483] = "PROGRAM_BUILD_LOG";
    WebCLConstants[WebCLConstants["BUILD_SUCCESS"] = 0] = "BUILD_SUCCESS";
    WebCLConstants[WebCLConstants["BUILD_NONE"] = -1] = "BUILD_NONE";
    WebCLConstants[WebCLConstants["BUILD_ERROR"] = -2] = "BUILD_ERROR";
    WebCLConstants[WebCLConstants["BUILD_IN_PROGRESS"] = -3] = "BUILD_IN_PROGRESS";
    WebCLConstants[WebCLConstants["KERNEL_FUNCTION_SIG"] = 4489] = "KERNEL_FUNCTION_SIG";
    WebCLConstants[WebCLConstants["KERNEL_FUNCTION_NAME"] = 4496] = "KERNEL_FUNCTION_NAME";
    WebCLConstants[WebCLConstants["KERNEL_NUM_ARGS"] = 4497] = "KERNEL_NUM_ARGS";
    WebCLConstants[WebCLConstants["KERNEL_REFERENCE_COUNT"] = 4498] = "KERNEL_REFERENCE_COUNT";
    WebCLConstants[WebCLConstants["KERNEL_CONTEXT"] = 4499] = "KERNEL_CONTEXT";
    WebCLConstants[WebCLConstants["KERNEL_PROGRAM"] = 4500] = "KERNEL_PROGRAM";
    WebCLConstants[WebCLConstants["KERNEL_WORK_GROUP_SIZE"] = 4528] = "KERNEL_WORK_GROUP_SIZE";
    WebCLConstants[WebCLConstants["KERNEL_COMPILE_WORK_GROUP_SIZE"] = 4529] = "KERNEL_COMPILE_WORK_GROUP_SIZE";
    WebCLConstants[WebCLConstants["KERNEL_LOCAL_MEM_SIZE"] = 4530] = "KERNEL_LOCAL_MEM_SIZE";
    WebCLConstants[WebCLConstants["EVENT_COMMAND_QUEUE"] = 4560] = "EVENT_COMMAND_QUEUE";
    WebCLConstants[WebCLConstants["EVENT_COMMAND_TYPE"] = 4561] = "EVENT_COMMAND_TYPE";
    WebCLConstants[WebCLConstants["EVENT_REFERENCE_COUNT"] = 4562] = "EVENT_REFERENCE_COUNT";
    WebCLConstants[WebCLConstants["EVENT_COMMAND_EXECUTION_STATUS"] = 4563] = "EVENT_COMMAND_EXECUTION_STATUS";
    WebCLConstants[WebCLConstants["COMMAND_NDRANGE_KERNEL"] = 4592] = "COMMAND_NDRANGE_KERNEL";
    WebCLConstants[WebCLConstants["COMMAND_TASK"] = 4593] = "COMMAND_TASK";
    WebCLConstants[WebCLConstants["COMMAND_NATIVE_KERNEL"] = 4594] = "COMMAND_NATIVE_KERNEL";
    WebCLConstants[WebCLConstants["COMMAND_READ_BUFFER"] = 4595] = "COMMAND_READ_BUFFER";
    WebCLConstants[WebCLConstants["COMMAND_WRITE_BUFFER"] = 4596] = "COMMAND_WRITE_BUFFER";
    WebCLConstants[WebCLConstants["COMMAND_COPY_BUFFER"] = 4597] = "COMMAND_COPY_BUFFER";
    WebCLConstants[WebCLConstants["COMMAND_READ_IMAGE"] = 4598] = "COMMAND_READ_IMAGE";
    WebCLConstants[WebCLConstants["COMMAND_WRITE_IMAGE"] = 4599] = "COMMAND_WRITE_IMAGE";
    WebCLConstants[WebCLConstants["COMMAND_COPY_IMAGE"] = 4600] = "COMMAND_COPY_IMAGE";
    WebCLConstants[WebCLConstants["COMMAND_COPY_IMAGE_TO_BUFFER"] = 4601] = "COMMAND_COPY_IMAGE_TO_BUFFER";
    WebCLConstants[WebCLConstants["COMMAND_COPY_BUFFER_TO_IMAGE"] = 4602] = "COMMAND_COPY_BUFFER_TO_IMAGE";
    WebCLConstants[WebCLConstants["COMMAND_MAP_BUFFER"] = 4603] = "COMMAND_MAP_BUFFER";
    WebCLConstants[WebCLConstants["COMMAND_MAP_IMAGE"] = 4604] = "COMMAND_MAP_IMAGE";
    WebCLConstants[WebCLConstants["COMMAND_UNMAP_MEM_OBJECT"] = 4605] = "COMMAND_UNMAP_MEM_OBJECT";
    WebCLConstants[WebCLConstants["COMMAND_MARKER"] = 4606] = "COMMAND_MARKER";
    WebCLConstants[WebCLConstants["COMMAND_WAIT_FOR_EVENTS"] = 4607] = "COMMAND_WAIT_FOR_EVENTS";
    WebCLConstants[WebCLConstants["COMMAND_BARRIER"] = 4608] = "COMMAND_BARRIER";
    WebCLConstants[WebCLConstants["COMMAND_ACQUIRE_GL_OBJECTS"] = 4609] = "COMMAND_ACQUIRE_GL_OBJECTS";
    WebCLConstants[WebCLConstants["COMMAND_RELEASE_GL_OBJECTS"] = 4610] = "COMMAND_RELEASE_GL_OBJECTS";
    WebCLConstants[WebCLConstants["COMPLETE"] = 0] = "COMPLETE";
    WebCLConstants[WebCLConstants["RUNNING"] = 1] = "RUNNING";
    WebCLConstants[WebCLConstants["SUBMITTED"] = 2] = "SUBMITTED";
    WebCLConstants[WebCLConstants["QUEUED"] = 3] = "QUEUED";
    WebCLConstants[WebCLConstants["PROFILING_COMMAND_QUEUED"] = 4736] = "PROFILING_COMMAND_QUEUED";
    WebCLConstants[WebCLConstants["PROFILING_COMMAND_SUBMIT"] = 4737] = "PROFILING_COMMAND_SUBMIT";
    WebCLConstants[WebCLConstants["PROFILING_COMMAND_START"] = 4738] = "PROFILING_COMMAND_START";
    WebCLConstants[WebCLConstants["PROFILING_COMMAND_END"] = 4739] = "PROFILING_COMMAND_END";
})(WebCLConstants = exports.WebCLConstants || (exports.WebCLConstants = {}));
function WebCLConstantStr(value) {
    switch (value) {
        case WebCLConstants.SUCCESS:
            return "SUCCESS";
        case WebCLConstants.DEVICE_NOT_FOUND:
            return "DEVICE_NOT_FOUND";
        case WebCLConstants.DEVICE_NOT_AVAILABLE:
            return "DEVICE_NOT_AVAILABLE";
        case WebCLConstants.DEVICE_COMPILER_NOT_AVAILABLE:
            return "DEVICE_COMPILER_NOT_AVAILABLE";
        case WebCLConstants.MEM_OBJECT_ALLOCATION_FAILURE:
            return "MEM_OBJECT_ALLOCATION_FAILURE";
        case WebCLConstants.OUT_OF_RESOURCES:
            return "OUT_OF_RESOURCES";
        case WebCLConstants.OUT_OF_HOST_MEMORY:
            return "OUT_OF_HOST_MEMORY";
        case WebCLConstants.PROFILING_INFO_NOT_AVAILABLE:
            return "PROFILING_INFO_NOT_AVAILABLE";
        case WebCLConstants.MEM_COPY_OVERLAP:
            return "MEM_COPY_OVERLAP";
        case WebCLConstants.IMAGE_FORMAT_MISMATCH:
            return "IMAGE_FORMAT_MISMATCH";
        case WebCLConstants.IMAGE_FORMAT_NOT_SUPPORTED:
            return "IMAGE_FORMAT_NOT_SUPPORTED";
        case WebCLConstants.BUILD_PROGRAM_FAILURE:
            return "BUILD_PROGRAM_FAILURE";
        case WebCLConstants.MAP_FAILURE:
            return "MAP_FAILURE";
        case WebCLConstants.INVALID_VALUE:
            return "INVALID_VALUE";
        case WebCLConstants.INVALID_DEVICE_TYPE:
            return "INVALID_DEVICE_TYPE";
        case WebCLConstants.INVALID_PLATFORM:
            return "INVALID_PLATFORM";
        case WebCLConstants.INVALID_DEVICE:
            return "INVALID_DEVICE";
        case WebCLConstants.INVALID_CONTEXT:
            return "INVALID_CONTEXT";
        case WebCLConstants.INVALID_QUEUE_PROPERTIES:
            return "INVALID_QUEUE_PROPERTIES";
        case WebCLConstants.INVALID_COMMAND_QUEUE:
            return "INVALID_COMMAND_QUEUE";
        case WebCLConstants.INVALID_HOST_PTR:
            return "INVALID_HOST_PTR";
        case WebCLConstants.INVALID_MEM_OBJECT:
            return "INVALID_MEM_OBJECT";
        case WebCLConstants.INVALID_IMAGE_FORMAT_DESCRIPTOR:
            return "INVALID_IMAGE_FORMAT_DESCRIPTOR";
        case WebCLConstants.INVALID_IMAGE_SIZE:
            return "INVALID_IMAGE_SIZE";
        case WebCLConstants.INVALID_SAMPLER:
            return "INVALID_SAMPLER";
        case WebCLConstants.INVALID_BINARY:
            return "INVALID_BINARY";
        case WebCLConstants.INVALID_BUILD_OPTIONS:
            return "INVALID_BUILD_OPTIONS";
        case WebCLConstants.INVALID_PROGRAM:
            return "INVALID_PROGRAM";
        case WebCLConstants.INVALID_PROGRAM_EXECUTABLE:
            return "INVALID_PROGRAM_EXECUTABLE";
        case WebCLConstants.INVALID_KERNEL_NAME:
            return "INVALID_KERNEL_NAME";
        case WebCLConstants.INVALID_KERNEL_DEFINITION:
            return "INVALID_KERNEL_DEFINITION";
        case WebCLConstants.INVALID_KERNEL:
            return "INVALID_KERNEL";
        case WebCLConstants.INVALID_ARG_INDEX:
            return "INVALID_ARG_INDEX";
        case WebCLConstants.INVALID_ARG_VALUE:
            return "INVALID_ARG_VALUE";
        case WebCLConstants.INVALID_ARG_SIZE:
            return "INVALID_ARG_SIZE";
        case WebCLConstants.INVALID_KERNEL_ARGS:
            return "INVALID_KERNEL_ARGS";
        case WebCLConstants.INVALID_WORK_DIMENSION:
            return "INVALID_WORK_DIMENSION";
        case WebCLConstants.INVALID_WORK_GROUP_SIZE:
            return "INVALID_WORK_GROUP_SIZE";
        case WebCLConstants.INVALID_WORK_ITEM_SIZE:
            return "INVALID_WORK_ITEM_SIZE";
        case WebCLConstants.INVALID_GLOBAL_OFFSET:
            return "INVALID_GLOBAL_OFFSET";
        case WebCLConstants.INVALID_EVENT_WAIT_LIST:
            return "INVALID_EVENT_WAIT_LIST";
        case WebCLConstants.INVALID_EVENT:
            return "INVALID_EVENT";
        case WebCLConstants.INVALID_OPERATION:
            return "INVALID_OPERATION";
        case WebCLConstants.INVALID_GL_OBJECT:
            return "INVALID_GL_OBJECT";
        case WebCLConstants.INVALID_BUFFER_SIZE:
            return "INVALID_BUFFER_SIZE";
        case WebCLConstants.INVALID_MIP_LEVEL:
            return "INVALID_MIP_LEVEL";
        case WebCLConstants.VERSION_1_0:
            return "VERSION_1_0";
        case WebCLConstants.FALSE:
            return "FALSE";
        case WebCLConstants.TRUE:
            return "TRUE";
        case WebCLConstants.PLATFORM_PROFILE:
            return "PLATFORM_PROFILE";
        case WebCLConstants.PLATFORM_VERSION:
            return "PLATFORM_VERSION";
        case WebCLConstants.PLATFORM_NAME:
            return "PLATFORM_NAME";
        case WebCLConstants.PLATFORM_VENDOR:
            return "PLATFORM_VENDOR";
        case WebCLConstants.PLATFORM_EXTENSIONS:
            return "PLATFORM_EXTENSIONS";
        case WebCLConstants.DEVICE_TYPE_DEFAULT:
            return "DEVICE_TYPE_DEFAULT";
        case WebCLConstants.DEVICE_TYPE_CPU:
            return "DEVICE_TYPE_CPU";
        case WebCLConstants.DEVICE_TYPE_GPU:
            return "DEVICE_TYPE_GPU";
        case WebCLConstants.DEVICE_TYPE_ACCELERATOR:
            return "DEVICE_TYPE_ACCELERATOR";
        case WebCLConstants.DEVICE_TYPE_DEBUG:
            return "DEVICE_TYPE_DEBUG";
        case WebCLConstants.DEVICE_TYPE_ALL:
            return "DEVICE_TYPE_ALL";
        case WebCLConstants.DEVICE_TYPE:
            return "DEVICE_TYPE";
        case WebCLConstants.DEVICE_VENDOR_ID:
            return "DEVICE_VENDOR_ID";
        case WebCLConstants.DEVICE_MAX_COMPUTE_UNITS:
            return "DEVICE_MAX_COMPUTE_UNITS";
        case WebCLConstants.DEVICE_MAX_WORK_ITEM_DIMENSIONS:
            return "DEVICE_MAX_WORK_ITEM_DIMENSIONS";
        case WebCLConstants.DEVICE_MAX_WORK_GROUP_SIZE:
            return "DEVICE_MAX_WORK_GROUP_SIZE";
        case WebCLConstants.DEVICE_MAX_WORK_ITEM_SIZES:
            return "DEVICE_MAX_WORK_ITEM_SIZES";
        case WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_CHAR:
            return "DEVICE_PREFERRED_VECTOR_WIDTH_CHAR";
        case WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_SHORT:
            return "DEVICE_PREFERRED_VECTOR_WIDTH_SHORT";
        case WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_INT:
            return "DEVICE_PREFERRED_VECTOR_WIDTH_INT";
        case WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_LONG:
            return "DEVICE_PREFERRED_VECTOR_WIDTH_LONG";
        case WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_FLOAT:
            return "DEVICE_PREFERRED_VECTOR_WIDTH_FLOAT";
        case WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_DOUBLE:
            return "DEVICE_PREFERRED_VECTOR_WIDTH_DOUBLE";
        case WebCLConstants.DEVICE_MAX_CLOCK_FREQUENCY:
            return "DEVICE_MAX_CLOCK_FREQUENCY";
        case WebCLConstants.DEVICE_ADDRESS_BITS:
            return "DEVICE_ADDRESS_BITS";
        case WebCLConstants.DEVICE_MAX_READ_IMAGE_ARGS:
            return "DEVICE_MAX_READ_IMAGE_ARGS";
        case WebCLConstants.DEVICE_MAX_WRITE_IMAGE_ARGS:
            return "DEVICE_MAX_WRITE_IMAGE_ARGS";
        case WebCLConstants.DEVICE_MAX_MEM_ALLOC_SIZE:
            return "DEVICE_MAX_MEM_ALLOC_SIZE";
        case WebCLConstants.DEVICE_IMAGE2D_MAX_WIDTH:
            return "DEVICE_IMAGE2D_MAX_WIDTH";
        case WebCLConstants.DEVICE_IMAGE2D_MAX_HEIGHT:
            return "DEVICE_IMAGE2D_MAX_HEIGHT";
        case WebCLConstants.DEVICE_IMAGE3D_MAX_WIDTH:
            return "DEVICE_IMAGE3D_MAX_WIDTH";
        case WebCLConstants.DEVICE_IMAGE3D_MAX_HEIGHT:
            return "DEVICE_IMAGE3D_MAX_HEIGHT";
        case WebCLConstants.DEVICE_IMAGE3D_MAX_DEPTH:
            return "DEVICE_IMAGE3D_MAX_DEPTH";
        case WebCLConstants.DEVICE_IMAGE_SUPPORT:
            return "DEVICE_IMAGE_SUPPORT";
        case WebCLConstants.DEVICE_MAX_PARAMETER_SIZE:
            return "DEVICE_MAX_PARAMETER_SIZE";
        case WebCLConstants.DEVICE_MAX_SAMPLERS:
            return "DEVICE_MAX_SAMPLERS";
        case WebCLConstants.DEVICE_MEM_BASE_ADDR_ALIGN:
            return "DEVICE_MEM_BASE_ADDR_ALIGN";
        case WebCLConstants.DEVICE_MIN_DATA_TYPE_ALIGN_SIZE:
            return "DEVICE_MIN_DATA_TYPE_ALIGN_SIZE";
        case WebCLConstants.DEVICE_SINGLE_FP_CONFIG:
            return "DEVICE_SINGLE_FP_CONFIG";
        case WebCLConstants.DEVICE_GLOBAL_MEM_CACHE_TYPE:
            return "DEVICE_GLOBAL_MEM_CACHE_TYPE";
        case WebCLConstants.DEVICE_GLOBAL_MEM_CACHELINE_SIZE:
            return "DEVICE_GLOBAL_MEM_CACHELINE_SIZE";
        case WebCLConstants.DEVICE_GLOBAL_MEM_CACHE_SIZE:
            return "DEVICE_GLOBAL_MEM_CACHE_SIZE";
        case WebCLConstants.DEVICE_GLOBAL_MEM_SIZE:
            return "DEVICE_GLOBAL_MEM_SIZE";
        case WebCLConstants.DEVICE_MAX_CONSTANT_BUFFER_SIZE:
            return "DEVICE_MAX_CONSTANT_BUFFER_SIZE";
        case WebCLConstants.DEVICE_MAX_CONSTANT_ARGS:
            return "DEVICE_MAX_CONSTANT_ARGS";
        case WebCLConstants.DEVICE_LOCAL_MEM_TYPE:
            return "DEVICE_LOCAL_MEM_TYPE";
        case WebCLConstants.DEVICE_LOCAL_MEM_SIZE:
            return "DEVICE_LOCAL_MEM_SIZE";
        case WebCLConstants.DEVICE_ERROR_CORRECTION_SUPPORT:
            return "DEVICE_ERROR_CORRECTION_SUPPORT";
        case WebCLConstants.DEVICE_PROFILING_TIMER_RESOLUTION:
            return "DEVICE_PROFILING_TIMER_RESOLUTION";
        case WebCLConstants.DEVICE_ENDIAN_LITTLE:
            return "DEVICE_ENDIAN_LITTLE";
        case WebCLConstants.DEVICE_AVAILABLE:
            return "DEVICE_AVAILABLE";
        case WebCLConstants.DEVICE_COMPILER_AVAILABLE:
            return "DEVICE_COMPILER_AVAILABLE";
        case WebCLConstants.DEVICE_EXECUTION_CAPABILITIES:
            return "DEVICE_EXECUTION_CAPABILITIES";
        case WebCLConstants.DEVICE_QUEUE_PROPERTIES:
            return "DEVICE_QUEUE_PROPERTIES";
        case WebCLConstants.DEVICE_NAME:
            return "DEVICE_NAME";
        case WebCLConstants.DEVICE_VENDOR:
            return "DEVICE_VENDOR";
        case WebCLConstants.DRIVER_VERSION:
            return "DRIVER_VERSION";
        case WebCLConstants.DEVICE_PROFILE:
            return "DEVICE_PROFILE";
        case WebCLConstants.DEVICE_VERSION:
            return "DEVICE_VERSION";
        case WebCLConstants.DEVICE_EXTENSIONS:
            return "DEVICE_EXTENSIONS";
        case WebCLConstants.DEVICE_PLATFORM:
            return "DEVICE_PLATFORM";
        case WebCLConstants.DEVICE_DOUBLE_FP_CONFIG:
            return "DEVICE_DOUBLE_FP_CONFIG";
        case WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_HALF:
            return "DEVICE_PREFERRED_VECTOR_WIDTH_HALF";
        case WebCLConstants.DEVICE_HOST_UNIFIED_MEMORY:
            return "DEVICE_HOST_UNIFIED_MEMORY";
        case WebCLConstants.DEVICE_NATIVE_VECTOR_WIDTH_CHAR:
            return "DEVICE_NATIVE_VECTOR_WIDTH_CHAR";
        case WebCLConstants.DEVICE_NATIVE_VECTOR_WIDTH_SHORT:
            return "DEVICE_NATIVE_VECTOR_WIDTH_SHORT";
        case WebCLConstants.DEVICE_NATIVE_VECTOR_WIDTH_INT:
            return "DEVICE_NATIVE_VECTOR_WIDTH_INT";
        case WebCLConstants.DEVICE_NATIVE_VECTOR_WIDTH_LONG:
            return "DEVICE_NATIVE_VECTOR_WIDTH_LONG";
        case WebCLConstants.DEVICE_NATIVE_VECTOR_WIDTH_FLOAT:
            return "DEVICE_NATIVE_VECTOR_WIDTH_FLOAT";
        case WebCLConstants.DEVICE_NATIVE_VECTOR_WIDTH_DOUBLE:
            return "DEVICE_NATIVE_VECTOR_WIDTH_DOUBLE";
        case WebCLConstants.DEVICE_NATIVE_VECTOR_WIDTH_HALF:
            return "DEVICE_NATIVE_VECTOR_WIDTH_HALF";
        case WebCLConstants.DEVICE_OPENCL_C_VERSION:
            return "DEVICE_OPENCL_C_VERSION";
        case WebCLConstants.DEVICE_LINKER_AVAILABLE:
            return "DEVICE_LINKER_AVAILABLE";
        case WebCLConstants.DEVICE_BUILT_IN_KERNELS:
            return "DEVICE_BUILT_IN_KERNELS";
        case WebCLConstants.DEVICE_IMAGE_MAX_BUFFER_SIZE:
            return "DEVICE_IMAGE_MAX_BUFFER_SIZE";
        case WebCLConstants.DEVICE_IMAGE_MAX_ARRAY_SIZE:
            return "DEVICE_IMAGE_MAX_ARRAY_SIZE";
        case WebCLConstants.DEVICE_PARENT_DEVICE:
            return "DEVICE_PARENT_DEVICE";
        case WebCLConstants.DEVICE_PARTITION_MAX_SUB_DEVICES:
            return "DEVICE_PARTITION_MAX_SUB_DEVICES";
        case WebCLConstants.DEVICE_PARTITION_PROPERTIES:
            return "DEVICE_PARTITION_PROPERTIES";
        case WebCLConstants.DEVICE_PARTITION_AFFINITY_DOMAIN:
            return "DEVICE_PARTITION_AFFINITY_DOMAIN";
        case WebCLConstants.DEVICE_PARTITION_TYPE:
            return "DEVICE_PARTITION_TYPE";
        case WebCLConstants.DEVICE_REFERENCE_COUNT:
            return "DEVICE_REFERENCE_COUNT";
        case WebCLConstants.DEVICE_PREFERRED_INTEROP_USER_SYNC:
            return "DEVICE_PREFERRED_INTEROP_USER_SYNC";
        case WebCLConstants.DEVICE_PRINTF_BUFFER_SIZE:
            return "DEVICE_PRINTF_BUFFER_SIZE";
        case WebCLConstants.DEVICE_IMAGE_PITCH_ALIGNMENT:
            return "DEVICE_IMAGE_PITCH_ALIGNMENT";
        case WebCLConstants.DEVICE_IMAGE_BASE_ADDRESS_ALIGNMENT:
            return "DEVICE_IMAGE_BASE_ADDRESS_ALIGNMENT";
        case WebCLConstants.DEVICE_ADDRESS_32_BITS:
            return "DEVICE_ADDRESS_32_BITS";
        case WebCLConstants.DEVICE_ADDRESS_64_BITS:
            return "DEVICE_ADDRESS_64_BITS";
        case WebCLConstants.FP_DENORM:
            return "FP_DENORM";
        case WebCLConstants.FP_INF_NAN:
            return "FP_INF_NAN";
        case WebCLConstants.FP_ROUND_TO_NEAREST:
            return "FP_ROUND_TO_NEAREST";
        case WebCLConstants.FP_ROUND_TO_ZERO:
            return "FP_ROUND_TO_ZERO";
        case WebCLConstants.FP_ROUND_TO_INF:
            return "FP_ROUND_TO_INF";
        case WebCLConstants.FP_FMA:
            return "FP_FMA";
        case WebCLConstants.NONE:
            return "NONE";
        case WebCLConstants.READ_ONLY_CACHE:
            return "READ_ONLY_CACHE";
        case WebCLConstants.READ_WRITE_CACHE:
            return "READ_WRITE_CACHE";
        case WebCLConstants.LOCAL:
            return "LOCAL";
        case WebCLConstants.GLOBAL:
            return "GLOBAL";
        case WebCLConstants.EXEC_KERNEL:
            return "EXEC_KERNEL";
        case WebCLConstants.EXEC_NATIVE_KERNEL:
            return "EXEC_NATIVE_KERNEL";
        case WebCLConstants.QUEUE_OUT_OF_ORDER_EXEC_MODE_ENABLE:
            return "QUEUE_OUT_OF_ORDER_EXEC_MODE_ENABLE";
        case WebCLConstants.QUEUE_PROFILING_ENABLE:
            return "QUEUE_PROFILING_ENABLE";
        case WebCLConstants.CONTEXT_REFERENCE_COUNT:
            return "CONTEXT_REFERENCE_COUNT";
        case WebCLConstants.CONTEXT_NUM_DEVICES:
            return "CONTEXT_NUM_DEVICES";
        case WebCLConstants.CONTEXT_DEVICES:
            return "CONTEXT_DEVICES";
        case WebCLConstants.CONTEXT_PROPERTIES:
            return "CONTEXT_PROPERTIES";
        case WebCLConstants.CONTEXT_PLATFORM:
            return "CONTEXT_PLATFORM";
        case WebCLConstants.QUEUE_CONTEXT:
            return "QUEUE_CONTEXT";
        case WebCLConstants.QUEUE_DEVICE:
            return "QUEUE_DEVICE";
        case WebCLConstants.QUEUE_REFERENCE_COUNT:
            return "QUEUE_REFERENCE_COUNT";
        case WebCLConstants.QUEUE_PROPERTIES:
            return "QUEUE_PROPERTIES";
        case WebCLConstants.MEM_READ_WRITE:
            return "MEM_READ_WRITE";
        case WebCLConstants.MEM_WRITE_ONLY:
            return "MEM_WRITE_ONLY";
        case WebCLConstants.MEM_READ_ONLY:
            return "MEM_READ_ONLY";
        case WebCLConstants.MEM_USE_HOST_PTR:
            return "MEM_USE_HOST_PTR";
        case WebCLConstants.MEM_ALLOC_HOST_PTR:
            return "MEM_ALLOC_HOST_PTR";
        case WebCLConstants.MEM_COPY_HOST_PTR:
            return "MEM_COPY_HOST_PTR";
        case WebCLConstants.R:
            return "R";
        case WebCLConstants.A:
            return "A";
        case WebCLConstants.RG:
            return "RG";
        case WebCLConstants.RA:
            return "RA";
        case WebCLConstants.RGB:
            return "RGB";
        case WebCLConstants.RGBA:
            return "RGBA";
        case WebCLConstants.BGRA:
            return "BGRA";
        case WebCLConstants.ARGB:
            return "ARGB";
        case WebCLConstants.INTENSITY:
            return "INTENSITY";
        case WebCLConstants.LUMINANCE:
            return "LUMINANCE";
        case WebCLConstants.SNORM_INT8:
            return "SNORM_INT8";
        case WebCLConstants.SNORM_INT16:
            return "SNORM_INT16";
        case WebCLConstants.UNORM_INT8:
            return "UNORM_INT8";
        case WebCLConstants.UNORM_INT16:
            return "UNORM_INT16";
        case WebCLConstants.UNORM_SHORT_565:
            return "UNORM_SHORT_565";
        case WebCLConstants.UNORM_SHORT_555:
            return "UNORM_SHORT_555";
        case WebCLConstants.UNORM_INT_101010:
            return "UNORM_INT_101010";
        case WebCLConstants.SIGNED_INT8:
            return "SIGNED_INT8";
        case WebCLConstants.SIGNED_INT16:
            return "SIGNED_INT16";
        case WebCLConstants.SIGNED_INT32:
            return "SIGNED_INT32";
        case WebCLConstants.UNSIGNED_INT8:
            return "UNSIGNED_INT8";
        case WebCLConstants.UNSIGNED_INT16:
            return "UNSIGNED_INT16";
        case WebCLConstants.UNSIGNED_INT32:
            return "UNSIGNED_INT32";
        case WebCLConstants.HALF_FLOAT:
            return "HALF_FLOAT";
        case WebCLConstants.FLOAT:
            return "FLOAT";
        case WebCLConstants.MEM_OBJECT_BUFFER:
            return "MEM_OBJECT_BUFFER";
        case WebCLConstants.MEM_OBJECT_IMAGE2D:
            return "MEM_OBJECT_IMAGE2D";
        case WebCLConstants.MEM_OBJECT_IMAGE3D:
            return "MEM_OBJECT_IMAGE3D";
        case WebCLConstants.MEM_TYPE:
            return "MEM_TYPE";
        case WebCLConstants.MEM_FLAGS:
            return "MEM_FLAGS";
        case WebCLConstants.MEM_SIZE:
            return "MEM_SIZE";
        case WebCLConstants.MEM_HOST_PTR:
            return "MEM_HOST_PTR";
        case WebCLConstants.MEM_MAP_COUNT:
            return "MEM_MAP_COUNT";
        case WebCLConstants.MEM_REFERENCE_COUNT:
            return "MEM_REFERENCE_COUNT";
        case WebCLConstants.MEM_CONTEXT:
            return "MEM_CONTEXT";
        case WebCLConstants.MEM_ASSOCIATED_MEMOBJECT:
            return "MEM_ASSOCIATED_MEMOBJECT";
        case WebCLConstants.MEM_OFFSET:
            return "MEM_OFFSET";
        case WebCLConstants.IMAGE_FORMAT:
            return "IMAGE_FORMAT";
        case WebCLConstants.IMAGE_ELEMENT_SIZE:
            return "IMAGE_ELEMENT_SIZE";
        case WebCLConstants.IMAGE_ROW_PITCH:
            return "IMAGE_ROW_PITCH";
        case WebCLConstants.IMAGE_SLICE_PITCH:
            return "IMAGE_SLICE_PITCH";
        case WebCLConstants.IMAGE_WIDTH:
            return "IMAGE_WIDTH";
        case WebCLConstants.IMAGE_HEIGHT:
            return "IMAGE_HEIGHT";
        case WebCLConstants.IMAGE_DEPTH:
            return "IMAGE_DEPTH";
        case WebCLConstants.ADDRESS_NONE:
            return "ADDRESS_NONE";
        case WebCLConstants.ADDRESS_CLAMP_TO_EDGE:
            return "ADDRESS_CLAMP_TO_EDGE";
        case WebCLConstants.ADDRESS_CLAMP:
            return "ADDRESS_CLAMP";
        case WebCLConstants.ADDRESS_REPEAT:
            return "ADDRESS_REPEAT";
        case WebCLConstants.FILTER_NEAREST:
            return "FILTER_NEAREST";
        case WebCLConstants.FILTER_LINEAR:
            return "FILTER_LINEAR";
        case WebCLConstants.SAMPLER_REFERENCE_COUNT:
            return "SAMPLER_REFERENCE_COUNT";
        case WebCLConstants.SAMPLER_CONTEXT:
            return "SAMPLER_CONTEXT";
        case WebCLConstants.SAMPLER_NORMALIZED_COORDS:
            return "SAMPLER_NORMALIZED_COORDS";
        case WebCLConstants.SAMPLER_ADDRESSING_MODE:
            return "SAMPLER_ADDRESSING_MODE";
        case WebCLConstants.SAMPLER_FILTER_MODE:
            return "SAMPLER_FILTER_MODE";
        case WebCLConstants.MAP_READ:
            return "MAP_READ";
        case WebCLConstants.MAP_WRITE:
            return "MAP_WRITE";
        case WebCLConstants.PROGRAM_REFERENCE_COUNT:
            return "PROGRAM_REFERENCE_COUNT";
        case WebCLConstants.PROGRAM_CONTEXT:
            return "PROGRAM_CONTEXT";
        case WebCLConstants.PROGRAM_NUM_DEVICES:
            return "PROGRAM_NUM_DEVICES";
        case WebCLConstants.PROGRAM_DEVICES:
            return "PROGRAM_DEVICES";
        case WebCLConstants.PROGRAM_SOURCE:
            return "PROGRAM_SOURCE";
        case WebCLConstants.PROGRAM_BINARY_SIZES:
            return "PROGRAM_BINARY_SIZES";
        case WebCLConstants.PROGRAM_BINARIES:
            return "PROGRAM_BINARIES";
        case WebCLConstants.PROGRAM_BUILD_STATUS:
            return "PROGRAM_BUILD_STATUS";
        case WebCLConstants.PROGRAM_BUILD_OPTIONS:
            return "PROGRAM_BUILD_OPTIONS";
        case WebCLConstants.PROGRAM_BUILD_LOG:
            return "PROGRAM_BUILD_LOG";
        case WebCLConstants.BUILD_SUCCESS:
            return "BUILD_SUCCESS";
        case WebCLConstants.BUILD_NONE:
            return "BUILD_NONE";
        case WebCLConstants.BUILD_ERROR:
            return "BUILD_ERROR";
        case WebCLConstants.BUILD_IN_PROGRESS:
            return "BUILD_IN_PROGRESS";
        case WebCLConstants.KERNEL_FUNCTION_NAME:
            return "KERNEL_FUNCTION_NAME";
        case WebCLConstants.KERNEL_NUM_ARGS:
            return "KERNEL_NUM_ARGS";
        case WebCLConstants.KERNEL_REFERENCE_COUNT:
            return "KERNEL_REFERENCE_COUNT";
        case WebCLConstants.KERNEL_CONTEXT:
            return "KERNEL_CONTEXT";
        case WebCLConstants.KERNEL_PROGRAM:
            return "KERNEL_PROGRAM";
        case WebCLConstants.KERNEL_WORK_GROUP_SIZE:
            return "KERNEL_WORK_GROUP_SIZE";
        case WebCLConstants.KERNEL_COMPILE_WORK_GROUP_SIZE:
            return "KERNEL_COMPILE_WORK_GROUP_SIZE";
        case WebCLConstants.KERNEL_LOCAL_MEM_SIZE:
            return "KERNEL_LOCAL_MEM_SIZE";
        case WebCLConstants.EVENT_COMMAND_QUEUE:
            return "EVENT_COMMAND_QUEUE";
        case WebCLConstants.EVENT_COMMAND_TYPE:
            return "EVENT_COMMAND_TYPE";
        case WebCLConstants.EVENT_REFERENCE_COUNT:
            return "EVENT_REFERENCE_COUNT";
        case WebCLConstants.EVENT_COMMAND_EXECUTION_STATUS:
            return "EVENT_COMMAND_EXECUTION_STATUS";
        case WebCLConstants.COMMAND_NDRANGE_KERNEL:
            return "COMMAND_NDRANGE_KERNEL";
        case WebCLConstants.COMMAND_TASK:
            return "COMMAND_TASK";
        case WebCLConstants.COMMAND_NATIVE_KERNEL:
            return "COMMAND_NATIVE_KERNEL";
        case WebCLConstants.COMMAND_READ_BUFFER:
            return "COMMAND_READ_BUFFER";
        case WebCLConstants.COMMAND_WRITE_BUFFER:
            return "COMMAND_WRITE_BUFFER";
        case WebCLConstants.COMMAND_COPY_BUFFER:
            return "COMMAND_COPY_BUFFER";
        case WebCLConstants.COMMAND_READ_IMAGE:
            return "COMMAND_READ_IMAGE";
        case WebCLConstants.COMMAND_WRITE_IMAGE:
            return "COMMAND_WRITE_IMAGE";
        case WebCLConstants.COMMAND_COPY_IMAGE:
            return "COMMAND_COPY_IMAGE";
        case WebCLConstants.COMMAND_COPY_IMAGE_TO_BUFFER:
            return "COMMAND_COPY_IMAGE_TO_BUFFER";
        case WebCLConstants.COMMAND_COPY_BUFFER_TO_IMAGE:
            return "COMMAND_COPY_BUFFER_TO_IMAGE";
        case WebCLConstants.COMMAND_MAP_BUFFER:
            return "COMMAND_MAP_BUFFER";
        case WebCLConstants.COMMAND_MAP_IMAGE:
            return "COMMAND_MAP_IMAGE";
        case WebCLConstants.COMMAND_UNMAP_MEM_OBJECT:
            return "COMMAND_UNMAP_MEM_OBJECT";
        case WebCLConstants.COMMAND_MARKER:
            return "COMMAND_MARKER";
        case WebCLConstants.COMMAND_WAIT_FOR_EVENTS:
            return "COMMAND_WAIT_FOR_EVENTS";
        case WebCLConstants.COMMAND_BARRIER:
            return "COMMAND_BARRIER";
        case WebCLConstants.COMMAND_ACQUIRE_GL_OBJECTS:
            return "COMMAND_ACQUIRE_GL_OBJECTS";
        case WebCLConstants.COMMAND_RELEASE_GL_OBJECTS:
            return "COMMAND_RELEASE_GL_OBJECTS";
        case WebCLConstants.COMPLETE:
            return "COMPLETE";
        case WebCLConstants.RUNNING:
            return "RUNNING";
        case WebCLConstants.SUBMITTED:
            return "SUBMITTED";
        case WebCLConstants.QUEUED:
            return "QUEUED";
        case WebCLConstants.PROFILING_COMMAND_QUEUED:
            return "PROFILING_COMMAND_QUEUED";
        case WebCLConstants.PROFILING_COMMAND_SUBMIT:
            return "PROFILING_COMMAND_SUBMIT";
        case WebCLConstants.PROFILING_COMMAND_START:
            return "PROFILING_COMMAND_START";
        case WebCLConstants.PROFILING_COMMAND_END:
            return "PROFILING_COMMAND_END";
        default:
            return undefined;
    }
}
exports.WebCLConstantStr = WebCLConstantStr;


/***/ }),

/***/ "./src/webclcontext.ts":
/*!*****************************!*\
  !*** ./src/webclcontext.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebCLContext = void 0;
var webclbuffer_1 = __webpack_require__(/*! ./webclbuffer */ "./src/webclbuffer.ts");
var webclcommandqueue_1 = __webpack_require__(/*! ./webclcommandqueue */ "./src/webclcommandqueue.ts");
var webclprogram_1 = __webpack_require__(/*! ./webclprogram */ "./src/webclprogram.ts");
var webclsampler_1 = __webpack_require__(/*! ./webclsampler */ "./src/webclsampler.ts");
var webclexception_1 = __webpack_require__(/*! ./webclexception */ "./src/webclexception.ts");
var webclconstants_1 = __webpack_require__(/*! ./webclconstants */ "./src/webclconstants.ts");
var webcluserevent_1 = __webpack_require__(/*! ./webcluserevent */ "./src/webcluserevent.ts");
var WebCLContext = /** @class */ (function () {
    function WebCLContext(wcl_platform, wcl_device) {
        this.wclPlatform = wcl_platform;
        this.wclDevice = wcl_device;
    }
    WebCLContext.prototype.createBuffer = function (memFlags, sizeInBytes, hostPtr) {
        if (memFlags != webclconstants_1.WebCLConstants.MEM_READ_WRITE && memFlags != webclconstants_1.WebCLConstants.MEM_WRITE_ONLY && memFlags != webclconstants_1.WebCLConstants.MEM_READ_ONLY) {
            throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLContext.createBuffer()");
        }
        if (sizeInBytes == 0 || sizeInBytes > this.wclDevice.getInfo(webclconstants_1.WebCLConstants.DEVICE_MAX_MEM_ALLOC_SIZE)) {
            throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_BUFFER_SIZE, "[INVALID_BUFFER_SIZE] WebCLContext.createBuffer()");
        }
        if (hostPtr != null && hostPtr.byteLength < sizeInBytes) {
            throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_HOST_PTR, "[INVALID_HOST_PTR] WebCLContext.createBuffer()");
        }
        return new webclbuffer_1.WebCLBuffer(this, memFlags, sizeInBytes, hostPtr);
    };
    WebCLContext.prototype.createCommandQueue = function (_, properties) {
        // Exceptions:
        // `INVALID_OPERATION` -- if this function is called from a WebCLCallback
        // `INVALID_DEVICE` -- if `device` is invalid or not associated with this context
        // `INVALID_VALUE` -- if values specified in `properties` are not valid
        // `INVALID_QUEUE_PROPERTIES` -- if values specified in `properties` are valid but not supported by the device
        return new webclcommandqueue_1.WebCLCommandQueue(this.wclDevice, properties);
    };
    WebCLContext.prototype.createImage = function (memFlags, descriptor, hostPtr) {
        memFlags;
        descriptor;
        hostPtr;
        // Exceptions:
        // `INVALID_VALUE` -- if `memFlags` is not`MEM_READ_WRITE`, `MEM_WRITE_ONLY`, or`MEM_READ_ONLY`
        // `INVALID_IMAGE_SIZE` -- if descriptor.width == 0 || descriptor.width > DEVICE_IMAGE2D_MAX_WIDTH
        // `INVALID_IMAGE_SIZE` -- if descriptor.height == 0 || descriptor.height > DEVICE_IMAGE2D_MAX_HEIGHT
        // `INVALID_IMAGE_SIZE` -- if hostPtr === null && descriptor.rowPitch !== 0
        // `INVALID_IMAGE_SIZE` -- if hostPtr !== null && descriptor.rowPitch > 0 && descriptor.rowPitch < descriptor.width * bytesPerPixel
        // `INVALID_HOST_PTR` -- if hostPtr.byteLength < descriptor.rowPitch * descriptor.height
        // `INVALID_IMAGE_FORMAT_DESCRIPTOR` -- if `descriptor.channelOrder` or `descriptor.channelType` is not valid
        // `IMAGE_FORMAT_NOT_SUPPORTED` -- if the given combination`channelOrder`, `channelType` and `memFlags` is not supported by this WebCLContext
        return null;
    };
    WebCLContext.prototype.createProgram = function (source) {
        // Exceptions:
        // `INVALID_VALUE` -- if `source` is `null` or empty
        return new webclprogram_1.WebCLProgram(this.wclPlatform, this.wclDevice, this, source);
    };
    WebCLContext.prototype.createSampler = function (normalizedCoords, addressingMode, filterMode) {
        normalizedCoords;
        addressingMode;
        filterMode;
        // Exceptions:
        // `INVALID_VALUE` -- if `addressingMode` is not`ADDRESS_CLAMP`, `ADDRESS_CLAMP_TO_EDGE`, `ADDRESS_REPEAT`, or`ADDRESS_MIRRORED_REPEAT`
        // `INVALID_VALUE` -- if `filterMode` is not `FILTER_NEAREST` or`FILTER_LINEAR`
        // `INVALID_VALUE` -- if `normalizedCoords` is `false` and `addressingMode` is `ADDRESS_REPEAT` or`ADDRESS_MIRRORED_REPEAT`
        return new webclsampler_1.WebCLSampler();
    };
    WebCLContext.prototype.createUserEvent = function () {
        return new webcluserevent_1.WebCLUserEvent();
    };
    WebCLContext.prototype.getInfo = function (name) {
        switch (name) {
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLContext.getInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
    };
    WebCLContext.prototype.getSupportedImageFormats = function (memFlags) {
        if (memFlags != null && memFlags != webclconstants_1.WebCLConstants.MEM_READ_WRITE && memFlags != webclconstants_1.WebCLConstants.MEM_WRITE_ONLY && memFlags != webclconstants_1.WebCLConstants.MEM_READ_ONLY) {
            throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLContext.getSupportedImageFormats(): unknown parameter '" + (memFlags) + "'");
        }
        return null;
    };
    WebCLContext.prototype.release = function () {
    };
    WebCLContext.prototype.releaseAll = function () {
    };
    return WebCLContext;
}());
exports.WebCLContext = WebCLContext;


/***/ }),

/***/ "./src/webcldevice.ts":
/*!****************************!*\
  !*** ./src/webcldevice.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebCLDevice = void 0;
var webclconstants_1 = __webpack_require__(/*! ./webclconstants */ "./src/webclconstants.ts");
var webclexception_1 = __webpack_require__(/*! ./webclexception */ "./src/webclexception.ts");
var WebCLDevice = /** @class */ (function () {
    function WebCLDevice(wcl_platform, wgpu_info, wgpu_device) {
        this.wclPlatform = wcl_platform;
        this.wgpuInfo = wgpu_info;
        this.wgpuDevice = wgpu_device;
    }
    WebCLDevice.prototype.fnv1a = function (str) {
        var hash = 2166136261; // FNV offset basis
        for (var i = 0; i < str.length; i++) {
            hash ^= str.charCodeAt(i);
            hash *= 16777619; // FNV prime
        }
        return hash >>> 0; // Ensure unsigned 32-bit integer
    };
    WebCLDevice.prototype.getInfo = function (name) {
        switch (name) {
            case webclconstants_1.WebCLConstants.DEVICE_TYPE:
                return webclconstants_1.WebCLConstants.DEVICE_TYPE_GPU;
            case webclconstants_1.WebCLConstants.DEVICE_VENDOR_ID:
                return this.fnv1a(this.wgpuInfo.vendor);
            case webclconstants_1.WebCLConstants.DEVICE_MAX_COMPUTE_UNITS:
                return this.wgpuDevice.limits.maxBindGroups;
            case webclconstants_1.WebCLConstants.DEVICE_MAX_WORK_ITEM_DIMENSIONS:
                return 3;
            case webclconstants_1.WebCLConstants.DEVICE_MAX_WORK_GROUP_SIZE:
                return this.wgpuDevice.limits.maxComputeInvocationsPerWorkgroup;
            case webclconstants_1.WebCLConstants.DEVICE_MAX_WORK_ITEM_SIZES:
                return [
                    this.wgpuDevice.limits.maxComputeWorkgroupSizeX,
                    this.wgpuDevice.limits.maxComputeWorkgroupSizeY,
                    this.wgpuDevice.limits.maxComputeWorkgroupSizeZ,
                ];
            case webclconstants_1.WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_CHAR:
                return 1;
            case webclconstants_1.WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_SHORT:
                return 1;
            case webclconstants_1.WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_INT:
                return 1;
            case webclconstants_1.WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_LONG:
                return 1;
            case webclconstants_1.WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_FLOAT:
                return 1;
            case webclconstants_1.WebCLConstants.DEVICE_MAX_CLOCK_FREQUENCY:
                return 0;
            case webclconstants_1.WebCLConstants.DEVICE_ADDRESS_BITS:
                return 32;
            case webclconstants_1.WebCLConstants.DEVICE_MAX_READ_IMAGE_ARGS:
                return 8;
            case webclconstants_1.WebCLConstants.DEVICE_MAX_WRITE_IMAGE_ARGS:
                return 1;
            case webclconstants_1.WebCLConstants.DEVICE_MAX_MEM_ALLOC_SIZE:
                return this.wgpuDevice.limits.maxBufferSize;
            case webclconstants_1.WebCLConstants.DEVICE_IMAGE2D_MAX_WIDTH:
                return this.wgpuDevice.limits.maxTextureDimension2D;
            case webclconstants_1.WebCLConstants.DEVICE_IMAGE2D_MAX_HEIGHT:
                return this.wgpuDevice.limits.maxTextureDimension2D;
            case webclconstants_1.WebCLConstants.DEVICE_IMAGE3D_MAX_WIDTH:
                return this.wgpuDevice.limits.maxTextureDimension3D;
            case webclconstants_1.WebCLConstants.DEVICE_IMAGE3D_MAX_HEIGHT:
                return this.wgpuDevice.limits.maxTextureDimension3D;
            case webclconstants_1.WebCLConstants.DEVICE_IMAGE3D_MAX_DEPTH:
                return this.wgpuDevice.limits.maxTextureDimension3D;
            case webclconstants_1.WebCLConstants.DEVICE_IMAGE_SUPPORT:
                return true;
            case webclconstants_1.WebCLConstants.DEVICE_MAX_PARAMETER_SIZE:
                return 256;
            case webclconstants_1.WebCLConstants.DEVICE_MAX_SAMPLERS:
                return 8;
            case webclconstants_1.WebCLConstants.DEVICE_MEM_BASE_ADDR_ALIGN:
                return 16 * 32;
            case webclconstants_1.WebCLConstants.DEVICE_SINGLE_FP_CONFIG:
                return 0;
            case webclconstants_1.WebCLConstants.DEVICE_GLOBAL_MEM_CACHE_TYPE:
                return webclconstants_1.WebCLConstants.READ_WRITE_CACHE;
            case webclconstants_1.WebCLConstants.DEVICE_GLOBAL_MEM_CACHELINE_SIZE:
                return 0;
            case webclconstants_1.WebCLConstants.DEVICE_GLOBAL_MEM_CACHE_SIZE:
                return 0;
            case webclconstants_1.WebCLConstants.DEVICE_GLOBAL_MEM_SIZE:
                return 1024 * 1024;
            case webclconstants_1.WebCLConstants.DEVICE_MAX_CONSTANT_BUFFER_SIZE:
                return 1024;
            case webclconstants_1.WebCLConstants.DEVICE_MAX_CONSTANT_ARGS:
                return 4;
            case webclconstants_1.WebCLConstants.DEVICE_LOCAL_MEM_TYPE:
                return webclconstants_1.WebCLConstants.LOCAL;
            case webclconstants_1.WebCLConstants.DEVICE_LOCAL_MEM_SIZE:
                return 1024;
            case webclconstants_1.WebCLConstants.DEVICE_ERROR_CORRECTION_SUPPORT:
                return false;
            case webclconstants_1.WebCLConstants.DEVICE_PROFILING_TIMER_RESOLUTION:
                return 0;
            case webclconstants_1.WebCLConstants.DEVICE_ENDIAN_LITTLE:
                return true;
            case webclconstants_1.WebCLConstants.DEVICE_AVAILABLE:
                return true;
            case webclconstants_1.WebCLConstants.DEVICE_COMPILER_AVAILABLE:
                return true;
            case webclconstants_1.WebCLConstants.DEVICE_EXECUTION_CAPABILITIES:
                return webclconstants_1.WebCLConstants.EXEC_KERNEL;
            case webclconstants_1.WebCLConstants.DEVICE_QUEUE_PROPERTIES:
                return 0;
            case webclconstants_1.WebCLConstants.DEVICE_NAME:
                return this.wgpuInfo.device;
            case webclconstants_1.WebCLConstants.DEVICE_VENDOR:
                return this.wgpuInfo.vendor;
            case webclconstants_1.WebCLConstants.DRIVER_VERSION:
                return "1.0";
            case webclconstants_1.WebCLConstants.DEVICE_PROFILE:
                return "WEBCL_PROFILE " + this.wgpuInfo.vendor;
            case webclconstants_1.WebCLConstants.DEVICE_VERSION:
                return "WEBCL 1.0 " + this.wgpuInfo.vendor;
            case webclconstants_1.WebCLConstants.DEVICE_EXTENSIONS:
                return this.getSupportedExtensions().join(" ");
            case webclconstants_1.WebCLConstants.DEVICE_PLATFORM:
                return this.wclPlatform;
            case webclconstants_1.WebCLConstants.DEVICE_HOST_UNIFIED_MEMORY:
                return false;
            case webclconstants_1.WebCLConstants.DEVICE_NATIVE_VECTOR_WIDTH_CHAR:
                return 1;
            case webclconstants_1.WebCLConstants.DEVICE_NATIVE_VECTOR_WIDTH_SHORT:
                return 1;
            case webclconstants_1.WebCLConstants.DEVICE_NATIVE_VECTOR_WIDTH_INT:
                return 1;
            case webclconstants_1.WebCLConstants.DEVICE_NATIVE_VECTOR_WIDTH_LONG:
                return 1;
            case webclconstants_1.WebCLConstants.DEVICE_NATIVE_VECTOR_WIDTH_FLOAT:
                return 1;
            case webclconstants_1.WebCLConstants.DEVICE_OPENCL_C_VERSION:
                return "WEBCL C 1.0 " + this.wgpuInfo.vendor;
            case webclconstants_1.WebCLConstants.DEVICE_PREFERRED_VECTOR_WIDTH_DOUBLE:
                return 0;
            case webclconstants_1.WebCLConstants.DEVICE_MIN_DATA_TYPE_ALIGN_SIZE:
                return 0;
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLDevice.getInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
    };
    WebCLDevice.prototype.getSupportedExtensions = function () {
        return this.wclPlatform.getSupportedExtensions();
    };
    WebCLDevice.prototype.enableExtension = function (extensionName) {
        return this.wclPlatform.enableExtension(extensionName);
    };
    return WebCLDevice;
}());
exports.WebCLDevice = WebCLDevice;


/***/ }),

/***/ "./src/webclevent.ts":
/*!***************************!*\
  !*** ./src/webclevent.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebCLEvent = void 0;
var webclconstants_1 = __webpack_require__(/*! ./webclconstants */ "./src/webclconstants.ts");
var webclexception_1 = __webpack_require__(/*! ./webclexception */ "./src/webclexception.ts");
var WebCLEvent = /** @class */ (function () {
    function WebCLEvent() {
    }
    WebCLEvent.prototype.getInfo = function (name) {
        switch (name) {
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLEvent.getInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
    };
    WebCLEvent.prototype.getProfilingInfo = function (name) {
        switch (name) {
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLEvent.getProfilingInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
        return 0;
    };
    WebCLEvent.prototype.setCallback = function (commandExecCallbackType, notify) {
        commandExecCallbackType;
        notify;
    };
    WebCLEvent.prototype.release = function () {
    };
    return WebCLEvent;
}());
exports.WebCLEvent = WebCLEvent;


/***/ }),

/***/ "./src/webclexception.ts":
/*!*******************************!*\
  !*** ./src/webclexception.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebCLException = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var WebCLException = /** @class */ (function (_super) {
    tslib_1.__extends(WebCLException, _super);
    function WebCLException(id, message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.id = id;
        _this.name = _this.constructor.name;
        // Restore prototype chain
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return WebCLException;
}(Error));
exports.WebCLException = WebCLException;


/***/ }),

/***/ "./src/webclimage.ts":
/*!***************************!*\
  !*** ./src/webclimage.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebCLImage = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var webclimagedescriptor_1 = __webpack_require__(/*! ./webclimagedescriptor */ "./src/webclimagedescriptor.ts");
var webclmemoryobject_1 = __webpack_require__(/*! ./webclmemoryobject */ "./src/webclmemoryobject.ts");
var WebCLImage = /** @class */ (function (_super) {
    tslib_1.__extends(WebCLImage, _super);
    function WebCLImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebCLImage.prototype.getInfo = function () {
        return new webclimagedescriptor_1.WebCLImageDescriptor();
    };
    return WebCLImage;
}(webclmemoryobject_1.WebCLMemoryObject));
exports.WebCLImage = WebCLImage;


/***/ }),

/***/ "./src/webclimagedescriptor.ts":
/*!*************************************!*\
  !*** ./src/webclimagedescriptor.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebCLImageDescriptor = void 0;
var WebCLImageDescriptor = /** @class */ (function () {
    function WebCLImageDescriptor() {
    }
    return WebCLImageDescriptor;
}());
exports.WebCLImageDescriptor = WebCLImageDescriptor;


/***/ }),

/***/ "./src/webclkernel.ts":
/*!****************************!*\
  !*** ./src/webclkernel.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebCLKernel = void 0;
var webclconstants_1 = __webpack_require__(/*! ./webclconstants */ "./src/webclconstants.ts");
var webclexception_1 = __webpack_require__(/*! ./webclexception */ "./src/webclexception.ts");
var WebCLKernel = /** @class */ (function () {
    function WebCLKernel(wcl_device, wcl_context, wcl_program, kernel_name, kernel_sig, kernel_body) {
        this.kernelSig = kernel_sig;
        this.kernelName = kernel_name;
        this.kernelBody = kernel_body;
        this.wclContext = wcl_context;
        this.wclDevice = wcl_device;
        this.wclProgram = wcl_program;
    }
    WebCLKernel.prototype.getInfo = function (name) {
        switch (name) {
            case webclconstants_1.WebCLConstants.KERNEL_FUNCTION_SIG:
                return this.kernelSig;
            case webclconstants_1.WebCLConstants.KERNEL_FUNCTION_NAME:
                return this.kernelName;
            case webclconstants_1.WebCLConstants.KERNEL_NUM_ARGS:
                return this.kernelSig.length;
            case webclconstants_1.WebCLConstants.KERNEL_CONTEXT:
                return this.wclContext;
            case webclconstants_1.WebCLConstants.KERNEL_PROGRAM:
                return this.wclProgram;
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLKernel.getInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
    };
    WebCLKernel.prototype.getWorkGroupInfo = function (_, name) {
        switch (name) {
            case webclconstants_1.WebCLConstants.KERNEL_WORK_GROUP_SIZE:
                return this.wclDevice.getInfo(webclconstants_1.WebCLConstants.DEVICE_MAX_WORK_GROUP_SIZE);
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLKernel.getWorkGroupInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
    };
    WebCLKernel.prototype.getArgInfo = function (index) {
        if (index < 0 || index >= this.kernelSig.length) {
            throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_ARG_INDEX, "[INVALID_ARG_INDEX] WebCLKernel.getArgInfo(): invalid index '" + index + "'");
        }
        return this.kernelSig[index];
    };
    WebCLKernel.prototype.setArg = function (index, arg) {
        index;
        arg;
    };
    WebCLKernel.prototype.release = function () { };
    return WebCLKernel;
}());
exports.WebCLKernel = WebCLKernel;


/***/ }),

/***/ "./src/webclkernelarginfo.ts":
/*!***********************************!*\
  !*** ./src/webclkernelarginfo.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebCLKernelArgInfo = void 0;
var WebCLKernelArgInfo = /** @class */ (function () {
    function WebCLKernelArgInfo() {
    }
    return WebCLKernelArgInfo;
}());
exports.WebCLKernelArgInfo = WebCLKernelArgInfo;


/***/ }),

/***/ "./src/webclmemoryobject.ts":
/*!**********************************!*\
  !*** ./src/webclmemoryobject.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebCLMemoryObject = void 0;
var webclconstants_1 = __webpack_require__(/*! ./webclconstants */ "./src/webclconstants.ts");
var webclexception_1 = __webpack_require__(/*! ./webclexception */ "./src/webclexception.ts");
var WebCLMemoryObject = /** @class */ (function () {
    function WebCLMemoryObject(wcl_context, memory_type, memory_flags, memory_size, memory_offset, memory_object) {
        this.wclContext = wcl_context;
        this.memoryType = memory_type;
        this.memoryFlags = memory_flags;
        this.memorySize = memory_size;
        this.memoryOffset = memory_offset;
        this.wclBuffer = memory_object;
    }
    WebCLMemoryObject.prototype.getInfo = function (name) {
        switch (name) {
            case webclconstants_1.WebCLConstants.MEM_TYPE:
                return this.memoryType;
            case webclconstants_1.WebCLConstants.MEM_FLAGS:
                return this.memoryFlags;
            case webclconstants_1.WebCLConstants.MEM_SIZE:
                return this.memorySize;
            case webclconstants_1.WebCLConstants.MEM_CONTEXT:
                return this.wclContext;
            case webclconstants_1.WebCLConstants.MEM_ASSOCIATED_MEMOBJECT:
                return this.wclBuffer;
            case webclconstants_1.WebCLConstants.MEM_OFFSET:
                return this.memoryOffset;
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLMemoryObject.getInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
    };
    WebCLMemoryObject.prototype.release = function () { };
    return WebCLMemoryObject;
}());
exports.WebCLMemoryObject = WebCLMemoryObject;


/***/ }),

/***/ "./src/webclplatform.ts":
/*!******************************!*\
  !*** ./src/webclplatform.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebCLPlatform = void 0;
var webclconstants_1 = __webpack_require__(/*! ./webclconstants */ "./src/webclconstants.ts");
var webcldevice_1 = __webpack_require__(/*! ./webcldevice */ "./src/webcldevice.ts");
var webclexception_1 = __webpack_require__(/*! ./webclexception */ "./src/webclexception.ts");
var WebCLPlatform = /** @class */ (function () {
    function WebCLPlatform(wgpu_info, wgpu_device) {
        this.wgpuInfo = wgpu_info;
        this.wclDevice = new webcldevice_1.WebCLDevice(this, wgpu_info, wgpu_device);
    }
    WebCLPlatform.prototype.getInfo = function (name) {
        switch (name) {
            case webclconstants_1.WebCLConstants.PLATFORM_PROFILE:
                return "WEBCL_PROFILE " + this.wgpuInfo.vendor;
            case webclconstants_1.WebCLConstants.PLATFORM_VERSION:
                return "WebCL 1.0 " + this.wgpuInfo.vendor;
            case webclconstants_1.WebCLConstants.PLATFORM_NAME:
                return this.wgpuInfo.vendor;
            case webclconstants_1.WebCLConstants.PLATFORM_VENDOR:
                return this.wgpuInfo.vendor;
            case webclconstants_1.WebCLConstants.PLATFORM_EXTENSIONS:
                return this.getSupportedExtensions().join(" ");
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLPlatform.getInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
    };
    WebCLPlatform.prototype.getDevices = function (deviceType) {
        if (this.wclDevice == null) {
            throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.DEVICE_NOT_FOUND, "[DEVICE_NOT_FOUND] WebCLPlatform.getDevices(): Device not found");
        }
        else if (deviceType != null && deviceType != webclconstants_1.WebCLConstants.DEVICE_TYPE_CPU &&
            deviceType != webclconstants_1.WebCLConstants.DEVICE_TYPE_GPU &&
            deviceType != webclconstants_1.WebCLConstants.DEVICE_TYPE_ACCELERATOR &&
            deviceType != webclconstants_1.WebCLConstants.DEVICE_TYPE_DEFAULT &&
            deviceType != webclconstants_1.WebCLConstants.DEVICE_TYPE_ALL) {
            throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLPlatform.getDevices(): unknown deviceType '" + deviceType + "'");
        }
        return [this.wclDevice];
    };
    WebCLPlatform.prototype.getSupportedExtensions = function () {
        return ["KHR_gl_sharing", "KHR_fp16"];
    };
    WebCLPlatform.prototype.enableExtension = function (extensionName) {
        return this.getSupportedExtensions().includes(extensionName);
    };
    return WebCLPlatform;
}());
exports.WebCLPlatform = WebCLPlatform;


/***/ }),

/***/ "./src/webclprogram.ts":
/*!*****************************!*\
  !*** ./src/webclprogram.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebCLProgram = void 0;
var webclkernel_1 = __webpack_require__(/*! ./webclkernel */ "./src/webclkernel.ts");
var webclexception_1 = __webpack_require__(/*! ./webclexception */ "./src/webclexception.ts");
var webclconstants_1 = __webpack_require__(/*! ./webclconstants */ "./src/webclconstants.ts");
var webclkernelarginfo_1 = __webpack_require__(/*! ./webclkernelarginfo */ "./src/webclkernelarginfo.ts");
var WebCLProgram = /** @class */ (function () {
    function WebCLProgram(wcl_platform, wcl_device, wcl_context, source) {
        this.kernels = [];
        this.shaderError = null;
        this.shaderOptions = null;
        this.wclPlatform = wcl_platform;
        this.wclDevice = wcl_device;
        this.wclContext = wcl_context;
        this.source = source;
    }
    WebCLProgram.prototype.getInfo = function (name) {
        switch (name) {
            case webclconstants_1.WebCLConstants.PROGRAM_NUM_DEVICES:
                return this.wclPlatform.getDevices().length;
            case webclconstants_1.WebCLConstants.PROGRAM_DEVICES:
                return this.wclPlatform.getDevices();
            case webclconstants_1.WebCLConstants.PROGRAM_CONTEXT:
                return this.wclContext;
            case webclconstants_1.WebCLConstants.PROGRAM_SOURCE:
                return this.source;
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLProgram.getInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
    };
    WebCLProgram.prototype.getBuildInfo = function (device, name) {
        device;
        switch (name) {
            case webclconstants_1.WebCLConstants.PROGRAM_BUILD_STATUS:
                return this.shaderError == null ? webclconstants_1.WebCLConstants.SUCCESS : webclconstants_1.WebCLConstants.BUILD_PROGRAM_FAILURE;
            case webclconstants_1.WebCLConstants.PROGRAM_BUILD_OPTIONS:
                return this.shaderOptions;
            case webclconstants_1.WebCLConstants.PROGRAM_BUILD_LOG:
                return this.shaderError;
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLProgram.getBuildInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
    };
    WebCLProgram.prototype.build = function (_, options, whenFinished) {
        var _this = this;
        // Parsing the kernel to get signature information and name information
        this.parseKernel();
        this.shaderOptions = options;
        this.wclDevice.wgpuDevice.pushErrorScope("validation");
        // TODO: Need to do use the kernel source code transpose to webgpu
        this.wclShader = this.wclDevice.wgpuDevice.createShaderModule({
            code: "\n@group(0) @binding(0) var<storage, read_write> input : array<f32>;\n@group(0) @binding(1) var<storage, read_write> output : array<f32>;\n@group(0) @binding(2) var<storage, read_write> count : u32;\n\n@compute @workgroup_size(1)\nfn main(@builtin(global_invocation_id) get_global_id : vec3<u32>) {\nlet i = get_global_id.x;\n//if (i < count) {\n    output[i] = f32(i);//input[i] * input[i];\n//}\n}\n    ",
        });
        this.wclDevice.wgpuDevice.popErrorScope().then(function (error) {
            if (error) {
                _this.shaderError = error.message;
                if (whenFinished) {
                    whenFinished(webclconstants_1.WebCLConstants.BUILD_PROGRAM_FAILURE, null);
                }
            }
            else {
                if (whenFinished) {
                    whenFinished(webclconstants_1.WebCLConstants.SUCCESS, null);
                }
            }
        });
    };
    WebCLProgram.prototype.createKernel = function (kernelName) {
        var kernel = this.kernels.find(function (kernel) { return kernel.kernelName === kernelName; });
        if (kernel) {
            return kernel;
        }
        return null;
    };
    WebCLProgram.prototype.createKernelsInProgram = function () {
        return this.kernels;
    };
    WebCLProgram.prototype.release = function () { };
    WebCLProgram.prototype.parseType = function (str) {
        var _value = -1;
        // First ulong for the webcl validator
        if ((str.indexOf("ulong") >= 0) || (str.indexOf("unsigned long") >= 0)) {
            // \todo : long ????
            _value = 0x1304 /*WebCLConstants.UNSIGNED_LONG*/;
        }
        else if (str.indexOf("long") >= 0) {
            _value = 0x1303 /*WebCLConstants.SIGNED_LONG*/;
        }
        else if (str.indexOf("float") >= 0) {
            _value = webclconstants_1.WebCLConstants.FLOAT;
        }
        else if ((str.indexOf("uchar") >= 0) || (str.indexOf("unsigned char") >= 0)) {
            _value = webclconstants_1.WebCLConstants.UNSIGNED_INT8;
        }
        else if (str.indexOf("char") >= 0) {
            _value = webclconstants_1.WebCLConstants.SIGNED_INT8;
        }
        else if ((str.indexOf("ushort") >= 0) || (str.indexOf("unsigned short") >= 0)) {
            _value = webclconstants_1.WebCLConstants.UNSIGNED_INT16;
        }
        else if (str.indexOf("short") >= 0) {
            _value = webclconstants_1.WebCLConstants.SIGNED_INT16;
        }
        else if ((str.indexOf("uint") >= 0) || (str.indexOf("unsigned int") >= 0) || (str.indexOf("size_t") >= 0)) {
            _value = webclconstants_1.WebCLConstants.UNSIGNED_INT32;
        }
        else if ((str.indexOf("int") >= 0) || (str.indexOf("enum") >= 0)) {
            _value = webclconstants_1.WebCLConstants.SIGNED_INT32;
        }
        else if (str.indexOf("image3d_t") >= 0) {
            _value = 0x1302 /*WebCLConstants.IMAGE3D*/;
        }
        else if (str.indexOf("image2d_t") >= 0) {
            _value = 0x1301 /*WebCLConstants.IMAGE2D*/;
        }
        else if (str.indexOf("sampler_t") >= 0) {
            _value = 0x1300 /*WebCLConstants.SAMPLER*/;
        }
        return _value;
    };
    // Kernel parser
    WebCLProgram.prototype.parseKernel = function () {
        var _this = this;
        // Remove all comments ...
        var _mini_kernel_string = this.source.replace(/(?:((["'])(?:(?:\\\\)|\\\2|(?!\\\2)\\|(?!\2).|[\n\r])*\2)|(\/\*(?:(?!\*\/).|[\n\r])*\*\/)|(\/\/[^\n\r]*(?:[\n\r]+|$))|((?:=|:)\s*(?:\/(?:(?:(?!\\*\/).)|\\\\|\\\/|[^\\]\[(?:\\\\|\\\]|[^]])+\])+\/))|((?:\/(?:(?:(?!\\*\/).)|\\\\|\\\/|[^\\]\[(?:\\\\|\\\]|[^]])+\])+\/)[gimy]?\.(?:exec|test|match|search|replace|split)\()|(\.(?:exec|test|match|search|replace|split)\((?:\/(?:(?:(?!\\*\/).)|\\\\|\\\/|[^\\]\[(?:\\\\|\\\]|[^]])+\])+\/))|(<!--(?:(?!-->).)*-->))/g, "");
        var _depth = 0;
        var _bodypart = '';
        var _pattern = "kernel ";
        var _kernel = _mini_kernel_string.indexOf(_pattern);
        var _loop_1 = function () {
            _mini_kernel_string = _mini_kernel_string.substring(_kernel + _pattern.length);
            var open_bracket = _mini_kernel_string.indexOf("{");
            // Get a one line name + signature of the kernel
            var name_and_signature = _mini_kernel_string.substring(0, open_bracket);
            name_and_signature = name_and_signature.replace(/\n/g, " ");
            name_and_signature = name_and_signature.replace(/\r/g, " ");
            name_and_signature = name_and_signature.replace(/\s{2,}/g, " ");
            var regex = /(\w+)\s*\((.*)\)/;
            var match = regex.exec(name_and_signature);
            if (match) {
                // Parse the name
                var _namepart = match[1];
                _namepart = _namepart.replace(/\s{2,}/g, " ");
                // Parse the arguments
                var functionArgs = match[2];
                functionArgs = functionArgs.replace(/\s{2,}/g, " ");
                var _argspart_1 = [];
                functionArgs.split(",").forEach(function (arg) {
                    var elements = arg.split(" ");
                    var name = elements[elements.length - 1];
                    var info = new webclkernelarginfo_1.WebCLKernelArgInfo();
                    var type = _this.parseType(arg);
                    info.typeName = (0, webclconstants_1.WebCLConstantStr)(type);
                    if (arg.indexOf("*") >= 0) {
                        info.pointer = true;
                    }
                    else {
                        info.pointer = false;
                    }
                    info.name = name;
                    info.type = type;
                    _argspart_1.push(info);
                });
                // Parse the rest of the body
                _mini_kernel_string = _mini_kernel_string.substring(open_bracket);
                for (var i = 0; i < _mini_kernel_string.length; i++) {
                    var char = _mini_kernel_string[i];
                    if (char === '{') {
                        _depth++;
                    }
                    else if (char === '}') {
                        _depth--;
                    }
                    _bodypart += char;
                    if (_depth === 0) {
                        _bodypart = _bodypart.replace(/\s{2,}/g, " ");
                        this_1.kernels.push(new webclkernel_1.WebCLKernel(this_1.wclDevice, this_1.wclContext, this_1, _namepart, _argspart_1, _bodypart));
                        _bodypart = "";
                        break;
                    }
                }
            }
            // Search for another kernel
            _kernel = _mini_kernel_string.indexOf(_pattern);
        };
        var this_1 = this;
        while (_kernel != -1) {
            _loop_1();
        }
    };
    return WebCLProgram;
}());
exports.WebCLProgram = WebCLProgram;
// // Kernel parser
// cl_kernels_sig: { },
// // Structs Kernels parser
// cl_structs_sig: { },
// parseStruct: function(kernel_string, struct_name) {
//     // Experimental parse of Struct
//     // Search kernel function like 'struct_name { }' or '{ } struct_name'
//     // --------------------------------------------------------------------------------
//     // Step 1 : Search pattern struct_name { }
//     // Step 2 : if no result : Search pattern { } struct_name
//     // Step 3 : if no result : return
//     // Step 4 : split by ; // Num of variable of the structure  : int toto; float tata;
//     // Step 5 : split by , // Num of variable for each type     : float toto,tata,titi;
//     // Step 6 : Search pattern [num] // Array Variable          : float toto[4];
//     // Step 7 : Search type of the line
//     // Step 8 : if exist add type else search other struct
//     // --------------------------------------------------------------------------------
//     CL.cl_structs_sig[struct_name] = [];
//     // First search if is #define
//     var _re_define = new RegExp("#[\ ]*define[\ ]*" + struct_name + "[\ ]*[A-Za-z0-9_\s]*");
//     var _define = kernel_string.match(_re_define);
//     if (_define != null && _define.length == 1) {
//         // Get type of the line
//         var _str = _define[0];
//         var _type = CL.parseType(_str);
//         if (_type != -1) {
//             CL.cl_structs_sig[struct_name].push(_type);
//         } else {
//             var _lastSpace = _str.lastIndexOf(" ");
//             var _res = _str.substr(_lastSpace + 1, _str.length - _lastSpace);
//             CL.parseStruct(kernel_string, _res);
//         }
//         return;
//     }
//     // Second search if is typedef type name;
//     var _re_typedef = new RegExp("typedef[\ ]*[A-Za-z0-9_\s]*[\ ]*" + struct_name + "[\ ]*;");
//     var _typedef = kernel_string.match(_re_typedef);
//     if (_typedef != null && _typedef.length == 1) {
//         // Get type of the line
//         var _str = _typedef[0];
//         var _type = CL.parseType(_str);
//         if (_type != -1) {
//             CL.cl_structs_sig[struct_name].push(_type);
//         } else {
//             _str = _str.replace(/^\s+|\s+$/g, ""); // trim
//             var _firstSpace = _str.indexOf(" ");
//             var _lastSpace = _str.lastIndexOf(" ");
//             var _res = _str.substr(_firstSpace + 1, _lastSpace - _firstSpace - 1);
//             CL.parseStruct(kernel_string, _res);
//         }
//         return;
//     }
//     // search pattern : struct_name { } ;
//     var _re_before = new RegExp(struct_name + "[\ ]" + "\{([^}]+)\}");
//     // search pattern : { } struct_name;
//     var _re_after = new RegExp("\{([^}]+)\}" + "[\ ]" + struct_name);
//     var _res = kernel_string.match(_re_before);
//     var _contains_struct = "";
//     if (_res != null && _res.length == 2) {
//         _contains_struct = _res[1];
//     } else {
//         _res = kernel_string.match(_re_after);
//         if (_res != null && _res.length == 2) {
//             _contains_struct = _res[1];
//         } else {
//             #if CL_DEBUG
//             console.error("Unknow Structure '" + struct_name + "', not found inside the kernel ...");
//             #endif
//             return;
//         }
//     }
//     var _var = _contains_struct.split(";");
//     for (var i = 0; i < _var.length - 1; i++) {
//         // Need for unsigned int width, height;
//         var _subvar = _var[i].split(",");
//         // Get type of the line
//         var _type = CL.parseType(_var[i]);
//         // Need for float mu[4];
//         var _arrayNum = 0;
//         _res = _var[i].match(/[0-9]+/);
//         if (_res != null) _arrayNum = _res;
//         if (_type != -1) {
//             for (var j = 0; j < Math.max(_subvar.length, _arrayNum); j++) {
//                 CL.cl_structs_sig[struct_name].push(_type);
//             }
//         } else {
//             // Search name of the parameter
//             var _struct = _subvar[0].replace(/^\s+|\s+$/g, ""); // trim
//             var _name = "";
//             var _start = _struct.lastIndexOf(" ");
//             for (var j = _start - 1; j >= 0; j--) {
//                 var _chara = _struct.charAt(j);
//                 if (_chara == ' ' && _name.length > 0) {
//                     break;
//                 } else if (_chara != ' ') {
//                     _name = _chara + _name;
//                 }
//             }
//             // If struct is unknow search it
//             if (!(_name in CL.cl_structs_sig && CL.cl_structs_sig[_name].length > 0)) {
//                 CL.parseStruct(kernel_string, _name);
//             }
//             for (var j = 0; j < Math.max(_subvar.length, _arrayNum); j++) {
//                 CL.cl_structs_sig[struct_name] = CL.cl_structs_sig[struct_name].concat(CL.cl_structs_sig[_name]);
//             }
//         }
//     }
// },
// parseKernel: function(kernel_string) {
//     #if 0
//     console.info("Original Kernel String : ");
//     console.info("--------------------------------------------------------------------");
//     console.info(kernel_string);
//     console.info("--------------------------------------------------------------------");
//     #endif
//     // Experimental parse of Kernel
//     // ----------------------------
//     //
//     // /!\ The minify kernel could be use by the program but some trouble with line
//     // /!\ containing macro #define, for the moment only use the minify kernel for
//     // /!\ parsing __kernel and struct
//     //
//     // Search kernel function like __kernel ... NAME ( p1 , p2 , p3)
//     // --------------------------------------------------------------------------------
//     // Step 1 : Minimize kernel removing all the comment and \r \n \t and multispace
//     // Step 2 : Search pattern __kernel ... ( ... )
//     // Step 3 : For each kernel
//     // Step 3 . 1 : Search Open Brace
//     // Step 3 . 2 : Search Kernel Name
//     // Step 3 . 3 : Search Kernel Parameter
//     // Step 3 . 4 : Grab { name : [ param, ... ] }
//     // --------------------------------------------------------------------------------
//     // Remove all comments ...
//     var _mini_kernel_string = kernel_string.replace(/(?:((["'])(?:(?:\\\\)|\\\2|(?!\\\2)\\|(?!\2).|[\n\r])*\2)|(\/\*(?:(?!\*\/).|[\n\r])*\*\/)|(\/\/[^\n\r]*(?:[\n\r]+|$))|((?:=|:)\s*(?:\/(?:(?:(?!\\*\/).)|\\\\|\\\/|[^\\]\[(?:\\\\|\\\]|[^]])+\])+\/))|((?:\/(?:(?:(?!\\*\/).)|\\\\|\\\/|[^\\]\[(?:\\\\|\\\]|[^]])+\])+\/)[gimy]?\.(?:exec|test|match|search|replace|split)\()|(\.(?:exec|test|match|search|replace|split)\((?:\/(?:(?:(?!\\*\/).)|\\\\|\\\/|[^\\]\[(?:\\\\|\\\]|[^]])+\])+\/))|(<!--(?:(?!-->).)*-->))/g
//         , "");
//     // Remove all char \n \r \t ...
//     _mini_kernel_string = _mini_kernel_string.replace(/\n/g, " ");
//     _mini_kernel_string = _mini_kernel_string.replace(/\r/g, " ");
//     // Remove all the multispace
//     _mini_kernel_string = _mini_kernel_string.replace(/\s{2,}/g, " ");
//     // Search pattern : __kernel ... ( ... )
//     // var _matches = _mini_kernel_string.match(/__kernel[A-Za-z0-9_\s]+\(([^)]+)\)/g);
//     // if (_matches == null) {
//     //   console.error("/!\\ Not found kernel !!!");
//     //   return;
//     // }
//     // Search kernel (Pattern doesn't work with extra __attribute__)
//     var _matches = [];
//     var _found = 1;
//     var _stringKern = _mini_kernel_string;
//     var _security = 50;
//     // Search all the kernel
//     while (_found && _security) {
//         // Just in case no more than 50 loop
//         _security--;
//         var _pattern = "__kernel ";
//         var _kern = _stringKern.indexOf(_pattern);
//         if (_kern == -1) {
//             _pattern = " kernel ";
//             _kern = _stringKern.indexOf(" kernel ");
//             if (_kern == -1) {
//                 _pattern = "kernel ";
//                 _kern = _stringKern.indexOf("kernel ");
//                 if (_kern == -1) {
//                     _found = 0;
//                     continue;
//                 } else if (_kern != 0) {
//                     console.error("/!\\ Find word 'kernel' but is not a real kernel  .. (" + _kern + ")");
//                     _stringKern = _stringKern.substr(_kern + _pattern.length, _stringKern.length - _kern);
//                     continue;
//                 }
//             }
//         }
//         _stringKern = _stringKern.substr(_kern + _pattern.length, _stringKern.length - _kern);
//         var _brace = _stringKern.indexOf("{");
//         var _stringKern2 = _stringKern.substr(0, _brace);
//         var _braceOpen = _stringKern2.lastIndexOf("(");
//         var _braceClose = _stringKern2.lastIndexOf(")");
//         var _stringKern3 = _stringKern2.substr(0, _braceOpen).replace(/^\s+|\s+$/g, ""); // trim
//         var _space = _stringKern3.lastIndexOf(" ");
//         _stringKern2 = _stringKern2.substr(_space + 1, _braceClose);
//         // Add the kernel result like name_kernel(..., ... ,...)
//         _matches.push(_stringKern2);
//     }
//     // For each kernel ....
//     for (var i = 0; i < _matches.length; i++) {
//         // Search the open Brace
//         var _brace = _matches[i].lastIndexOf("(");
//         // Part before '('
//         var _first_part = _matches[i].substr(0, _brace);
//         _first_part = _first_part.replace(/^\s+|\s+$/g, ""); // trim
//         // Part after ')'
//         var _second_part = _matches[i].substr(_brace + 1, _matches[i].length - _brace - 2);
//         _second_part = _second_part.replace(/^\s+|\s+$/g, ""); // trim
//         // Search name part
//         var _name = _first_part.substr(_first_part.lastIndexOf(" ") + 1);
//         // If name already present reparse it may be is another test with not the same num of parameter ....
//         if (_name in CL.cl_kernels_sig) {
//             delete CL.cl_kernels_sig[_name]
//         }
//         // Search parameter part
//         var _param = [];
//         var _array = _second_part.split(",");
//         for (var j = 0; j < _array.length; j++) {
//             var _type = CL.parseType(_array[j]);
//             if (_array[j].indexOf("__local") >= 0) {
//                 _param.push(WebCLConstants.LOCAL);
//             } else if (_type == -1) {
//                 _array[j] = _array[j].replace(/^\s+|\s+$/g, "");
//                 _array[j] = _array[j].replace("*", "");
//                 var _start = _array[j].lastIndexOf(" ");
//                 if (_start != -1) {
//                     var _kernels_struct_name = "";
//                     // Search Parameter type Name
//                     for (var k = _start - 1; k >= 0; k--) {
//                         var _chara = _array[j].charAt(k);
//                         if (_chara == ' ' && _kernels_struct_name.length > 0) {
//                             break;
//                         } else if (_chara != ' ') {
//                             _kernels_struct_name = _chara + _kernels_struct_name;
//                         }
//                     }
//                     // Parse struct only if is not already inside the map
//                     if (!(_kernels_struct_name in CL.cl_structs_sig))
//                         CL.parseStruct(_mini_kernel_string, _kernels_struct_name);
//                     // Add the name of the struct inside the map of param kernel
//                     _param.push(_kernels_struct_name);
//                 } else {
//                     #if CL_DEBUG
//                     console.error("Unknow parameter type inside '" + _array[j] + "', can be a struct, use float by default ...");
//                     #endif
//                     _param.push(WebCLConstants.FLOAT);
//                 }
//             } else {
//                 _param.push(_type);
//             }
//         }
//         CL.cl_kernels_sig[_name] = _param;
//     }
//     #if 0
//     console.info("Mini Kernel String : ");
//     console.info("--------------------------------------------------------------------");
//     console.info(_mini_kernel_string);
//     console.info("--------------------------------------------------------------------");
//     #endif
//     #if 0
//     for (var name in CL.cl_kernels_sig) {
//         var _length = CL.cl_kernels_sig[name].length;
//         var _str = "";
//         for (var i = 0; i < _length; i++) {
//             var _type = CL.cl_kernels_sig[name][i];
//             _str += _type + "(" + CL.stringType(_type) + ")";
//             if (i < _length - 1) _str += ", ";
//         }
//         console.info("Kernel " + name + "(" + _length + ")");
//         console.info("\t" + _str);
//     }
//     for (var name in CL.cl_structs_sig) {
//         var _length = CL.cl_structs_sig[name].length;
//         var _str = "";
//         for (var i = 0; i < _length; i++) {
//             var _type = CL.cl_structs_sig[name][i];
//             _str += _type + "(" + CL.stringType(_type) + ")";
//             if (i < _length - 1) _str += ", ";
//         }
//         console.info("\n\tStruct " + name + "(" + _length + ")");
//         console.info("\t\t" + _str);
//     }
//     #endif
//     return _mini_kernel_string;
// },
// parseType: function(string) {
//     var _value = -1;
//     // First ulong for the webcl validator
//     if ((string.indexOf("ulong") >= 0) || (string.indexOf("unsigned long") >= 0)) {
//         // \todo : long ????
//         _value = 0x1304 /*WebCLConstants.UNSIGNED_LONG*/;
//     } else if (string.indexOf("long") >= 0) {
//         _value = 0x1303 /*WebCLConstants.SIGNED_LONG*/;
//     } else if (string.indexOf("float") >= 0) {
//         _value = WebCLConstants.FLOAT;
//     } else if ((string.indexOf("uchar") >= 0) || (string.indexOf("unsigned char") >= 0)) {
//         _value = WebCLConstants.UNSIGNED_INT8;
//     } else if (string.indexOf("char") >= 0) {
//         _value = WebCLConstants.SIGNED_INT8;
//     } else if ((string.indexOf("ushort") >= 0) || (string.indexOf("unsigned short") >= 0)) {
//         _value = WebCLConstants.UNSIGNED_INT16;
//     } else if (string.indexOf("short") >= 0) {
//         _value = WebCLConstants.SIGNED_INT16;
//     } else if ((string.indexOf("uint") >= 0) || (string.indexOf("unsigned int") >= 0) || (string.indexOf("size_t") >= 0)) {
//         _value = WebCLConstants.UNSIGNED_INT32;
//     } else if ((string.indexOf("int") >= 0) || (string.indexOf("enum") >= 0)) {
//         _value = WebCLConstants.SIGNED_INT32;
//     } else if (string.indexOf("image3d_t") >= 0) {
//         _value = 0x1302 /*WebCLConstants.IMAGE3D*/;
//     } else if (string.indexOf("image2d_t") >= 0) {
//         _value = 0x1301 /*WebCLConstants.IMAGE2D*/;
//     } else if (string.indexOf("sampler_t") >= 0) {
//         _value = 0x1300 /*WebCLConstants.SAMPLER*/;
//     }
//     return _value;
// },


/***/ }),

/***/ "./src/webclsampler.ts":
/*!*****************************!*\
  !*** ./src/webclsampler.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebCLSampler = void 0;
var webclconstants_1 = __webpack_require__(/*! ./webclconstants */ "./src/webclconstants.ts");
var webclexception_1 = __webpack_require__(/*! ./webclexception */ "./src/webclexception.ts");
var WebCLSampler = /** @class */ (function () {
    function WebCLSampler() {
    }
    WebCLSampler.prototype.getInfo = function (name) {
        switch (name) {
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLSampler.getInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
    };
    WebCLSampler.prototype.release = function () { };
    return WebCLSampler;
}());
exports.WebCLSampler = WebCLSampler;


/***/ }),

/***/ "./src/webcluserevent.ts":
/*!*******************************!*\
  !*** ./src/webcluserevent.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebCLUserEvent = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var webclevent_1 = __webpack_require__(/*! ./webclevent */ "./src/webclevent.ts");
var WebCLUserEvent = /** @class */ (function (_super) {
    tslib_1.__extends(WebCLUserEvent, _super);
    function WebCLUserEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebCLUserEvent.prototype.setStatus = function (executionStatus) {
        executionStatus;
    };
    return WebCLUserEvent;
}(webclevent_1.WebCLEvent));
exports.WebCLUserEvent = WebCLUserEvent;


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.webcl = exports.getPlatforms = exports.WebCL = exports.WebCLConstants = exports.WebCLUserEvent = exports.WebCLSampler = exports.WebCLProgram = exports.WebCLPlatform = exports.WebCLMemoryObject = exports.WebCLKernelArgInfo = exports.WebCLKernel = exports.WebCLImageDescriptor = exports.WebCLImage = exports.WebCLEvent = exports.WebCLException = exports.WebCLDevice = exports.WebCLContext = exports.WebCLCommandQueue = exports.WebCLBuffer = void 0;
// Export all the class WebCL
var webclbuffer_1 = __webpack_require__(/*! ./webclbuffer */ "./src/webclbuffer.ts");
Object.defineProperty(exports, "WebCLBuffer", ({ enumerable: true, get: function () { return webclbuffer_1.WebCLBuffer; } }));
var webclcommandqueue_1 = __webpack_require__(/*! ./webclcommandqueue */ "./src/webclcommandqueue.ts");
Object.defineProperty(exports, "WebCLCommandQueue", ({ enumerable: true, get: function () { return webclcommandqueue_1.WebCLCommandQueue; } }));
var webclcontext_1 = __webpack_require__(/*! ./webclcontext */ "./src/webclcontext.ts");
Object.defineProperty(exports, "WebCLContext", ({ enumerable: true, get: function () { return webclcontext_1.WebCLContext; } }));
var webcldevice_1 = __webpack_require__(/*! ./webcldevice */ "./src/webcldevice.ts");
Object.defineProperty(exports, "WebCLDevice", ({ enumerable: true, get: function () { return webcldevice_1.WebCLDevice; } }));
var webclexception_1 = __webpack_require__(/*! ./webclexception */ "./src/webclexception.ts");
Object.defineProperty(exports, "WebCLException", ({ enumerable: true, get: function () { return webclexception_1.WebCLException; } }));
var webclevent_1 = __webpack_require__(/*! ./webclevent */ "./src/webclevent.ts");
Object.defineProperty(exports, "WebCLEvent", ({ enumerable: true, get: function () { return webclevent_1.WebCLEvent; } }));
var webclimage_1 = __webpack_require__(/*! ./webclimage */ "./src/webclimage.ts");
Object.defineProperty(exports, "WebCLImage", ({ enumerable: true, get: function () { return webclimage_1.WebCLImage; } }));
var webclimagedescriptor_1 = __webpack_require__(/*! ./webclimagedescriptor */ "./src/webclimagedescriptor.ts");
Object.defineProperty(exports, "WebCLImageDescriptor", ({ enumerable: true, get: function () { return webclimagedescriptor_1.WebCLImageDescriptor; } }));
var webclkernel_1 = __webpack_require__(/*! ./webclkernel */ "./src/webclkernel.ts");
Object.defineProperty(exports, "WebCLKernel", ({ enumerable: true, get: function () { return webclkernel_1.WebCLKernel; } }));
var webclkernelarginfo_1 = __webpack_require__(/*! ./webclkernelarginfo */ "./src/webclkernelarginfo.ts");
Object.defineProperty(exports, "WebCLKernelArgInfo", ({ enumerable: true, get: function () { return webclkernelarginfo_1.WebCLKernelArgInfo; } }));
var webclmemoryobject_1 = __webpack_require__(/*! ./webclmemoryobject */ "./src/webclmemoryobject.ts");
Object.defineProperty(exports, "WebCLMemoryObject", ({ enumerable: true, get: function () { return webclmemoryobject_1.WebCLMemoryObject; } }));
var webclplatform_1 = __webpack_require__(/*! ./webclplatform */ "./src/webclplatform.ts");
Object.defineProperty(exports, "WebCLPlatform", ({ enumerable: true, get: function () { return webclplatform_1.WebCLPlatform; } }));
var webclprogram_1 = __webpack_require__(/*! ./webclprogram */ "./src/webclprogram.ts");
Object.defineProperty(exports, "WebCLProgram", ({ enumerable: true, get: function () { return webclprogram_1.WebCLProgram; } }));
var webclsampler_1 = __webpack_require__(/*! ./webclsampler */ "./src/webclsampler.ts");
Object.defineProperty(exports, "WebCLSampler", ({ enumerable: true, get: function () { return webclsampler_1.WebCLSampler; } }));
var webcluserevent_1 = __webpack_require__(/*! ./webcluserevent */ "./src/webcluserevent.ts");
Object.defineProperty(exports, "WebCLUserEvent", ({ enumerable: true, get: function () { return webcluserevent_1.WebCLUserEvent; } }));
var webclconstants_1 = __webpack_require__(/*! ./webclconstants */ "./src/webclconstants.ts");
Object.defineProperty(exports, "WebCLConstants", ({ enumerable: true, get: function () { return webclconstants_1.WebCLConstants; } }));
var webcl_1 = __webpack_require__(/*! ./webcl */ "./src/webcl.ts");
Object.defineProperty(exports, "WebCL", ({ enumerable: true, get: function () { return webcl_1.WebCL; } }));
// Make it accessible via navigator.webcl
var webcl_2 = __webpack_require__(/*! ./webcl */ "./src/webcl.ts");
// Get navigator.webcl.getPlatforms()
if (typeof navigator !== 'undefined') {
    navigator.webcl = webcl_2.WebCL;
}
// Get WebCL.getPlatforms()
exports.getPlatforms = webcl_2.WebCL.getPlatforms;
exports.webcl = webcl_2.WebCL;

})();

var __webpack_export_target__ = window;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFrRDtBQUF6QywrSEFBYztBQUN2Qiw4RkFBaUQ7QUFBeEMsK0hBQWM7QUFFdkIsbUVBQWdDO0FBQXZCLG9HQUFLO0FBRWQseUNBQXlDO0FBQ3pDLG1FQUFnQztBQVFoQyxxQ0FBcUM7QUFDckMsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLEVBQUU7SUFDbEMsU0FBUyxDQUFDLEtBQUssR0FBRyxhQUFLLENBQUM7Q0FDM0I7QUFFRCwyQkFBMkI7QUFDZCxvQkFBWSxHQUFHLGFBQUssQ0FBQyxZQUFZLENBQUM7QUFDbEMsYUFBSyxHQUFHLGFBQUssQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYmNsLy4vc3JjL3dlYmNsLnRzIiwid2VicGFjazovL3dlYmNsLy4vc3JjL3dlYmNsYnVmZmVyLnRzIiwid2VicGFjazovL3dlYmNsLy4vc3JjL3dlYmNsY29tbWFuZHF1ZXVlLnRzIiwid2VicGFjazovL3dlYmNsLy4vc3JjL3dlYmNsY29uc3RhbnRzLnRzIiwid2VicGFjazovL3dlYmNsLy4vc3JjL3dlYmNsY29udGV4dC50cyIsIndlYnBhY2s6Ly93ZWJjbC8uL3NyYy93ZWJjbGRldmljZS50cyIsIndlYnBhY2s6Ly93ZWJjbC8uL3NyYy93ZWJjbGV2ZW50LnRzIiwid2VicGFjazovL3dlYmNsLy4vc3JjL3dlYmNsZXhjZXB0aW9uLnRzIiwid2VicGFjazovL3dlYmNsLy4vc3JjL3dlYmNsaW1hZ2UudHMiLCJ3ZWJwYWNrOi8vd2ViY2wvLi9zcmMvd2ViY2xpbWFnZWRlc2NyaXB0b3IudHMiLCJ3ZWJwYWNrOi8vd2ViY2wvLi9zcmMvd2ViY2xrZXJuZWwudHMiLCJ3ZWJwYWNrOi8vd2ViY2wvLi9zcmMvd2ViY2xrZXJuZWxhcmdpbmZvLnRzIiwid2VicGFjazovL3dlYmNsLy4vc3JjL3dlYmNsbWVtb3J5b2JqZWN0LnRzIiwid2VicGFjazovL3dlYmNsLy4vc3JjL3dlYmNscGxhdGZvcm0udHMiLCJ3ZWJwYWNrOi8vd2ViY2wvLi9zcmMvd2ViY2xwcm9ncmFtLnRzIiwid2VicGFjazovL3dlYmNsLy4vc3JjL3dlYmNsc2FtcGxlci50cyIsIndlYnBhY2s6Ly93ZWJjbC8uL3NyYy93ZWJjbHVzZXJldmVudC50cyIsIndlYnBhY2s6Ly93ZWJjbC8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vd2ViY2wvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViY2wvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYmNsL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViY2wvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJjbC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cIkB3ZWJncHUvdHlwZXNcIiAvPlxuXG5pbXBvcnQgeyBDTGVudW0sIENMYm9vbGVhbiwgV2ViQ0xDYWxsYmFjayB9IGZyb20gJy4vd2ViY2x0eXBlJztcbmltcG9ydCB7IFdlYkNMQ29uc3RhbnRzIH0gZnJvbSAnLi93ZWJjbGNvbnN0YW50cyc7XG5pbXBvcnQgeyBXZWJDTFBsYXRmb3JtIH0gZnJvbSAnLi93ZWJjbHBsYXRmb3JtJztcbmltcG9ydCB7IFdlYkNMQ29udGV4dCB9IGZyb20gJy4vd2ViY2xjb250ZXh0JztcbmltcG9ydCB7IFdlYkNMRGV2aWNlIH0gZnJvbSAnLi93ZWJjbGRldmljZSc7XG5pbXBvcnQgeyBXZWJDTEV2ZW50IH0gZnJvbSAnLi93ZWJjbGV2ZW50JztcblxubGV0IHBsYXRmb3JtOiBXZWJDTFBsYXRmb3JtIHwgbnVsbCA9IG51bGw7XG5cbi8vIERlZmluZSB0aGUgV2ViQ0wgbmFtZXNwYWNlIHdpdGggY29uc3RhbnRzIGFuZCBmdW5jdGlvblxuZXhwb3J0IGNvbnN0IFdlYkNMID0ge1xuICAgIC4uLldlYkNMQ29uc3RhbnRzLFxuICAgIGFzeW5jIGluaXRpYWxpemUoY2FsbGJhY2s6IFdlYkNMQ2FsbGJhY2spOiBQcm9taXNlPENMYm9vbGVhbj4ge1xuICAgICAgICAvLyBDaGVjayB0byBlbnN1cmUgdGhlIHVzZXIgYWdlbnQgc3VwcG9ydHMgV2ViR1BVLlxuICAgICAgICBpZiAoIShcImdwdVwiIGluIG5hdmlnYXRvcikpIHtcbiAgICAgICAgICAgIHJlcG9ydEVycm9yKHsgbWVzc2FnZTogXCJVc2VyIGFnZW50IGRvZXNu4oCZdCBzdXBwb3J0IFdlYkdQVS5cIiB9KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwbGF0Zm9ybSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlcG9ydEVycm9yKHsgbWVzc2FnZTogXCJXZWJDTCBoYXMgYWxyZWFkeSBiZWVuIGluaXRpYWxpemVkLlwiIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVxdWVzdCBhbiBhZGFwdGVyLlxuICAgICAgICB2YXIgd2dwdV9wbGF0Zm9ybSA9IGF3YWl0IG5hdmlnYXRvci5ncHUucmVxdWVzdEFkYXB0ZXIoKTtcbiAgICAgICAgdmFyIHdncHVfaW5mbyA9IGF3YWl0IHdncHVfcGxhdGZvcm0ucmVxdWVzdEFkYXB0ZXJJbmZvKCk7XG4gICAgICAgIC8vIHJlcXVlc3RBZGFwdGVyIG1heSByZXNvbHZlIHdpdGggbnVsbCBpZiBubyBzdWl0YWJsZSBhZGFwdGVycyBhcmUgZm91bmQuXG4gICAgICAgIGlmICghd2dwdV9wbGF0Zm9ybSkge1xuICAgICAgICAgICAgcmVwb3J0RXJyb3IoeyBtZXNzYWdlOiBcIk5vIFdlYkdQVSBhZGFwdGVycyBmb3VuZC5cIiB9KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlcXVlc3QgYSBkZXZpY2UuXG4gICAgICAgIHZhciB3Z3B1X2RldmljZSA9IGF3YWl0IHdncHVfcGxhdGZvcm0ucmVxdWVzdERldmljZSgpO1xuICAgICAgICB3Z3B1X2RldmljZS5hZGRFdmVudExpc3RlbmVyKFwidW5jYXB0dXJlZGVycm9yXCIsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAvLyBSZS1zdXJmYWNlIHRoZSBlcnJvci5cbiAgICAgICAgICAgIHJlcG9ydEVycm9yKHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgQSBXZWJHUFUgZXJyb3Igd2FzIG5vdCBjYXB0dXJlZDogJHtldmVudC5tZXNzYWdlfX1gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2dwdV9kZXZpY2UubG9zdC50aGVuKChpbmZvOiB7IG1lc3NhZ2U6IGFueTsgcmVhc29uOiBzdHJpbmc7IH0pID0+IHtcbiAgICAgICAgICAgIHJlcG9ydEVycm9yKHsgbWVzc2FnZTogYFdlYkdQVSBkZXZpY2Ugd2FzIGxvc3Q6ICR7aW5mby5tZXNzYWdlfWAgfSk7XG4gICAgICAgICAgICB3Z3B1X2RldmljZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAoaW5mby5yZWFzb24gIT0gXCJkZXN0cm95ZWRcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZShjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBsYXRmb3JtID0gbmV3IFdlYkNMUGxhdGZvcm0od2dwdV9pbmZvLCB3Z3B1X2RldmljZSk7XG4gICAgICAgIGNhbGxiYWNrKFdlYkNMLlNVQ0NFU1MsIHVuZGVmaW5lZCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgZ2V0UGxhdGZvcm1zKCk6IFdlYkNMUGxhdGZvcm1bXSB7XG4gICAgICAgIGlmIChwbGF0Zm9ybSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gW3BsYXRmb3JtXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgfSxcbiAgICBjcmVhdGVDb250ZXh0KF86IFdlYkNMUGxhdGZvcm0gfCBXZWJDTERldmljZSB8IFdlYkNMRGV2aWNlW10gfCBDTGVudW0sIF9fPzogQ0xlbnVtKTogV2ViQ0xDb250ZXh0IHtcbiAgICAgICAgcmV0dXJuIG5ldyBXZWJDTENvbnRleHQocGxhdGZvcm0sIHBsYXRmb3JtLmdldERldmljZXMoKVswXSk7XG4gICAgfSxcbiAgICBnZXRTdXBwb3J0ZWRFeHRlbnNpb25zKCk6IHN0cmluZ1tdIHwgbnVsbCB7XG4gICAgICAgIGlmIChwbGF0Zm9ybSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcGxhdGZvcm0uZ2V0U3VwcG9ydGVkRXh0ZW5zaW9ucygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgZW5hYmxlRXh0ZW5zaW9uKGV4dGVuc2lvbk5hbWU6IHN0cmluZyk6IENMYm9vbGVhbiB7XG4gICAgICAgIGlmIChwbGF0Zm9ybSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcGxhdGZvcm0uZW5hYmxlRXh0ZW5zaW9uKGV4dGVuc2lvbk5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTsvLyBSZXBsYWNlIHdpdGggYWN0dWFsIGltcGxlbWVudGF0aW9uXG4gICAgfSxcbiAgICB3YWl0Rm9yRXZlbnRzKGV2ZW50V2FpdExpc3Q6IFdlYkNMRXZlbnRbXSwgd2hlbkZpbmlzaGVkPzogV2ViQ0xDYWxsYmFjayk6IHZvaWQge1xuICAgICAgICAvLyBJbXBsZW1lbnQgdGhlIGxvZ2ljIHRvIHdhaXQgZm9yIGV2ZW50c1xuICAgICAgICBldmVudFdhaXRMaXN0O1xuICAgICAgICB3aGVuRmluaXNoZWQ7XG4gICAgfSxcbiAgICByZWxlYXNlQWxsKCk6IHZvaWQge1xuICAgICAgICAvLyBJbXBsZW1lbnQgdGhlIGxvZ2ljIHRvIHJlbGVhc2UgYWxsIHJlc291cmNlc1xuICAgIH1cblxufTtcbiIsIlxuaW1wb3J0IHsgV2ViQ0xDb25zdGFudHMgfSBmcm9tICcuL3dlYmNsY29uc3RhbnRzJztcbmltcG9ydCB7IFdlYkNMQ29udGV4dCB9IGZyb20gJy4vd2ViY2xjb250ZXh0JztcbmltcG9ydCB7IFdlYkNMTWVtb3J5T2JqZWN0IH0gZnJvbSAnLi93ZWJjbG1lbW9yeW9iamVjdCc7XG5pbXBvcnQgeyBDTGVudW0sIENMdWludCB9IGZyb20gJy4vd2ViY2x0eXBlJztcblxuZXhwb3J0IGNsYXNzIFdlYkNMQnVmZmVyIGV4dGVuZHMgV2ViQ0xNZW1vcnlPYmplY3Qge1xuICAgIC8vIFdlYkdQVSBPYmplY3RzXG4gICAgd2dwdVJlYWRCdWZmZXI6IEdQVUJ1ZmZlcjtcbiAgICB3Z3B1V3JpdGVCdWZmZXI6IEdQVUJ1ZmZlcjtcblxuICAgIC8vIE9iamVjdHNcbiAgICBob3N0UHRyOiBBcnJheUJ1ZmZlclZpZXcgfCBudWxsO1xuXG4gICAgY29uc3RydWN0b3Iod2NsX2NvbnRleHQ6IFdlYkNMQ29udGV4dCwgbWVtX2ZsYWdzOiBDTGVudW0sIHNpemVfaW5fYnl0ZXM6IENMdWludCwgaG9zdF9wdHI6IEFycmF5QnVmZmVyVmlldyB8IG51bGwsIHBhcmVudF9idWZmZXI/OiBXZWJDTEJ1ZmZlciB8IG51bGwpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICB3Y2xfY29udGV4dCxcbiAgICAgICAgICAgIFdlYkNMQ29uc3RhbnRzLk1FTV9PQkpFQ1RfQlVGRkVSLFxuICAgICAgICAgICAgbWVtX2ZsYWdzLFxuICAgICAgICAgICAgc2l6ZV9pbl9ieXRlcyxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBwYXJlbnRfYnVmZmVyXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5ob3N0UHRyID0gaG9zdF9wdHI7XG4gICAgICAgIHRoaXMud2dwdVJlYWRCdWZmZXIgPSBudWxsOyAvLyBXZWJjbENvbW1hbmRRdWV1ZSBSZWFkL1dyaXRlIEJ1ZmZlciB3aWxsIGNyZWF0ZSB0aGUgd2ViZ3B1IGJ1ZmZlclxuICAgICAgICB0aGlzLndncHVXcml0ZUJ1ZmZlciA9IG51bGw7IC8vIFdlYmNsQ29tbWFuZFF1ZXVlIFJlYWQvV3JpdGUgQnVmZmVyIHdpbGwgY3JlYXRlIHRoZSB3ZWJncHUgYnVmZmVyXG4gICAgfVxuXG4gICAgY3JlYXRlU3ViQnVmZmVyKG1lbV9mbGFnczogQ0xlbnVtLCBvcmlnaW46IENMdWludCwgc2l6ZV9pbl9ieXRlczogQ0x1aW50KTogV2ViQ0xCdWZmZXIge1xuICAgICAgICBtZW1fZmxhZ3M7XG4gICAgICAgIG9yaWdpbjtcbiAgICAgICAgc2l6ZV9pbl9ieXRlcztcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgV2ViQ0xCdWZmZXIgfSBmcm9tIFwiLi93ZWJjbGJ1ZmZlclwiO1xuaW1wb3J0IHsgV2ViQ0xDb25zdGFudFN0ciwgV2ViQ0xDb25zdGFudHMgfSBmcm9tIFwiLi93ZWJjbGNvbnN0YW50c1wiO1xuaW1wb3J0IHsgV2ViQ0xFeGNlcHRpb24gfSBmcm9tIFwiLi93ZWJjbGV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgV2ViQ0xFdmVudCB9IGZyb20gXCIuL3dlYmNsZXZlbnRcIjtcbmltcG9ydCB7IFdlYkNMSW1hZ2UgfSBmcm9tIFwiLi93ZWJjbGltYWdlXCI7XG5pbXBvcnQgeyBXZWJDTEtlcm5lbCB9IGZyb20gXCIuL3dlYmNsa2VybmVsXCI7XG5pbXBvcnQgeyBDTGJvb2xlYW4sIENMZW51bSwgQ0x1aW50LCBXZWJDTENhbGxiYWNrLCBXZWJDTFR5cGVkQXJyYXkgfSBmcm9tIFwiLi93ZWJjbHR5cGVcIjtcbmltcG9ydCB7IFdlYkNMRGV2aWNlIH0gZnJvbSBcIi4vd2ViY2xkZXZpY2VcIjtcblxuZXhwb3J0IGNsYXNzIFdlYkNMQ29tbWFuZFF1ZXVlIHtcblxuICAgIC8vIFdlYkNMIE9iamVjdHNcbiAgICB3Y2xEZXZpY2U6IFdlYkNMRGV2aWNlO1xuXG4gICAgLy8gT2JqZWN0XG4gICAgcHJvcGVydGllczogQ0xlbnVtO1xuXG4gICAgY29uc3RydWN0b3Iod2NsX2RldmljZTogV2ViQ0xEZXZpY2UsIHByb3BlcnRpZXM/OiBDTGVudW0pIHtcbiAgICAgICAgdGhpcy53Y2xEZXZpY2UgPSB3Y2xfZGV2aWNlO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzXG4gICAgfVxuXG4gICAgY3JlYXRlQ29weVdpdGhTYW1lVHlwZShob3N0X3B0cjogV2ViQ0xUeXBlZEFycmF5LCBtYXBwZWRSYW5nZTogQXJyYXlCdWZmZXIpOiBXZWJDTFR5cGVkQXJyYXkge1xuICAgICAgICBsZXQgY29weTtcbiAgICAgICAgaWYgKGhvc3RfcHRyIGluc3RhbmNlb2YgSW50OEFycmF5KSB7XG4gICAgICAgICAgICBjb3B5ID0gbmV3IEludDhBcnJheShtYXBwZWRSYW5nZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaG9zdF9wdHIgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgICAgICBjb3B5ID0gbmV3IFVpbnQ4QXJyYXkobWFwcGVkUmFuZ2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGhvc3RfcHRyIGluc3RhbmNlb2YgSW50MTZBcnJheSkge1xuICAgICAgICAgICAgY29weSA9IG5ldyBJbnQxNkFycmF5KG1hcHBlZFJhbmdlKTtcbiAgICAgICAgfSBlbHNlIGlmIChob3N0X3B0ciBpbnN0YW5jZW9mIFVpbnQxNkFycmF5KSB7XG4gICAgICAgICAgICBjb3B5ID0gbmV3IFVpbnQxNkFycmF5KG1hcHBlZFJhbmdlKTtcbiAgICAgICAgfSBlbHNlIGlmIChob3N0X3B0ciBpbnN0YW5jZW9mIEludDMyQXJyYXkpIHtcbiAgICAgICAgICAgIGNvcHkgPSBuZXcgSW50MzJBcnJheShtYXBwZWRSYW5nZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaG9zdF9wdHIgaW5zdGFuY2VvZiBVaW50MzJBcnJheSkge1xuICAgICAgICAgICAgY29weSA9IG5ldyBVaW50MzJBcnJheShtYXBwZWRSYW5nZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaG9zdF9wdHIgaW5zdGFuY2VvZiBGbG9hdDMyQXJyYXkpIHtcbiAgICAgICAgICAgIGNvcHkgPSBuZXcgRmxvYXQzMkFycmF5KG1hcHBlZFJhbmdlKTtcbiAgICAgICAgfSBlbHNlIGlmIChob3N0X3B0ciBpbnN0YW5jZW9mIEZsb2F0NjRBcnJheSkge1xuICAgICAgICAgICAgY29weSA9IG5ldyBGbG9hdDY0QXJyYXkobWFwcGVkUmFuZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVW5rbm93biBvciB1bnN1cHBvcnRlZCB0eXBlXG4gICAgICAgICAgICB0aHJvdyBuZXcgV2ViQ0xFeGNlcHRpb24oV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9IT1NUX1BUUiwgXCJbSU5WQUxJRF9IT1NUX1BUUl0gV2ViQ0xDb21tYW5kUXVldWUuY3JlYXRlQ29weVdpdGhTYW1lVHlwZSgpXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3B5O1xuICAgIH1cblxuICAgIGVucXVldWVDb3B5QnVmZmVyKHNyY0J1ZmZlcjogV2ViQ0xCdWZmZXIsIGRzdEJ1ZmZlcjogV2ViQ0xCdWZmZXIsIHNyY09mZnNldDogQ0x1aW50LCBkc3RPZmZzZXQ6IENMdWludCwgbnVtQnl0ZXM6IENMdWludCwgZXZlbnRXYWl0TGlzdD86IEFycmF5PFdlYkNMRXZlbnQ+IHwgbnVsbCwgZXZlbnQ/OiBXZWJDTEV2ZW50IHwgbnVsbCk6IHZvaWQge1xuICAgICAgICBzcmNCdWZmZXI7XG4gICAgICAgIGRzdEJ1ZmZlcjtcbiAgICAgICAgc3JjT2Zmc2V0O1xuICAgICAgICBkc3RPZmZzZXQ7XG4gICAgICAgIG51bUJ5dGVzO1xuICAgICAgICBldmVudFdhaXRMaXN0O1xuICAgICAgICBldmVudDtcbiAgICB9XG4gICAgZW5xdWV1ZUNvcHlCdWZmZXJSZWN0KHNyY0J1ZmZlcjogV2ViQ0xCdWZmZXIsIGRzdEJ1ZmZlcjogV2ViQ0xCdWZmZXIsIHNyY09yaWdpbjogQXJyYXk8Q0x1aW50PiwgZHN0T3JpZ2luOiBBcnJheTxDTHVpbnQ+LCByZWdpb246IEFycmF5PENMdWludD4sIHNyY1Jvd1BpdGNoOiBDTHVpbnQsIHNyY1NsaWNlUGl0Y2g6IENMdWludCwgZHN0Um93UGl0Y2g6IENMdWludCwgZHN0U2xpY2VQaXRjaDogQ0x1aW50LCBldmVudFdhaXRMaXN0PzogQXJyYXk8V2ViQ0xFdmVudD4gfCBudWxsLCBldmVudD86IFdlYkNMRXZlbnQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIHNyY0J1ZmZlcjtcbiAgICAgICAgZHN0QnVmZmVyO1xuICAgICAgICBzcmNPcmlnaW47XG4gICAgICAgIGRzdE9yaWdpbjtcbiAgICAgICAgcmVnaW9uO1xuICAgICAgICBzcmNSb3dQaXRjaDtcbiAgICAgICAgc3JjU2xpY2VQaXRjaDtcbiAgICAgICAgZHN0Um93UGl0Y2g7XG4gICAgICAgIGRzdFNsaWNlUGl0Y2g7XG4gICAgICAgIGV2ZW50V2FpdExpc3Q7XG4gICAgICAgIGV2ZW50O1xuICAgIH1cbiAgICBlbnF1ZXVlQ29weUltYWdlKHNyY0ltYWdlOiBXZWJDTEltYWdlLCBkc3RJbWFnZTogV2ViQ0xJbWFnZSwgc3JjT3JpZ2luOiBBcnJheTxDTHVpbnQ+LCBkc3RPcmlnaW46IEFycmF5PENMdWludD4sIHJlZ2lvbjogQXJyYXk8Q0x1aW50PiwgZXZlbnRXYWl0TGlzdD86IEFycmF5PFdlYkNMRXZlbnQ+IHwgbnVsbCwgZXZlbnQ/OiBXZWJDTEV2ZW50IHwgbnVsbCk6IHZvaWQge1xuICAgICAgICBzcmNJbWFnZTtcbiAgICAgICAgZHN0SW1hZ2U7XG4gICAgICAgIHNyY09yaWdpbjtcbiAgICAgICAgZHN0T3JpZ2luO1xuICAgICAgICByZWdpb247XG4gICAgICAgIGV2ZW50V2FpdExpc3Q7XG4gICAgICAgIGV2ZW50O1xuICAgIH1cbiAgICBlbnF1ZXVlQ29weUltYWdlVG9CdWZmZXIoc3JjSW1hZ2U6IFdlYkNMSW1hZ2UsIGRzdEJ1ZmZlcjogV2ViQ0xCdWZmZXIsIHNyY09yaWdpbjogQXJyYXk8Q0x1aW50Piwgc3JjUmVnaW9uOiBBcnJheTxDTHVpbnQ+LCBkc3RPZmZzZXQ6IENMdWludCwgZXZlbnRXYWl0TGlzdD86IEFycmF5PFdlYkNMRXZlbnQ+IHwgbnVsbCwgZXZlbnQ/OiBXZWJDTEV2ZW50IHwgbnVsbCk6IHZvaWQge1xuICAgICAgICBzcmNJbWFnZTtcbiAgICAgICAgZHN0QnVmZmVyO1xuICAgICAgICBzcmNPcmlnaW47XG4gICAgICAgIHNyY1JlZ2lvbjtcbiAgICAgICAgZHN0T2Zmc2V0O1xuICAgICAgICBldmVudFdhaXRMaXN0O1xuICAgICAgICBldmVudDtcbiAgICB9XG4gICAgZW5xdWV1ZUNvcHlCdWZmZXJUb0ltYWdlKHNyY0J1ZmZlcjogV2ViQ0xCdWZmZXIsIGRzdEltYWdlOiBXZWJDTEltYWdlLCBzcmNPZmZzZXQ6IENMdWludCwgZHN0T3JpZ2luOiBBcnJheTxDTHVpbnQ+LCBkc3RSZWdpb246IEFycmF5PENMdWludD4sIGV2ZW50V2FpdExpc3Q/OiBBcnJheTxXZWJDTEV2ZW50PiB8IG51bGwsIGV2ZW50PzogV2ViQ0xFdmVudCB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgc3JjQnVmZmVyO1xuICAgICAgICBkc3RJbWFnZTtcbiAgICAgICAgc3JjT2Zmc2V0O1xuICAgICAgICBkc3RPcmlnaW47XG4gICAgICAgIGRzdFJlZ2lvbjtcbiAgICAgICAgZXZlbnRXYWl0TGlzdDtcbiAgICAgICAgZXZlbnQ7XG4gICAgfVxuICAgIGVucXVldWVSZWFkQnVmZmVyKGJ1ZmZlcjogV2ViQ0xCdWZmZXIsIGJsb2NraW5nUmVhZDogQ0xib29sZWFuLCBidWZmZXJPZmZzZXQ6IENMdWludCwgbnVtQnl0ZXM6IENMdWludCwgaG9zdFB0cjogV2ViQ0xUeXBlZEFycmF5LCBldmVudFdhaXRMaXN0PzogQXJyYXk8V2ViQ0xFdmVudD4gfCBudWxsLCBldmVudD86IFdlYkNMRXZlbnQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGJ1ZmZlcjtcbiAgICAgICAgYmxvY2tpbmdSZWFkO1xuICAgICAgICBidWZmZXJPZmZzZXQ7XG4gICAgICAgIG51bUJ5dGVzO1xuICAgICAgICBob3N0UHRyO1xuICAgICAgICBldmVudFdhaXRMaXN0O1xuICAgICAgICBldmVudDtcblxuICAgICAgICAvLyB0aGlzLndjbERldmljZS53Z3B1RGV2aWNlLnB1c2hFcnJvclNjb3BlKFwidmFsaWRhdGlvblwiKTtcbiAgICAgICAgLy8gaWYgKGJ1ZmZlci53Z3B1QnVmZmVyID09IG51bGwpIHtcbiAgICAgICAgLy8gICAgIGJ1ZmZlci53Z3B1QnVmZmVyID0gdGhpcy53Y2xEZXZpY2Uud2dwdURldmljZS5jcmVhdGVCdWZmZXIoe1xuICAgICAgICAvLyAgICAgICAgIHNpemU6IG51bUJ5dGVzICsgYnVmZmVyT2Zmc2V0LFxuICAgICAgICAvLyAgICAgICAgIHVzYWdlOiBHUFVCdWZmZXJVc2FnZS5TVE9SQUdFIHwgR1BVQnVmZmVyVXNhZ2UuQ09QWV9EU1QsXG4gICAgICAgIC8vICAgICAgICAgbWFwcGVkQXRDcmVhdGlvbjogYmxvY2tpbmdSZWFkLFxuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyAvLyBNYXAgdGhlIGJ1ZmZlciBmb3IgcmVhZGluZ1xuICAgICAgICAvLyBjb25zdCBtYXBwZWRSYW5nZSA9IGJ1ZmZlci53Z3B1QnVmZmVyLmdldE1hcHBlZFJhbmdlKCk7XG4gICAgICAgIC8vIC8vIENyZWF0ZSBhIFR5cGVkQXJyYXkgdmlldyBvZiB0aGUgbWFwcGVkIHJhbmdlXG4gICAgICAgIC8vIGNvbnN0IG1hcHBlZEFycmF5ID0gdGhpcy5jcmVhdGVDb3B5V2l0aFNhbWVUeXBlKGhvc3RQdHIsIG1hcHBlZFJhbmdlKTtcbiAgICAgICAgLy8gLy8gQ29weSB0aGUgZGF0YSBmcm9tIHRoZSBtYXBwZWQgYnVmZmVyIHRvIHRoZSBob3N0IHBvaW50ZXJcbiAgICAgICAgLy8gaG9zdFB0ci5zZXQobWFwcGVkQXJyYXkpO1xuXG4gICAgICAgIC8vIC8vIFVubWFwIHRoZSBidWZmZXJcbiAgICAgICAgLy8gYnVmZmVyLndncHVCdWZmZXIudW5tYXAoKTtcblxuICAgICAgICAvLyB0aGlzLndjbERldmljZS53Z3B1RGV2aWNlLnBvcEVycm9yU2NvcGUoKS50aGVuKChlcnJvcikgPT4ge1xuICAgICAgICAvLyAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIC8vICAgICAgICAgLy8gVGhlcmUgd2FzIGFuIGVycm9yIGNyZWF0aW5nIHRoZSBzYW1wbGVyLCBzbyBkaXNjYXJkIGl0LlxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgIC8vICAgICAgICAgICAgIGBBbiBlcnJvciBvY2N1cmVkIHdoaWxlIGNyZWF0aW5nIGlucHV0QnVmZmVyOiAke2Vycm9yLm1lc3NhZ2V9YFxuICAgICAgICAvLyAgICAgICAgICk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuXG4gICAgfVxuICAgIGVucXVldWVSZWFkQnVmZmVyUmVjdChidWZmZXI6IFdlYkNMQnVmZmVyLCBibG9ja2luZ1JlYWQ6IENMYm9vbGVhbiwgYnVmZmVyT3JpZ2luOiBBcnJheTxDTHVpbnQ+LCBob3N0T3JpZ2luOiBBcnJheTxDTHVpbnQ+LCByZWdpb246IEFycmF5PENMdWludD4sIGJ1ZmZlclJvd1BpdGNoOiBDTHVpbnQsIGJ1ZmZlclNsaWNlUGl0Y2g6IENMdWludCwgaG9zdFJvd1BpdGNoOiBDTHVpbnQsIGhvc3RTbGljZVBpdGNoOiBDTHVpbnQsIGhvc3RQdHI6IEFycmF5QnVmZmVyVmlldywgZXZlbnRXYWl0TGlzdD86IEFycmF5PFdlYkNMRXZlbnQ+IHwgbnVsbCwgZXZlbnQ/OiBXZWJDTEV2ZW50IHwgbnVsbCk6IHZvaWQge1xuICAgICAgICBidWZmZXI7XG4gICAgICAgIGJsb2NraW5nUmVhZDtcbiAgICAgICAgYnVmZmVyT3JpZ2luO1xuICAgICAgICBob3N0T3JpZ2luO1xuICAgICAgICByZWdpb247XG4gICAgICAgIGJ1ZmZlclJvd1BpdGNoO1xuICAgICAgICBidWZmZXJTbGljZVBpdGNoO1xuICAgICAgICBob3N0Um93UGl0Y2g7XG4gICAgICAgIGhvc3RTbGljZVBpdGNoO1xuICAgICAgICBob3N0UHRyO1xuICAgICAgICBldmVudFdhaXRMaXN0O1xuICAgICAgICBldmVudDtcbiAgICB9XG4gICAgZW5xdWV1ZVJlYWRJbWFnZShpbWFnZTogV2ViQ0xJbWFnZSwgYmxvY2tpbmdSZWFkOiBDTGJvb2xlYW4sIG9yaWdpbjogQXJyYXk8Q0x1aW50PiwgcmVnaW9uOiBBcnJheTxDTHVpbnQ+LCBob3N0Um93UGl0Y2g6IENMdWludCwgaG9zdFB0cjogQXJyYXlCdWZmZXJWaWV3LCBldmVudFdhaXRMaXN0PzogQXJyYXk8V2ViQ0xFdmVudD4gfCBudWxsLCBldmVudD86IFdlYkNMRXZlbnQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGltYWdlO1xuICAgICAgICBibG9ja2luZ1JlYWQ7XG4gICAgICAgIG9yaWdpbjtcbiAgICAgICAgcmVnaW9uO1xuICAgICAgICBob3N0Um93UGl0Y2g7XG4gICAgICAgIGhvc3RQdHI7XG4gICAgICAgIGV2ZW50V2FpdExpc3Q7XG4gICAgICAgIGV2ZW50O1xuICAgIH1cbiAgICBlbnF1ZXVlV3JpdGVCdWZmZXIoYnVmZmVyOiBXZWJDTEJ1ZmZlciwgYmxvY2tpbmdXcml0ZTogQ0xib29sZWFuLCBidWZmZXJPZmZzZXQ6IENMdWludCwgbnVtQnl0ZXM6IENMdWludCwgaG9zdFB0cjogV2ViQ0xUeXBlZEFycmF5LCBldmVudFdhaXRMaXN0PzogQXJyYXk8V2ViQ0xFdmVudD4gfCBudWxsLCBldmVudD86IFdlYkNMRXZlbnQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGJ1ZmZlcjtcbiAgICAgICAgYmxvY2tpbmdXcml0ZTtcbiAgICAgICAgYnVmZmVyT2Zmc2V0O1xuICAgICAgICBudW1CeXRlcztcbiAgICAgICAgaG9zdFB0cjtcbiAgICAgICAgZXZlbnRXYWl0TGlzdDtcbiAgICAgICAgZXZlbnQ7XG5cbiAgICAgICAgdGhpcy53Y2xEZXZpY2Uud2dwdURldmljZS5wdXNoRXJyb3JTY29wZShcInZhbGlkYXRpb25cIik7XG4gICAgICAgIGlmIChidWZmZXIud2dwdVdyaXRlQnVmZmVyID09IG51bGwpIHtcbiAgICAgICAgICAgIGJ1ZmZlci53Z3B1V3JpdGVCdWZmZXIgPSB0aGlzLndjbERldmljZS53Z3B1RGV2aWNlLmNyZWF0ZUJ1ZmZlcih7XG4gICAgICAgICAgICAgICAgc2l6ZTogbnVtQnl0ZXMgKyBidWZmZXJPZmZzZXQsXG4gICAgICAgICAgICAgICAgdXNhZ2U6IEdQVUJ1ZmZlclVzYWdlLlNUT1JBR0UgfCBHUFVCdWZmZXJVc2FnZS5DT1BZX1NSQyxcbiAgICAgICAgICAgICAgICBtYXBwZWRBdENyZWF0aW9uOiBibG9ja2luZ1dyaXRlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gR2V0IGEgbWFwcGVkIHJhbmdlIG9mIHRoZSBidWZmZXJcbiAgICAgICAgY29uc3QgbWFwcGVkUmFuZ2UgPSBidWZmZXIud2dwdVdyaXRlQnVmZmVyLmdldE1hcHBlZFJhbmdlKCk7XG4gICAgICAgIC8vIENyZWF0ZSBhIEZsb2F0MzJBcnJheSB2aWV3IG9mIHRoZSBtYXBwZWQgcmFuZ2VcbiAgICAgICAgY29uc3QgbWFwcGVkQXJyYXkgPSB0aGlzLmNyZWF0ZUNvcHlXaXRoU2FtZVR5cGUoaG9zdFB0ciwgbWFwcGVkUmFuZ2UpO1xuICAgICAgICAvLyBDb3B5IHRoZSBmbG9hdEFycmF5IGRhdGEgaW50byB0aGUgbWFwcGVkIGFycmF5XG4gICAgICAgIG1hcHBlZEFycmF5LnNldChob3N0UHRyKTtcbiAgICAgICAgLy8gVW5tYXAgdGhlIGJ1ZmZlclxuICAgICAgICBidWZmZXIud2dwdVdyaXRlQnVmZmVyLnVubWFwKCk7XG5cbiAgICAgICAgdGhpcy53Y2xEZXZpY2Uud2dwdURldmljZS5wb3BFcnJvclNjb3BlKCkudGhlbigoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIC8vIFRoZXJlIHdhcyBhbiBlcnJvciBjcmVhdGluZyB0aGUgc2FtcGxlciwgc28gZGlzY2FyZCBpdC5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW0VSUk9SXSBXZWJDTENvbW1hbmRRdWV1ZS5lbnF1ZXVlV3JpdGVCdWZmZXIoKTogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVucXVldWVXcml0ZUJ1ZmZlclJlY3QoYnVmZmVyOiBXZWJDTEJ1ZmZlciwgYmxvY2tpbmdXcml0ZTogQ0xib29sZWFuLCBidWZmZXJPcmlnaW46IEFycmF5PENMdWludD4sIGhvc3RPcmlnaW46IEFycmF5PENMdWludD4sIHJlZ2lvbjogQXJyYXk8Q0x1aW50PiwgYnVmZmVyUm93UGl0Y2g6IENMdWludCwgYnVmZmVyU2xpY2VQaXRjaDogQ0x1aW50LCBob3N0Um93UGl0Y2g6IENMdWludCwgaG9zdFNsaWNlUGl0Y2g6IENMdWludCwgaG9zdFB0cjogQXJyYXlCdWZmZXJWaWV3LCBldmVudFdhaXRMaXN0PzogQXJyYXk8V2ViQ0xFdmVudD4gfCBudWxsLCBldmVudD86IFdlYkNMRXZlbnQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGJ1ZmZlcjtcbiAgICAgICAgYmxvY2tpbmdXcml0ZTtcbiAgICAgICAgYnVmZmVyT3JpZ2luO1xuICAgICAgICBob3N0T3JpZ2luO1xuICAgICAgICByZWdpb247XG4gICAgICAgIGJ1ZmZlclJvd1BpdGNoO1xuICAgICAgICBidWZmZXJTbGljZVBpdGNoO1xuICAgICAgICBob3N0Um93UGl0Y2g7XG4gICAgICAgIGhvc3RTbGljZVBpdGNoO1xuICAgICAgICBob3N0UHRyO1xuICAgICAgICBldmVudFdhaXRMaXN0O1xuICAgICAgICBldmVudDtcbiAgICB9XG4gICAgZW5xdWV1ZVdyaXRlSW1hZ2UoaW1hZ2U6IFdlYkNMSW1hZ2UsIGJsb2NraW5nV3JpdGU6IENMYm9vbGVhbiwgb3JpZ2luOiBBcnJheTxDTHVpbnQ+LCByZWdpb246IEFycmF5PENMdWludD4sIGhvc3RSb3dQaXRjaDogQ0x1aW50LCBob3N0UHRyOiBBcnJheUJ1ZmZlclZpZXcsIGV2ZW50V2FpdExpc3Q/OiBBcnJheTxXZWJDTEV2ZW50PiB8IG51bGwsIGV2ZW50PzogV2ViQ0xFdmVudCB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgaW1hZ2U7XG4gICAgICAgIGJsb2NraW5nV3JpdGU7XG4gICAgICAgIG9yaWdpbjtcbiAgICAgICAgcmVnaW9uO1xuICAgICAgICBob3N0Um93UGl0Y2g7XG4gICAgICAgIGhvc3RQdHI7XG4gICAgICAgIGV2ZW50V2FpdExpc3Q7XG4gICAgICAgIGV2ZW50O1xuICAgIH1cbiAgICBlbnF1ZXVlTkRSYW5nZUtlcm5lbChrZXJuZWw6IFdlYkNMS2VybmVsLCB3b3JrRGltOiBDTHVpbnQsIGdsb2JhbFdvcmtPZmZzZXQ6IEFycmF5PENMdWludD4gfCBudWxsLCBnbG9iYWxXb3JrU2l6ZTogQXJyYXk8Q0x1aW50PiwgbG9jYWxXb3JrU2l6ZT86IEFycmF5PENMdWludD4gfCBudWxsLCBldmVudFdhaXRMaXN0PzogQXJyYXk8V2ViQ0xFdmVudD4gfCBudWxsLCBldmVudD86IFdlYkNMRXZlbnQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGtlcm5lbDtcbiAgICAgICAgd29ya0RpbTtcbiAgICAgICAgZ2xvYmFsV29ya09mZnNldDtcbiAgICAgICAgZ2xvYmFsV29ya1NpemU7XG4gICAgICAgIGxvY2FsV29ya1NpemU7XG4gICAgICAgIGV2ZW50V2FpdExpc3Q7XG4gICAgICAgIGV2ZW50O1xuICAgIH1cbiAgICBlbnF1ZXVlTWFya2VyKGV2ZW50OiBXZWJDTEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50O1xuICAgIH1cbiAgICBlbnF1ZXVlQmFycmllcigpOiB2b2lkIHtcblxuICAgIH1cbiAgICBlbnF1ZXVlV2FpdEZvckV2ZW50cyhldmVudFdhaXRMaXN0OiBBcnJheTxXZWJDTEV2ZW50Pik6IHZvaWQge1xuICAgICAgICBldmVudFdhaXRMaXN0O1xuICAgIH1cbiAgICBmaW5pc2god2hlbkZpbmlzaGVkPzogV2ViQ0xDYWxsYmFjayk6IHZvaWQge1xuICAgICAgICB3aGVuRmluaXNoZWQ7XG4gICAgfVxuICAgIGZsdXNoKCk6IHZvaWQge1xuXG4gICAgfVxuICAgIGdldEluZm8obmFtZTogQ0xlbnVtKTogYW55IHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXZWJDTEV4Y2VwdGlvbihXZWJDTENvbnN0YW50cy5JTlZBTElEX1ZBTFVFLCBcIltJTlZBTElEX1ZBTFVFXSBXZWJDTENvbW1hbmRRdWV1ZS5nZXRJbmZvKCk6IHVua25vd24gcGFyYW1ldGVyICdcIiArIFdlYkNMQ29uc3RhbnRTdHIobmFtZSkgKyBcIidcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVsZWFzZSgpOiB2b2lkIHtcblxuICAgIH1cblxufVxuIiwiZXhwb3J0IGVudW0gV2ViQ0xDb25zdGFudHMge1xuICAgIFNVQ0NFU1MgPSAwLFxuICAgIERFVklDRV9OT1RfRk9VTkQgPSAtMSxcbiAgICBERVZJQ0VfTk9UX0FWQUlMQUJMRSA9IC0yLFxuICAgIERFVklDRV9DT01QSUxFUl9OT1RfQVZBSUxBQkxFID0gLTMsXG4gICAgTUVNX09CSkVDVF9BTExPQ0FUSU9OX0ZBSUxVUkUgPSAtNCxcbiAgICBPVVRfT0ZfUkVTT1VSQ0VTID0gLTUsXG4gICAgT1VUX09GX0hPU1RfTUVNT1JZID0gLTYsXG4gICAgUFJPRklMSU5HX0lORk9fTk9UX0FWQUlMQUJMRSA9IC03LFxuICAgIE1FTV9DT1BZX09WRVJMQVAgPSAtOCxcbiAgICBJTUFHRV9GT1JNQVRfTUlTTUFUQ0ggPSAtOSxcbiAgICBJTUFHRV9GT1JNQVRfTk9UX1NVUFBPUlRFRCA9IC0xMCxcbiAgICBCVUlMRF9QUk9HUkFNX0ZBSUxVUkUgPSAtMTEsXG4gICAgTUFQX0ZBSUxVUkUgPSAtMTIsXG4gICAgSU5WQUxJRF9WQUxVRSA9IC0zMCxcbiAgICBJTlZBTElEX0RFVklDRV9UWVBFID0gLTMxLFxuICAgIElOVkFMSURfUExBVEZPUk0gPSAtMzIsXG4gICAgSU5WQUxJRF9ERVZJQ0UgPSAtMzMsXG4gICAgSU5WQUxJRF9DT05URVhUID0gLTM0LFxuICAgIElOVkFMSURfUVVFVUVfUFJPUEVSVElFUyA9IC0zNSxcbiAgICBJTlZBTElEX0NPTU1BTkRfUVVFVUUgPSAtMzYsXG4gICAgSU5WQUxJRF9IT1NUX1BUUiA9IC0zNyxcbiAgICBJTlZBTElEX01FTV9PQkpFQ1QgPSAtMzgsXG4gICAgSU5WQUxJRF9JTUFHRV9GT1JNQVRfREVTQ1JJUFRPUiA9IC0zOSxcbiAgICBJTlZBTElEX0lNQUdFX1NJWkUgPSAtNDAsXG4gICAgSU5WQUxJRF9TQU1QTEVSID0gLTQxLFxuICAgIElOVkFMSURfQklOQVJZID0gLTQyLFxuICAgIElOVkFMSURfQlVJTERfT1BUSU9OUyA9IC00MyxcbiAgICBJTlZBTElEX1BST0dSQU0gPSAtNDQsXG4gICAgSU5WQUxJRF9QUk9HUkFNX0VYRUNVVEFCTEUgPSAtNDUsXG4gICAgSU5WQUxJRF9LRVJORUxfTkFNRSA9IC00NixcbiAgICBJTlZBTElEX0tFUk5FTF9ERUZJTklUSU9OID0gLTQ3LFxuICAgIElOVkFMSURfS0VSTkVMID0gLTQ4LFxuICAgIElOVkFMSURfQVJHX0lOREVYID0gLTQ5LFxuICAgIElOVkFMSURfQVJHX1ZBTFVFID0gLTUwLFxuICAgIElOVkFMSURfQVJHX1NJWkUgPSAtNTEsXG4gICAgSU5WQUxJRF9LRVJORUxfQVJHUyA9IC01MixcbiAgICBJTlZBTElEX1dPUktfRElNRU5TSU9OID0gLTUzLFxuICAgIElOVkFMSURfV09SS19HUk9VUF9TSVpFID0gLTU0LFxuICAgIElOVkFMSURfV09SS19JVEVNX1NJWkUgPSAtNTUsXG4gICAgSU5WQUxJRF9HTE9CQUxfT0ZGU0VUID0gLTU2LFxuICAgIElOVkFMSURfRVZFTlRfV0FJVF9MSVNUID0gLTU3LFxuICAgIElOVkFMSURfRVZFTlQgPSAtNTgsXG4gICAgSU5WQUxJRF9PUEVSQVRJT04gPSAtNTksXG4gICAgSU5WQUxJRF9HTF9PQkpFQ1QgPSAtNjAsXG4gICAgSU5WQUxJRF9CVUZGRVJfU0laRSA9IC02MSxcbiAgICBJTlZBTElEX01JUF9MRVZFTCA9IC02MixcbiAgICBWRVJTSU9OXzFfMCA9IDEsXG4gICAgRkFMU0UgPSAwLFxuICAgIFRSVUUgPSAxLFxuICAgIFBMQVRGT1JNX1BST0ZJTEUgPSAweDA5MDAsXG4gICAgUExBVEZPUk1fVkVSU0lPTiA9IDB4MDkwMSxcbiAgICBQTEFURk9STV9OQU1FID0gMHgwOTAyLFxuICAgIFBMQVRGT1JNX1ZFTkRPUiA9IDB4MDkwMyxcbiAgICBQTEFURk9STV9FWFRFTlNJT05TID0gMHgwOTA0LFxuICAgIERFVklDRV9UWVBFX0RFRkFVTFQgPSAweDEsXG4gICAgREVWSUNFX1RZUEVfQ1BVID0gMHgyLFxuICAgIERFVklDRV9UWVBFX0dQVSA9IDB4NCxcbiAgICBERVZJQ0VfVFlQRV9BQ0NFTEVSQVRPUiA9IDB4OCxcbiAgICBERVZJQ0VfVFlQRV9ERUJVRyA9IDB4MTYsXG4gICAgREVWSUNFX1RZUEVfQUxMID0gMHhmZmZmZmZmZixcbiAgICBERVZJQ0VfVFlQRSA9IDB4MTAwMCxcbiAgICBERVZJQ0VfVkVORE9SX0lEID0gMHgxMDAxLFxuICAgIERFVklDRV9NQVhfQ09NUFVURV9VTklUUyA9IDB4MTAwMixcbiAgICBERVZJQ0VfTUFYX1dPUktfSVRFTV9ESU1FTlNJT05TID0gMHgxMDAzLFxuICAgIERFVklDRV9NQVhfV09SS19HUk9VUF9TSVpFID0gMHgxMDA0LFxuICAgIERFVklDRV9NQVhfV09SS19JVEVNX1NJWkVTID0gMHgxMDA1LFxuICAgIERFVklDRV9QUkVGRVJSRURfVkVDVE9SX1dJRFRIX0NIQVIgPSAweDEwMDYsXG4gICAgREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfU0hPUlQgPSAweDEwMDcsXG4gICAgREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfSU5UID0gMHgxMDA4LFxuICAgIERFVklDRV9QUkVGRVJSRURfVkVDVE9SX1dJRFRIX0xPTkcgPSAweDEwMDksXG4gICAgREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfRkxPQVQgPSAweDEwMGEsXG4gICAgREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfRE9VQkxFID0gMHgxMDBiLFxuICAgIERFVklDRV9NQVhfQ0xPQ0tfRlJFUVVFTkNZID0gMHgxMDBjLFxuICAgIERFVklDRV9BRERSRVNTX0JJVFMgPSAweDEwMGQsXG4gICAgREVWSUNFX01BWF9SRUFEX0lNQUdFX0FSR1MgPSAweDEwMGUsXG4gICAgREVWSUNFX01BWF9XUklURV9JTUFHRV9BUkdTID0gMHgxMDBmLFxuICAgIERFVklDRV9NQVhfTUVNX0FMTE9DX1NJWkUgPSAweDEwMTAsXG4gICAgREVWSUNFX0lNQUdFMkRfTUFYX1dJRFRIID0gMHgxMDExLFxuICAgIERFVklDRV9JTUFHRTJEX01BWF9IRUlHSFQgPSAweDEwMTIsXG4gICAgREVWSUNFX0lNQUdFM0RfTUFYX1dJRFRIID0gMHgxMDEzLFxuICAgIERFVklDRV9JTUFHRTNEX01BWF9IRUlHSFQgPSAweDEwMTQsXG4gICAgREVWSUNFX0lNQUdFM0RfTUFYX0RFUFRIID0gMHgxMDE1LFxuICAgIERFVklDRV9JTUFHRV9TVVBQT1JUID0gMHgxMDE2LFxuICAgIERFVklDRV9NQVhfUEFSQU1FVEVSX1NJWkUgPSAweDEwMTcsXG4gICAgREVWSUNFX01BWF9TQU1QTEVSUyA9IDB4MTAxOCxcbiAgICBERVZJQ0VfTUVNX0JBU0VfQUREUl9BTElHTiA9IDB4MTAxOSxcbiAgICBERVZJQ0VfTUlOX0RBVEFfVFlQRV9BTElHTl9TSVpFID0gMHgxMDFhLFxuICAgIERFVklDRV9TSU5HTEVfRlBfQ09ORklHID0gMHgxMDFiLFxuICAgIERFVklDRV9HTE9CQUxfTUVNX0NBQ0hFX1RZUEUgPSAweDEwMWMsXG4gICAgREVWSUNFX0dMT0JBTF9NRU1fQ0FDSEVMSU5FX1NJWkUgPSAweDEwMWQsXG4gICAgREVWSUNFX0dMT0JBTF9NRU1fQ0FDSEVfU0laRSA9IDB4MTAxZSxcbiAgICBERVZJQ0VfR0xPQkFMX01FTV9TSVpFID0gMHgxMDFmLFxuICAgIERFVklDRV9NQVhfQ09OU1RBTlRfQlVGRkVSX1NJWkUgPSAweDEwMjAsXG4gICAgREVWSUNFX01BWF9DT05TVEFOVF9BUkdTID0gMHgxMDIxLFxuICAgIERFVklDRV9MT0NBTF9NRU1fVFlQRSA9IDB4MTAyMixcbiAgICBERVZJQ0VfTE9DQUxfTUVNX1NJWkUgPSAweDEwMjMsXG4gICAgREVWSUNFX0VSUk9SX0NPUlJFQ1RJT05fU1VQUE9SVCA9IDB4MTAyNCxcbiAgICBERVZJQ0VfUFJPRklMSU5HX1RJTUVSX1JFU09MVVRJT04gPSAweDEwMjUsXG4gICAgREVWSUNFX0VORElBTl9MSVRUTEUgPSAweDEwMjYsXG4gICAgREVWSUNFX0FWQUlMQUJMRSA9IDB4MTAyNyxcbiAgICBERVZJQ0VfQ09NUElMRVJfQVZBSUxBQkxFID0gMHgxMDI4LFxuICAgIERFVklDRV9FWEVDVVRJT05fQ0FQQUJJTElUSUVTID0gMHgxMDI5LFxuICAgIERFVklDRV9RVUVVRV9QUk9QRVJUSUVTID0gMHgxMDJhLFxuICAgIERFVklDRV9OQU1FID0gMHgxMDJiLFxuICAgIERFVklDRV9WRU5ET1IgPSAweDEwMmMsXG4gICAgRFJJVkVSX1ZFUlNJT04gPSAweDEwMmQsXG4gICAgREVWSUNFX1BST0ZJTEUgPSAweDEwMmUsXG4gICAgREVWSUNFX1ZFUlNJT04gPSAweDEwMmYsXG4gICAgREVWSUNFX0VYVEVOU0lPTlMgPSAweDEwMzAsXG4gICAgREVWSUNFX1BMQVRGT1JNID0gMHgxMDMxLFxuICAgIERFVklDRV9ET1VCTEVfRlBfQ09ORklHID0gMHgxMDMyLFxuICAgIERFVklDRV9QUkVGRVJSRURfVkVDVE9SX1dJRFRIX0hBTEYgPSAweDEwMzQsXG4gICAgREVWSUNFX0hPU1RfVU5JRklFRF9NRU1PUlkgPSAweDEwMzUsXG4gICAgREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfQ0hBUiA9IDB4MTAzNixcbiAgICBERVZJQ0VfTkFUSVZFX1ZFQ1RPUl9XSURUSF9TSE9SVCA9IDB4MTAzNyxcbiAgICBERVZJQ0VfTkFUSVZFX1ZFQ1RPUl9XSURUSF9JTlQgPSAweDEwMzgsXG4gICAgREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfTE9ORyA9IDB4MTAzOSxcbiAgICBERVZJQ0VfTkFUSVZFX1ZFQ1RPUl9XSURUSF9GTE9BVCA9IDB4MTAzYSxcbiAgICBERVZJQ0VfTkFUSVZFX1ZFQ1RPUl9XSURUSF9ET1VCTEUgPSAweDEwM2IsXG4gICAgREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfSEFMRiA9IDB4MTAzYyxcbiAgICBERVZJQ0VfT1BFTkNMX0NfVkVSU0lPTiA9IDB4MTAzZCxcbiAgICBERVZJQ0VfTElOS0VSX0FWQUlMQUJMRSA9IDB4MTAzZSxcbiAgICBERVZJQ0VfQlVJTFRfSU5fS0VSTkVMUyA9IDB4MTAzZixcbiAgICBERVZJQ0VfSU1BR0VfTUFYX0JVRkZFUl9TSVpFID0gMHgxMDQwLFxuICAgIERFVklDRV9JTUFHRV9NQVhfQVJSQVlfU0laRSA9IDB4MTA0MSxcbiAgICBERVZJQ0VfUEFSRU5UX0RFVklDRSA9IDB4MTA0MixcbiAgICBERVZJQ0VfUEFSVElUSU9OX01BWF9TVUJfREVWSUNFUyA9IDB4MTA0MyxcbiAgICBERVZJQ0VfUEFSVElUSU9OX1BST1BFUlRJRVMgPSAweDEwNDQsXG4gICAgREVWSUNFX1BBUlRJVElPTl9BRkZJTklUWV9ET01BSU4gPSAweDEwNDUsXG4gICAgREVWSUNFX1BBUlRJVElPTl9UWVBFID0gMHgxMDQ2LFxuICAgIERFVklDRV9SRUZFUkVOQ0VfQ09VTlQgPSAweDEwNDcsXG4gICAgREVWSUNFX1BSRUZFUlJFRF9JTlRFUk9QX1VTRVJfU1lOQyA9IDB4MTA0OCxcbiAgICBERVZJQ0VfUFJJTlRGX0JVRkZFUl9TSVpFID0gMHgxMDQ5LFxuICAgIERFVklDRV9JTUFHRV9QSVRDSF9BTElHTk1FTlQgPSAweDEwNGEsXG4gICAgREVWSUNFX0lNQUdFX0JBU0VfQUREUkVTU19BTElHTk1FTlQgPSAweDEwNGIsXG4gICAgREVWSUNFX0FERFJFU1NfMzJfQklUUyA9IDB4MSxcbiAgICBERVZJQ0VfQUREUkVTU182NF9CSVRTID0gMHgyLFxuICAgIEZQX0RFTk9STSA9IDB4MSxcbiAgICBGUF9JTkZfTkFOID0gMHgyLFxuICAgIEZQX1JPVU5EX1RPX05FQVJFU1QgPSAweDQsXG4gICAgRlBfUk9VTkRfVE9fWkVSTyA9IDB4OCxcbiAgICBGUF9ST1VORF9UT19JTkYgPSAweDE2LFxuICAgIEZQX0ZNQSA9IDB4MzIsXG4gICAgTk9ORSA9IDB4MCxcbiAgICBSRUFEX09OTFlfQ0FDSEUgPSAweDEsXG4gICAgUkVBRF9XUklURV9DQUNIRSA9IDB4MixcbiAgICBMT0NBTCA9IDB4MSxcbiAgICBHTE9CQUwgPSAweDIsXG4gICAgRVhFQ19LRVJORUwgPSAweDEsXG4gICAgRVhFQ19OQVRJVkVfS0VSTkVMID0gMHgyLFxuICAgIFFVRVVFX09VVF9PRl9PUkRFUl9FWEVDX01PREVfRU5BQkxFID0gMHgxLFxuICAgIFFVRVVFX1BST0ZJTElOR19FTkFCTEUgPSAweDIsXG4gICAgQ09OVEVYVF9SRUZFUkVOQ0VfQ09VTlQgPSAweDEwODAsXG4gICAgQ09OVEVYVF9OVU1fREVWSUNFUyA9IDB4MTA4MSxcbiAgICBDT05URVhUX0RFVklDRVMgPSAweDEwODIsXG4gICAgQ09OVEVYVF9QUk9QRVJUSUVTID0gMHgxMDgzLFxuICAgIENPTlRFWFRfUExBVEZPUk0gPSAweDEwODQsXG4gICAgUVVFVUVfQ09OVEVYVCA9IDB4MTA5MCxcbiAgICBRVUVVRV9ERVZJQ0UgPSAweDEwOTEsXG4gICAgUVVFVUVfUkVGRVJFTkNFX0NPVU5UID0gMHgxMDkyLFxuICAgIFFVRVVFX1BST1BFUlRJRVMgPSAweDEwOTMsXG4gICAgTUVNX1JFQURfV1JJVEUgPSAweDEsXG4gICAgTUVNX1dSSVRFX09OTFkgPSAweDIsXG4gICAgTUVNX1JFQURfT05MWSA9IDB4NCxcbiAgICBNRU1fVVNFX0hPU1RfUFRSID0gMHg4LFxuICAgIE1FTV9BTExPQ19IT1NUX1BUUiA9IDB4MTYsXG4gICAgTUVNX0NPUFlfSE9TVF9QVFIgPSAweDMyLFxuICAgIFIgPSAweDEwYjAsXG4gICAgQSA9IDB4MTBiMSxcbiAgICBSRyA9IDB4MTBiMixcbiAgICBSQSA9IDB4MTBiMyxcbiAgICBSR0IgPSAweDEwYjQsXG4gICAgUkdCQSA9IDB4MTBiNSxcbiAgICBCR1JBID0gMHgxMGI2LFxuICAgIEFSR0IgPSAweDEwYjcsXG4gICAgSU5URU5TSVRZID0gMHgxMGI4LFxuICAgIExVTUlOQU5DRSA9IDB4MTBiOSxcbiAgICBTTk9STV9JTlQ4ID0gMHgxMGQwLFxuICAgIFNOT1JNX0lOVDE2ID0gMHgxMGQxLFxuICAgIFVOT1JNX0lOVDggPSAweDEwZDIsXG4gICAgVU5PUk1fSU5UMTYgPSAweDEwZDMsXG4gICAgVU5PUk1fU0hPUlRfNTY1ID0gMHgxMGQ0LFxuICAgIFVOT1JNX1NIT1JUXzU1NSA9IDB4MTBkNSxcbiAgICBVTk9STV9JTlRfMTAxMDEwID0gMHgxMGQ2LFxuICAgIFNJR05FRF9JTlQ4ID0gMHgxMGQ3LFxuICAgIFNJR05FRF9JTlQxNiA9IDB4MTBkOCxcbiAgICBTSUdORURfSU5UMzIgPSAweDEwZDksXG4gICAgVU5TSUdORURfSU5UOCA9IDB4MTBkYSxcbiAgICBVTlNJR05FRF9JTlQxNiA9IDB4MTBkYixcbiAgICBVTlNJR05FRF9JTlQzMiA9IDB4MTBkYyxcbiAgICBIQUxGX0ZMT0FUID0gMHgxMGRkLFxuICAgIEZMT0FUID0gMHgxMGRlLFxuICAgIFBPSU5URVIgPSAweDEwZGYsIC8vIE5vbiBzdGFuZGFyZCBmcm9tIHdlYmNsIHNwZWNpZmljYXRpb25zIDwtIFJlcXVpcmVkIGZvciBnZXR0aW5nIHRoZSBkZXRhaWxzIG9mIHNpZ25hdHVyZSBvZiB0aGUga2VybmVsXG4gICAgTUVNX09CSkVDVF9CVUZGRVIgPSAweDEwZjAsXG4gICAgTUVNX09CSkVDVF9JTUFHRTJEID0gMHgxMGYxLFxuICAgIE1FTV9PQkpFQ1RfSU1BR0UzRCA9IDB4MTBmMixcbiAgICBNRU1fVFlQRSA9IDB4MTEwMCxcbiAgICBNRU1fRkxBR1MgPSAweDExMDEsXG4gICAgTUVNX1NJWkUgPSAweDExMDIsXG4gICAgTUVNX0hPU1RfUFRSID0gMHgxMTAzLFxuICAgIE1FTV9NQVBfQ09VTlQgPSAweDExMDQsXG4gICAgTUVNX1JFRkVSRU5DRV9DT1VOVCA9IDB4MTEwNSxcbiAgICBNRU1fQ09OVEVYVCA9IDB4MTEwNixcbiAgICBNRU1fQVNTT0NJQVRFRF9NRU1PQkpFQ1QgPSAweDExMDcsXG4gICAgTUVNX09GRlNFVCA9IDB4MTEwOCxcbiAgICBJTUFHRV9GT1JNQVQgPSAweDExMTAsXG4gICAgSU1BR0VfRUxFTUVOVF9TSVpFID0gMHgxMTExLFxuICAgIElNQUdFX1JPV19QSVRDSCA9IDB4MTExMixcbiAgICBJTUFHRV9TTElDRV9QSVRDSCA9IDB4MTExMyxcbiAgICBJTUFHRV9XSURUSCA9IDB4MTExNCxcbiAgICBJTUFHRV9IRUlHSFQgPSAweDExMTUsXG4gICAgSU1BR0VfREVQVEggPSAweDExMTYsXG4gICAgQUREUkVTU19OT05FID0gMHgxMTMwLFxuICAgIEFERFJFU1NfQ0xBTVBfVE9fRURHRSA9IDB4MTEzMSxcbiAgICBBRERSRVNTX0NMQU1QID0gMHgxMTMyLFxuICAgIEFERFJFU1NfUkVQRUFUID0gMHgxMTMzLFxuICAgIEZJTFRFUl9ORUFSRVNUID0gMHgxMTQwLFxuICAgIEZJTFRFUl9MSU5FQVIgPSAweDExNDEsXG4gICAgU0FNUExFUl9SRUZFUkVOQ0VfQ09VTlQgPSAweDExNTAsXG4gICAgU0FNUExFUl9DT05URVhUID0gMHgxMTUxLFxuICAgIFNBTVBMRVJfTk9STUFMSVpFRF9DT09SRFMgPSAweDExNTIsXG4gICAgU0FNUExFUl9BRERSRVNTSU5HX01PREUgPSAweDExNTMsXG4gICAgU0FNUExFUl9GSUxURVJfTU9ERSA9IDB4MTE1NCxcbiAgICBNQVBfUkVBRCA9IDB4MSxcbiAgICBNQVBfV1JJVEUgPSAweDIsXG4gICAgUFJPR1JBTV9SRUZFUkVOQ0VfQ09VTlQgPSAweDExNjAsXG4gICAgUFJPR1JBTV9DT05URVhUID0gMHgxMTYxLFxuICAgIFBST0dSQU1fTlVNX0RFVklDRVMgPSAweDExNjIsXG4gICAgUFJPR1JBTV9ERVZJQ0VTID0gMHgxMTYzLFxuICAgIFBST0dSQU1fU09VUkNFID0gMHgxMTY0LFxuICAgIFBST0dSQU1fQklOQVJZX1NJWkVTID0gMHgxMTY1LFxuICAgIFBST0dSQU1fQklOQVJJRVMgPSAweDExNjYsXG4gICAgUFJPR1JBTV9CVUlMRF9TVEFUVVMgPSAweDExODEsXG4gICAgUFJPR1JBTV9CVUlMRF9PUFRJT05TID0gMHgxMTgyLFxuICAgIFBST0dSQU1fQlVJTERfTE9HID0gMHgxMTgzLFxuICAgIEJVSUxEX1NVQ0NFU1MgPSAwLFxuICAgIEJVSUxEX05PTkUgPSAtMSxcbiAgICBCVUlMRF9FUlJPUiA9IC0yLFxuICAgIEJVSUxEX0lOX1BST0dSRVNTID0gLTMsXG4gICAgS0VSTkVMX0ZVTkNUSU9OX1NJRyA9IDB4MTE4OSwgLy8gTm9uIHN0YW5kYXJkIGZyb20gd2ViY2wgc3BlY2lmaWNhdGlvbnMgPC0gUmVxdWlyZWQgZm9yIGdldHRpbmcgdGhlIGRldGFpbHMgb2Ygc2lnbmF0dXJlIG9mIHRoZSBrZXJuZWxcbiAgICBLRVJORUxfRlVOQ1RJT05fTkFNRSA9IDB4MTE5MCxcbiAgICBLRVJORUxfTlVNX0FSR1MgPSAweDExOTEsXG4gICAgS0VSTkVMX1JFRkVSRU5DRV9DT1VOVCA9IDB4MTE5MixcbiAgICBLRVJORUxfQ09OVEVYVCA9IDB4MTE5MyxcbiAgICBLRVJORUxfUFJPR1JBTSA9IDB4MTE5NCxcbiAgICBLRVJORUxfV09SS19HUk9VUF9TSVpFID0gMHgxMWIwLFxuICAgIEtFUk5FTF9DT01QSUxFX1dPUktfR1JPVVBfU0laRSA9IDB4MTFiMSxcbiAgICBLRVJORUxfTE9DQUxfTUVNX1NJWkUgPSAweDExYjIsXG4gICAgRVZFTlRfQ09NTUFORF9RVUVVRSA9IDB4MTFkMCxcbiAgICBFVkVOVF9DT01NQU5EX1RZUEUgPSAweDExZDEsXG4gICAgRVZFTlRfUkVGRVJFTkNFX0NPVU5UID0gMHgxMWQyLFxuICAgIEVWRU5UX0NPTU1BTkRfRVhFQ1VUSU9OX1NUQVRVUyA9IDB4MTFkMyxcbiAgICBDT01NQU5EX05EUkFOR0VfS0VSTkVMID0gMHgxMWYwLFxuICAgIENPTU1BTkRfVEFTSyA9IDB4MTFmMSxcbiAgICBDT01NQU5EX05BVElWRV9LRVJORUwgPSAweDExZjIsXG4gICAgQ09NTUFORF9SRUFEX0JVRkZFUiA9IDB4MTFmMyxcbiAgICBDT01NQU5EX1dSSVRFX0JVRkZFUiA9IDB4MTFmNCxcbiAgICBDT01NQU5EX0NPUFlfQlVGRkVSID0gMHgxMWY1LFxuICAgIENPTU1BTkRfUkVBRF9JTUFHRSA9IDB4MTFmNixcbiAgICBDT01NQU5EX1dSSVRFX0lNQUdFID0gMHgxMWY3LFxuICAgIENPTU1BTkRfQ09QWV9JTUFHRSA9IDB4MTFmOCxcbiAgICBDT01NQU5EX0NPUFlfSU1BR0VfVE9fQlVGRkVSID0gMHgxMWY5LFxuICAgIENPTU1BTkRfQ09QWV9CVUZGRVJfVE9fSU1BR0UgPSAweDExZmEsXG4gICAgQ09NTUFORF9NQVBfQlVGRkVSID0gMHgxMWZiLFxuICAgIENPTU1BTkRfTUFQX0lNQUdFID0gMHgxMWZjLFxuICAgIENPTU1BTkRfVU5NQVBfTUVNX09CSkVDVCA9IDB4MTFmZCxcbiAgICBDT01NQU5EX01BUktFUiA9IDB4MTFmZSxcbiAgICBDT01NQU5EX1dBSVRfRk9SX0VWRU5UUyA9IDB4MTFmZixcbiAgICBDT01NQU5EX0JBUlJJRVIgPSAweDEyMDAsXG4gICAgQ09NTUFORF9BQ1FVSVJFX0dMX09CSkVDVFMgPSAweDEyMDEsXG4gICAgQ09NTUFORF9SRUxFQVNFX0dMX09CSkVDVFMgPSAweDEyMDIsXG4gICAgQ09NUExFVEUgPSAweDAsXG4gICAgUlVOTklORyA9IDB4MSxcbiAgICBTVUJNSVRURUQgPSAweDIsXG4gICAgUVVFVUVEID0gMHgzLFxuICAgIFBST0ZJTElOR19DT01NQU5EX1FVRVVFRCA9IDB4MTI4MCxcbiAgICBQUk9GSUxJTkdfQ09NTUFORF9TVUJNSVQgPSAweDEyODEsXG4gICAgUFJPRklMSU5HX0NPTU1BTkRfU1RBUlQgPSAweDEyODIsXG4gICAgUFJPRklMSU5HX0NPTU1BTkRfRU5EID0gMHgxMjgzLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gV2ViQ0xDb25zdGFudFN0cih2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuU1VDQ0VTUzpcbiAgICAgICAgICAgIHJldHVybiBcIlNVQ0NFU1NcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTk9UX0ZPVU5EOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX05PVF9GT1VORFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9OT1RfQVZBSUxBQkxFOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX05PVF9BVkFJTEFCTEVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfQ09NUElMRVJfTk9UX0FWQUlMQUJMRTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9DT01QSUxFUl9OT1RfQVZBSUxBQkxFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTUVNX09CSkVDVF9BTExPQ0FUSU9OX0ZBSUxVUkU6XG4gICAgICAgICAgICByZXR1cm4gXCJNRU1fT0JKRUNUX0FMTE9DQVRJT05fRkFJTFVSRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLk9VVF9PRl9SRVNPVVJDRVM6XG4gICAgICAgICAgICByZXR1cm4gXCJPVVRfT0ZfUkVTT1VSQ0VTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuT1VUX09GX0hPU1RfTUVNT1JZOlxuICAgICAgICAgICAgcmV0dXJuIFwiT1VUX09GX0hPU1RfTUVNT1JZXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUFJPRklMSU5HX0lORk9fTk9UX0FWQUlMQUJMRTpcbiAgICAgICAgICAgIHJldHVybiBcIlBST0ZJTElOR19JTkZPX05PVF9BVkFJTEFCTEVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NRU1fQ09QWV9PVkVSTEFQOlxuICAgICAgICAgICAgcmV0dXJuIFwiTUVNX0NPUFlfT1ZFUkxBUFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklNQUdFX0ZPUk1BVF9NSVNNQVRDSDpcbiAgICAgICAgICAgIHJldHVybiBcIklNQUdFX0ZPUk1BVF9NSVNNQVRDSFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklNQUdFX0ZPUk1BVF9OT1RfU1VQUE9SVEVEOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU1BR0VfRk9STUFUX05PVF9TVVBQT1JURURcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5CVUlMRF9QUk9HUkFNX0ZBSUxVUkU6XG4gICAgICAgICAgICByZXR1cm4gXCJCVUlMRF9QUk9HUkFNX0ZBSUxVUkVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NQVBfRkFJTFVSRTpcbiAgICAgICAgICAgIHJldHVybiBcIk1BUF9GQUlMVVJFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9WQUxVRTpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfVkFMVUVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX0RFVklDRV9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU5WQUxJRF9ERVZJQ0VfVFlQRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklOVkFMSURfUExBVEZPUk06XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX1BMQVRGT1JNXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9ERVZJQ0U6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX0RFVklDRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklOVkFMSURfQ09OVEVYVDpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfQ09OVEVYVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklOVkFMSURfUVVFVUVfUFJPUEVSVElFUzpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfUVVFVUVfUFJPUEVSVElFU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklOVkFMSURfQ09NTUFORF9RVUVVRTpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfQ09NTUFORF9RVUVVRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklOVkFMSURfSE9TVF9QVFI6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX0hPU1RfUFRSXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9NRU1fT0JKRUNUOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU5WQUxJRF9NRU1fT0JKRUNUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9JTUFHRV9GT1JNQVRfREVTQ1JJUFRPUjpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfSU1BR0VfRk9STUFUX0RFU0NSSVBUT1JcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX0lNQUdFX1NJWkU6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX0lNQUdFX1NJWkVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX1NBTVBMRVI6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX1NBTVBMRVJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX0JJTkFSWTpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfQklOQVJZXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9CVUlMRF9PUFRJT05TOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU5WQUxJRF9CVUlMRF9PUFRJT05TXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9QUk9HUkFNOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU5WQUxJRF9QUk9HUkFNXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9QUk9HUkFNX0VYRUNVVEFCTEU6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX1BST0dSQU1fRVhFQ1VUQUJMRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklOVkFMSURfS0VSTkVMX05BTUU6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX0tFUk5FTF9OQU1FXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9LRVJORUxfREVGSU5JVElPTjpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfS0VSTkVMX0RFRklOSVRJT05cIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX0tFUk5FTDpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfS0VSTkVMXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9BUkdfSU5ERVg6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX0FSR19JTkRFWFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklOVkFMSURfQVJHX1ZBTFVFOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU5WQUxJRF9BUkdfVkFMVUVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX0FSR19TSVpFOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU5WQUxJRF9BUkdfU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklOVkFMSURfS0VSTkVMX0FSR1M6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX0tFUk5FTF9BUkdTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9XT1JLX0RJTUVOU0lPTjpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfV09SS19ESU1FTlNJT05cIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX1dPUktfR1JPVVBfU0laRTpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfV09SS19HUk9VUF9TSVpFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9XT1JLX0lURU1fU0laRTpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfV09SS19JVEVNX1NJWkVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX0dMT0JBTF9PRkZTRVQ6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX0dMT0JBTF9PRkZTRVRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX0VWRU5UX1dBSVRfTElTVDpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfRVZFTlRfV0FJVF9MSVNUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9FVkVOVDpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfRVZFTlRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX09QRVJBVElPTjpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfT1BFUkFUSU9OXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9HTF9PQkpFQ1Q6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX0dMX09CSkVDVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklOVkFMSURfQlVGRkVSX1NJWkU6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX0JVRkZFUl9TSVpFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9NSVBfTEVWRUw6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX01JUF9MRVZFTFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlZFUlNJT05fMV8wOlxuICAgICAgICAgICAgcmV0dXJuIFwiVkVSU0lPTl8xXzBcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5GQUxTRTpcbiAgICAgICAgICAgIHJldHVybiBcIkZBTFNFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuVFJVRTpcbiAgICAgICAgICAgIHJldHVybiBcIlRSVUVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QTEFURk9STV9QUk9GSUxFOlxuICAgICAgICAgICAgcmV0dXJuIFwiUExBVEZPUk1fUFJPRklMRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBMQVRGT1JNX1ZFUlNJT046XG4gICAgICAgICAgICByZXR1cm4gXCJQTEFURk9STV9WRVJTSU9OXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUExBVEZPUk1fTkFNRTpcbiAgICAgICAgICAgIHJldHVybiBcIlBMQVRGT1JNX05BTUVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QTEFURk9STV9WRU5ET1I6XG4gICAgICAgICAgICByZXR1cm4gXCJQTEFURk9STV9WRU5ET1JcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QTEFURk9STV9FWFRFTlNJT05TOlxuICAgICAgICAgICAgcmV0dXJuIFwiUExBVEZPUk1fRVhURU5TSU9OU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9UWVBFX0RFRkFVTFQ6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfVFlQRV9ERUZBVUxUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1RZUEVfQ1BVOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1RZUEVfQ1BVXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1RZUEVfR1BVOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1RZUEVfR1BVXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1RZUEVfQUNDRUxFUkFUT1I6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfVFlQRV9BQ0NFTEVSQVRPUlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9UWVBFX0RFQlVHOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1RZUEVfREVCVUdcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfVFlQRV9BTEw6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfVFlQRV9BTExcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9UWVBFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1ZFTkRPUl9JRDpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9WRU5ET1JfSURcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTUFYX0NPTVBVVEVfVU5JVFM6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfTUFYX0NPTVBVVEVfVU5JVFNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTUFYX1dPUktfSVRFTV9ESU1FTlNJT05TOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX01BWF9XT1JLX0lURU1fRElNRU5TSU9OU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfV09SS19HUk9VUF9TSVpFOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX01BWF9XT1JLX0dST1VQX1NJWkVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTUFYX1dPUktfSVRFTV9TSVpFUzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9NQVhfV09SS19JVEVNX1NJWkVTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfQ0hBUjpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9QUkVGRVJSRURfVkVDVE9SX1dJRFRIX0NIQVJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUFJFRkVSUkVEX1ZFQ1RPUl9XSURUSF9TSE9SVDpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9QUkVGRVJSRURfVkVDVE9SX1dJRFRIX1NIT1JUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfSU5UOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfSU5UXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfTE9ORzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9QUkVGRVJSRURfVkVDVE9SX1dJRFRIX0xPTkdcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUFJFRkVSUkVEX1ZFQ1RPUl9XSURUSF9GTE9BVDpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9QUkVGRVJSRURfVkVDVE9SX1dJRFRIX0ZMT0FUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfRE9VQkxFOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfRE9VQkxFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX01BWF9DTE9DS19GUkVRVUVOQ1k6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfTUFYX0NMT0NLX0ZSRVFVRU5DWVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9BRERSRVNTX0JJVFM6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfQUREUkVTU19CSVRTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX01BWF9SRUFEX0lNQUdFX0FSR1M6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfTUFYX1JFQURfSU1BR0VfQVJHU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfV1JJVEVfSU1BR0VfQVJHUzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9NQVhfV1JJVEVfSU1BR0VfQVJHU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfTUVNX0FMTE9DX1NJWkU6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfTUFYX01FTV9BTExPQ19TSVpFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0lNQUdFMkRfTUFYX1dJRFRIOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX0lNQUdFMkRfTUFYX1dJRFRIXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0lNQUdFMkRfTUFYX0hFSUdIVDpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9JTUFHRTJEX01BWF9IRUlHSFRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfSU1BR0UzRF9NQVhfV0lEVEg6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfSU1BR0UzRF9NQVhfV0lEVEhcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfSU1BR0UzRF9NQVhfSEVJR0hUOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX0lNQUdFM0RfTUFYX0hFSUdIVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9JTUFHRTNEX01BWF9ERVBUSDpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9JTUFHRTNEX01BWF9ERVBUSFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9JTUFHRV9TVVBQT1JUOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX0lNQUdFX1NVUFBPUlRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTUFYX1BBUkFNRVRFUl9TSVpFOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX01BWF9QQVJBTUVURVJfU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfU0FNUExFUlM6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfTUFYX1NBTVBMRVJTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX01FTV9CQVNFX0FERFJfQUxJR046XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfTUVNX0JBU0VfQUREUl9BTElHTlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NSU5fREFUQV9UWVBFX0FMSUdOX1NJWkU6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfTUlOX0RBVEFfVFlQRV9BTElHTl9TSVpFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1NJTkdMRV9GUF9DT05GSUc6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfU0lOR0xFX0ZQX0NPTkZJR1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9HTE9CQUxfTUVNX0NBQ0hFX1RZUEU6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfR0xPQkFMX01FTV9DQUNIRV9UWVBFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0dMT0JBTF9NRU1fQ0FDSEVMSU5FX1NJWkU6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfR0xPQkFMX01FTV9DQUNIRUxJTkVfU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9HTE9CQUxfTUVNX0NBQ0hFX1NJWkU6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfR0xPQkFMX01FTV9DQUNIRV9TSVpFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0dMT0JBTF9NRU1fU0laRTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9HTE9CQUxfTUVNX1NJWkVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTUFYX0NPTlNUQU5UX0JVRkZFUl9TSVpFOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX01BWF9DT05TVEFOVF9CVUZGRVJfU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfQ09OU1RBTlRfQVJHUzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9NQVhfQ09OU1RBTlRfQVJHU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9MT0NBTF9NRU1fVFlQRTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9MT0NBTF9NRU1fVFlQRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9MT0NBTF9NRU1fU0laRTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9MT0NBTF9NRU1fU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9FUlJPUl9DT1JSRUNUSU9OX1NVUFBPUlQ6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfRVJST1JfQ09SUkVDVElPTl9TVVBQT1JUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BST0ZJTElOR19USU1FUl9SRVNPTFVUSU9OOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1BST0ZJTElOR19USU1FUl9SRVNPTFVUSU9OXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0VORElBTl9MSVRUTEU6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfRU5ESUFOX0xJVFRMRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9BVkFJTEFCTEU6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfQVZBSUxBQkxFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0NPTVBJTEVSX0FWQUlMQUJMRTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9DT01QSUxFUl9BVkFJTEFCTEVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfRVhFQ1VUSU9OX0NBUEFCSUxJVElFUzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9FWEVDVVRJT05fQ0FQQUJJTElUSUVTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1FVRVVFX1BST1BFUlRJRVM6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfUVVFVUVfUFJPUEVSVElFU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9OQU1FOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX05BTUVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfVkVORE9SOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1ZFTkRPUlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRSSVZFUl9WRVJTSU9OOlxuICAgICAgICAgICAgcmV0dXJuIFwiRFJJVkVSX1ZFUlNJT05cIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUFJPRklMRTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9QUk9GSUxFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1ZFUlNJT046XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfVkVSU0lPTlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9FWFRFTlNJT05TOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX0VYVEVOU0lPTlNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUExBVEZPUk06XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfUExBVEZPUk1cIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfRE9VQkxFX0ZQX0NPTkZJRzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9ET1VCTEVfRlBfQ09ORklHXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfSEFMRjpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9QUkVGRVJSRURfVkVDVE9SX1dJRFRIX0hBTEZcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfSE9TVF9VTklGSUVEX01FTU9SWTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9IT1NUX1VOSUZJRURfTUVNT1JZXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfQ0hBUjpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX0NIQVJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTkFUSVZFX1ZFQ1RPUl9XSURUSF9TSE9SVDpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX1NIT1JUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfSU5UOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfSU5UXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfTE9ORzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX0xPTkdcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTkFUSVZFX1ZFQ1RPUl9XSURUSF9GTE9BVDpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX0ZMT0FUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfRE9VQkxFOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfRE9VQkxFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfSEFMRjpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX0hBTEZcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfT1BFTkNMX0NfVkVSU0lPTjpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9PUEVOQ0xfQ19WRVJTSU9OXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0xJTktFUl9BVkFJTEFCTEU6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfTElOS0VSX0FWQUlMQUJMRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9CVUlMVF9JTl9LRVJORUxTOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX0JVSUxUX0lOX0tFUk5FTFNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfSU1BR0VfTUFYX0JVRkZFUl9TSVpFOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX0lNQUdFX01BWF9CVUZGRVJfU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9JTUFHRV9NQVhfQVJSQVlfU0laRTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9JTUFHRV9NQVhfQVJSQVlfU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9QQVJFTlRfREVWSUNFOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1BBUkVOVF9ERVZJQ0VcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUEFSVElUSU9OX01BWF9TVUJfREVWSUNFUzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9QQVJUSVRJT05fTUFYX1NVQl9ERVZJQ0VTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BBUlRJVElPTl9QUk9QRVJUSUVTOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1BBUlRJVElPTl9QUk9QRVJUSUVTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BBUlRJVElPTl9BRkZJTklUWV9ET01BSU46XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfUEFSVElUSU9OX0FGRklOSVRZX0RPTUFJTlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9QQVJUSVRJT05fVFlQRTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9QQVJUSVRJT05fVFlQRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9SRUZFUkVOQ0VfQ09VTlQ6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfUkVGRVJFTkNFX0NPVU5UXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BSRUZFUlJFRF9JTlRFUk9QX1VTRVJfU1lOQzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9QUkVGRVJSRURfSU5URVJPUF9VU0VSX1NZTkNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUFJJTlRGX0JVRkZFUl9TSVpFOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1BSSU5URl9CVUZGRVJfU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9JTUFHRV9QSVRDSF9BTElHTk1FTlQ6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfSU1BR0VfUElUQ0hfQUxJR05NRU5UXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0lNQUdFX0JBU0VfQUREUkVTU19BTElHTk1FTlQ6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfSU1BR0VfQkFTRV9BRERSRVNTX0FMSUdOTUVOVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9BRERSRVNTXzMyX0JJVFM6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfQUREUkVTU18zMl9CSVRTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0FERFJFU1NfNjRfQklUUzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9BRERSRVNTXzY0X0JJVFNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5GUF9ERU5PUk06XG4gICAgICAgICAgICByZXR1cm4gXCJGUF9ERU5PUk1cIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5GUF9JTkZfTkFOOlxuICAgICAgICAgICAgcmV0dXJuIFwiRlBfSU5GX05BTlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkZQX1JPVU5EX1RPX05FQVJFU1Q6XG4gICAgICAgICAgICByZXR1cm4gXCJGUF9ST1VORF9UT19ORUFSRVNUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuRlBfUk9VTkRfVE9fWkVSTzpcbiAgICAgICAgICAgIHJldHVybiBcIkZQX1JPVU5EX1RPX1pFUk9cIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5GUF9ST1VORF9UT19JTkY6XG4gICAgICAgICAgICByZXR1cm4gXCJGUF9ST1VORF9UT19JTkZcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5GUF9GTUE6XG4gICAgICAgICAgICByZXR1cm4gXCJGUF9GTUFcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5OT05FOlxuICAgICAgICAgICAgcmV0dXJuIFwiTk9ORVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlJFQURfT05MWV9DQUNIRTpcbiAgICAgICAgICAgIHJldHVybiBcIlJFQURfT05MWV9DQUNIRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlJFQURfV1JJVEVfQ0FDSEU6XG4gICAgICAgICAgICByZXR1cm4gXCJSRUFEX1dSSVRFX0NBQ0hFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTE9DQUw6XG4gICAgICAgICAgICByZXR1cm4gXCJMT0NBTFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkdMT0JBTDpcbiAgICAgICAgICAgIHJldHVybiBcIkdMT0JBTFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkVYRUNfS0VSTkVMOlxuICAgICAgICAgICAgcmV0dXJuIFwiRVhFQ19LRVJORUxcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5FWEVDX05BVElWRV9LRVJORUw6XG4gICAgICAgICAgICByZXR1cm4gXCJFWEVDX05BVElWRV9LRVJORUxcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5RVUVVRV9PVVRfT0ZfT1JERVJfRVhFQ19NT0RFX0VOQUJMRTpcbiAgICAgICAgICAgIHJldHVybiBcIlFVRVVFX09VVF9PRl9PUkRFUl9FWEVDX01PREVfRU5BQkxFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUVVFVUVfUFJPRklMSU5HX0VOQUJMRTpcbiAgICAgICAgICAgIHJldHVybiBcIlFVRVVFX1BST0ZJTElOR19FTkFCTEVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT05URVhUX1JFRkVSRU5DRV9DT1VOVDpcbiAgICAgICAgICAgIHJldHVybiBcIkNPTlRFWFRfUkVGRVJFTkNFX0NPVU5UXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQ09OVEVYVF9OVU1fREVWSUNFUzpcbiAgICAgICAgICAgIHJldHVybiBcIkNPTlRFWFRfTlVNX0RFVklDRVNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT05URVhUX0RFVklDRVM6XG4gICAgICAgICAgICByZXR1cm4gXCJDT05URVhUX0RFVklDRVNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT05URVhUX1BST1BFUlRJRVM6XG4gICAgICAgICAgICByZXR1cm4gXCJDT05URVhUX1BST1BFUlRJRVNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT05URVhUX1BMQVRGT1JNOlxuICAgICAgICAgICAgcmV0dXJuIFwiQ09OVEVYVF9QTEFURk9STVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlFVRVVFX0NPTlRFWFQ6XG4gICAgICAgICAgICByZXR1cm4gXCJRVUVVRV9DT05URVhUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUVVFVUVfREVWSUNFOlxuICAgICAgICAgICAgcmV0dXJuIFwiUVVFVUVfREVWSUNFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUVVFVUVfUkVGRVJFTkNFX0NPVU5UOlxuICAgICAgICAgICAgcmV0dXJuIFwiUVVFVUVfUkVGRVJFTkNFX0NPVU5UXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUVVFVUVfUFJPUEVSVElFUzpcbiAgICAgICAgICAgIHJldHVybiBcIlFVRVVFX1BST1BFUlRJRVNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NRU1fUkVBRF9XUklURTpcbiAgICAgICAgICAgIHJldHVybiBcIk1FTV9SRUFEX1dSSVRFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTUVNX1dSSVRFX09OTFk6XG4gICAgICAgICAgICByZXR1cm4gXCJNRU1fV1JJVEVfT05MWVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLk1FTV9SRUFEX09OTFk6XG4gICAgICAgICAgICByZXR1cm4gXCJNRU1fUkVBRF9PTkxZXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTUVNX1VTRV9IT1NUX1BUUjpcbiAgICAgICAgICAgIHJldHVybiBcIk1FTV9VU0VfSE9TVF9QVFJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NRU1fQUxMT0NfSE9TVF9QVFI6XG4gICAgICAgICAgICByZXR1cm4gXCJNRU1fQUxMT0NfSE9TVF9QVFJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NRU1fQ09QWV9IT1NUX1BUUjpcbiAgICAgICAgICAgIHJldHVybiBcIk1FTV9DT1BZX0hPU1RfUFRSXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUjpcbiAgICAgICAgICAgIHJldHVybiBcIlJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5BOlxuICAgICAgICAgICAgcmV0dXJuIFwiQVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlJHOlxuICAgICAgICAgICAgcmV0dXJuIFwiUkdcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5SQTpcbiAgICAgICAgICAgIHJldHVybiBcIlJBXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUkdCOlxuICAgICAgICAgICAgcmV0dXJuIFwiUkdCXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUkdCQTpcbiAgICAgICAgICAgIHJldHVybiBcIlJHQkFcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5CR1JBOlxuICAgICAgICAgICAgcmV0dXJuIFwiQkdSQVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkFSR0I6XG4gICAgICAgICAgICByZXR1cm4gXCJBUkdCXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5URU5TSVRZOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU5URU5TSVRZXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTFVNSU5BTkNFOlxuICAgICAgICAgICAgcmV0dXJuIFwiTFVNSU5BTkNFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuU05PUk1fSU5UODpcbiAgICAgICAgICAgIHJldHVybiBcIlNOT1JNX0lOVDhcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5TTk9STV9JTlQxNjpcbiAgICAgICAgICAgIHJldHVybiBcIlNOT1JNX0lOVDE2XCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuVU5PUk1fSU5UODpcbiAgICAgICAgICAgIHJldHVybiBcIlVOT1JNX0lOVDhcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5VTk9STV9JTlQxNjpcbiAgICAgICAgICAgIHJldHVybiBcIlVOT1JNX0lOVDE2XCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuVU5PUk1fU0hPUlRfNTY1OlxuICAgICAgICAgICAgcmV0dXJuIFwiVU5PUk1fU0hPUlRfNTY1XCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuVU5PUk1fU0hPUlRfNTU1OlxuICAgICAgICAgICAgcmV0dXJuIFwiVU5PUk1fU0hPUlRfNTU1XCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuVU5PUk1fSU5UXzEwMTAxMDpcbiAgICAgICAgICAgIHJldHVybiBcIlVOT1JNX0lOVF8xMDEwMTBcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5TSUdORURfSU5UODpcbiAgICAgICAgICAgIHJldHVybiBcIlNJR05FRF9JTlQ4XCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuU0lHTkVEX0lOVDE2OlxuICAgICAgICAgICAgcmV0dXJuIFwiU0lHTkVEX0lOVDE2XCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuU0lHTkVEX0lOVDMyOlxuICAgICAgICAgICAgcmV0dXJuIFwiU0lHTkVEX0lOVDMyXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuVU5TSUdORURfSU5UODpcbiAgICAgICAgICAgIHJldHVybiBcIlVOU0lHTkVEX0lOVDhcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5VTlNJR05FRF9JTlQxNjpcbiAgICAgICAgICAgIHJldHVybiBcIlVOU0lHTkVEX0lOVDE2XCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuVU5TSUdORURfSU5UMzI6XG4gICAgICAgICAgICByZXR1cm4gXCJVTlNJR05FRF9JTlQzMlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkhBTEZfRkxPQVQ6XG4gICAgICAgICAgICByZXR1cm4gXCJIQUxGX0ZMT0FUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuRkxPQVQ6XG4gICAgICAgICAgICByZXR1cm4gXCJGTE9BVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLk1FTV9PQkpFQ1RfQlVGRkVSOlxuICAgICAgICAgICAgcmV0dXJuIFwiTUVNX09CSkVDVF9CVUZGRVJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NRU1fT0JKRUNUX0lNQUdFMkQ6XG4gICAgICAgICAgICByZXR1cm4gXCJNRU1fT0JKRUNUX0lNQUdFMkRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NRU1fT0JKRUNUX0lNQUdFM0Q6XG4gICAgICAgICAgICByZXR1cm4gXCJNRU1fT0JKRUNUX0lNQUdFM0RcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NRU1fVFlQRTpcbiAgICAgICAgICAgIHJldHVybiBcIk1FTV9UWVBFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTUVNX0ZMQUdTOlxuICAgICAgICAgICAgcmV0dXJuIFwiTUVNX0ZMQUdTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTUVNX1NJWkU6XG4gICAgICAgICAgICByZXR1cm4gXCJNRU1fU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLk1FTV9IT1NUX1BUUjpcbiAgICAgICAgICAgIHJldHVybiBcIk1FTV9IT1NUX1BUUlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLk1FTV9NQVBfQ09VTlQ6XG4gICAgICAgICAgICByZXR1cm4gXCJNRU1fTUFQX0NPVU5UXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTUVNX1JFRkVSRU5DRV9DT1VOVDpcbiAgICAgICAgICAgIHJldHVybiBcIk1FTV9SRUZFUkVOQ0VfQ09VTlRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NRU1fQ09OVEVYVDpcbiAgICAgICAgICAgIHJldHVybiBcIk1FTV9DT05URVhUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTUVNX0FTU09DSUFURURfTUVNT0JKRUNUOlxuICAgICAgICAgICAgcmV0dXJuIFwiTUVNX0FTU09DSUFURURfTUVNT0JKRUNUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTUVNX09GRlNFVDpcbiAgICAgICAgICAgIHJldHVybiBcIk1FTV9PRkZTRVRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTUFHRV9GT1JNQVQ6XG4gICAgICAgICAgICByZXR1cm4gXCJJTUFHRV9GT1JNQVRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTUFHRV9FTEVNRU5UX1NJWkU6XG4gICAgICAgICAgICByZXR1cm4gXCJJTUFHRV9FTEVNRU5UX1NJWkVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTUFHRV9ST1dfUElUQ0g6XG4gICAgICAgICAgICByZXR1cm4gXCJJTUFHRV9ST1dfUElUQ0hcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTUFHRV9TTElDRV9QSVRDSDpcbiAgICAgICAgICAgIHJldHVybiBcIklNQUdFX1NMSUNFX1BJVENIXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU1BR0VfV0lEVEg6XG4gICAgICAgICAgICByZXR1cm4gXCJJTUFHRV9XSURUSFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklNQUdFX0hFSUdIVDpcbiAgICAgICAgICAgIHJldHVybiBcIklNQUdFX0hFSUdIVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklNQUdFX0RFUFRIOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU1BR0VfREVQVEhcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5BRERSRVNTX05PTkU6XG4gICAgICAgICAgICByZXR1cm4gXCJBRERSRVNTX05PTkVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5BRERSRVNTX0NMQU1QX1RPX0VER0U6XG4gICAgICAgICAgICByZXR1cm4gXCJBRERSRVNTX0NMQU1QX1RPX0VER0VcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5BRERSRVNTX0NMQU1QOlxuICAgICAgICAgICAgcmV0dXJuIFwiQUREUkVTU19DTEFNUFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkFERFJFU1NfUkVQRUFUOlxuICAgICAgICAgICAgcmV0dXJuIFwiQUREUkVTU19SRVBFQVRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5GSUxURVJfTkVBUkVTVDpcbiAgICAgICAgICAgIHJldHVybiBcIkZJTFRFUl9ORUFSRVNUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuRklMVEVSX0xJTkVBUjpcbiAgICAgICAgICAgIHJldHVybiBcIkZJTFRFUl9MSU5FQVJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5TQU1QTEVSX1JFRkVSRU5DRV9DT1VOVDpcbiAgICAgICAgICAgIHJldHVybiBcIlNBTVBMRVJfUkVGRVJFTkNFX0NPVU5UXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuU0FNUExFUl9DT05URVhUOlxuICAgICAgICAgICAgcmV0dXJuIFwiU0FNUExFUl9DT05URVhUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuU0FNUExFUl9OT1JNQUxJWkVEX0NPT1JEUzpcbiAgICAgICAgICAgIHJldHVybiBcIlNBTVBMRVJfTk9STUFMSVpFRF9DT09SRFNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5TQU1QTEVSX0FERFJFU1NJTkdfTU9ERTpcbiAgICAgICAgICAgIHJldHVybiBcIlNBTVBMRVJfQUREUkVTU0lOR19NT0RFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuU0FNUExFUl9GSUxURVJfTU9ERTpcbiAgICAgICAgICAgIHJldHVybiBcIlNBTVBMRVJfRklMVEVSX01PREVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NQVBfUkVBRDpcbiAgICAgICAgICAgIHJldHVybiBcIk1BUF9SRUFEXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTUFQX1dSSVRFOlxuICAgICAgICAgICAgcmV0dXJuIFwiTUFQX1dSSVRFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUFJPR1JBTV9SRUZFUkVOQ0VfQ09VTlQ6XG4gICAgICAgICAgICByZXR1cm4gXCJQUk9HUkFNX1JFRkVSRU5DRV9DT1VOVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBST0dSQU1fQ09OVEVYVDpcbiAgICAgICAgICAgIHJldHVybiBcIlBST0dSQU1fQ09OVEVYVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBST0dSQU1fTlVNX0RFVklDRVM6XG4gICAgICAgICAgICByZXR1cm4gXCJQUk9HUkFNX05VTV9ERVZJQ0VTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUFJPR1JBTV9ERVZJQ0VTOlxuICAgICAgICAgICAgcmV0dXJuIFwiUFJPR1JBTV9ERVZJQ0VTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUFJPR1JBTV9TT1VSQ0U6XG4gICAgICAgICAgICByZXR1cm4gXCJQUk9HUkFNX1NPVVJDRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBST0dSQU1fQklOQVJZX1NJWkVTOlxuICAgICAgICAgICAgcmV0dXJuIFwiUFJPR1JBTV9CSU5BUllfU0laRVNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QUk9HUkFNX0JJTkFSSUVTOlxuICAgICAgICAgICAgcmV0dXJuIFwiUFJPR1JBTV9CSU5BUklFU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBST0dSQU1fQlVJTERfU1RBVFVTOlxuICAgICAgICAgICAgcmV0dXJuIFwiUFJPR1JBTV9CVUlMRF9TVEFUVVNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QUk9HUkFNX0JVSUxEX09QVElPTlM6XG4gICAgICAgICAgICByZXR1cm4gXCJQUk9HUkFNX0JVSUxEX09QVElPTlNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QUk9HUkFNX0JVSUxEX0xPRzpcbiAgICAgICAgICAgIHJldHVybiBcIlBST0dSQU1fQlVJTERfTE9HXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQlVJTERfU1VDQ0VTUzpcbiAgICAgICAgICAgIHJldHVybiBcIkJVSUxEX1NVQ0NFU1NcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5CVUlMRF9OT05FOlxuICAgICAgICAgICAgcmV0dXJuIFwiQlVJTERfTk9ORVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkJVSUxEX0VSUk9SOlxuICAgICAgICAgICAgcmV0dXJuIFwiQlVJTERfRVJST1JcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5CVUlMRF9JTl9QUk9HUkVTUzpcbiAgICAgICAgICAgIHJldHVybiBcIkJVSUxEX0lOX1BST0dSRVNTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuS0VSTkVMX0ZVTkNUSU9OX05BTUU6XG4gICAgICAgICAgICByZXR1cm4gXCJLRVJORUxfRlVOQ1RJT05fTkFNRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLktFUk5FTF9OVU1fQVJHUzpcbiAgICAgICAgICAgIHJldHVybiBcIktFUk5FTF9OVU1fQVJHU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLktFUk5FTF9SRUZFUkVOQ0VfQ09VTlQ6XG4gICAgICAgICAgICByZXR1cm4gXCJLRVJORUxfUkVGRVJFTkNFX0NPVU5UXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuS0VSTkVMX0NPTlRFWFQ6XG4gICAgICAgICAgICByZXR1cm4gXCJLRVJORUxfQ09OVEVYVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLktFUk5FTF9QUk9HUkFNOlxuICAgICAgICAgICAgcmV0dXJuIFwiS0VSTkVMX1BST0dSQU1cIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5LRVJORUxfV09SS19HUk9VUF9TSVpFOlxuICAgICAgICAgICAgcmV0dXJuIFwiS0VSTkVMX1dPUktfR1JPVVBfU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLktFUk5FTF9DT01QSUxFX1dPUktfR1JPVVBfU0laRTpcbiAgICAgICAgICAgIHJldHVybiBcIktFUk5FTF9DT01QSUxFX1dPUktfR1JPVVBfU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLktFUk5FTF9MT0NBTF9NRU1fU0laRTpcbiAgICAgICAgICAgIHJldHVybiBcIktFUk5FTF9MT0NBTF9NRU1fU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkVWRU5UX0NPTU1BTkRfUVVFVUU6XG4gICAgICAgICAgICByZXR1cm4gXCJFVkVOVF9DT01NQU5EX1FVRVVFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuRVZFTlRfQ09NTUFORF9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIFwiRVZFTlRfQ09NTUFORF9UWVBFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuRVZFTlRfUkVGRVJFTkNFX0NPVU5UOlxuICAgICAgICAgICAgcmV0dXJuIFwiRVZFTlRfUkVGRVJFTkNFX0NPVU5UXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuRVZFTlRfQ09NTUFORF9FWEVDVVRJT05fU1RBVFVTOlxuICAgICAgICAgICAgcmV0dXJuIFwiRVZFTlRfQ09NTUFORF9FWEVDVVRJT05fU1RBVFVTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQ09NTUFORF9ORFJBTkdFX0tFUk5FTDpcbiAgICAgICAgICAgIHJldHVybiBcIkNPTU1BTkRfTkRSQU5HRV9LRVJORUxcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT01NQU5EX1RBU0s6XG4gICAgICAgICAgICByZXR1cm4gXCJDT01NQU5EX1RBU0tcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT01NQU5EX05BVElWRV9LRVJORUw6XG4gICAgICAgICAgICByZXR1cm4gXCJDT01NQU5EX05BVElWRV9LRVJORUxcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT01NQU5EX1JFQURfQlVGRkVSOlxuICAgICAgICAgICAgcmV0dXJuIFwiQ09NTUFORF9SRUFEX0JVRkZFUlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkNPTU1BTkRfV1JJVEVfQlVGRkVSOlxuICAgICAgICAgICAgcmV0dXJuIFwiQ09NTUFORF9XUklURV9CVUZGRVJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT01NQU5EX0NPUFlfQlVGRkVSOlxuICAgICAgICAgICAgcmV0dXJuIFwiQ09NTUFORF9DT1BZX0JVRkZFUlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkNPTU1BTkRfUkVBRF9JTUFHRTpcbiAgICAgICAgICAgIHJldHVybiBcIkNPTU1BTkRfUkVBRF9JTUFHRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkNPTU1BTkRfV1JJVEVfSU1BR0U6XG4gICAgICAgICAgICByZXR1cm4gXCJDT01NQU5EX1dSSVRFX0lNQUdFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQ09NTUFORF9DT1BZX0lNQUdFOlxuICAgICAgICAgICAgcmV0dXJuIFwiQ09NTUFORF9DT1BZX0lNQUdFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQ09NTUFORF9DT1BZX0lNQUdFX1RPX0JVRkZFUjpcbiAgICAgICAgICAgIHJldHVybiBcIkNPTU1BTkRfQ09QWV9JTUFHRV9UT19CVUZGRVJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT01NQU5EX0NPUFlfQlVGRkVSX1RPX0lNQUdFOlxuICAgICAgICAgICAgcmV0dXJuIFwiQ09NTUFORF9DT1BZX0JVRkZFUl9UT19JTUFHRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkNPTU1BTkRfTUFQX0JVRkZFUjpcbiAgICAgICAgICAgIHJldHVybiBcIkNPTU1BTkRfTUFQX0JVRkZFUlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkNPTU1BTkRfTUFQX0lNQUdFOlxuICAgICAgICAgICAgcmV0dXJuIFwiQ09NTUFORF9NQVBfSU1BR0VcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT01NQU5EX1VOTUFQX01FTV9PQkpFQ1Q6XG4gICAgICAgICAgICByZXR1cm4gXCJDT01NQU5EX1VOTUFQX01FTV9PQkpFQ1RcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT01NQU5EX01BUktFUjpcbiAgICAgICAgICAgIHJldHVybiBcIkNPTU1BTkRfTUFSS0VSXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQ09NTUFORF9XQUlUX0ZPUl9FVkVOVFM6XG4gICAgICAgICAgICByZXR1cm4gXCJDT01NQU5EX1dBSVRfRk9SX0VWRU5UU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkNPTU1BTkRfQkFSUklFUjpcbiAgICAgICAgICAgIHJldHVybiBcIkNPTU1BTkRfQkFSUklFUlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkNPTU1BTkRfQUNRVUlSRV9HTF9PQkpFQ1RTOlxuICAgICAgICAgICAgcmV0dXJuIFwiQ09NTUFORF9BQ1FVSVJFX0dMX09CSkVDVFNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT01NQU5EX1JFTEVBU0VfR0xfT0JKRUNUUzpcbiAgICAgICAgICAgIHJldHVybiBcIkNPTU1BTkRfUkVMRUFTRV9HTF9PQkpFQ1RTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQ09NUExFVEU6XG4gICAgICAgICAgICByZXR1cm4gXCJDT01QTEVURVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlJVTk5JTkc6XG4gICAgICAgICAgICByZXR1cm4gXCJSVU5OSU5HXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuU1VCTUlUVEVEOlxuICAgICAgICAgICAgcmV0dXJuIFwiU1VCTUlUVEVEXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUVVFVUVEOlxuICAgICAgICAgICAgcmV0dXJuIFwiUVVFVUVEXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUFJPRklMSU5HX0NPTU1BTkRfUVVFVUVEOlxuICAgICAgICAgICAgcmV0dXJuIFwiUFJPRklMSU5HX0NPTU1BTkRfUVVFVUVEXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUFJPRklMSU5HX0NPTU1BTkRfU1VCTUlUOlxuICAgICAgICAgICAgcmV0dXJuIFwiUFJPRklMSU5HX0NPTU1BTkRfU1VCTUlUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUFJPRklMSU5HX0NPTU1BTkRfU1RBUlQ6XG4gICAgICAgICAgICByZXR1cm4gXCJQUk9GSUxJTkdfQ09NTUFORF9TVEFSVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBST0ZJTElOR19DT01NQU5EX0VORDpcbiAgICAgICAgICAgIHJldHVybiBcIlBST0ZJTElOR19DT01NQU5EX0VORFwiO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDTGJvb2xlYW4sIENMZW51bSwgQ0x1aW50IH0gZnJvbSBcIi4vd2ViY2x0eXBlXCI7XG5pbXBvcnQgeyBXZWJDTEJ1ZmZlciB9IGZyb20gJy4vd2ViY2xidWZmZXInO1xuaW1wb3J0IHsgV2ViQ0xDb21tYW5kUXVldWUgfSBmcm9tICcuL3dlYmNsY29tbWFuZHF1ZXVlJztcbmltcG9ydCB7IFdlYkNMRGV2aWNlIH0gZnJvbSBcIi4vd2ViY2xkZXZpY2VcIjtcbmltcG9ydCB7IFdlYkNMSW1hZ2UgfSBmcm9tICcuL3dlYmNsaW1hZ2UnO1xuaW1wb3J0IHsgV2ViQ0xJbWFnZURlc2NyaXB0b3IgfSBmcm9tICcuL3dlYmNsaW1hZ2VkZXNjcmlwdG9yJztcbmltcG9ydCB7IFdlYkNMUHJvZ3JhbSB9IGZyb20gJy4vd2ViY2xwcm9ncmFtJztcbmltcG9ydCB7IFdlYkNMU2FtcGxlciB9IGZyb20gJy4vd2ViY2xzYW1wbGVyJztcbmltcG9ydCB7IFdlYkNMRXhjZXB0aW9uIH0gZnJvbSBcIi4vd2ViY2xleGNlcHRpb25cIjtcbmltcG9ydCB7IFdlYkNMQ29uc3RhbnRTdHIsIFdlYkNMQ29uc3RhbnRzIH0gZnJvbSBcIi4vd2ViY2xjb25zdGFudHNcIjtcbmltcG9ydCB7IFdlYkNMVXNlckV2ZW50IH0gZnJvbSAnLi93ZWJjbHVzZXJldmVudCc7XG5pbXBvcnQgeyBXZWJDTFBsYXRmb3JtIH0gZnJvbSBcIi4vd2ViY2xwbGF0Zm9ybVwiO1xuXG5leHBvcnQgY2xhc3MgV2ViQ0xDb250ZXh0IHtcbiAgICAvLyBXZWJDTCBPYmplY3RcbiAgICB3Y2xQbGF0Zm9ybTogV2ViQ0xQbGF0Zm9ybTtcbiAgICB3Y2xEZXZpY2U6IFdlYkNMRGV2aWNlO1xuXG4gICAgY29uc3RydWN0b3Iod2NsX3BsYXRmb3JtOiBXZWJDTFBsYXRmb3JtLCB3Y2xfZGV2aWNlOiBXZWJDTERldmljZSkge1xuICAgICAgICB0aGlzLndjbFBsYXRmb3JtID0gd2NsX3BsYXRmb3JtO1xuICAgICAgICB0aGlzLndjbERldmljZSA9IHdjbF9kZXZpY2U7XG4gICAgfVxuXG4gICAgY3JlYXRlQnVmZmVyKG1lbUZsYWdzOiBDTGVudW0sIHNpemVJbkJ5dGVzOiBDTHVpbnQsIGhvc3RQdHI/OiBBcnJheUJ1ZmZlclZpZXcgfCBudWxsKTogV2ViQ0xCdWZmZXIge1xuICAgICAgICBpZiAobWVtRmxhZ3MgIT0gV2ViQ0xDb25zdGFudHMuTUVNX1JFQURfV1JJVEUgJiYgbWVtRmxhZ3MgIT0gV2ViQ0xDb25zdGFudHMuTUVNX1dSSVRFX09OTFkgJiYgbWVtRmxhZ3MgIT0gV2ViQ0xDb25zdGFudHMuTUVNX1JFQURfT05MWSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFdlYkNMRXhjZXB0aW9uKFdlYkNMQ29uc3RhbnRzLklOVkFMSURfVkFMVUUsIFwiW0lOVkFMSURfVkFMVUVdIFdlYkNMQ29udGV4dC5jcmVhdGVCdWZmZXIoKVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2l6ZUluQnl0ZXMgPT0gMCB8fCBzaXplSW5CeXRlcyA+IHRoaXMud2NsRGV2aWNlLmdldEluZm8oV2ViQ0xDb25zdGFudHMuREVWSUNFX01BWF9NRU1fQUxMT0NfU0laRSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBXZWJDTEV4Y2VwdGlvbihXZWJDTENvbnN0YW50cy5JTlZBTElEX0JVRkZFUl9TSVpFLCBcIltJTlZBTElEX0JVRkZFUl9TSVpFXSBXZWJDTENvbnRleHQuY3JlYXRlQnVmZmVyKClcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhvc3RQdHIgIT0gbnVsbCAmJiBob3N0UHRyLmJ5dGVMZW5ndGggPCBzaXplSW5CeXRlcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFdlYkNMRXhjZXB0aW9uKFdlYkNMQ29uc3RhbnRzLklOVkFMSURfSE9TVF9QVFIsIFwiW0lOVkFMSURfSE9TVF9QVFJdIFdlYkNMQ29udGV4dC5jcmVhdGVCdWZmZXIoKVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgV2ViQ0xCdWZmZXIodGhpcywgbWVtRmxhZ3MsIHNpemVJbkJ5dGVzLCBob3N0UHRyKTtcbiAgICB9XG5cbiAgICBjcmVhdGVDb21tYW5kUXVldWUoXz86IFdlYkNMRGV2aWNlIHwgbnVsbCwgcHJvcGVydGllcz86IENMZW51bSk6IFdlYkNMQ29tbWFuZFF1ZXVlIHtcblxuICAgICAgICAvLyBFeGNlcHRpb25zOlxuICAgICAgICAvLyBgSU5WQUxJRF9PUEVSQVRJT05gIC0tIGlmIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGZyb20gYSBXZWJDTENhbGxiYWNrXG4gICAgICAgIC8vIGBJTlZBTElEX0RFVklDRWAgLS0gaWYgYGRldmljZWAgaXMgaW52YWxpZCBvciBub3QgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY29udGV4dFxuICAgICAgICAvLyBgSU5WQUxJRF9WQUxVRWAgLS0gaWYgdmFsdWVzIHNwZWNpZmllZCBpbiBgcHJvcGVydGllc2AgYXJlIG5vdCB2YWxpZFxuICAgICAgICAvLyBgSU5WQUxJRF9RVUVVRV9QUk9QRVJUSUVTYCAtLSBpZiB2YWx1ZXMgc3BlY2lmaWVkIGluIGBwcm9wZXJ0aWVzYCBhcmUgdmFsaWQgYnV0IG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGRldmljZVxuXG4gICAgICAgIHJldHVybiBuZXcgV2ViQ0xDb21tYW5kUXVldWUodGhpcy53Y2xEZXZpY2UsIHByb3BlcnRpZXMpO1xuICAgIH1cblxuICAgIGNyZWF0ZUltYWdlKG1lbUZsYWdzOiBDTGVudW0sIGRlc2NyaXB0b3I6IFdlYkNMSW1hZ2VEZXNjcmlwdG9yLCBob3N0UHRyPzogQXJyYXlCdWZmZXJWaWV3KTogV2ViQ0xJbWFnZSB7XG4gICAgICAgIG1lbUZsYWdzO1xuICAgICAgICBkZXNjcmlwdG9yO1xuICAgICAgICBob3N0UHRyO1xuXG4gICAgICAgIC8vIEV4Y2VwdGlvbnM6XG4gICAgICAgIC8vIGBJTlZBTElEX1ZBTFVFYCAtLSBpZiBgbWVtRmxhZ3NgIGlzIG5vdGBNRU1fUkVBRF9XUklURWAsIGBNRU1fV1JJVEVfT05MWWAsIG9yYE1FTV9SRUFEX09OTFlgXG4gICAgICAgIC8vIGBJTlZBTElEX0lNQUdFX1NJWkVgIC0tIGlmIGRlc2NyaXB0b3Iud2lkdGggPT0gMCB8fCBkZXNjcmlwdG9yLndpZHRoID4gREVWSUNFX0lNQUdFMkRfTUFYX1dJRFRIXG4gICAgICAgIC8vIGBJTlZBTElEX0lNQUdFX1NJWkVgIC0tIGlmIGRlc2NyaXB0b3IuaGVpZ2h0ID09IDAgfHwgZGVzY3JpcHRvci5oZWlnaHQgPiBERVZJQ0VfSU1BR0UyRF9NQVhfSEVJR0hUXG4gICAgICAgIC8vIGBJTlZBTElEX0lNQUdFX1NJWkVgIC0tIGlmIGhvc3RQdHIgPT09IG51bGwgJiYgZGVzY3JpcHRvci5yb3dQaXRjaCAhPT0gMFxuICAgICAgICAvLyBgSU5WQUxJRF9JTUFHRV9TSVpFYCAtLSBpZiBob3N0UHRyICE9PSBudWxsICYmIGRlc2NyaXB0b3Iucm93UGl0Y2ggPiAwICYmIGRlc2NyaXB0b3Iucm93UGl0Y2ggPCBkZXNjcmlwdG9yLndpZHRoICogYnl0ZXNQZXJQaXhlbFxuICAgICAgICAvLyBgSU5WQUxJRF9IT1NUX1BUUmAgLS0gaWYgaG9zdFB0ci5ieXRlTGVuZ3RoIDwgZGVzY3JpcHRvci5yb3dQaXRjaCAqIGRlc2NyaXB0b3IuaGVpZ2h0XG4gICAgICAgIC8vIGBJTlZBTElEX0lNQUdFX0ZPUk1BVF9ERVNDUklQVE9SYCAtLSBpZiBgZGVzY3JpcHRvci5jaGFubmVsT3JkZXJgIG9yIGBkZXNjcmlwdG9yLmNoYW5uZWxUeXBlYCBpcyBub3QgdmFsaWRcbiAgICAgICAgLy8gYElNQUdFX0ZPUk1BVF9OT1RfU1VQUE9SVEVEYCAtLSBpZiB0aGUgZ2l2ZW4gY29tYmluYXRpb25gY2hhbm5lbE9yZGVyYCwgYGNoYW5uZWxUeXBlYCBhbmQgYG1lbUZsYWdzYCBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgV2ViQ0xDb250ZXh0XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY3JlYXRlUHJvZ3JhbShzb3VyY2U6IHN0cmluZyk6IFdlYkNMUHJvZ3JhbSB7XG4gICAgICAgIC8vIEV4Y2VwdGlvbnM6XG4gICAgICAgIC8vIGBJTlZBTElEX1ZBTFVFYCAtLSBpZiBgc291cmNlYCBpcyBgbnVsbGAgb3IgZW1wdHlcblxuICAgICAgICByZXR1cm4gbmV3IFdlYkNMUHJvZ3JhbSh0aGlzLndjbFBsYXRmb3JtLCB0aGlzLndjbERldmljZSwgdGhpcywgc291cmNlKTtcbiAgICB9XG5cblxuICAgIGNyZWF0ZVNhbXBsZXIobm9ybWFsaXplZENvb3JkczogQ0xib29sZWFuLCBhZGRyZXNzaW5nTW9kZTogQ0xlbnVtLCBmaWx0ZXJNb2RlOiBDTGVudW0pOiBXZWJDTFNhbXBsZXIge1xuICAgICAgICBub3JtYWxpemVkQ29vcmRzO1xuICAgICAgICBhZGRyZXNzaW5nTW9kZTtcbiAgICAgICAgZmlsdGVyTW9kZTtcblxuICAgICAgICAvLyBFeGNlcHRpb25zOlxuICAgICAgICAvLyBgSU5WQUxJRF9WQUxVRWAgLS0gaWYgYGFkZHJlc3NpbmdNb2RlYCBpcyBub3RgQUREUkVTU19DTEFNUGAsIGBBRERSRVNTX0NMQU1QX1RPX0VER0VgLCBgQUREUkVTU19SRVBFQVRgLCBvcmBBRERSRVNTX01JUlJPUkVEX1JFUEVBVGBcbiAgICAgICAgLy8gYElOVkFMSURfVkFMVUVgIC0tIGlmIGBmaWx0ZXJNb2RlYCBpcyBub3QgYEZJTFRFUl9ORUFSRVNUYCBvcmBGSUxURVJfTElORUFSYFxuICAgICAgICAvLyBgSU5WQUxJRF9WQUxVRWAgLS0gaWYgYG5vcm1hbGl6ZWRDb29yZHNgIGlzIGBmYWxzZWAgYW5kIGBhZGRyZXNzaW5nTW9kZWAgaXMgYEFERFJFU1NfUkVQRUFUYCBvcmBBRERSRVNTX01JUlJPUkVEX1JFUEVBVGBcblxuICAgICAgICByZXR1cm4gbmV3IFdlYkNMU2FtcGxlcigpO1xuXG4gICAgfVxuXG4gICAgY3JlYXRlVXNlckV2ZW50KCk6IFdlYkNMVXNlckV2ZW50IHtcbiAgICAgICAgcmV0dXJuIG5ldyBXZWJDTFVzZXJFdmVudCgpO1xuICAgIH1cblxuICAgIGdldEluZm8obmFtZTogQ0xlbnVtKTogYW55IHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXZWJDTEV4Y2VwdGlvbihXZWJDTENvbnN0YW50cy5JTlZBTElEX1ZBTFVFLCBcIltJTlZBTElEX1ZBTFVFXSBXZWJDTENvbnRleHQuZ2V0SW5mbygpOiB1bmtub3duIHBhcmFtZXRlciAnXCIgKyBXZWJDTENvbnN0YW50U3RyKG5hbWUpICsgXCInXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U3VwcG9ydGVkSW1hZ2VGb3JtYXRzKG1lbUZsYWdzPzogQ0xlbnVtKTogQXJyYXk8V2ViQ0xJbWFnZURlc2NyaXB0b3I+IHwgbnVsbCB7XG4gICAgICAgIGlmIChtZW1GbGFncyAhPSBudWxsICYmIG1lbUZsYWdzICE9IFdlYkNMQ29uc3RhbnRzLk1FTV9SRUFEX1dSSVRFICYmIG1lbUZsYWdzICE9IFdlYkNMQ29uc3RhbnRzLk1FTV9XUklURV9PTkxZICYmIG1lbUZsYWdzICE9IFdlYkNMQ29uc3RhbnRzLk1FTV9SRUFEX09OTFkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBXZWJDTEV4Y2VwdGlvbihXZWJDTENvbnN0YW50cy5JTlZBTElEX1ZBTFVFLCBcIltJTlZBTElEX1ZBTFVFXSBXZWJDTENvbnRleHQuZ2V0U3VwcG9ydGVkSW1hZ2VGb3JtYXRzKCk6IHVua25vd24gcGFyYW1ldGVyICdcIiArIChtZW1GbGFncykgKyBcIidcIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZWxlYXNlKCk6IHZvaWQge1xuXG4gICAgfVxuXG4gICAgcmVsZWFzZUFsbCgpOiB2b2lkIHtcblxuICAgIH1cbn1cbiIsImltcG9ydCB7IFdlYkNMQ29uc3RhbnRTdHIsIFdlYkNMQ29uc3RhbnRzIH0gZnJvbSBcIi4vd2ViY2xjb25zdGFudHNcIjtcbmltcG9ydCB7IFdlYkNMRXhjZXB0aW9uIH0gZnJvbSBcIi4vd2ViY2xleGNlcHRpb25cIjtcbmltcG9ydCB7IFdlYkNMUGxhdGZvcm0gfSBmcm9tIFwiLi93ZWJjbHBsYXRmb3JtXCI7XG5pbXBvcnQgeyBDTGJvb2xlYW4sIENMZW51bSB9IGZyb20gXCIuL3dlYmNsdHlwZVwiO1xuXG5leHBvcnQgY2xhc3MgV2ViQ0xEZXZpY2Uge1xuICAgIC8vIFdlYkdQVSBPYmplY3RzXG4gICAgd2dwdUluZm86IEdQVUFkYXB0ZXJJbmZvO1xuICAgIHdncHVEZXZpY2U6IEdQVURldmljZTtcblxuICAgIC8vIFdlYkNMIE9iamVjdHNcbiAgICB3Y2xQbGF0Zm9ybTogV2ViQ0xQbGF0Zm9ybTtcblxuICAgIGNvbnN0cnVjdG9yKHdjbF9wbGF0Zm9ybTogV2ViQ0xQbGF0Zm9ybSwgd2dwdV9pbmZvOiBHUFVBZGFwdGVySW5mbywgd2dwdV9kZXZpY2U6IEdQVURldmljZSkge1xuICAgICAgICB0aGlzLndjbFBsYXRmb3JtID0gd2NsX3BsYXRmb3JtO1xuICAgICAgICB0aGlzLndncHVJbmZvID0gd2dwdV9pbmZvO1xuICAgICAgICB0aGlzLndncHVEZXZpY2UgPSB3Z3B1X2RldmljZTtcbiAgICB9XG5cbiAgICBmbnYxYShzdHI6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGxldCBoYXNoID0gMjE2NjEzNjI2MTsgLy8gRk5WIG9mZnNldCBiYXNpc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaGFzaCBePSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgIGhhc2ggKj0gMTY3Nzc2MTk7IC8vIEZOViBwcmltZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYXNoID4+PiAwOyAvLyBFbnN1cmUgdW5zaWduZWQgMzItYml0IGludGVnZXJcbiAgICB9XG5cbiAgICBnZXRJbmZvKG5hbWU6IENMZW51bSk6IGFueSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfVFlQRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gV2ViQ0xDb25zdGFudHMuREVWSUNFX1RZUEVfR1BVO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfVkVORE9SX0lEOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZudjFhKHRoaXMud2dwdUluZm8udmVuZG9yKTtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX01BWF9DT01QVVRFX1VOSVRTOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndncHVEZXZpY2UubGltaXRzLm1heEJpbmRHcm91cHM7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfV09SS19JVEVNX0RJTUVOU0lPTlM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfV09SS19HUk9VUF9TSVpFOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndncHVEZXZpY2UubGltaXRzLm1heENvbXB1dGVJbnZvY2F0aW9uc1Blcldvcmtncm91cDtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX01BWF9XT1JLX0lURU1fU0laRVM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53Z3B1RGV2aWNlLmxpbWl0cy5tYXhDb21wdXRlV29ya2dyb3VwU2l6ZVgsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2dwdURldmljZS5saW1pdHMubWF4Q29tcHV0ZVdvcmtncm91cFNpemVZLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLndncHVEZXZpY2UubGltaXRzLm1heENvbXB1dGVXb3JrZ3JvdXBTaXplWixcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUFJFRkVSUkVEX1ZFQ1RPUl9XSURUSF9DSEFSOlxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUFJFRkVSUkVEX1ZFQ1RPUl9XSURUSF9TSE9SVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfSU5UOlxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUFJFRkVSUkVEX1ZFQ1RPUl9XSURUSF9MT05HOlxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUFJFRkVSUkVEX1ZFQ1RPUl9XSURUSF9GTE9BVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX01BWF9DTE9DS19GUkVRVUVOQ1k6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9BRERSRVNTX0JJVFM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDMyO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTUFYX1JFQURfSU1BR0VfQVJHUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gODtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX01BWF9XUklURV9JTUFHRV9BUkdTOlxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTUFYX01FTV9BTExPQ19TSVpFOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndncHVEZXZpY2UubGltaXRzLm1heEJ1ZmZlclNpemU7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9JTUFHRTJEX01BWF9XSURUSDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53Z3B1RGV2aWNlLmxpbWl0cy5tYXhUZXh0dXJlRGltZW5zaW9uMkQ7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9JTUFHRTJEX01BWF9IRUlHSFQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2dwdURldmljZS5saW1pdHMubWF4VGV4dHVyZURpbWVuc2lvbjJEO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfSU1BR0UzRF9NQVhfV0lEVEg6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2dwdURldmljZS5saW1pdHMubWF4VGV4dHVyZURpbWVuc2lvbjNEO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfSU1BR0UzRF9NQVhfSEVJR0hUOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndncHVEZXZpY2UubGltaXRzLm1heFRleHR1cmVEaW1lbnNpb24zRDtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0lNQUdFM0RfTUFYX0RFUFRIOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndncHVEZXZpY2UubGltaXRzLm1heFRleHR1cmVEaW1lbnNpb24zRDtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0lNQUdFX1NVUFBPUlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfUEFSQU1FVEVSX1NJWkU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1NjtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX01BWF9TQU1QTEVSUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gODtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX01FTV9CQVNFX0FERFJfQUxJR046XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE2ICogMzI7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9TSU5HTEVfRlBfQ09ORklHOlxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfR0xPQkFMX01FTV9DQUNIRV9UWVBFOlxuICAgICAgICAgICAgICAgIHJldHVybiBXZWJDTENvbnN0YW50cy5SRUFEX1dSSVRFX0NBQ0hFO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfR0xPQkFMX01FTV9DQUNIRUxJTkVfU0laRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0dMT0JBTF9NRU1fQ0FDSEVfU0laRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0dMT0JBTF9NRU1fU0laRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTAyNCAqIDEwMjQ7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfQ09OU1RBTlRfQlVGRkVSX1NJWkU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEwMjQ7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfQ09OU1RBTlRfQVJHUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gNDtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0xPQ0FMX01FTV9UWVBFOlxuICAgICAgICAgICAgICAgIHJldHVybiBXZWJDTENvbnN0YW50cy5MT0NBTDtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0xPQ0FMX01FTV9TSVpFOlxuICAgICAgICAgICAgICAgIHJldHVybiAxMDI0O1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfRVJST1JfQ09SUkVDVElPTl9TVVBQT1JUOlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BST0ZJTElOR19USU1FUl9SRVNPTFVUSU9OOlxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfRU5ESUFOX0xJVFRMRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0FWQUlMQUJMRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0NPTVBJTEVSX0FWQUlMQUJMRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0VYRUNVVElPTl9DQVBBQklMSVRJRVM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFdlYkNMQ29uc3RhbnRzLkVYRUNfS0VSTkVMO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUVVFVUVfUFJPUEVSVElFUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX05BTUU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2dwdUluZm8uZGV2aWNlO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfVkVORE9SOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndncHVJbmZvLnZlbmRvcjtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuRFJJVkVSX1ZFUlNJT046XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiMS4wXCI7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9QUk9GSUxFOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIldFQkNMX1BST0ZJTEUgXCIgKyB0aGlzLndncHVJbmZvLnZlbmRvcjtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1ZFUlNJT046XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiV0VCQ0wgMS4wIFwiICsgdGhpcy53Z3B1SW5mby52ZW5kb3I7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9FWFRFTlNJT05TOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN1cHBvcnRlZEV4dGVuc2lvbnMoKS5qb2luKFwiIFwiKTtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BMQVRGT1JNOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndjbFBsYXRmb3JtO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfSE9TVF9VTklGSUVEX01FTU9SWTpcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX0NIQVI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX1NIT1JUOlxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTkFUSVZFX1ZFQ1RPUl9XSURUSF9JTlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX0xPTkc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX0ZMT0FUOlxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfT1BFTkNMX0NfVkVSU0lPTjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJXRUJDTCBDIDEuMCBcIiArIHRoaXMud2dwdUluZm8udmVuZG9yO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUFJFRkVSUkVEX1ZFQ1RPUl9XSURUSF9ET1VCTEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NSU5fREFUQV9UWVBFX0FMSUdOX1NJWkU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXZWJDTEV4Y2VwdGlvbihXZWJDTENvbnN0YW50cy5JTlZBTElEX1ZBTFVFLCBcIltJTlZBTElEX1ZBTFVFXSBXZWJDTERldmljZS5nZXRJbmZvKCk6IHVua25vd24gcGFyYW1ldGVyICdcIiArIFdlYkNMQ29uc3RhbnRTdHIobmFtZSkgKyBcIidcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTdXBwb3J0ZWRFeHRlbnNpb25zKCk6IEFycmF5PHN0cmluZz4gfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2NsUGxhdGZvcm0uZ2V0U3VwcG9ydGVkRXh0ZW5zaW9ucygpO1xuICAgIH1cblxuICAgIGVuYWJsZUV4dGVuc2lvbihleHRlbnNpb25OYW1lOiBzdHJpbmcpOiBDTGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy53Y2xQbGF0Zm9ybS5lbmFibGVFeHRlbnNpb24oZXh0ZW5zaW9uTmFtZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgV2ViQ0xDb25zdGFudFN0ciwgV2ViQ0xDb25zdGFudHMgfSBmcm9tIFwiLi93ZWJjbGNvbnN0YW50c1wiO1xuaW1wb3J0IHsgV2ViQ0xFeGNlcHRpb24gfSBmcm9tIFwiLi93ZWJjbGV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQ0xlbnVtLCBDTHVsb25nLCBXZWJDTENhbGxiYWNrIH0gZnJvbSBcIi4vd2ViY2x0eXBlXCI7XG5cbmV4cG9ydCBjbGFzcyBXZWJDTEV2ZW50IHtcblxuICAgIGdldEluZm8obmFtZTogQ0xlbnVtKTogYW55IHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXZWJDTEV4Y2VwdGlvbihXZWJDTENvbnN0YW50cy5JTlZBTElEX1ZBTFVFLCBcIltJTlZBTElEX1ZBTFVFXSBXZWJDTEV2ZW50LmdldEluZm8oKTogdW5rbm93biBwYXJhbWV0ZXIgJ1wiICsgV2ViQ0xDb25zdGFudFN0cihuYW1lKSArIFwiJ1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFByb2ZpbGluZ0luZm8obmFtZTogQ0xlbnVtKTogQ0x1bG9uZyB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgV2ViQ0xFeGNlcHRpb24oV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9WQUxVRSwgXCJbSU5WQUxJRF9WQUxVRV0gV2ViQ0xFdmVudC5nZXRQcm9maWxpbmdJbmZvKCk6IHVua25vd24gcGFyYW1ldGVyICdcIiArIFdlYkNMQ29uc3RhbnRTdHIobmFtZSkgKyBcIidcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgc2V0Q2FsbGJhY2soY29tbWFuZEV4ZWNDYWxsYmFja1R5cGU6IENMZW51bSwgbm90aWZ5OiBXZWJDTENhbGxiYWNrKTogdm9pZCB7XG4gICAgICAgIGNvbW1hbmRFeGVjQ2FsbGJhY2tUeXBlO1xuICAgICAgICBub3RpZnk7XG4gICAgfVxuXG4gICAgcmVsZWFzZSgpOiB2b2lkIHtcblxuICAgIH1cbn1cbiIsImltcG9ydCB7IFdlYkNMQ29uc3RhbnRzIH0gZnJvbSBcIi4vd2ViY2xjb25zdGFudHNcIjtcblxuZXhwb3J0IGNsYXNzIFdlYkNMRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Ige1xuICAgIGlkOiBudW1iZXI7IC8vIFVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgZXJyb3JcblxuICAgIGNvbnN0cnVjdG9yKGlkOiBXZWJDTENvbnN0YW50cywgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgLy8gUmVzdG9yZSBwcm90b3R5cGUgY2hhaW5cbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIG5ldy50YXJnZXQucHJvdG90eXBlKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBXZWJDTEltYWdlRGVzY3JpcHRvciB9IGZyb20gXCIuL3dlYmNsaW1hZ2VkZXNjcmlwdG9yXCI7XG5pbXBvcnQgeyBXZWJDTE1lbW9yeU9iamVjdCB9IGZyb20gXCIuL3dlYmNsbWVtb3J5b2JqZWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBXZWJDTEltYWdlIGV4dGVuZHMgV2ViQ0xNZW1vcnlPYmplY3Qge1xuICAgIGdldEluZm8oKTogV2ViQ0xJbWFnZURlc2NyaXB0b3Ige1xuICAgICAgICByZXR1cm4gbmV3IFdlYkNMSW1hZ2VEZXNjcmlwdG9yKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ0xlbnVtLCBDTHVpbnQgfSBmcm9tIFwiLi93ZWJjbHR5cGVcIjtcblxuZXhwb3J0IGNsYXNzIFdlYkNMSW1hZ2VEZXNjcmlwdG9yIHtcbiAgICBjaGFubmVsT3JkZXI/OiBDTGVudW07XG4gICAgY2hhbm5lbFR5cGU/OiBDTGVudW07XG4gICAgd2lkdGg/OiBDTHVpbnQ7XG4gICAgaGVpZ2h0PzogQ0x1aW50O1xuICAgIHJvd1BpdGNoPzogQ0x1aW50O1xufVxuIiwiaW1wb3J0IHsgV2ViQ0xEZXZpY2UgfSBmcm9tIFwiLi93ZWJjbGRldmljZVwiO1xuaW1wb3J0IHsgQ0xlbnVtLCBDTHVpbnQgfSBmcm9tIFwiLi93ZWJjbHR5cGVcIjtcbmltcG9ydCB7IFdlYkNMS2VybmVsQXJnSW5mbyB9IGZyb20gJy4vd2ViY2xrZXJuZWxhcmdpbmZvJztcbmltcG9ydCB7IFdlYkNMQnVmZmVyIH0gZnJvbSBcIi4vd2ViY2xidWZmZXJcIjtcbmltcG9ydCB7IFdlYkNMSW1hZ2UgfSBmcm9tIFwiLi93ZWJjbGltYWdlXCI7XG5pbXBvcnQgeyBXZWJDTFNhbXBsZXIgfSBmcm9tIFwiLi93ZWJjbHNhbXBsZXJcIjtcbmltcG9ydCB7IFdlYkNMQ29uc3RhbnRTdHIsIFdlYkNMQ29uc3RhbnRzIH0gZnJvbSBcIi4vd2ViY2xjb25zdGFudHNcIjtcbmltcG9ydCB7IFdlYkNMRXhjZXB0aW9uIH0gZnJvbSBcIi4vd2ViY2xleGNlcHRpb25cIjtcbmltcG9ydCB7IFdlYkNMUHJvZ3JhbSB9IGZyb20gXCIuL3dlYmNscHJvZ3JhbVwiO1xuaW1wb3J0IHsgV2ViQ0xDb250ZXh0IH0gZnJvbSBcIi4vd2ViY2xjb250ZXh0XCI7XG5cbmV4cG9ydCBjbGFzcyBXZWJDTEtlcm5lbCB7XG4gICAgLy8gV2ViQ0wgb2JqZWN0c1xuICAgIHdjbFByb2dyYW06IFdlYkNMUHJvZ3JhbTtcbiAgICB3Y2xEZXZpY2U6IFdlYkNMRGV2aWNlO1xuICAgIHdjbENvbnRleHQ6IFdlYkNMQ29udGV4dDtcblxuICAgIC8vIE90aGVyIG9iamVjdHNcbiAgICBrZXJuZWxTaWc6IEFycmF5PFdlYkNMS2VybmVsQXJnSW5mbz47XG4gICAga2VybmVsTmFtZTogc3RyaW5nO1xuICAgIGtlcm5lbEJvZHk6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHdjbF9kZXZpY2U6IFdlYkNMRGV2aWNlLCB3Y2xfY29udGV4dDogV2ViQ0xDb250ZXh0LCB3Y2xfcHJvZ3JhbTogV2ViQ0xQcm9ncmFtLCBrZXJuZWxfbmFtZTogc3RyaW5nLCBrZXJuZWxfc2lnOiBBcnJheTxXZWJDTEtlcm5lbEFyZ0luZm8+LCBrZXJuZWxfYm9keTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMua2VybmVsU2lnID0ga2VybmVsX3NpZztcbiAgICAgICAgdGhpcy5rZXJuZWxOYW1lID0ga2VybmVsX25hbWU7XG4gICAgICAgIHRoaXMua2VybmVsQm9keSA9IGtlcm5lbF9ib2R5O1xuICAgICAgICB0aGlzLndjbENvbnRleHQgPSB3Y2xfY29udGV4dDtcbiAgICAgICAgdGhpcy53Y2xEZXZpY2UgPSB3Y2xfZGV2aWNlO1xuICAgICAgICB0aGlzLndjbFByb2dyYW0gPSB3Y2xfcHJvZ3JhbTtcbiAgICB9XG5cbiAgICBnZXRJbmZvKG5hbWU6IENMZW51bSk6IGFueSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5LRVJORUxfRlVOQ1RJT05fU0lHOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmtlcm5lbFNpZztcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuS0VSTkVMX0ZVTkNUSU9OX05BTUU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMua2VybmVsTmFtZTtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuS0VSTkVMX05VTV9BUkdTOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmtlcm5lbFNpZy5sZW5ndGg7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLktFUk5FTF9DT05URVhUOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndjbENvbnRleHQ7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLktFUk5FTF9QUk9HUkFNOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndjbFByb2dyYW07XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXZWJDTEV4Y2VwdGlvbihXZWJDTENvbnN0YW50cy5JTlZBTElEX1ZBTFVFLCBcIltJTlZBTElEX1ZBTFVFXSBXZWJDTEtlcm5lbC5nZXRJbmZvKCk6IHVua25vd24gcGFyYW1ldGVyICdcIiArIFdlYkNMQ29uc3RhbnRTdHIobmFtZSkgKyBcIidcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0V29ya0dyb3VwSW5mbyhfOiBXZWJDTERldmljZSB8IG51bGwsIG5hbWU6IENMZW51bSk6IGFueSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5LRVJORUxfV09SS19HUk9VUF9TSVpFOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndjbERldmljZS5nZXRJbmZvKFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfV09SS19HUk9VUF9TSVpFKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFdlYkNMRXhjZXB0aW9uKFdlYkNMQ29uc3RhbnRzLklOVkFMSURfVkFMVUUsIFwiW0lOVkFMSURfVkFMVUVdIFdlYkNMS2VybmVsLmdldFdvcmtHcm91cEluZm8oKTogdW5rbm93biBwYXJhbWV0ZXIgJ1wiICsgV2ViQ0xDb25zdGFudFN0cihuYW1lKSArIFwiJ1wiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRBcmdJbmZvKGluZGV4OiBDTHVpbnQpOiBXZWJDTEtlcm5lbEFyZ0luZm8ge1xuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMua2VybmVsU2lnLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFdlYkNMRXhjZXB0aW9uKFdlYkNMQ29uc3RhbnRzLklOVkFMSURfQVJHX0lOREVYLCBcIltJTlZBTElEX0FSR19JTkRFWF0gV2ViQ0xLZXJuZWwuZ2V0QXJnSW5mbygpOiBpbnZhbGlkIGluZGV4ICdcIiArIGluZGV4ICsgXCInXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMua2VybmVsU2lnW2luZGV4XTtcbiAgICB9XG5cblxuICAgIHNldEFyZyhpbmRleDogQ0x1aW50LCBhcmc6IFdlYkNMQnVmZmVyIHwgV2ViQ0xJbWFnZSB8IFdlYkNMU2FtcGxlciB8IEFycmF5QnVmZmVyVmlldyk6IHZvaWQge1xuICAgICAgICBpbmRleDtcbiAgICAgICAgYXJnO1xuICAgIH1cblxuICAgIHJlbGVhc2UoKTogdm9pZCB7IH1cblxufVxuIiwiaW1wb3J0IHsgV2ViQ0xDb25zdGFudHMgfSBmcm9tIFwiLi93ZWJjbGNvbnN0YW50c1wiO1xuXG5leHBvcnQgY2xhc3MgV2ViQ0xLZXJuZWxBcmdJbmZvIHtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIHR5cGVOYW1lPzogc3RyaW5nOyAvLyAnY2hhcicsICdmbG9hdCcsICd1aW50NCcsICdpbWFnZTJkX3QnLCAnc2FtcGxlcl90JywgZXRjLlxuICAgIGFkZHJlc3NRdWFsaWZpZXI/OiBzdHJpbmc7IC8vICdnbG9iYWwnLCAnbG9jYWwnLCAnY29uc3RhbnQnLCBvciAncHJpdmF0ZSdcbiAgICBhY2Nlc3NRdWFsaWZpZXI/OiBzdHJpbmc7IC8vICdyZWFkX29ubHknLCAnd3JpdGVfb25seScsIG9yICdub25lJ1xuICAgIC8vXG4gICAgdHlwZTogV2ViQ0xDb25zdGFudHM7XG4gICAgcG9pbnRlcjogYm9vbGVhbjsgLy9cbn1cbiIsImltcG9ydCB7IFdlYkNMQnVmZmVyIH0gZnJvbSBcIi4vd2ViY2xidWZmZXJcIjtcbmltcG9ydCB7IFdlYkNMQ29uc3RhbnRTdHIsIFdlYkNMQ29uc3RhbnRzIH0gZnJvbSBcIi4vd2ViY2xjb25zdGFudHNcIjtcbmltcG9ydCB7IFdlYkNMQ29udGV4dCB9IGZyb20gXCIuL3dlYmNsY29udGV4dFwiO1xuaW1wb3J0IHsgV2ViQ0xFeGNlcHRpb24gfSBmcm9tIFwiLi93ZWJjbGV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQ0xlbnVtLCBDTHVpbnQgfSBmcm9tIFwiLi93ZWJjbHR5cGVcIjtcblxuZXhwb3J0IGNsYXNzIFdlYkNMTWVtb3J5T2JqZWN0IHtcbiAgICBwcm90ZWN0ZWQgd2NsQnVmZmVyOiBXZWJDTEJ1ZmZlcjtcbiAgICBwcm90ZWN0ZWQgd2NsQ29udGV4dDogV2ViQ0xDb250ZXh0O1xuXG4gICAgbWVtb3J5VHlwZTogQ0xlbnVtO1xuICAgIG1lbW9yeUZsYWdzOiBDTGVudW07XG4gICAgbWVtb3J5U2l6ZTogQ0x1aW50O1xuICAgIG1lbW9yeU9mZnNldDogQ0x1aW50O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHdjbF9jb250ZXh0OiBXZWJDTENvbnRleHQsXG4gICAgICAgIG1lbW9yeV90eXBlOiBDTGVudW0sXG4gICAgICAgIG1lbW9yeV9mbGFnczogQ0xlbnVtLFxuICAgICAgICBtZW1vcnlfc2l6ZTogQ0x1aW50LFxuICAgICAgICBtZW1vcnlfb2Zmc2V0OiBDTHVpbnQsXG4gICAgICAgIG1lbW9yeV9vYmplY3Q6IFdlYkNMQnVmZmVyLFxuICAgICkge1xuICAgICAgICB0aGlzLndjbENvbnRleHQgPSB3Y2xfY29udGV4dDtcbiAgICAgICAgdGhpcy5tZW1vcnlUeXBlID0gbWVtb3J5X3R5cGU7XG4gICAgICAgIHRoaXMubWVtb3J5RmxhZ3MgPSBtZW1vcnlfZmxhZ3M7XG4gICAgICAgIHRoaXMubWVtb3J5U2l6ZSA9IG1lbW9yeV9zaXplO1xuICAgICAgICB0aGlzLm1lbW9yeU9mZnNldCA9IG1lbW9yeV9vZmZzZXQ7XG4gICAgICAgIHRoaXMud2NsQnVmZmVyID0gbWVtb3J5X29iamVjdDtcbiAgICB9XG5cbiAgICBnZXRJbmZvKG5hbWU6IENMZW51bSk6IGFueSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NRU1fVFlQRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tZW1vcnlUeXBlO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NRU1fRkxBR1M6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVtb3J5RmxhZ3M7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLk1FTV9TSVpFOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1lbW9yeVNpemU7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLk1FTV9DT05URVhUOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndjbENvbnRleHQ7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLk1FTV9BU1NPQ0lBVEVEX01FTU9CSkVDVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53Y2xCdWZmZXI7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLk1FTV9PRkZTRVQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVtb3J5T2Zmc2V0O1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgV2ViQ0xFeGNlcHRpb24oV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9WQUxVRSwgXCJbSU5WQUxJRF9WQUxVRV0gV2ViQ0xNZW1vcnlPYmplY3QuZ2V0SW5mbygpOiB1bmtub3duIHBhcmFtZXRlciAnXCIgKyBXZWJDTENvbnN0YW50U3RyKG5hbWUpICsgXCInXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbGVhc2UoKTogdm9pZCB7IH1cbn1cbiIsImltcG9ydCB7IFdlYkNMQ29uc3RhbnRTdHIsIFdlYkNMQ29uc3RhbnRzIH0gZnJvbSAnLi93ZWJjbGNvbnN0YW50cyc7XG5pbXBvcnQgeyBDTGVudW0sIENMYm9vbGVhbiB9IGZyb20gJy4vd2ViY2x0eXBlJztcbmltcG9ydCB7IFdlYkNMRGV2aWNlIH0gZnJvbSAnLi93ZWJjbGRldmljZSc7XG5pbXBvcnQgeyBXZWJDTEV4Y2VwdGlvbiB9IGZyb20gJy4vd2ViY2xleGNlcHRpb24nO1xuXG5jbGFzcyBXZWJDTFBsYXRmb3JtIHtcbiAgICAvLyBXZWJHUFUgb2JqZWN0c1xuICAgIHByaXZhdGUgd2dwdUluZm86IEdQVUFkYXB0ZXJJbmZvO1xuXG4gICAgLy8gV2ViQ0wgb2JqZWN0c1xuICAgIHByaXZhdGUgd2NsRGV2aWNlOiBXZWJDTERldmljZTtcblxuICAgIGNvbnN0cnVjdG9yKHdncHVfaW5mbzogR1BVQWRhcHRlckluZm8sIHdncHVfZGV2aWNlOiBHUFVEZXZpY2UpIHtcbiAgICAgICAgdGhpcy53Z3B1SW5mbyA9IHdncHVfaW5mbztcbiAgICAgICAgdGhpcy53Y2xEZXZpY2UgPSBuZXcgV2ViQ0xEZXZpY2UodGhpcywgd2dwdV9pbmZvLCB3Z3B1X2RldmljZSlcbiAgICB9XG5cbiAgICBnZXRJbmZvKG5hbWU6IENMZW51bSk6IGFueSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QTEFURk9STV9QUk9GSUxFOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIldFQkNMX1BST0ZJTEUgXCIgKyB0aGlzLndncHVJbmZvLnZlbmRvcjtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUExBVEZPUk1fVkVSU0lPTjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJXZWJDTCAxLjAgXCIgKyB0aGlzLndncHVJbmZvLnZlbmRvcjtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUExBVEZPUk1fTkFNRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53Z3B1SW5mby52ZW5kb3I7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBMQVRGT1JNX1ZFTkRPUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53Z3B1SW5mby52ZW5kb3I7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBMQVRGT1JNX0VYVEVOU0lPTlM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3VwcG9ydGVkRXh0ZW5zaW9ucygpLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgV2ViQ0xFeGNlcHRpb24oV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9WQUxVRSwgXCJbSU5WQUxJRF9WQUxVRV0gV2ViQ0xQbGF0Zm9ybS5nZXRJbmZvKCk6IHVua25vd24gcGFyYW1ldGVyICdcIiArIFdlYkNMQ29uc3RhbnRTdHIobmFtZSkgKyBcIidcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXREZXZpY2VzKGRldmljZVR5cGU/OiBDTGVudW0pOiBBcnJheTxXZWJDTERldmljZT4ge1xuICAgICAgICBpZiAodGhpcy53Y2xEZXZpY2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFdlYkNMRXhjZXB0aW9uKFdlYkNMQ29uc3RhbnRzLkRFVklDRV9OT1RfRk9VTkQsIFwiW0RFVklDRV9OT1RfRk9VTkRdIFdlYkNMUGxhdGZvcm0uZ2V0RGV2aWNlcygpOiBEZXZpY2Ugbm90IGZvdW5kXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRldmljZVR5cGUgIT0gbnVsbCAmJiBkZXZpY2VUeXBlICE9IFdlYkNMQ29uc3RhbnRzLkRFVklDRV9UWVBFX0NQVSAmJlxuICAgICAgICAgICAgZGV2aWNlVHlwZSAhPSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfVFlQRV9HUFUgJiZcbiAgICAgICAgICAgIGRldmljZVR5cGUgIT0gV2ViQ0xDb25zdGFudHMuREVWSUNFX1RZUEVfQUNDRUxFUkFUT1IgJiZcbiAgICAgICAgICAgIGRldmljZVR5cGUgIT0gV2ViQ0xDb25zdGFudHMuREVWSUNFX1RZUEVfREVGQVVMVCAmJlxuICAgICAgICAgICAgZGV2aWNlVHlwZSAhPSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfVFlQRV9BTEwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBXZWJDTEV4Y2VwdGlvbihXZWJDTENvbnN0YW50cy5JTlZBTElEX1ZBTFVFLCBcIltJTlZBTElEX1ZBTFVFXSBXZWJDTFBsYXRmb3JtLmdldERldmljZXMoKTogdW5rbm93biBkZXZpY2VUeXBlICdcIiArIGRldmljZVR5cGUgKyBcIidcIik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW3RoaXMud2NsRGV2aWNlXVxuICAgIH1cblxuICAgIGdldFN1cHBvcnRlZEV4dGVuc2lvbnMoKTogQXJyYXk8c3RyaW5nPiB8IG51bGwge1xuICAgICAgICByZXR1cm4gW1wiS0hSX2dsX3NoYXJpbmdcIiwgXCJLSFJfZnAxNlwiXTtcbiAgICB9XG5cbiAgICBlbmFibGVFeHRlbnNpb24oZXh0ZW5zaW9uTmFtZTogc3RyaW5nKTogQ0xib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3VwcG9ydGVkRXh0ZW5zaW9ucygpLmluY2x1ZGVzKGV4dGVuc2lvbk5hbWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgV2ViQ0xQbGF0Zm9ybSB9O1xuIiwiaW1wb3J0IHsgV2ViQ0xEZXZpY2UgfSBmcm9tIFwiLi93ZWJjbGRldmljZVwiO1xuaW1wb3J0IHsgQ0xlbnVtLCBXZWJDTENhbGxiYWNrIH0gZnJvbSBcIi4vd2ViY2x0eXBlXCI7XG5pbXBvcnQgeyBXZWJDTEtlcm5lbCB9IGZyb20gJy4vd2ViY2xrZXJuZWwnO1xuaW1wb3J0IHsgV2ViQ0xFeGNlcHRpb24gfSBmcm9tIFwiLi93ZWJjbGV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgV2ViQ0xDb25zdGFudFN0ciwgV2ViQ0xDb25zdGFudHMgfSBmcm9tIFwiLi93ZWJjbGNvbnN0YW50c1wiO1xuaW1wb3J0IHsgV2ViQ0xQbGF0Zm9ybSB9IGZyb20gXCIuL3dlYmNscGxhdGZvcm1cIjtcbmltcG9ydCB7IFdlYkNMQ29udGV4dCB9IGZyb20gXCIuL3dlYmNsY29udGV4dFwiO1xuaW1wb3J0IHsgV2ViQ0xLZXJuZWxBcmdJbmZvIH0gZnJvbSBcIi4vd2ViY2xrZXJuZWxhcmdpbmZvXCI7XG5cbmV4cG9ydCBjbGFzcyBXZWJDTFByb2dyYW0ge1xuXG4gICAgLy8gV2ViR1BVIE9iamVjdHNcbiAgICB3Y2xTaGFkZXI6IEdQVVNoYWRlck1vZHVsZTtcblxuICAgIC8vIFdlYkNMIE9iamVjdHNcbiAgICB3Y2xQbGF0Zm9ybTogV2ViQ0xQbGF0Zm9ybTtcbiAgICB3Y2xEZXZpY2U6IFdlYkNMRGV2aWNlO1xuICAgIHdjbENvbnRleHQ6IFdlYkNMQ29udGV4dDtcblxuICAgIC8vIE90aGVyc1xuICAgIHNvdXJjZTogc3RyaW5nO1xuICAgIGtlcm5lbHM6IEFycmF5PFdlYkNMS2VybmVsPiA9IFtdO1xuICAgIHNoYWRlckVycm9yOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICBzaGFkZXJPcHRpb25zOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKHdjbF9wbGF0Zm9ybTogV2ViQ0xQbGF0Zm9ybSwgd2NsX2RldmljZTogV2ViQ0xEZXZpY2UsIHdjbF9jb250ZXh0OiBXZWJDTENvbnRleHQsIHNvdXJjZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMud2NsUGxhdGZvcm0gPSB3Y2xfcGxhdGZvcm07XG4gICAgICAgIHRoaXMud2NsRGV2aWNlID0gd2NsX2RldmljZTtcbiAgICAgICAgdGhpcy53Y2xDb250ZXh0ID0gd2NsX2NvbnRleHQ7XG4gICAgICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuICAgIH1cblxuICAgIGdldEluZm8obmFtZTogQ0xlbnVtKTogYW55IHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBST0dSQU1fTlVNX0RFVklDRVM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2NsUGxhdGZvcm0uZ2V0RGV2aWNlcygpLmxlbmd0aDtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUFJPR1JBTV9ERVZJQ0VTOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndjbFBsYXRmb3JtLmdldERldmljZXMoKTtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUFJPR1JBTV9DT05URVhUOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndjbENvbnRleHQ7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBST0dSQU1fU09VUkNFOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNvdXJjZTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFdlYkNMRXhjZXB0aW9uKFdlYkNMQ29uc3RhbnRzLklOVkFMSURfVkFMVUUsIFwiW0lOVkFMSURfVkFMVUVdIFdlYkNMUHJvZ3JhbS5nZXRJbmZvKCk6IHVua25vd24gcGFyYW1ldGVyICdcIiArIFdlYkNMQ29uc3RhbnRTdHIobmFtZSkgKyBcIidcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0QnVpbGRJbmZvKGRldmljZTogV2ViQ0xEZXZpY2UsIG5hbWU6IENMZW51bSk6IGFueSB7XG4gICAgICAgIGRldmljZTtcblxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUFJPR1JBTV9CVUlMRF9TVEFUVVM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hhZGVyRXJyb3IgPT0gbnVsbCA/IFdlYkNMQ29uc3RhbnRzLlNVQ0NFU1MgOiBXZWJDTENvbnN0YW50cy5CVUlMRF9QUk9HUkFNX0ZBSUxVUkU7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBST0dSQU1fQlVJTERfT1BUSU9OUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaGFkZXJPcHRpb25zO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QUk9HUkFNX0JVSUxEX0xPRzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaGFkZXJFcnJvcjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFdlYkNMRXhjZXB0aW9uKFdlYkNMQ29uc3RhbnRzLklOVkFMSURfVkFMVUUsIFwiW0lOVkFMSURfVkFMVUVdIFdlYkNMUHJvZ3JhbS5nZXRCdWlsZEluZm8oKTogdW5rbm93biBwYXJhbWV0ZXIgJ1wiICsgV2ViQ0xDb25zdGFudFN0cihuYW1lKSArIFwiJ1wiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBidWlsZChfPzogQXJyYXk8V2ViQ0xEZXZpY2U+IHwgbnVsbCwgb3B0aW9ucz86IHN0cmluZyB8IG51bGwsIHdoZW5GaW5pc2hlZD86IFdlYkNMQ2FsbGJhY2spOiB2b2lkIHtcbiAgICAgICAgLy8gUGFyc2luZyB0aGUga2VybmVsIHRvIGdldCBzaWduYXR1cmUgaW5mb3JtYXRpb24gYW5kIG5hbWUgaW5mb3JtYXRpb25cbiAgICAgICAgdGhpcy5wYXJzZUtlcm5lbCgpXG5cbiAgICAgICAgdGhpcy5zaGFkZXJPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy53Y2xEZXZpY2Uud2dwdURldmljZS5wdXNoRXJyb3JTY29wZShcInZhbGlkYXRpb25cIik7XG4gICAgICAgIC8vIFRPRE86IE5lZWQgdG8gZG8gdXNlIHRoZSBrZXJuZWwgc291cmNlIGNvZGUgdHJhbnNwb3NlIHRvIHdlYmdwdVxuICAgICAgICB0aGlzLndjbFNoYWRlciA9IHRoaXMud2NsRGV2aWNlLndncHVEZXZpY2UuY3JlYXRlU2hhZGVyTW9kdWxlKHtcbiAgICAgICAgICAgIGNvZGU6IGBcbkBncm91cCgwKSBAYmluZGluZygwKSB2YXI8c3RvcmFnZSwgcmVhZF93cml0ZT4gaW5wdXQgOiBhcnJheTxmMzI+O1xuQGdyb3VwKDApIEBiaW5kaW5nKDEpIHZhcjxzdG9yYWdlLCByZWFkX3dyaXRlPiBvdXRwdXQgOiBhcnJheTxmMzI+O1xuQGdyb3VwKDApIEBiaW5kaW5nKDIpIHZhcjxzdG9yYWdlLCByZWFkX3dyaXRlPiBjb3VudCA6IHUzMjtcblxuQGNvbXB1dGUgQHdvcmtncm91cF9zaXplKDEpXG5mbiBtYWluKEBidWlsdGluKGdsb2JhbF9pbnZvY2F0aW9uX2lkKSBnZXRfZ2xvYmFsX2lkIDogdmVjMzx1MzI+KSB7XG5sZXQgaSA9IGdldF9nbG9iYWxfaWQueDtcbi8vaWYgKGkgPCBjb3VudCkge1xuICAgIG91dHB1dFtpXSA9IGYzMihpKTsvL2lucHV0W2ldICogaW5wdXRbaV07XG4vL31cbn1cbiAgICBgLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy53Y2xEZXZpY2Uud2dwdURldmljZS5wb3BFcnJvclNjb3BlKCkudGhlbigoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hhZGVyRXJyb3IgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIGlmICh3aGVuRmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgd2hlbkZpbmlzaGVkKFdlYkNMQ29uc3RhbnRzLkJVSUxEX1BST0dSQU1fRkFJTFVSRSwgbnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAod2hlbkZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoZW5GaW5pc2hlZChXZWJDTENvbnN0YW50cy5TVUNDRVNTLCBudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjcmVhdGVLZXJuZWwoa2VybmVsTmFtZTogc3RyaW5nKTogV2ViQ0xLZXJuZWwge1xuICAgICAgICBjb25zdCBrZXJuZWwgPSB0aGlzLmtlcm5lbHMuZmluZChrZXJuZWwgPT4ga2VybmVsLmtlcm5lbE5hbWUgPT09IGtlcm5lbE5hbWUpO1xuICAgICAgICBpZiAoa2VybmVsKSB7XG4gICAgICAgICAgICByZXR1cm4ga2VybmVsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY3JlYXRlS2VybmVsc0luUHJvZ3JhbSgpOiBBcnJheTxXZWJDTEtlcm5lbD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXJuZWxzO1xuICAgIH1cbiAgICByZWxlYXNlKCk6IHZvaWQgeyB9XG5cbiAgICBwYXJzZVR5cGUoc3RyOiBzdHJpbmcpOiBXZWJDTENvbnN0YW50cyB7XG4gICAgICAgIHZhciBfdmFsdWUgPSAtMTtcbiAgICAgICAgLy8gRmlyc3QgdWxvbmcgZm9yIHRoZSB3ZWJjbCB2YWxpZGF0b3JcbiAgICAgICAgaWYgKChzdHIuaW5kZXhPZihcInVsb25nXCIpID49IDApIHx8IChzdHIuaW5kZXhPZihcInVuc2lnbmVkIGxvbmdcIikgPj0gMCkpIHtcbiAgICAgICAgICAgIC8vIFxcdG9kbyA6IGxvbmcgPz8/P1xuICAgICAgICAgICAgX3ZhbHVlID0gMHgxMzA0IC8qV2ViQ0xDb25zdGFudHMuVU5TSUdORURfTE9ORyovO1xuICAgICAgICB9IGVsc2UgaWYgKHN0ci5pbmRleE9mKFwibG9uZ1wiKSA+PSAwKSB7XG4gICAgICAgICAgICBfdmFsdWUgPSAweDEzMDMgLypXZWJDTENvbnN0YW50cy5TSUdORURfTE9ORyovO1xuICAgICAgICB9IGVsc2UgaWYgKHN0ci5pbmRleE9mKFwiZmxvYXRcIikgPj0gMCkge1xuICAgICAgICAgICAgX3ZhbHVlID0gV2ViQ0xDb25zdGFudHMuRkxPQVQ7XG4gICAgICAgIH0gZWxzZSBpZiAoKHN0ci5pbmRleE9mKFwidWNoYXJcIikgPj0gMCkgfHwgKHN0ci5pbmRleE9mKFwidW5zaWduZWQgY2hhclwiKSA+PSAwKSkge1xuICAgICAgICAgICAgX3ZhbHVlID0gV2ViQ0xDb25zdGFudHMuVU5TSUdORURfSU5UODtcbiAgICAgICAgfSBlbHNlIGlmIChzdHIuaW5kZXhPZihcImNoYXJcIikgPj0gMCkge1xuICAgICAgICAgICAgX3ZhbHVlID0gV2ViQ0xDb25zdGFudHMuU0lHTkVEX0lOVDg7XG4gICAgICAgIH0gZWxzZSBpZiAoKHN0ci5pbmRleE9mKFwidXNob3J0XCIpID49IDApIHx8IChzdHIuaW5kZXhPZihcInVuc2lnbmVkIHNob3J0XCIpID49IDApKSB7XG4gICAgICAgICAgICBfdmFsdWUgPSBXZWJDTENvbnN0YW50cy5VTlNJR05FRF9JTlQxNjtcbiAgICAgICAgfSBlbHNlIGlmIChzdHIuaW5kZXhPZihcInNob3J0XCIpID49IDApIHtcbiAgICAgICAgICAgIF92YWx1ZSA9IFdlYkNMQ29uc3RhbnRzLlNJR05FRF9JTlQxNjtcbiAgICAgICAgfSBlbHNlIGlmICgoc3RyLmluZGV4T2YoXCJ1aW50XCIpID49IDApIHx8IChzdHIuaW5kZXhPZihcInVuc2lnbmVkIGludFwiKSA+PSAwKSB8fCAoc3RyLmluZGV4T2YoXCJzaXplX3RcIikgPj0gMCkpIHtcbiAgICAgICAgICAgIF92YWx1ZSA9IFdlYkNMQ29uc3RhbnRzLlVOU0lHTkVEX0lOVDMyO1xuICAgICAgICB9IGVsc2UgaWYgKChzdHIuaW5kZXhPZihcImludFwiKSA+PSAwKSB8fCAoc3RyLmluZGV4T2YoXCJlbnVtXCIpID49IDApKSB7XG4gICAgICAgICAgICBfdmFsdWUgPSBXZWJDTENvbnN0YW50cy5TSUdORURfSU5UMzI7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RyLmluZGV4T2YoXCJpbWFnZTNkX3RcIikgPj0gMCkge1xuICAgICAgICAgICAgX3ZhbHVlID0gMHgxMzAyIC8qV2ViQ0xDb25zdGFudHMuSU1BR0UzRCovO1xuICAgICAgICB9IGVsc2UgaWYgKHN0ci5pbmRleE9mKFwiaW1hZ2UyZF90XCIpID49IDApIHtcbiAgICAgICAgICAgIF92YWx1ZSA9IDB4MTMwMSAvKldlYkNMQ29uc3RhbnRzLklNQUdFMkQqLztcbiAgICAgICAgfSBlbHNlIGlmIChzdHIuaW5kZXhPZihcInNhbXBsZXJfdFwiKSA+PSAwKSB7XG4gICAgICAgICAgICBfdmFsdWUgPSAweDEzMDAgLypXZWJDTENvbnN0YW50cy5TQU1QTEVSKi87XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gX3ZhbHVlO1xuICAgIH1cblxuICAgIC8vIEtlcm5lbCBwYXJzZXJcbiAgICBwYXJzZUtlcm5lbCgpOiB2b2lkIHtcbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBjb21tZW50cyAuLi5cbiAgICAgICAgbGV0IF9taW5pX2tlcm5lbF9zdHJpbmcgPSB0aGlzLnNvdXJjZS5yZXBsYWNlKC8oPzooKFtcIiddKSg/Oig/OlxcXFxcXFxcKXxcXFxcXFwyfCg/IVxcXFxcXDIpXFxcXHwoPyFcXDIpLnxbXFxuXFxyXSkqXFwyKXwoXFwvXFwqKD86KD8hXFwqXFwvKS58W1xcblxccl0pKlxcKlxcLyl8KFxcL1xcL1teXFxuXFxyXSooPzpbXFxuXFxyXSt8JCkpfCgoPzo9fDopXFxzKig/OlxcLyg/Oig/Oig/IVxcXFwqXFwvKS4pfFxcXFxcXFxcfFxcXFxcXC98W15cXFxcXVxcWyg/OlxcXFxcXFxcfFxcXFxcXF18W15dXSkrXFxdKStcXC8pKXwoKD86XFwvKD86KD86KD8hXFxcXCpcXC8pLil8XFxcXFxcXFx8XFxcXFxcL3xbXlxcXFxdXFxbKD86XFxcXFxcXFx8XFxcXFxcXXxbXl1dKStcXF0pK1xcLylbZ2lteV0/XFwuKD86ZXhlY3x0ZXN0fG1hdGNofHNlYXJjaHxyZXBsYWNlfHNwbGl0KVxcKCl8KFxcLig/OmV4ZWN8dGVzdHxtYXRjaHxzZWFyY2h8cmVwbGFjZXxzcGxpdClcXCgoPzpcXC8oPzooPzooPyFcXFxcKlxcLykuKXxcXFxcXFxcXHxcXFxcXFwvfFteXFxcXF1cXFsoPzpcXFxcXFxcXHxcXFxcXFxdfFteXV0pK1xcXSkrXFwvKSl8KDwhLS0oPzooPyEtLT4pLikqLS0+KSkvZywgXCJcIik7XG4gICAgICAgIGxldCBfZGVwdGggPSAwO1xuICAgICAgICBsZXQgX2JvZHlwYXJ0ID0gJyc7XG4gICAgICAgIGxldCBfcGF0dGVybiA9IFwia2VybmVsIFwiO1xuICAgICAgICBsZXQgX2tlcm5lbCA9IF9taW5pX2tlcm5lbF9zdHJpbmcuaW5kZXhPZihfcGF0dGVybik7XG5cbiAgICAgICAgd2hpbGUgKF9rZXJuZWwgIT0gLTEpIHtcbiAgICAgICAgICAgIF9taW5pX2tlcm5lbF9zdHJpbmcgPSBfbWluaV9rZXJuZWxfc3RyaW5nLnN1YnN0cmluZyhfa2VybmVsICsgX3BhdHRlcm4ubGVuZ3RoKTtcblxuICAgICAgICAgICAgY29uc3Qgb3Blbl9icmFja2V0ID0gX21pbmlfa2VybmVsX3N0cmluZy5pbmRleE9mKFwie1wiKTtcbiAgICAgICAgICAgIC8vIEdldCBhIG9uZSBsaW5lIG5hbWUgKyBzaWduYXR1cmUgb2YgdGhlIGtlcm5lbFxuICAgICAgICAgICAgbGV0IG5hbWVfYW5kX3NpZ25hdHVyZSA9IF9taW5pX2tlcm5lbF9zdHJpbmcuc3Vic3RyaW5nKDAsIG9wZW5fYnJhY2tldClcbiAgICAgICAgICAgIG5hbWVfYW5kX3NpZ25hdHVyZSA9IG5hbWVfYW5kX3NpZ25hdHVyZS5yZXBsYWNlKC9cXG4vZywgXCIgXCIpO1xuICAgICAgICAgICAgbmFtZV9hbmRfc2lnbmF0dXJlID0gbmFtZV9hbmRfc2lnbmF0dXJlLnJlcGxhY2UoL1xcci9nLCBcIiBcIik7XG4gICAgICAgICAgICBuYW1lX2FuZF9zaWduYXR1cmUgPSBuYW1lX2FuZF9zaWduYXR1cmUucmVwbGFjZSgvXFxzezIsfS9nLCBcIiBcIilcblxuICAgICAgICAgICAgY29uc3QgcmVnZXggPSAvKFxcdyspXFxzKlxcKCguKilcXCkvO1xuICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSByZWdleC5leGVjKG5hbWVfYW5kX3NpZ25hdHVyZSk7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIC8vIFBhcnNlIHRoZSBuYW1lXG4gICAgICAgICAgICAgICAgbGV0IF9uYW1lcGFydCA9IG1hdGNoWzFdO1xuICAgICAgICAgICAgICAgIF9uYW1lcGFydCA9IF9uYW1lcGFydC5yZXBsYWNlKC9cXHN7Mix9L2csIFwiIFwiKVxuXG4gICAgICAgICAgICAgICAgLy8gUGFyc2UgdGhlIGFyZ3VtZW50c1xuICAgICAgICAgICAgICAgIGxldCBmdW5jdGlvbkFyZ3MgPSBtYXRjaFsyXTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbkFyZ3MgPSBmdW5jdGlvbkFyZ3MucmVwbGFjZSgvXFxzezIsfS9nLCBcIiBcIilcbiAgICAgICAgICAgICAgICBsZXQgX2FyZ3NwYXJ0OiBBcnJheTxXZWJDTEtlcm5lbEFyZ0luZm8+ID0gW107XG4gICAgICAgICAgICAgICAgZnVuY3Rpb25BcmdzLnNwbGl0KFwiLFwiKS5mb3JFYWNoKChhcmc6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IGFyZy5zcGxpdChcIiBcIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBlbGVtZW50c1tlbGVtZW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZm8gPSBuZXcgV2ViQ0xLZXJuZWxBcmdJbmZvKClcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGUgPSB0aGlzLnBhcnNlVHlwZShhcmcpO1xuICAgICAgICAgICAgICAgICAgICBpbmZvLnR5cGVOYW1lID0gV2ViQ0xDb25zdGFudFN0cih0eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZy5pbmRleE9mKFwiKlwiKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvLnBvaW50ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5wb2ludGVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW5mby5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgaW5mby50eXBlID0gdHlwZTtcbiAgICAgICAgICAgICAgICAgICAgX2FyZ3NwYXJ0LnB1c2goaW5mbyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBQYXJzZSB0aGUgcmVzdCBvZiB0aGUgYm9keVxuICAgICAgICAgICAgICAgIF9taW5pX2tlcm5lbF9zdHJpbmcgPSBfbWluaV9rZXJuZWxfc3RyaW5nLnN1YnN0cmluZyhvcGVuX2JyYWNrZXQpXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfbWluaV9rZXJuZWxfc3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYXIgPSBfbWluaV9rZXJuZWxfc3RyaW5nW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhciA9PT0gJ3snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZGVwdGgrKztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFyID09PSAnfScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9kZXB0aC0tO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9ib2R5cGFydCArPSBjaGFyO1xuICAgICAgICAgICAgICAgICAgICBpZiAoX2RlcHRoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYm9keXBhcnQgPSBfYm9keXBhcnQucmVwbGFjZSgvXFxzezIsfS9nLCBcIiBcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMua2VybmVscy5wdXNoKG5ldyBXZWJDTEtlcm5lbCh0aGlzLndjbERldmljZSwgdGhpcy53Y2xDb250ZXh0LCB0aGlzLCBfbmFtZXBhcnQsIF9hcmdzcGFydCwgX2JvZHlwYXJ0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYm9keXBhcnQgPSBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2VhcmNoIGZvciBhbm90aGVyIGtlcm5lbFxuICAgICAgICAgICAgX2tlcm5lbCA9IF9taW5pX2tlcm5lbF9zdHJpbmcuaW5kZXhPZihfcGF0dGVybik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIC8vIEtlcm5lbCBwYXJzZXJcbi8vIGNsX2tlcm5lbHNfc2lnOiB7IH0sXG4vLyAvLyBTdHJ1Y3RzIEtlcm5lbHMgcGFyc2VyXG4vLyBjbF9zdHJ1Y3RzX3NpZzogeyB9LCBcbi8vIHBhcnNlU3RydWN0OiBmdW5jdGlvbihrZXJuZWxfc3RyaW5nLCBzdHJ1Y3RfbmFtZSkge1xuLy8gICAgIC8vIEV4cGVyaW1lbnRhbCBwYXJzZSBvZiBTdHJ1Y3Rcbi8vICAgICAvLyBTZWFyY2gga2VybmVsIGZ1bmN0aW9uIGxpa2UgJ3N0cnVjdF9uYW1lIHsgfScgb3IgJ3sgfSBzdHJ1Y3RfbmFtZSdcbi8vICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gICAgIC8vIFN0ZXAgMSA6IFNlYXJjaCBwYXR0ZXJuIHN0cnVjdF9uYW1lIHsgfVxuLy8gICAgIC8vIFN0ZXAgMiA6IGlmIG5vIHJlc3VsdCA6IFNlYXJjaCBwYXR0ZXJuIHsgfSBzdHJ1Y3RfbmFtZVxuLy8gICAgIC8vIFN0ZXAgMyA6IGlmIG5vIHJlc3VsdCA6IHJldHVyblxuLy8gICAgIC8vIFN0ZXAgNCA6IHNwbGl0IGJ5IDsgLy8gTnVtIG9mIHZhcmlhYmxlIG9mIHRoZSBzdHJ1Y3R1cmUgIDogaW50IHRvdG87IGZsb2F0IHRhdGE7XG4vLyAgICAgLy8gU3RlcCA1IDogc3BsaXQgYnkgLCAvLyBOdW0gb2YgdmFyaWFibGUgZm9yIGVhY2ggdHlwZSAgICAgOiBmbG9hdCB0b3RvLHRhdGEsdGl0aTtcbi8vICAgICAvLyBTdGVwIDYgOiBTZWFyY2ggcGF0dGVybiBbbnVtXSAvLyBBcnJheSBWYXJpYWJsZSAgICAgICAgICA6IGZsb2F0IHRvdG9bNF07XG4vLyAgICAgLy8gU3RlcCA3IDogU2VhcmNoIHR5cGUgb2YgdGhlIGxpbmVcbi8vICAgICAvLyBTdGVwIDggOiBpZiBleGlzdCBhZGQgdHlwZSBlbHNlIHNlYXJjaCBvdGhlciBzdHJ1Y3Rcbi8vICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gICAgIENMLmNsX3N0cnVjdHNfc2lnW3N0cnVjdF9uYW1lXSA9IFtdO1xuLy8gICAgIC8vIEZpcnN0IHNlYXJjaCBpZiBpcyAjZGVmaW5lXG4vLyAgICAgdmFyIF9yZV9kZWZpbmUgPSBuZXcgUmVnRXhwKFwiI1tcXCBdKmRlZmluZVtcXCBdKlwiICsgc3RydWN0X25hbWUgKyBcIltcXCBdKltBLVphLXowLTlfXFxzXSpcIik7XG4vLyAgICAgdmFyIF9kZWZpbmUgPSBrZXJuZWxfc3RyaW5nLm1hdGNoKF9yZV9kZWZpbmUpO1xuLy8gICAgIGlmIChfZGVmaW5lICE9IG51bGwgJiYgX2RlZmluZS5sZW5ndGggPT0gMSkge1xuLy8gICAgICAgICAvLyBHZXQgdHlwZSBvZiB0aGUgbGluZVxuLy8gICAgICAgICB2YXIgX3N0ciA9IF9kZWZpbmVbMF07XG4vLyAgICAgICAgIHZhciBfdHlwZSA9IENMLnBhcnNlVHlwZShfc3RyKTtcbi8vICAgICAgICAgaWYgKF90eXBlICE9IC0xKSB7XG4vLyAgICAgICAgICAgICBDTC5jbF9zdHJ1Y3RzX3NpZ1tzdHJ1Y3RfbmFtZV0ucHVzaChfdHlwZSk7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICB2YXIgX2xhc3RTcGFjZSA9IF9zdHIubGFzdEluZGV4T2YoXCIgXCIpO1xuLy8gICAgICAgICAgICAgdmFyIF9yZXMgPSBfc3RyLnN1YnN0cihfbGFzdFNwYWNlICsgMSwgX3N0ci5sZW5ndGggLSBfbGFzdFNwYWNlKTtcbi8vICAgICAgICAgICAgIENMLnBhcnNlU3RydWN0KGtlcm5lbF9zdHJpbmcsIF9yZXMpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIHJldHVybjtcbi8vICAgICB9XG4vLyAgICAgLy8gU2Vjb25kIHNlYXJjaCBpZiBpcyB0eXBlZGVmIHR5cGUgbmFtZTtcbi8vICAgICB2YXIgX3JlX3R5cGVkZWYgPSBuZXcgUmVnRXhwKFwidHlwZWRlZltcXCBdKltBLVphLXowLTlfXFxzXSpbXFwgXSpcIiArIHN0cnVjdF9uYW1lICsgXCJbXFwgXSo7XCIpO1xuLy8gICAgIHZhciBfdHlwZWRlZiA9IGtlcm5lbF9zdHJpbmcubWF0Y2goX3JlX3R5cGVkZWYpO1xuLy8gICAgIGlmIChfdHlwZWRlZiAhPSBudWxsICYmIF90eXBlZGVmLmxlbmd0aCA9PSAxKSB7XG4vLyAgICAgICAgIC8vIEdldCB0eXBlIG9mIHRoZSBsaW5lXG4vLyAgICAgICAgIHZhciBfc3RyID0gX3R5cGVkZWZbMF07XG4vLyAgICAgICAgIHZhciBfdHlwZSA9IENMLnBhcnNlVHlwZShfc3RyKTtcbi8vICAgICAgICAgaWYgKF90eXBlICE9IC0xKSB7XG4vLyAgICAgICAgICAgICBDTC5jbF9zdHJ1Y3RzX3NpZ1tzdHJ1Y3RfbmFtZV0ucHVzaChfdHlwZSk7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICBfc3RyID0gX3N0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTsgLy8gdHJpbVxuLy8gICAgICAgICAgICAgdmFyIF9maXJzdFNwYWNlID0gX3N0ci5pbmRleE9mKFwiIFwiKTtcbi8vICAgICAgICAgICAgIHZhciBfbGFzdFNwYWNlID0gX3N0ci5sYXN0SW5kZXhPZihcIiBcIik7XG4vLyAgICAgICAgICAgICB2YXIgX3JlcyA9IF9zdHIuc3Vic3RyKF9maXJzdFNwYWNlICsgMSwgX2xhc3RTcGFjZSAtIF9maXJzdFNwYWNlIC0gMSk7XG4vLyAgICAgICAgICAgICBDTC5wYXJzZVN0cnVjdChrZXJuZWxfc3RyaW5nLCBfcmVzKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICByZXR1cm47XG4vLyAgICAgfVxuLy8gICAgIC8vIHNlYXJjaCBwYXR0ZXJuIDogc3RydWN0X25hbWUgeyB9IDtcbi8vICAgICB2YXIgX3JlX2JlZm9yZSA9IG5ldyBSZWdFeHAoc3RydWN0X25hbWUgKyBcIltcXCBdXCIgKyBcIlxceyhbXn1dKylcXH1cIik7XG4vLyAgICAgLy8gc2VhcmNoIHBhdHRlcm4gOiB7IH0gc3RydWN0X25hbWU7XG4vLyAgICAgdmFyIF9yZV9hZnRlciA9IG5ldyBSZWdFeHAoXCJcXHsoW159XSspXFx9XCIgKyBcIltcXCBdXCIgKyBzdHJ1Y3RfbmFtZSk7XG4vLyAgICAgdmFyIF9yZXMgPSBrZXJuZWxfc3RyaW5nLm1hdGNoKF9yZV9iZWZvcmUpO1xuLy8gICAgIHZhciBfY29udGFpbnNfc3RydWN0ID0gXCJcIjtcbi8vICAgICBpZiAoX3JlcyAhPSBudWxsICYmIF9yZXMubGVuZ3RoID09IDIpIHtcbi8vICAgICAgICAgX2NvbnRhaW5zX3N0cnVjdCA9IF9yZXNbMV07XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgX3JlcyA9IGtlcm5lbF9zdHJpbmcubWF0Y2goX3JlX2FmdGVyKTtcbi8vICAgICAgICAgaWYgKF9yZXMgIT0gbnVsbCAmJiBfcmVzLmxlbmd0aCA9PSAyKSB7XG4vLyAgICAgICAgICAgICBfY29udGFpbnNfc3RydWN0ID0gX3Jlc1sxXTtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICNpZiBDTF9ERUJVR1xuLy8gICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVua25vdyBTdHJ1Y3R1cmUgJ1wiICsgc3RydWN0X25hbWUgKyBcIicsIG5vdCBmb3VuZCBpbnNpZGUgdGhlIGtlcm5lbCAuLi5cIik7XG4vLyAgICAgICAgICAgICAjZW5kaWZcbi8vICAgICAgICAgICAgIHJldHVybjtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vICAgICB2YXIgX3ZhciA9IF9jb250YWluc19zdHJ1Y3Quc3BsaXQoXCI7XCIpO1xuLy8gICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX3Zhci5sZW5ndGggLSAxOyBpKyspIHtcbi8vICAgICAgICAgLy8gTmVlZCBmb3IgdW5zaWduZWQgaW50IHdpZHRoLCBoZWlnaHQ7XG4vLyAgICAgICAgIHZhciBfc3VidmFyID0gX3ZhcltpXS5zcGxpdChcIixcIik7XG4vLyAgICAgICAgIC8vIEdldCB0eXBlIG9mIHRoZSBsaW5lXG4vLyAgICAgICAgIHZhciBfdHlwZSA9IENMLnBhcnNlVHlwZShfdmFyW2ldKTtcbi8vICAgICAgICAgLy8gTmVlZCBmb3IgZmxvYXQgbXVbNF07XG4vLyAgICAgICAgIHZhciBfYXJyYXlOdW0gPSAwO1xuLy8gICAgICAgICBfcmVzID0gX3ZhcltpXS5tYXRjaCgvWzAtOV0rLyk7XG4vLyAgICAgICAgIGlmIChfcmVzICE9IG51bGwpIF9hcnJheU51bSA9IF9yZXM7XG4vLyAgICAgICAgIGlmIChfdHlwZSAhPSAtMSkge1xuLy8gICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBNYXRoLm1heChfc3VidmFyLmxlbmd0aCwgX2FycmF5TnVtKTsgaisrKSB7XG4vLyAgICAgICAgICAgICAgICAgQ0wuY2xfc3RydWN0c19zaWdbc3RydWN0X25hbWVdLnB1c2goX3R5cGUpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgLy8gU2VhcmNoIG5hbWUgb2YgdGhlIHBhcmFtZXRlclxuLy8gICAgICAgICAgICAgdmFyIF9zdHJ1Y3QgPSBfc3VidmFyWzBdLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpOyAvLyB0cmltXG4vLyAgICAgICAgICAgICB2YXIgX25hbWUgPSBcIlwiO1xuLy8gICAgICAgICAgICAgdmFyIF9zdGFydCA9IF9zdHJ1Y3QubGFzdEluZGV4T2YoXCIgXCIpO1xuLy8gICAgICAgICAgICAgZm9yICh2YXIgaiA9IF9zdGFydCAtIDE7IGogPj0gMDsgai0tKSB7XG4vLyAgICAgICAgICAgICAgICAgdmFyIF9jaGFyYSA9IF9zdHJ1Y3QuY2hhckF0KGopO1xuLy8gICAgICAgICAgICAgICAgIGlmIChfY2hhcmEgPT0gJyAnICYmIF9uYW1lLmxlbmd0aCA+IDApIHtcbi8vICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfY2hhcmEgIT0gJyAnKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIF9uYW1lID0gX2NoYXJhICsgX25hbWU7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgLy8gSWYgc3RydWN0IGlzIHVua25vdyBzZWFyY2ggaXRcbi8vICAgICAgICAgICAgIGlmICghKF9uYW1lIGluIENMLmNsX3N0cnVjdHNfc2lnICYmIENMLmNsX3N0cnVjdHNfc2lnW19uYW1lXS5sZW5ndGggPiAwKSkge1xuLy8gICAgICAgICAgICAgICAgIENMLnBhcnNlU3RydWN0KGtlcm5lbF9zdHJpbmcsIF9uYW1lKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgTWF0aC5tYXgoX3N1YnZhci5sZW5ndGgsIF9hcnJheU51bSk7IGorKykge1xuLy8gICAgICAgICAgICAgICAgIENMLmNsX3N0cnVjdHNfc2lnW3N0cnVjdF9uYW1lXSA9IENMLmNsX3N0cnVjdHNfc2lnW3N0cnVjdF9uYW1lXS5jb25jYXQoQ0wuY2xfc3RydWN0c19zaWdbX25hbWVdKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH0sXG4vLyBwYXJzZUtlcm5lbDogZnVuY3Rpb24oa2VybmVsX3N0cmluZykge1xuLy8gICAgICNpZiAwXG4vLyAgICAgY29uc29sZS5pbmZvKFwiT3JpZ2luYWwgS2VybmVsIFN0cmluZyA6IFwiKTtcbi8vICAgICBjb25zb2xlLmluZm8oXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbi8vICAgICBjb25zb2xlLmluZm8oa2VybmVsX3N0cmluZyk7XG4vLyAgICAgY29uc29sZS5pbmZvKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4vLyAgICAgI2VuZGlmXG4vLyAgICAgLy8gRXhwZXJpbWVudGFsIHBhcnNlIG9mIEtlcm5lbFxuLy8gICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAgICAvL1xuLy8gICAgIC8vIC8hXFwgVGhlIG1pbmlmeSBrZXJuZWwgY291bGQgYmUgdXNlIGJ5IHRoZSBwcm9ncmFtIGJ1dCBzb21lIHRyb3VibGUgd2l0aCBsaW5lXG4vLyAgICAgLy8gLyFcXCBjb250YWluaW5nIG1hY3JvICNkZWZpbmUsIGZvciB0aGUgbW9tZW50IG9ubHkgdXNlIHRoZSBtaW5pZnkga2VybmVsIGZvclxuLy8gICAgIC8vIC8hXFwgcGFyc2luZyBfX2tlcm5lbCBhbmQgc3RydWN0XG4vLyAgICAgLy9cbi8vICAgICAvLyBTZWFyY2gga2VybmVsIGZ1bmN0aW9uIGxpa2UgX19rZXJuZWwgLi4uIE5BTUUgKCBwMSAsIHAyICwgcDMpXG4vLyAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAgICAvLyBTdGVwIDEgOiBNaW5pbWl6ZSBrZXJuZWwgcmVtb3ZpbmcgYWxsIHRoZSBjb21tZW50IGFuZCBcXHIgXFxuIFxcdCBhbmQgbXVsdGlzcGFjZVxuLy8gICAgIC8vIFN0ZXAgMiA6IFNlYXJjaCBwYXR0ZXJuIF9fa2VybmVsIC4uLiAoIC4uLiApXG4vLyAgICAgLy8gU3RlcCAzIDogRm9yIGVhY2gga2VybmVsXG4vLyAgICAgLy8gU3RlcCAzIC4gMSA6IFNlYXJjaCBPcGVuIEJyYWNlXG4vLyAgICAgLy8gU3RlcCAzIC4gMiA6IFNlYXJjaCBLZXJuZWwgTmFtZVxuLy8gICAgIC8vIFN0ZXAgMyAuIDMgOiBTZWFyY2ggS2VybmVsIFBhcmFtZXRlclxuLy8gICAgIC8vIFN0ZXAgMyAuIDQgOiBHcmFiIHsgbmFtZSA6IFsgcGFyYW0sIC4uLiBdIH1cbi8vICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gICAgIC8vIFJlbW92ZSBhbGwgY29tbWVudHMgLi4uXG4vLyAgICAgdmFyIF9taW5pX2tlcm5lbF9zdHJpbmcgPSBrZXJuZWxfc3RyaW5nLnJlcGxhY2UoLyg/OigoW1wiJ10pKD86KD86XFxcXFxcXFwpfFxcXFxcXDJ8KD8hXFxcXFxcMilcXFxcfCg/IVxcMikufFtcXG5cXHJdKSpcXDIpfChcXC9cXCooPzooPyFcXCpcXC8pLnxbXFxuXFxyXSkqXFwqXFwvKXwoXFwvXFwvW15cXG5cXHJdKig/OltcXG5cXHJdK3wkKSl8KCg/Oj18OilcXHMqKD86XFwvKD86KD86KD8hXFxcXCpcXC8pLil8XFxcXFxcXFx8XFxcXFxcL3xbXlxcXFxdXFxbKD86XFxcXFxcXFx8XFxcXFxcXXxbXl1dKStcXF0pK1xcLykpfCgoPzpcXC8oPzooPzooPyFcXFxcKlxcLykuKXxcXFxcXFxcXHxcXFxcXFwvfFteXFxcXF1cXFsoPzpcXFxcXFxcXHxcXFxcXFxdfFteXV0pK1xcXSkrXFwvKVtnaW15XT9cXC4oPzpleGVjfHRlc3R8bWF0Y2h8c2VhcmNofHJlcGxhY2V8c3BsaXQpXFwoKXwoXFwuKD86ZXhlY3x0ZXN0fG1hdGNofHNlYXJjaHxyZXBsYWNlfHNwbGl0KVxcKCg/OlxcLyg/Oig/Oig/IVxcXFwqXFwvKS4pfFxcXFxcXFxcfFxcXFxcXC98W15cXFxcXVxcWyg/OlxcXFxcXFxcfFxcXFxcXF18W15dXSkrXFxdKStcXC8pKXwoPCEtLSg/Oig/IS0tPikuKSotLT4pKS9nXG4vLyAgICAgICAgICwgXCJcIik7XG4vLyAgICAgLy8gUmVtb3ZlIGFsbCBjaGFyIFxcbiBcXHIgXFx0IC4uLlxuLy8gICAgIF9taW5pX2tlcm5lbF9zdHJpbmcgPSBfbWluaV9rZXJuZWxfc3RyaW5nLnJlcGxhY2UoL1xcbi9nLCBcIiBcIik7XG4vLyAgICAgX21pbmlfa2VybmVsX3N0cmluZyA9IF9taW5pX2tlcm5lbF9zdHJpbmcucmVwbGFjZSgvXFxyL2csIFwiIFwiKTtcbi8vICAgICAvLyBSZW1vdmUgYWxsIHRoZSBtdWx0aXNwYWNlXG4vLyAgICAgX21pbmlfa2VybmVsX3N0cmluZyA9IF9taW5pX2tlcm5lbF9zdHJpbmcucmVwbGFjZSgvXFxzezIsfS9nLCBcIiBcIik7XG4vLyAgICAgLy8gU2VhcmNoIHBhdHRlcm4gOiBfX2tlcm5lbCAuLi4gKCAuLi4gKVxuLy8gICAgIC8vIHZhciBfbWF0Y2hlcyA9IF9taW5pX2tlcm5lbF9zdHJpbmcubWF0Y2goL19fa2VybmVsW0EtWmEtejAtOV9cXHNdK1xcKChbXildKylcXCkvZyk7XG4vLyAgICAgLy8gaWYgKF9tYXRjaGVzID09IG51bGwpIHtcbi8vICAgICAvLyAgIGNvbnNvbGUuZXJyb3IoXCIvIVxcXFwgTm90IGZvdW5kIGtlcm5lbCAhISFcIik7XG4vLyAgICAgLy8gICByZXR1cm47XG4vLyAgICAgLy8gfVxuLy8gICAgIC8vIFNlYXJjaCBrZXJuZWwgKFBhdHRlcm4gZG9lc24ndCB3b3JrIHdpdGggZXh0cmEgX19hdHRyaWJ1dGVfXylcbi8vICAgICB2YXIgX21hdGNoZXMgPSBbXTtcbi8vICAgICB2YXIgX2ZvdW5kID0gMTtcbi8vICAgICB2YXIgX3N0cmluZ0tlcm4gPSBfbWluaV9rZXJuZWxfc3RyaW5nO1xuLy8gICAgIHZhciBfc2VjdXJpdHkgPSA1MDtcbi8vICAgICAvLyBTZWFyY2ggYWxsIHRoZSBrZXJuZWxcbi8vICAgICB3aGlsZSAoX2ZvdW5kICYmIF9zZWN1cml0eSkge1xuLy8gICAgICAgICAvLyBKdXN0IGluIGNhc2Ugbm8gbW9yZSB0aGFuIDUwIGxvb3Bcbi8vICAgICAgICAgX3NlY3VyaXR5LS07XG4vLyAgICAgICAgIHZhciBfcGF0dGVybiA9IFwiX19rZXJuZWwgXCI7XG4vLyAgICAgICAgIHZhciBfa2VybiA9IF9zdHJpbmdLZXJuLmluZGV4T2YoX3BhdHRlcm4pO1xuLy8gICAgICAgICBpZiAoX2tlcm4gPT0gLTEpIHtcbi8vICAgICAgICAgICAgIF9wYXR0ZXJuID0gXCIga2VybmVsIFwiO1xuLy8gICAgICAgICAgICAgX2tlcm4gPSBfc3RyaW5nS2Vybi5pbmRleE9mKFwiIGtlcm5lbCBcIik7XG4vLyAgICAgICAgICAgICBpZiAoX2tlcm4gPT0gLTEpIHtcbi8vICAgICAgICAgICAgICAgICBfcGF0dGVybiA9IFwia2VybmVsIFwiO1xuLy8gICAgICAgICAgICAgICAgIF9rZXJuID0gX3N0cmluZ0tlcm4uaW5kZXhPZihcImtlcm5lbCBcIik7XG4vLyAgICAgICAgICAgICAgICAgaWYgKF9rZXJuID09IC0xKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIF9mb3VuZCA9IDA7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuLy8gICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoX2tlcm4gIT0gMCkge1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiLyFcXFxcIEZpbmQgd29yZCAna2VybmVsJyBidXQgaXMgbm90IGEgcmVhbCBrZXJuZWwgIC4uIChcIiArIF9rZXJuICsgXCIpXCIpO1xuLy8gICAgICAgICAgICAgICAgICAgICBfc3RyaW5nS2VybiA9IF9zdHJpbmdLZXJuLnN1YnN0cihfa2VybiArIF9wYXR0ZXJuLmxlbmd0aCwgX3N0cmluZ0tlcm4ubGVuZ3RoIC0gX2tlcm4pO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgX3N0cmluZ0tlcm4gPSBfc3RyaW5nS2Vybi5zdWJzdHIoX2tlcm4gKyBfcGF0dGVybi5sZW5ndGgsIF9zdHJpbmdLZXJuLmxlbmd0aCAtIF9rZXJuKTtcbi8vICAgICAgICAgdmFyIF9icmFjZSA9IF9zdHJpbmdLZXJuLmluZGV4T2YoXCJ7XCIpO1xuLy8gICAgICAgICB2YXIgX3N0cmluZ0tlcm4yID0gX3N0cmluZ0tlcm4uc3Vic3RyKDAsIF9icmFjZSk7XG4vLyAgICAgICAgIHZhciBfYnJhY2VPcGVuID0gX3N0cmluZ0tlcm4yLmxhc3RJbmRleE9mKFwiKFwiKTtcbi8vICAgICAgICAgdmFyIF9icmFjZUNsb3NlID0gX3N0cmluZ0tlcm4yLmxhc3RJbmRleE9mKFwiKVwiKTtcbi8vICAgICAgICAgdmFyIF9zdHJpbmdLZXJuMyA9IF9zdHJpbmdLZXJuMi5zdWJzdHIoMCwgX2JyYWNlT3BlbikucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7IC8vIHRyaW1cbi8vICAgICAgICAgdmFyIF9zcGFjZSA9IF9zdHJpbmdLZXJuMy5sYXN0SW5kZXhPZihcIiBcIik7XG4vLyAgICAgICAgIF9zdHJpbmdLZXJuMiA9IF9zdHJpbmdLZXJuMi5zdWJzdHIoX3NwYWNlICsgMSwgX2JyYWNlQ2xvc2UpO1xuLy8gICAgICAgICAvLyBBZGQgdGhlIGtlcm5lbCByZXN1bHQgbGlrZSBuYW1lX2tlcm5lbCguLi4sIC4uLiAsLi4uKVxuLy8gICAgICAgICBfbWF0Y2hlcy5wdXNoKF9zdHJpbmdLZXJuMik7XG4vLyAgICAgfVxuLy8gICAgIC8vIEZvciBlYWNoIGtlcm5lbCAuLi4uXG4vLyAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfbWF0Y2hlcy5sZW5ndGg7IGkrKykge1xuLy8gICAgICAgICAvLyBTZWFyY2ggdGhlIG9wZW4gQnJhY2Vcbi8vICAgICAgICAgdmFyIF9icmFjZSA9IF9tYXRjaGVzW2ldLmxhc3RJbmRleE9mKFwiKFwiKTtcbi8vICAgICAgICAgLy8gUGFydCBiZWZvcmUgJygnXG4vLyAgICAgICAgIHZhciBfZmlyc3RfcGFydCA9IF9tYXRjaGVzW2ldLnN1YnN0cigwLCBfYnJhY2UpO1xuLy8gICAgICAgICBfZmlyc3RfcGFydCA9IF9maXJzdF9wYXJ0LnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpOyAvLyB0cmltXG4vLyAgICAgICAgIC8vIFBhcnQgYWZ0ZXIgJyknXG4vLyAgICAgICAgIHZhciBfc2Vjb25kX3BhcnQgPSBfbWF0Y2hlc1tpXS5zdWJzdHIoX2JyYWNlICsgMSwgX21hdGNoZXNbaV0ubGVuZ3RoIC0gX2JyYWNlIC0gMik7XG4vLyAgICAgICAgIF9zZWNvbmRfcGFydCA9IF9zZWNvbmRfcGFydC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTsgLy8gdHJpbVxuLy8gICAgICAgICAvLyBTZWFyY2ggbmFtZSBwYXJ0XG4vLyAgICAgICAgIHZhciBfbmFtZSA9IF9maXJzdF9wYXJ0LnN1YnN0cihfZmlyc3RfcGFydC5sYXN0SW5kZXhPZihcIiBcIikgKyAxKTtcbi8vICAgICAgICAgLy8gSWYgbmFtZSBhbHJlYWR5IHByZXNlbnQgcmVwYXJzZSBpdCBtYXkgYmUgaXMgYW5vdGhlciB0ZXN0IHdpdGggbm90IHRoZSBzYW1lIG51bSBvZiBwYXJhbWV0ZXIgLi4uLlxuLy8gICAgICAgICBpZiAoX25hbWUgaW4gQ0wuY2xfa2VybmVsc19zaWcpIHtcbi8vICAgICAgICAgICAgIGRlbGV0ZSBDTC5jbF9rZXJuZWxzX3NpZ1tfbmFtZV1cbi8vICAgICAgICAgfVxuLy8gICAgICAgICAvLyBTZWFyY2ggcGFyYW1ldGVyIHBhcnRcbi8vICAgICAgICAgdmFyIF9wYXJhbSA9IFtdO1xuLy8gICAgICAgICB2YXIgX2FycmF5ID0gX3NlY29uZF9wYXJ0LnNwbGl0KFwiLFwiKTtcbi8vICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBfYXJyYXkubGVuZ3RoOyBqKyspIHtcbi8vICAgICAgICAgICAgIHZhciBfdHlwZSA9IENMLnBhcnNlVHlwZShfYXJyYXlbal0pO1xuLy8gICAgICAgICAgICAgaWYgKF9hcnJheVtqXS5pbmRleE9mKFwiX19sb2NhbFwiKSA+PSAwKSB7XG4vLyAgICAgICAgICAgICAgICAgX3BhcmFtLnB1c2goV2ViQ0xDb25zdGFudHMuTE9DQUwpO1xuLy8gICAgICAgICAgICAgfSBlbHNlIGlmIChfdHlwZSA9PSAtMSkge1xuLy8gICAgICAgICAgICAgICAgIF9hcnJheVtqXSA9IF9hcnJheVtqXS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcbi8vICAgICAgICAgICAgICAgICBfYXJyYXlbal0gPSBfYXJyYXlbal0ucmVwbGFjZShcIipcIiwgXCJcIik7XG4vLyAgICAgICAgICAgICAgICAgdmFyIF9zdGFydCA9IF9hcnJheVtqXS5sYXN0SW5kZXhPZihcIiBcIik7XG4vLyAgICAgICAgICAgICAgICAgaWYgKF9zdGFydCAhPSAtMSkge1xuLy8gICAgICAgICAgICAgICAgICAgICB2YXIgX2tlcm5lbHNfc3RydWN0X25hbWUgPSBcIlwiO1xuLy8gICAgICAgICAgICAgICAgICAgICAvLyBTZWFyY2ggUGFyYW1ldGVyIHR5cGUgTmFtZVxuLy8gICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gX3N0YXJ0IC0gMTsgayA+PSAwOyBrLS0pIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfY2hhcmEgPSBfYXJyYXlbal0uY2hhckF0KGspO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9jaGFyYSA9PSAnICcgJiYgX2tlcm5lbHNfc3RydWN0X25hbWUubGVuZ3RoID4gMCkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfY2hhcmEgIT0gJyAnKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2tlcm5lbHNfc3RydWN0X25hbWUgPSBfY2hhcmEgKyBfa2VybmVsc19zdHJ1Y3RfbmFtZTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICAvLyBQYXJzZSBzdHJ1Y3Qgb25seSBpZiBpcyBub3QgYWxyZWFkeSBpbnNpZGUgdGhlIG1hcFxuLy8gICAgICAgICAgICAgICAgICAgICBpZiAoIShfa2VybmVsc19zdHJ1Y3RfbmFtZSBpbiBDTC5jbF9zdHJ1Y3RzX3NpZykpXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBDTC5wYXJzZVN0cnVjdChfbWluaV9rZXJuZWxfc3RyaW5nLCBfa2VybmVsc19zdHJ1Y3RfbmFtZSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgbmFtZSBvZiB0aGUgc3RydWN0IGluc2lkZSB0aGUgbWFwIG9mIHBhcmFtIGtlcm5lbFxuLy8gICAgICAgICAgICAgICAgICAgICBfcGFyYW0ucHVzaChfa2VybmVsc19zdHJ1Y3RfbmFtZSk7XG4vLyAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICAgI2lmIENMX0RFQlVHXG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmtub3cgcGFyYW1ldGVyIHR5cGUgaW5zaWRlICdcIiArIF9hcnJheVtqXSArIFwiJywgY2FuIGJlIGEgc3RydWN0LCB1c2UgZmxvYXQgYnkgZGVmYXVsdCAuLi5cIik7XG4vLyAgICAgICAgICAgICAgICAgICAgICNlbmRpZlxuLy8gICAgICAgICAgICAgICAgICAgICBfcGFyYW0ucHVzaChXZWJDTENvbnN0YW50cy5GTE9BVCk7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICBfcGFyYW0ucHVzaChfdHlwZSk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgQ0wuY2xfa2VybmVsc19zaWdbX25hbWVdID0gX3BhcmFtO1xuLy8gICAgIH1cbi8vICAgICAjaWYgMFxuLy8gICAgIGNvbnNvbGUuaW5mbyhcIk1pbmkgS2VybmVsIFN0cmluZyA6IFwiKTtcbi8vICAgICBjb25zb2xlLmluZm8oXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbi8vICAgICBjb25zb2xlLmluZm8oX21pbmlfa2VybmVsX3N0cmluZyk7XG4vLyAgICAgY29uc29sZS5pbmZvKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4vLyAgICAgI2VuZGlmXG4vLyAgICAgI2lmIDBcbi8vICAgICBmb3IgKHZhciBuYW1lIGluIENMLmNsX2tlcm5lbHNfc2lnKSB7XG4vLyAgICAgICAgIHZhciBfbGVuZ3RoID0gQ0wuY2xfa2VybmVsc19zaWdbbmFtZV0ubGVuZ3RoO1xuLy8gICAgICAgICB2YXIgX3N0ciA9IFwiXCI7XG4vLyAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX2xlbmd0aDsgaSsrKSB7XG4vLyAgICAgICAgICAgICB2YXIgX3R5cGUgPSBDTC5jbF9rZXJuZWxzX3NpZ1tuYW1lXVtpXTtcbi8vICAgICAgICAgICAgIF9zdHIgKz0gX3R5cGUgKyBcIihcIiArIENMLnN0cmluZ1R5cGUoX3R5cGUpICsgXCIpXCI7XG4vLyAgICAgICAgICAgICBpZiAoaSA8IF9sZW5ndGggLSAxKSBfc3RyICs9IFwiLCBcIjtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBjb25zb2xlLmluZm8oXCJLZXJuZWwgXCIgKyBuYW1lICsgXCIoXCIgKyBfbGVuZ3RoICsgXCIpXCIpO1xuLy8gICAgICAgICBjb25zb2xlLmluZm8oXCJcXHRcIiArIF9zdHIpO1xuLy8gICAgIH1cbi8vICAgICBmb3IgKHZhciBuYW1lIGluIENMLmNsX3N0cnVjdHNfc2lnKSB7XG4vLyAgICAgICAgIHZhciBfbGVuZ3RoID0gQ0wuY2xfc3RydWN0c19zaWdbbmFtZV0ubGVuZ3RoO1xuLy8gICAgICAgICB2YXIgX3N0ciA9IFwiXCI7XG4vLyAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX2xlbmd0aDsgaSsrKSB7XG4vLyAgICAgICAgICAgICB2YXIgX3R5cGUgPSBDTC5jbF9zdHJ1Y3RzX3NpZ1tuYW1lXVtpXTtcbi8vICAgICAgICAgICAgIF9zdHIgKz0gX3R5cGUgKyBcIihcIiArIENMLnN0cmluZ1R5cGUoX3R5cGUpICsgXCIpXCI7XG4vLyAgICAgICAgICAgICBpZiAoaSA8IF9sZW5ndGggLSAxKSBfc3RyICs9IFwiLCBcIjtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBjb25zb2xlLmluZm8oXCJcXG5cXHRTdHJ1Y3QgXCIgKyBuYW1lICsgXCIoXCIgKyBfbGVuZ3RoICsgXCIpXCIpO1xuLy8gICAgICAgICBjb25zb2xlLmluZm8oXCJcXHRcXHRcIiArIF9zdHIpO1xuLy8gICAgIH1cbi8vICAgICAjZW5kaWZcbi8vICAgICByZXR1cm4gX21pbmlfa2VybmVsX3N0cmluZztcbi8vIH0sXG4vLyBwYXJzZVR5cGU6IGZ1bmN0aW9uKHN0cmluZykge1xuLy8gICAgIHZhciBfdmFsdWUgPSAtMTtcbi8vICAgICAvLyBGaXJzdCB1bG9uZyBmb3IgdGhlIHdlYmNsIHZhbGlkYXRvclxuLy8gICAgIGlmICgoc3RyaW5nLmluZGV4T2YoXCJ1bG9uZ1wiKSA+PSAwKSB8fCAoc3RyaW5nLmluZGV4T2YoXCJ1bnNpZ25lZCBsb25nXCIpID49IDApKSB7XG4vLyAgICAgICAgIC8vIFxcdG9kbyA6IGxvbmcgPz8/P1xuLy8gICAgICAgICBfdmFsdWUgPSAweDEzMDQgLypXZWJDTENvbnN0YW50cy5VTlNJR05FRF9MT05HKi87XG4vLyAgICAgfSBlbHNlIGlmIChzdHJpbmcuaW5kZXhPZihcImxvbmdcIikgPj0gMCkge1xuLy8gICAgICAgICBfdmFsdWUgPSAweDEzMDMgLypXZWJDTENvbnN0YW50cy5TSUdORURfTE9ORyovO1xuLy8gICAgIH0gZWxzZSBpZiAoc3RyaW5nLmluZGV4T2YoXCJmbG9hdFwiKSA+PSAwKSB7XG4vLyAgICAgICAgIF92YWx1ZSA9IFdlYkNMQ29uc3RhbnRzLkZMT0FUO1xuLy8gICAgIH0gZWxzZSBpZiAoKHN0cmluZy5pbmRleE9mKFwidWNoYXJcIikgPj0gMCkgfHwgKHN0cmluZy5pbmRleE9mKFwidW5zaWduZWQgY2hhclwiKSA+PSAwKSkge1xuLy8gICAgICAgICBfdmFsdWUgPSBXZWJDTENvbnN0YW50cy5VTlNJR05FRF9JTlQ4O1xuLy8gICAgIH0gZWxzZSBpZiAoc3RyaW5nLmluZGV4T2YoXCJjaGFyXCIpID49IDApIHtcbi8vICAgICAgICAgX3ZhbHVlID0gV2ViQ0xDb25zdGFudHMuU0lHTkVEX0lOVDg7XG4vLyAgICAgfSBlbHNlIGlmICgoc3RyaW5nLmluZGV4T2YoXCJ1c2hvcnRcIikgPj0gMCkgfHwgKHN0cmluZy5pbmRleE9mKFwidW5zaWduZWQgc2hvcnRcIikgPj0gMCkpIHtcbi8vICAgICAgICAgX3ZhbHVlID0gV2ViQ0xDb25zdGFudHMuVU5TSUdORURfSU5UMTY7XG4vLyAgICAgfSBlbHNlIGlmIChzdHJpbmcuaW5kZXhPZihcInNob3J0XCIpID49IDApIHtcbi8vICAgICAgICAgX3ZhbHVlID0gV2ViQ0xDb25zdGFudHMuU0lHTkVEX0lOVDE2O1xuLy8gICAgIH0gZWxzZSBpZiAoKHN0cmluZy5pbmRleE9mKFwidWludFwiKSA+PSAwKSB8fCAoc3RyaW5nLmluZGV4T2YoXCJ1bnNpZ25lZCBpbnRcIikgPj0gMCkgfHwgKHN0cmluZy5pbmRleE9mKFwic2l6ZV90XCIpID49IDApKSB7XG4vLyAgICAgICAgIF92YWx1ZSA9IFdlYkNMQ29uc3RhbnRzLlVOU0lHTkVEX0lOVDMyO1xuLy8gICAgIH0gZWxzZSBpZiAoKHN0cmluZy5pbmRleE9mKFwiaW50XCIpID49IDApIHx8IChzdHJpbmcuaW5kZXhPZihcImVudW1cIikgPj0gMCkpIHtcbi8vICAgICAgICAgX3ZhbHVlID0gV2ViQ0xDb25zdGFudHMuU0lHTkVEX0lOVDMyO1xuLy8gICAgIH0gZWxzZSBpZiAoc3RyaW5nLmluZGV4T2YoXCJpbWFnZTNkX3RcIikgPj0gMCkge1xuLy8gICAgICAgICBfdmFsdWUgPSAweDEzMDIgLypXZWJDTENvbnN0YW50cy5JTUFHRTNEKi87XG4vLyAgICAgfSBlbHNlIGlmIChzdHJpbmcuaW5kZXhPZihcImltYWdlMmRfdFwiKSA+PSAwKSB7XG4vLyAgICAgICAgIF92YWx1ZSA9IDB4MTMwMSAvKldlYkNMQ29uc3RhbnRzLklNQUdFMkQqLztcbi8vICAgICB9IGVsc2UgaWYgKHN0cmluZy5pbmRleE9mKFwic2FtcGxlcl90XCIpID49IDApIHtcbi8vICAgICAgICAgX3ZhbHVlID0gMHgxMzAwIC8qV2ViQ0xDb25zdGFudHMuU0FNUExFUiovO1xuLy8gICAgIH1cbi8vICAgICByZXR1cm4gX3ZhbHVlO1xuLy8gfSwiLCJpbXBvcnQgeyBXZWJDTENvbnN0YW50U3RyLCBXZWJDTENvbnN0YW50cyB9IGZyb20gXCIuL3dlYmNsY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBXZWJDTEV4Y2VwdGlvbiB9IGZyb20gXCIuL3dlYmNsZXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBDTGVudW0gfSBmcm9tIFwiLi93ZWJjbHR5cGVcIjtcblxuZXhwb3J0IGNsYXNzIFdlYkNMU2FtcGxlciB7XG4gICAgZ2V0SW5mbyhuYW1lOiBDTGVudW0pOiBhbnkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFdlYkNMRXhjZXB0aW9uKFdlYkNMQ29uc3RhbnRzLklOVkFMSURfVkFMVUUsIFwiW0lOVkFMSURfVkFMVUVdIFdlYkNMU2FtcGxlci5nZXRJbmZvKCk6IHVua25vd24gcGFyYW1ldGVyICdcIiArIFdlYkNMQ29uc3RhbnRTdHIobmFtZSkgKyBcIidcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWxlYXNlKCk6IHZvaWQgeyB9XG59XG4iLCJpbXBvcnQgeyBXZWJDTEV2ZW50IH0gZnJvbSBcIi4vd2ViY2xldmVudFwiO1xuaW1wb3J0IHsgQ0xpbnQgfSBmcm9tIFwiLi93ZWJjbHR5cGVcIjtcblxuZXhwb3J0IGNsYXNzIFdlYkNMVXNlckV2ZW50IGV4dGVuZHMgV2ViQ0xFdmVudCB7XG4gICAgc2V0U3RhdHVzKGV4ZWN1dGlvblN0YXR1czogQ0xpbnQpOiB2b2lkIHtcbiAgICAgICAgZXhlY3V0aW9uU3RhdHVzO1xuICAgIH1cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NyZWF0ZUJpbmRpbmcobywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gRXhwb3J0IGFsbCB0aGUgY2xhc3MgV2ViQ0xcbmV4cG9ydCB7IFdlYkNMQnVmZmVyIH0gZnJvbSAnLi93ZWJjbGJ1ZmZlcic7XG5leHBvcnQgeyBXZWJDTENvbW1hbmRRdWV1ZSB9IGZyb20gJy4vd2ViY2xjb21tYW5kcXVldWUnO1xuZXhwb3J0IHsgV2ViQ0xDb250ZXh0IH0gZnJvbSAnLi93ZWJjbGNvbnRleHQnO1xuZXhwb3J0IHsgV2ViQ0xEZXZpY2UgfSBmcm9tICcuL3dlYmNsZGV2aWNlJ1xuZXhwb3J0IHsgV2ViQ0xFeGNlcHRpb24gfSBmcm9tICcuL3dlYmNsZXhjZXB0aW9uJztcbmV4cG9ydCB7IFdlYkNMRXZlbnQgfSBmcm9tICcuL3dlYmNsZXZlbnQnO1xuZXhwb3J0IHsgV2ViQ0xJbWFnZSB9IGZyb20gJy4vd2ViY2xpbWFnZSc7XG5leHBvcnQgeyBXZWJDTEltYWdlRGVzY3JpcHRvciB9IGZyb20gJy4vd2ViY2xpbWFnZWRlc2NyaXB0b3InO1xuZXhwb3J0IHsgV2ViQ0xLZXJuZWwgfSBmcm9tICcuL3dlYmNsa2VybmVsJztcbmV4cG9ydCB7IFdlYkNMS2VybmVsQXJnSW5mbyB9IGZyb20gJy4vd2ViY2xrZXJuZWxhcmdpbmZvJztcbmV4cG9ydCB7IFdlYkNMTWVtb3J5T2JqZWN0IH0gZnJvbSAnLi93ZWJjbG1lbW9yeW9iamVjdCc7XG5leHBvcnQgeyBXZWJDTFBsYXRmb3JtIH0gZnJvbSAnLi93ZWJjbHBsYXRmb3JtJztcbmV4cG9ydCB7IFdlYkNMUHJvZ3JhbSB9IGZyb20gJy4vd2ViY2xwcm9ncmFtJztcbmV4cG9ydCB7IFdlYkNMU2FtcGxlciB9IGZyb20gJy4vd2ViY2xzYW1wbGVyJztcbmV4cG9ydCB7IFdlYkNMVXNlckV2ZW50IH0gZnJvbSAnLi93ZWJjbHVzZXJldmVudCc7XG5leHBvcnQgeyBXZWJDTENvbnN0YW50cyB9IGZyb20gJy4vd2ViY2xjb25zdGFudHMnXG5cbmV4cG9ydCB7IFdlYkNMIH0gZnJvbSAnLi93ZWJjbCc7XG5cbi8vIE1ha2UgaXQgYWNjZXNzaWJsZSB2aWEgbmF2aWdhdG9yLndlYmNsXG5pbXBvcnQgeyBXZWJDTCB9IGZyb20gJy4vd2ViY2wnO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gICAgaW50ZXJmYWNlIE5hdmlnYXRvciB7XG4gICAgICAgIHdlYmNsOiB0eXBlb2YgV2ViQ0w7XG4gICAgfVxufVxuXG4vLyBHZXQgbmF2aWdhdG9yLndlYmNsLmdldFBsYXRmb3JtcygpXG5pZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBuYXZpZ2F0b3Iud2ViY2wgPSBXZWJDTDtcbn1cblxuLy8gR2V0IFdlYkNMLmdldFBsYXRmb3JtcygpXG5leHBvcnQgY29uc3QgZ2V0UGxhdGZvcm1zID0gV2ViQ0wuZ2V0UGxhdGZvcm1zO1xuZXhwb3J0IGNvbnN0IHdlYmNsID0gV2ViQ0w7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=

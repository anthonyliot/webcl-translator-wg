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
        return new webclcontext_1.WebCLContext(platform);
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
var webclmemoryobject_1 = __webpack_require__(/*! ./webclmemoryobject */ "./src/webclmemoryobject.ts");
var WebCLBuffer = /** @class */ (function (_super) {
    tslib_1.__extends(WebCLBuffer, _super);
    function WebCLBuffer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebCLBuffer.prototype.createSubBuffer = function (memFlags, origin, sizeInBytes) {
        memFlags;
        origin;
        sizeInBytes;
        return new WebCLBuffer();
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
    function WebCLCommandQueue() {
    }
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
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLCommandQueue.getInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
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
var webclimage_1 = __webpack_require__(/*! ./webclimage */ "./src/webclimage.ts");
var webclprogram_1 = __webpack_require__(/*! ./webclprogram */ "./src/webclprogram.ts");
var webclsampler_1 = __webpack_require__(/*! ./webclsampler */ "./src/webclsampler.ts");
var webclexception_1 = __webpack_require__(/*! ./webclexception */ "./src/webclexception.ts");
var webclconstants_1 = __webpack_require__(/*! ./webclconstants */ "./src/webclconstants.ts");
var webcluserevent_1 = __webpack_require__(/*! ./webcluserevent */ "./src/webcluserevent.ts");
var WebCLContext = /** @class */ (function () {
    function WebCLContext(wcl_platform) {
        this.wclPlatform = wcl_platform;
    }
    WebCLContext.prototype.createBuffer = function (memFlags, sizeInBytes, hostPtr) {
        memFlags;
        sizeInBytes;
        hostPtr;
        return new webclbuffer_1.WebCLBuffer();
    };
    WebCLContext.prototype.createCommandQueue = function (device, properties) {
        device;
        properties;
        return new webclcommandqueue_1.WebCLCommandQueue();
    };
    WebCLContext.prototype.createImage = function (memFlags, descriptor, hostPtr) {
        memFlags;
        descriptor;
        hostPtr;
        return new webclimage_1.WebCLImage();
    };
    WebCLContext.prototype.createProgram = function (source) {
        return new webclprogram_1.WebCLProgram(this.wclPlatform, this, source);
    };
    WebCLContext.prototype.createSampler = function (normalizedCoords, addressingMode, filterMode) {
        normalizedCoords;
        addressingMode;
        filterMode;
        return new webclsampler_1.WebCLSampler();
    };
    WebCLContext.prototype.createUserEvent = function () {
        return new webcluserevent_1.WebCLUserEvent();
    };
    WebCLContext.prototype.getInfo = function (name) {
        switch (name) {
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLContext.getInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
    };
    WebCLContext.prototype.getSupportedImageFormats = function (memFlags) {
        memFlags;
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
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLDevice.getInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
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
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLEvent.getInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
    };
    WebCLEvent.prototype.getProfilingInfo = function (name) {
        switch (name) {
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLEvent.getProfilingInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
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
    function WebCLKernel() {
    }
    WebCLKernel.prototype.getInfo = function (name) {
        switch (name) {
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLKernel.getInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
    };
    WebCLKernel.prototype.getWorkGroupInfo = function (device, name) {
        device;
        switch (name) {
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLKernel.getWorkGroupInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
    };
    WebCLKernel.prototype.getArgInfo = function (index) {
        switch (index) {
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLKernel.getArgInfo(): unknown parameter '" + index + "'");
        }
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
    function WebCLMemoryObject() {
    }
    WebCLMemoryObject.prototype.getInfo = function (name) {
        switch (name) {
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLMemoryObject.getInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
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
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLPlatform.getInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
    };
    WebCLPlatform.prototype.getDevices = function (_) {
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
var WebCLProgram = /** @class */ (function () {
    function WebCLProgram(wcl_platform, wcl_context, source) {
        this.wclPlatform = wcl_platform;
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
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLProgram.getInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
    };
    WebCLProgram.prototype.getBuildInfo = function (device, name) {
        device;
        switch (name) {
            case webclconstants_1.WebCLConstants.PROGRAM_BUILD_STATUS:
            case webclconstants_1.WebCLConstants.PROGRAM_BUILD_OPTIONS:
            case webclconstants_1.WebCLConstants.PROGRAM_BUILD_LOG:
            default:
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLProgram.getBuildInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
        }
    };
    WebCLProgram.prototype.build = function (devices, options, whenFinished) {
        devices;
        options;
        whenFinished;
    };
    WebCLProgram.prototype.createKernel = function (kernelName) {
        kernelName;
        return new webclkernel_1.WebCLKernel();
    };
    WebCLProgram.prototype.createKernelsInProgram = function () {
        return [];
    };
    WebCLProgram.prototype.release = function () { };
    return WebCLProgram;
}());
exports.WebCLProgram = WebCLProgram;


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
                throw new webclexception_1.WebCLException(webclconstants_1.WebCLConstants.INVALID_EVENT, "[INVALID_EVENT] WebCLSampler.getInfo(): unknown parameter '" + (0, webclconstants_1.WebCLConstantStr)(name) + "'");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBMEI7WUFDMUMsT0FBTyw0QkFBNEIsQ0FBQztRQUN4QyxLQUFLLGNBQWMsQ0FBQyxrQ0FBa0M7WUFDbEQsT0FBTyxvQ0FBb0MsQ0FBQztRQUNoRCxLQUFLLGNBQWMsQ0FBQyxtQ0FBbUM7WUFDbkQsT0FBTyxxQ0FBcUMsQ0FBQztRQUNqRCxLQUFLLGNBQWMsQ0FBQyxpQ0FBaUM7WUFDakQsT0FBTyxtQ0FBbUMsQ0FBQztRQUMvQyxLQUFLLGNBQWMsQ0FBQyxrQ0FBa0M7WUFDbEQsT0FBTyxvQ0FBb0MsQ0FBQztRQUNoRCxLQUFLLGNBQWMsQ0FBQyxtQ0FBbUM7WUFDbkQsT0FBTyxxQ0FBcUMsQ0FBQztRQUNqRCxLQUFLLGNBQWMsQ0FBQyxvQ0FBb0M7WUFDcEQsT0FBTyxzQ0FBc0MsQ0FBQztRQUNsRCxLQUFLLGNBQWMsQ0FBQywwQkFBMEI7WUFDMUMsT0FBTyw0QkFBNEIsQ0FBQztRQUN4QyxLQUFLLGNBQWMsQ0FBQyxtQkFBbUI7WUFDbkMsT0FBTyxxQkFBcUIsQ0FBQztRQUNqQyxLQUFLLGNBQWMsQ0FBQywwQkFBMEI7WUFDMUMsT0FBTyw0QkFBNEIsQ0FBQztRQUN4QyxLQUFLLGNBQWMsQ0FBQywyQkFBMkI7WUFDM0MsT0FBTyw2QkFBNkIsQ0FBQztRQUN6QyxLQUFLLGNBQWMsQ0FBQyx5QkFBeUI7WUFDekMsT0FBTywyQkFBMkIsQ0FBQztRQUN2QyxLQUFLLGNBQWMsQ0FBQyx3QkFBd0I7WUFDeEMsT0FBTywwQkFBMEIsQ0FBQztRQUN0QyxLQUFLLGNBQWMsQ0FBQyx5QkFBeUI7WUFDekMsT0FBTywyQkFBMkIsQ0FBQztRQUN2QyxLQUFLLGNBQWMsQ0FBQyx3QkFBd0I7WUFDeEMsT0FBTywwQkFBMEIsQ0FBQztRQUN0QyxLQUFLLGNBQWMsQ0FBQyx5QkFBeUI7WUFDekMsT0FBTywyQkFBMkIsQ0FBQztRQUN2QyxLQUFLLGNBQWMsQ0FBQyx3QkFBd0I7WUFDeEMsT0FBTywwQkFBMEIsQ0FBQztRQUN0QyxLQUFLLGNBQWMsQ0FBQyxvQkFBb0I7WUFDcEMsT0FBTyxzQkFBc0IsQ0FBQztRQUNs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QywrSEFBYztBQUN2QixrRkFBMEM7QUFBakMsbUhBQVU7QUFDbkIsa0ZBQTBDO0FBQWpDLG1IQUFVO0FBQ25CLGdIQUE4RDtBQUFyRCxpSkFBb0I7QUFDN0IscUZBQTRDO0FBQW5DLHNIQUFXO0FBQ3BCLDBHQUEwRDtBQUFqRCwySUFBa0I7QUFDM0IsdUdBQXdEO0FBQS9DLHdJQUFpQjtBQUMxQiwyRkFBZ0Q7QUFBdkMsNEhBQWE7QUFDdEIsd0ZBQThDO0FBQXJDLHlIQUFZO0FBQ3JCLHdGQUE4QztBQUFyQyx5SEFBWTtBQUNyQiw4RkFBa0Q7QUFBekMsK0hBQWM7QUFDdkIsOEZBQWlEO0FBQXhDLCtIQUFjO0FBRXZCLG1FQUFnQztBQUF2QixvR0FBSztBQUVkLHlDQUF5QztBQUN6QyxtRUFBZ0M7QUFRaEMscUNBQXFDO0FBQ3JDLElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxFQUFFO0lBQ2xDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsYUFBSyxDQUFDO0NBQzNCO0FBRUQsMkJBQTJCO0FBQ2Qsb0JBQVksR0FBRyxhQUFLLENBQUMsWUFBWSxDQUFDO0FBQ2xDLGFBQUssR0FBRyxhQUFLLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJjbC8uL3NyYy93ZWJjbC50cyIsIndlYnBhY2s6Ly93ZWJjbC8uL3NyYy93ZWJjbGJ1ZmZlci50cyIsIndlYnBhY2s6Ly93ZWJjbC8uL3NyYy93ZWJjbGNvbW1hbmRxdWV1ZS50cyIsIndlYnBhY2s6Ly93ZWJjbC8uL3NyYy93ZWJjbGNvbnN0YW50cy50cyIsIndlYnBhY2s6Ly93ZWJjbC8uL3NyYy93ZWJjbGNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vd2ViY2wvLi9zcmMvd2ViY2xkZXZpY2UudHMiLCJ3ZWJwYWNrOi8vd2ViY2wvLi9zcmMvd2ViY2xldmVudC50cyIsIndlYnBhY2s6Ly93ZWJjbC8uL3NyYy93ZWJjbGV4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly93ZWJjbC8uL3NyYy93ZWJjbGltYWdlLnRzIiwid2VicGFjazovL3dlYmNsLy4vc3JjL3dlYmNsaW1hZ2VkZXNjcmlwdG9yLnRzIiwid2VicGFjazovL3dlYmNsLy4vc3JjL3dlYmNsa2VybmVsLnRzIiwid2VicGFjazovL3dlYmNsLy4vc3JjL3dlYmNsa2VybmVsYXJnaW5mby50cyIsIndlYnBhY2s6Ly93ZWJjbC8uL3NyYy93ZWJjbG1lbW9yeW9iamVjdC50cyIsIndlYnBhY2s6Ly93ZWJjbC8uL3NyYy93ZWJjbHBsYXRmb3JtLnRzIiwid2VicGFjazovL3dlYmNsLy4vc3JjL3dlYmNscHJvZ3JhbS50cyIsIndlYnBhY2s6Ly93ZWJjbC8uL3NyYy93ZWJjbHNhbXBsZXIudHMiLCJ3ZWJwYWNrOi8vd2ViY2wvLi9zcmMvd2ViY2x1c2VyZXZlbnQudHMiLCJ3ZWJwYWNrOi8vd2ViY2wvLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwid2VicGFjazovL3dlYmNsL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYmNsL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJjbC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYmNsL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViY2wvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJAd2ViZ3B1L3R5cGVzXCIgLz5cblxuaW1wb3J0IHsgQ0xlbnVtLCBDTGJvb2xlYW4sIFdlYkNMQ2FsbGJhY2sgfSBmcm9tICcuL3dlYmNsdHlwZSc7XG5pbXBvcnQgeyBXZWJDTENvbnN0YW50cyB9IGZyb20gJy4vd2ViY2xjb25zdGFudHMnO1xuaW1wb3J0IHsgV2ViQ0xQbGF0Zm9ybSB9IGZyb20gJy4vd2ViY2xwbGF0Zm9ybSc7XG5pbXBvcnQgeyBXZWJDTENvbnRleHQgfSBmcm9tICcuL3dlYmNsY29udGV4dCc7XG5pbXBvcnQgeyBXZWJDTERldmljZSB9IGZyb20gJy4vd2ViY2xkZXZpY2UnO1xuaW1wb3J0IHsgV2ViQ0xFdmVudCB9IGZyb20gJy4vd2ViY2xldmVudCc7XG5cbmxldCBwbGF0Zm9ybTogV2ViQ0xQbGF0Zm9ybSB8IG51bGwgPSBudWxsO1xuXG4vLyBEZWZpbmUgdGhlIFdlYkNMIG5hbWVzcGFjZSB3aXRoIGNvbnN0YW50cyBhbmQgZnVuY3Rpb25cbmV4cG9ydCBjb25zdCBXZWJDTCA9IHtcbiAgICAuLi5XZWJDTENvbnN0YW50cyxcbiAgICBhc3luYyBpbml0aWFsaXplKGNhbGxiYWNrOiBXZWJDTENhbGxiYWNrKTogUHJvbWlzZTxDTGJvb2xlYW4+IHtcbiAgICAgICAgLy8gQ2hlY2sgdG8gZW5zdXJlIHRoZSB1c2VyIGFnZW50IHN1cHBvcnRzIFdlYkdQVS5cbiAgICAgICAgaWYgKCEoXCJncHVcIiBpbiBuYXZpZ2F0b3IpKSB7XG4gICAgICAgICAgICByZXBvcnRFcnJvcih7IG1lc3NhZ2U6IFwiVXNlciBhZ2VudCBkb2VzbuKAmXQgc3VwcG9ydCBXZWJHUFUuXCIgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGxhdGZvcm0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXBvcnRFcnJvcih7IG1lc3NhZ2U6IFwiV2ViQ0wgaGFzIGFscmVhZHkgYmVlbiBpbml0aWFsaXplZC5cIiB9KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlcXVlc3QgYW4gYWRhcHRlci5cbiAgICAgICAgdmFyIHdncHVfcGxhdGZvcm0gPSBhd2FpdCBuYXZpZ2F0b3IuZ3B1LnJlcXVlc3RBZGFwdGVyKCk7XG4gICAgICAgIHZhciB3Z3B1X2luZm8gPSBhd2FpdCB3Z3B1X3BsYXRmb3JtLnJlcXVlc3RBZGFwdGVySW5mbygpO1xuICAgICAgICAvLyByZXF1ZXN0QWRhcHRlciBtYXkgcmVzb2x2ZSB3aXRoIG51bGwgaWYgbm8gc3VpdGFibGUgYWRhcHRlcnMgYXJlIGZvdW5kLlxuICAgICAgICBpZiAoIXdncHVfcGxhdGZvcm0pIHtcbiAgICAgICAgICAgIHJlcG9ydEVycm9yKHsgbWVzc2FnZTogXCJObyBXZWJHUFUgYWRhcHRlcnMgZm91bmQuXCIgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXF1ZXN0IGEgZGV2aWNlLlxuICAgICAgICB2YXIgd2dwdV9kZXZpY2UgPSBhd2FpdCB3Z3B1X3BsYXRmb3JtLnJlcXVlc3REZXZpY2UoKTtcbiAgICAgICAgd2dwdV9kZXZpY2UuYWRkRXZlbnRMaXN0ZW5lcihcInVuY2FwdHVyZWRlcnJvclwiLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgLy8gUmUtc3VyZmFjZSB0aGUgZXJyb3IuXG4gICAgICAgICAgICByZXBvcnRFcnJvcih7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYEEgV2ViR1BVIGVycm9yIHdhcyBub3QgY2FwdHVyZWQ6ICR7ZXZlbnQubWVzc2FnZX19YFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdncHVfZGV2aWNlLmxvc3QudGhlbigoaW5mbzogeyBtZXNzYWdlOiBhbnk7IHJlYXNvbjogc3RyaW5nOyB9KSA9PiB7XG4gICAgICAgICAgICByZXBvcnRFcnJvcih7IG1lc3NhZ2U6IGBXZWJHUFUgZGV2aWNlIHdhcyBsb3N0OiAke2luZm8ubWVzc2FnZX1gIH0pO1xuICAgICAgICAgICAgd2dwdV9kZXZpY2UgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGluZm8ucmVhc29uICE9IFwiZGVzdHJveWVkXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemUoY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBwbGF0Zm9ybSA9IG5ldyBXZWJDTFBsYXRmb3JtKHdncHVfaW5mbywgd2dwdV9kZXZpY2UpO1xuICAgICAgICBjYWxsYmFjayhXZWJDTC5TVUNDRVNTLCB1bmRlZmluZWQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGdldFBsYXRmb3JtcygpOiBXZWJDTFBsYXRmb3JtW10ge1xuICAgICAgICBpZiAocGxhdGZvcm0gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFtwbGF0Zm9ybV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH0sXG4gICAgY3JlYXRlQ29udGV4dChfOiBXZWJDTFBsYXRmb3JtIHwgV2ViQ0xEZXZpY2UgfCBXZWJDTERldmljZVtdIHwgQ0xlbnVtLCBfXz86IENMZW51bSk6IFdlYkNMQ29udGV4dCB7XG4gICAgICAgIHJldHVybiBuZXcgV2ViQ0xDb250ZXh0KHBsYXRmb3JtKTtcbiAgICB9LFxuICAgIGdldFN1cHBvcnRlZEV4dGVuc2lvbnMoKTogc3RyaW5nW10gfCBudWxsIHtcbiAgICAgICAgaWYgKHBsYXRmb3JtICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwbGF0Zm9ybS5nZXRTdXBwb3J0ZWRFeHRlbnNpb25zKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBlbmFibGVFeHRlbnNpb24oZXh0ZW5zaW9uTmFtZTogc3RyaW5nKTogQ0xib29sZWFuIHtcbiAgICAgICAgaWYgKHBsYXRmb3JtICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwbGF0Zm9ybS5lbmFibGVFeHRlbnNpb24oZXh0ZW5zaW9uTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlOy8vIFJlcGxhY2Ugd2l0aCBhY3R1YWwgaW1wbGVtZW50YXRpb25cbiAgICB9LFxuICAgIHdhaXRGb3JFdmVudHMoZXZlbnRXYWl0TGlzdDogV2ViQ0xFdmVudFtdLCB3aGVuRmluaXNoZWQ/OiBXZWJDTENhbGxiYWNrKTogdm9pZCB7XG4gICAgICAgIC8vIEltcGxlbWVudCB0aGUgbG9naWMgdG8gd2FpdCBmb3IgZXZlbnRzXG4gICAgICAgIGV2ZW50V2FpdExpc3Q7XG4gICAgICAgIHdoZW5GaW5pc2hlZDtcbiAgICB9LFxuICAgIHJlbGVhc2VBbGwoKTogdm9pZCB7XG4gICAgICAgIC8vIEltcGxlbWVudCB0aGUgbG9naWMgdG8gcmVsZWFzZSBhbGwgcmVzb3VyY2VzXG4gICAgfVxuXG59O1xuIiwiXG5pbXBvcnQgeyBXZWJDTE1lbW9yeU9iamVjdCB9IGZyb20gJy4vd2ViY2xtZW1vcnlvYmplY3QnO1xuaW1wb3J0IHsgQ0xlbnVtLCBDTHVpbnQgfSBmcm9tICcuL3dlYmNsdHlwZSc7XG5cbmV4cG9ydCBjbGFzcyBXZWJDTEJ1ZmZlciBleHRlbmRzIFdlYkNMTWVtb3J5T2JqZWN0IHtcbiAgICBjcmVhdGVTdWJCdWZmZXIobWVtRmxhZ3M6IENMZW51bSwgb3JpZ2luOiBDTHVpbnQsIHNpemVJbkJ5dGVzOiBDTHVpbnQpOiBXZWJDTEJ1ZmZlciB7XG4gICAgICAgIG1lbUZsYWdzO1xuICAgICAgICBvcmlnaW47XG4gICAgICAgIHNpemVJbkJ5dGVzO1xuXG4gICAgICAgIHJldHVybiBuZXcgV2ViQ0xCdWZmZXIoKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgV2ViQ0xCdWZmZXIgfSBmcm9tIFwiLi93ZWJjbGJ1ZmZlclwiO1xuaW1wb3J0IHsgV2ViQ0xDb25zdGFudFN0ciwgV2ViQ0xDb25zdGFudHMgfSBmcm9tIFwiLi93ZWJjbGNvbnN0YW50c1wiO1xuaW1wb3J0IHsgV2ViQ0xFeGNlcHRpb24gfSBmcm9tIFwiLi93ZWJjbGV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgV2ViQ0xFdmVudCB9IGZyb20gXCIuL3dlYmNsZXZlbnRcIjtcbmltcG9ydCB7IFdlYkNMSW1hZ2UgfSBmcm9tIFwiLi93ZWJjbGltYWdlXCI7XG5pbXBvcnQgeyBXZWJDTEtlcm5lbCB9IGZyb20gXCIuL3dlYmNsa2VybmVsXCI7XG5pbXBvcnQgeyBDTGJvb2xlYW4sIENMZW51bSwgQ0x1aW50LCBXZWJDTENhbGxiYWNrIH0gZnJvbSBcIi4vd2ViY2x0eXBlXCI7XG5cbmV4cG9ydCBjbGFzcyBXZWJDTENvbW1hbmRRdWV1ZSB7XG5cbiAgICBlbnF1ZXVlQ29weUJ1ZmZlcihzcmNCdWZmZXI6IFdlYkNMQnVmZmVyLCBkc3RCdWZmZXI6IFdlYkNMQnVmZmVyLCBzcmNPZmZzZXQ6IENMdWludCwgZHN0T2Zmc2V0OiBDTHVpbnQsIG51bUJ5dGVzOiBDTHVpbnQsIGV2ZW50V2FpdExpc3Q/OiBBcnJheTxXZWJDTEV2ZW50PiB8IG51bGwsIGV2ZW50PzogV2ViQ0xFdmVudCB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgc3JjQnVmZmVyO1xuICAgICAgICBkc3RCdWZmZXI7XG4gICAgICAgIHNyY09mZnNldDtcbiAgICAgICAgZHN0T2Zmc2V0O1xuICAgICAgICBudW1CeXRlcztcbiAgICAgICAgZXZlbnRXYWl0TGlzdDtcbiAgICAgICAgZXZlbnQ7XG4gICAgfVxuICAgIGVucXVldWVDb3B5QnVmZmVyUmVjdChzcmNCdWZmZXI6IFdlYkNMQnVmZmVyLCBkc3RCdWZmZXI6IFdlYkNMQnVmZmVyLCBzcmNPcmlnaW46IEFycmF5PENMdWludD4sIGRzdE9yaWdpbjogQXJyYXk8Q0x1aW50PiwgcmVnaW9uOiBBcnJheTxDTHVpbnQ+LCBzcmNSb3dQaXRjaDogQ0x1aW50LCBzcmNTbGljZVBpdGNoOiBDTHVpbnQsIGRzdFJvd1BpdGNoOiBDTHVpbnQsIGRzdFNsaWNlUGl0Y2g6IENMdWludCwgZXZlbnRXYWl0TGlzdD86IEFycmF5PFdlYkNMRXZlbnQ+IHwgbnVsbCwgZXZlbnQ/OiBXZWJDTEV2ZW50IHwgbnVsbCk6IHZvaWQge1xuICAgICAgICBzcmNCdWZmZXI7XG4gICAgICAgIGRzdEJ1ZmZlcjtcbiAgICAgICAgc3JjT3JpZ2luO1xuICAgICAgICBkc3RPcmlnaW47XG4gICAgICAgIHJlZ2lvbjtcbiAgICAgICAgc3JjUm93UGl0Y2g7XG4gICAgICAgIHNyY1NsaWNlUGl0Y2g7XG4gICAgICAgIGRzdFJvd1BpdGNoO1xuICAgICAgICBkc3RTbGljZVBpdGNoO1xuICAgICAgICBldmVudFdhaXRMaXN0O1xuICAgICAgICBldmVudDtcbiAgICB9XG4gICAgZW5xdWV1ZUNvcHlJbWFnZShzcmNJbWFnZTogV2ViQ0xJbWFnZSwgZHN0SW1hZ2U6IFdlYkNMSW1hZ2UsIHNyY09yaWdpbjogQXJyYXk8Q0x1aW50PiwgZHN0T3JpZ2luOiBBcnJheTxDTHVpbnQ+LCByZWdpb246IEFycmF5PENMdWludD4sIGV2ZW50V2FpdExpc3Q/OiBBcnJheTxXZWJDTEV2ZW50PiB8IG51bGwsIGV2ZW50PzogV2ViQ0xFdmVudCB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgc3JjSW1hZ2U7XG4gICAgICAgIGRzdEltYWdlO1xuICAgICAgICBzcmNPcmlnaW47XG4gICAgICAgIGRzdE9yaWdpbjtcbiAgICAgICAgcmVnaW9uO1xuICAgICAgICBldmVudFdhaXRMaXN0O1xuICAgICAgICBldmVudDtcbiAgICB9XG4gICAgZW5xdWV1ZUNvcHlJbWFnZVRvQnVmZmVyKHNyY0ltYWdlOiBXZWJDTEltYWdlLCBkc3RCdWZmZXI6IFdlYkNMQnVmZmVyLCBzcmNPcmlnaW46IEFycmF5PENMdWludD4sIHNyY1JlZ2lvbjogQXJyYXk8Q0x1aW50PiwgZHN0T2Zmc2V0OiBDTHVpbnQsIGV2ZW50V2FpdExpc3Q/OiBBcnJheTxXZWJDTEV2ZW50PiB8IG51bGwsIGV2ZW50PzogV2ViQ0xFdmVudCB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgc3JjSW1hZ2U7XG4gICAgICAgIGRzdEJ1ZmZlcjtcbiAgICAgICAgc3JjT3JpZ2luO1xuICAgICAgICBzcmNSZWdpb247XG4gICAgICAgIGRzdE9mZnNldDtcbiAgICAgICAgZXZlbnRXYWl0TGlzdDtcbiAgICAgICAgZXZlbnQ7XG4gICAgfVxuICAgIGVucXVldWVDb3B5QnVmZmVyVG9JbWFnZShzcmNCdWZmZXI6IFdlYkNMQnVmZmVyLCBkc3RJbWFnZTogV2ViQ0xJbWFnZSwgc3JjT2Zmc2V0OiBDTHVpbnQsIGRzdE9yaWdpbjogQXJyYXk8Q0x1aW50PiwgZHN0UmVnaW9uOiBBcnJheTxDTHVpbnQ+LCBldmVudFdhaXRMaXN0PzogQXJyYXk8V2ViQ0xFdmVudD4gfCBudWxsLCBldmVudD86IFdlYkNMRXZlbnQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIHNyY0J1ZmZlcjtcbiAgICAgICAgZHN0SW1hZ2U7XG4gICAgICAgIHNyY09mZnNldDtcbiAgICAgICAgZHN0T3JpZ2luO1xuICAgICAgICBkc3RSZWdpb247XG4gICAgICAgIGV2ZW50V2FpdExpc3Q7XG4gICAgICAgIGV2ZW50O1xuICAgIH1cbiAgICBlbnF1ZXVlUmVhZEJ1ZmZlcihidWZmZXI6IFdlYkNMQnVmZmVyLCBibG9ja2luZ1JlYWQ6IENMYm9vbGVhbiwgYnVmZmVyT2Zmc2V0OiBDTHVpbnQsIG51bUJ5dGVzOiBDTHVpbnQsIGhvc3RQdHI6IEFycmF5QnVmZmVyVmlldywgZXZlbnRXYWl0TGlzdD86IEFycmF5PFdlYkNMRXZlbnQ+IHwgbnVsbCwgZXZlbnQ/OiBXZWJDTEV2ZW50IHwgbnVsbCk6IHZvaWQge1xuICAgICAgICBidWZmZXI7XG4gICAgICAgIGJsb2NraW5nUmVhZDtcbiAgICAgICAgYnVmZmVyT2Zmc2V0O1xuICAgICAgICBudW1CeXRlcztcbiAgICAgICAgaG9zdFB0cjtcbiAgICAgICAgZXZlbnRXYWl0TGlzdDtcbiAgICAgICAgZXZlbnQ7XG4gICAgfVxuICAgIGVucXVldWVSZWFkQnVmZmVyUmVjdChidWZmZXI6IFdlYkNMQnVmZmVyLCBibG9ja2luZ1JlYWQ6IENMYm9vbGVhbiwgYnVmZmVyT3JpZ2luOiBBcnJheTxDTHVpbnQ+LCBob3N0T3JpZ2luOiBBcnJheTxDTHVpbnQ+LCByZWdpb246IEFycmF5PENMdWludD4sIGJ1ZmZlclJvd1BpdGNoOiBDTHVpbnQsIGJ1ZmZlclNsaWNlUGl0Y2g6IENMdWludCwgaG9zdFJvd1BpdGNoOiBDTHVpbnQsIGhvc3RTbGljZVBpdGNoOiBDTHVpbnQsIGhvc3RQdHI6IEFycmF5QnVmZmVyVmlldywgZXZlbnRXYWl0TGlzdD86IEFycmF5PFdlYkNMRXZlbnQ+IHwgbnVsbCwgZXZlbnQ/OiBXZWJDTEV2ZW50IHwgbnVsbCk6IHZvaWQge1xuICAgICAgICBidWZmZXI7XG4gICAgICAgIGJsb2NraW5nUmVhZDtcbiAgICAgICAgYnVmZmVyT3JpZ2luO1xuICAgICAgICBob3N0T3JpZ2luO1xuICAgICAgICByZWdpb247XG4gICAgICAgIGJ1ZmZlclJvd1BpdGNoO1xuICAgICAgICBidWZmZXJTbGljZVBpdGNoO1xuICAgICAgICBob3N0Um93UGl0Y2g7XG4gICAgICAgIGhvc3RTbGljZVBpdGNoO1xuICAgICAgICBob3N0UHRyO1xuICAgICAgICBldmVudFdhaXRMaXN0O1xuICAgICAgICBldmVudDtcbiAgICB9XG4gICAgZW5xdWV1ZVJlYWRJbWFnZShpbWFnZTogV2ViQ0xJbWFnZSwgYmxvY2tpbmdSZWFkOiBDTGJvb2xlYW4sIG9yaWdpbjogQXJyYXk8Q0x1aW50PiwgcmVnaW9uOiBBcnJheTxDTHVpbnQ+LCBob3N0Um93UGl0Y2g6IENMdWludCwgaG9zdFB0cjogQXJyYXlCdWZmZXJWaWV3LCBldmVudFdhaXRMaXN0PzogQXJyYXk8V2ViQ0xFdmVudD4gfCBudWxsLCBldmVudD86IFdlYkNMRXZlbnQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGltYWdlO1xuICAgICAgICBibG9ja2luZ1JlYWQ7XG4gICAgICAgIG9yaWdpbjtcbiAgICAgICAgcmVnaW9uO1xuICAgICAgICBob3N0Um93UGl0Y2g7XG4gICAgICAgIGhvc3RQdHI7XG4gICAgICAgIGV2ZW50V2FpdExpc3Q7XG4gICAgICAgIGV2ZW50O1xuICAgIH1cbiAgICBlbnF1ZXVlV3JpdGVCdWZmZXIoYnVmZmVyOiBXZWJDTEJ1ZmZlciwgYmxvY2tpbmdXcml0ZTogQ0xib29sZWFuLCBidWZmZXJPZmZzZXQ6IENMdWludCwgbnVtQnl0ZXM6IENMdWludCwgaG9zdFB0cjogQXJyYXlCdWZmZXJWaWV3LCBldmVudFdhaXRMaXN0PzogQXJyYXk8V2ViQ0xFdmVudD4gfCBudWxsLCBldmVudD86IFdlYkNMRXZlbnQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGJ1ZmZlcjtcbiAgICAgICAgYmxvY2tpbmdXcml0ZTtcbiAgICAgICAgYnVmZmVyT2Zmc2V0O1xuICAgICAgICBudW1CeXRlcztcbiAgICAgICAgaG9zdFB0cjtcbiAgICAgICAgZXZlbnRXYWl0TGlzdDtcbiAgICAgICAgZXZlbnQ7XG4gICAgfVxuICAgIGVucXVldWVXcml0ZUJ1ZmZlclJlY3QoYnVmZmVyOiBXZWJDTEJ1ZmZlciwgYmxvY2tpbmdXcml0ZTogQ0xib29sZWFuLCBidWZmZXJPcmlnaW46IEFycmF5PENMdWludD4sIGhvc3RPcmlnaW46IEFycmF5PENMdWludD4sIHJlZ2lvbjogQXJyYXk8Q0x1aW50PiwgYnVmZmVyUm93UGl0Y2g6IENMdWludCwgYnVmZmVyU2xpY2VQaXRjaDogQ0x1aW50LCBob3N0Um93UGl0Y2g6IENMdWludCwgaG9zdFNsaWNlUGl0Y2g6IENMdWludCwgaG9zdFB0cjogQXJyYXlCdWZmZXJWaWV3LCBldmVudFdhaXRMaXN0PzogQXJyYXk8V2ViQ0xFdmVudD4gfCBudWxsLCBldmVudD86IFdlYkNMRXZlbnQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGJ1ZmZlcjtcbiAgICAgICAgYmxvY2tpbmdXcml0ZTtcbiAgICAgICAgYnVmZmVyT3JpZ2luO1xuICAgICAgICBob3N0T3JpZ2luO1xuICAgICAgICByZWdpb247XG4gICAgICAgIGJ1ZmZlclJvd1BpdGNoO1xuICAgICAgICBidWZmZXJTbGljZVBpdGNoO1xuICAgICAgICBob3N0Um93UGl0Y2g7XG4gICAgICAgIGhvc3RTbGljZVBpdGNoO1xuICAgICAgICBob3N0UHRyO1xuICAgICAgICBldmVudFdhaXRMaXN0O1xuICAgICAgICBldmVudDtcbiAgICB9XG4gICAgZW5xdWV1ZVdyaXRlSW1hZ2UoaW1hZ2U6IFdlYkNMSW1hZ2UsIGJsb2NraW5nV3JpdGU6IENMYm9vbGVhbiwgb3JpZ2luOiBBcnJheTxDTHVpbnQ+LCByZWdpb246IEFycmF5PENMdWludD4sIGhvc3RSb3dQaXRjaDogQ0x1aW50LCBob3N0UHRyOiBBcnJheUJ1ZmZlclZpZXcsIGV2ZW50V2FpdExpc3Q/OiBBcnJheTxXZWJDTEV2ZW50PiB8IG51bGwsIGV2ZW50PzogV2ViQ0xFdmVudCB8IG51bGwpOiB2b2lkIHtcbiAgICAgICAgaW1hZ2U7XG4gICAgICAgIGJsb2NraW5nV3JpdGU7XG4gICAgICAgIG9yaWdpbjtcbiAgICAgICAgcmVnaW9uO1xuICAgICAgICBob3N0Um93UGl0Y2g7XG4gICAgICAgIGhvc3RQdHI7XG4gICAgICAgIGV2ZW50V2FpdExpc3Q7XG4gICAgICAgIGV2ZW50O1xuICAgIH1cbiAgICBlbnF1ZXVlTkRSYW5nZUtlcm5lbChrZXJuZWw6IFdlYkNMS2VybmVsLCB3b3JrRGltOiBDTHVpbnQsIGdsb2JhbFdvcmtPZmZzZXQ6IEFycmF5PENMdWludD4gfCBudWxsLCBnbG9iYWxXb3JrU2l6ZTogQXJyYXk8Q0x1aW50PiwgbG9jYWxXb3JrU2l6ZT86IEFycmF5PENMdWludD4gfCBudWxsLCBldmVudFdhaXRMaXN0PzogQXJyYXk8V2ViQ0xFdmVudD4gfCBudWxsLCBldmVudD86IFdlYkNMRXZlbnQgfCBudWxsKTogdm9pZCB7XG4gICAgICAgIGtlcm5lbDtcbiAgICAgICAgd29ya0RpbTtcbiAgICAgICAgZ2xvYmFsV29ya09mZnNldDtcbiAgICAgICAgZ2xvYmFsV29ya1NpemU7XG4gICAgICAgIGxvY2FsV29ya1NpemU7XG4gICAgICAgIGV2ZW50V2FpdExpc3Q7XG4gICAgICAgIGV2ZW50O1xuICAgIH1cbiAgICBlbnF1ZXVlTWFya2VyKGV2ZW50OiBXZWJDTEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50O1xuICAgIH1cbiAgICBlbnF1ZXVlQmFycmllcigpOiB2b2lkIHtcblxuICAgIH1cbiAgICBlbnF1ZXVlV2FpdEZvckV2ZW50cyhldmVudFdhaXRMaXN0OiBBcnJheTxXZWJDTEV2ZW50Pik6IHZvaWQge1xuICAgICAgICBldmVudFdhaXRMaXN0O1xuICAgIH1cbiAgICBmaW5pc2god2hlbkZpbmlzaGVkPzogV2ViQ0xDYWxsYmFjayk6IHZvaWQge1xuICAgICAgICB3aGVuRmluaXNoZWQ7XG4gICAgfVxuICAgIGZsdXNoKCk6IHZvaWQge1xuXG4gICAgfVxuICAgIGdldEluZm8obmFtZTogQ0xlbnVtKTogYW55IHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXZWJDTEV4Y2VwdGlvbihXZWJDTENvbnN0YW50cy5JTlZBTElEX0VWRU5ULCBcIltJTlZBTElEX0VWRU5UXSBXZWJDTENvbW1hbmRRdWV1ZS5nZXRJbmZvKCk6IHVua25vd24gcGFyYW1ldGVyICdcIiArIFdlYkNMQ29uc3RhbnRTdHIobmFtZSkgKyBcIidcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVsZWFzZSgpOiB2b2lkIHtcblxuICAgIH1cblxufSIsImV4cG9ydCBlbnVtIFdlYkNMQ29uc3RhbnRzIHtcbiAgICBTVUNDRVNTID0gMCxcbiAgICBERVZJQ0VfTk9UX0ZPVU5EID0gLTEsXG4gICAgREVWSUNFX05PVF9BVkFJTEFCTEUgPSAtMixcbiAgICBERVZJQ0VfQ09NUElMRVJfTk9UX0FWQUlMQUJMRSA9IC0zLFxuICAgIE1FTV9PQkpFQ1RfQUxMT0NBVElPTl9GQUlMVVJFID0gLTQsXG4gICAgT1VUX09GX1JFU09VUkNFUyA9IC01LFxuICAgIE9VVF9PRl9IT1NUX01FTU9SWSA9IC02LFxuICAgIFBST0ZJTElOR19JTkZPX05PVF9BVkFJTEFCTEUgPSAtNyxcbiAgICBNRU1fQ09QWV9PVkVSTEFQID0gLTgsXG4gICAgSU1BR0VfRk9STUFUX01JU01BVENIID0gLTksXG4gICAgSU1BR0VfRk9STUFUX05PVF9TVVBQT1JURUQgPSAtMTAsXG4gICAgQlVJTERfUFJPR1JBTV9GQUlMVVJFID0gLTExLFxuICAgIE1BUF9GQUlMVVJFID0gLTEyLFxuICAgIElOVkFMSURfVkFMVUUgPSAtMzAsXG4gICAgSU5WQUxJRF9ERVZJQ0VfVFlQRSA9IC0zMSxcbiAgICBJTlZBTElEX1BMQVRGT1JNID0gLTMyLFxuICAgIElOVkFMSURfREVWSUNFID0gLTMzLFxuICAgIElOVkFMSURfQ09OVEVYVCA9IC0zNCxcbiAgICBJTlZBTElEX1FVRVVFX1BST1BFUlRJRVMgPSAtMzUsXG4gICAgSU5WQUxJRF9DT01NQU5EX1FVRVVFID0gLTM2LFxuICAgIElOVkFMSURfSE9TVF9QVFIgPSAtMzcsXG4gICAgSU5WQUxJRF9NRU1fT0JKRUNUID0gLTM4LFxuICAgIElOVkFMSURfSU1BR0VfRk9STUFUX0RFU0NSSVBUT1IgPSAtMzksXG4gICAgSU5WQUxJRF9JTUFHRV9TSVpFID0gLTQwLFxuICAgIElOVkFMSURfU0FNUExFUiA9IC00MSxcbiAgICBJTlZBTElEX0JJTkFSWSA9IC00MixcbiAgICBJTlZBTElEX0JVSUxEX09QVElPTlMgPSAtNDMsXG4gICAgSU5WQUxJRF9QUk9HUkFNID0gLTQ0LFxuICAgIElOVkFMSURfUFJPR1JBTV9FWEVDVVRBQkxFID0gLTQ1LFxuICAgIElOVkFMSURfS0VSTkVMX05BTUUgPSAtNDYsXG4gICAgSU5WQUxJRF9LRVJORUxfREVGSU5JVElPTiA9IC00NyxcbiAgICBJTlZBTElEX0tFUk5FTCA9IC00OCxcbiAgICBJTlZBTElEX0FSR19JTkRFWCA9IC00OSxcbiAgICBJTlZBTElEX0FSR19WQUxVRSA9IC01MCxcbiAgICBJTlZBTElEX0FSR19TSVpFID0gLTUxLFxuICAgIElOVkFMSURfS0VSTkVMX0FSR1MgPSAtNTIsXG4gICAgSU5WQUxJRF9XT1JLX0RJTUVOU0lPTiA9IC01MyxcbiAgICBJTlZBTElEX1dPUktfR1JPVVBfU0laRSA9IC01NCxcbiAgICBJTlZBTElEX1dPUktfSVRFTV9TSVpFID0gLTU1LFxuICAgIElOVkFMSURfR0xPQkFMX09GRlNFVCA9IC01NixcbiAgICBJTlZBTElEX0VWRU5UX1dBSVRfTElTVCA9IC01NyxcbiAgICBJTlZBTElEX0VWRU5UID0gLTU4LFxuICAgIElOVkFMSURfT1BFUkFUSU9OID0gLTU5LFxuICAgIElOVkFMSURfR0xfT0JKRUNUID0gLTYwLFxuICAgIElOVkFMSURfQlVGRkVSX1NJWkUgPSAtNjEsXG4gICAgSU5WQUxJRF9NSVBfTEVWRUwgPSAtNjIsXG4gICAgVkVSU0lPTl8xXzAgPSAxLFxuICAgIEZBTFNFID0gMCxcbiAgICBUUlVFID0gMSxcbiAgICBQTEFURk9STV9QUk9GSUxFID0gMHgwOTAwLFxuICAgIFBMQVRGT1JNX1ZFUlNJT04gPSAweDA5MDEsXG4gICAgUExBVEZPUk1fTkFNRSA9IDB4MDkwMixcbiAgICBQTEFURk9STV9WRU5ET1IgPSAweDA5MDMsXG4gICAgUExBVEZPUk1fRVhURU5TSU9OUyA9IDB4MDkwNCxcbiAgICBERVZJQ0VfVFlQRV9ERUZBVUxUID0gMHgxLFxuICAgIERFVklDRV9UWVBFX0NQVSA9IDB4MixcbiAgICBERVZJQ0VfVFlQRV9HUFUgPSAweDQsXG4gICAgREVWSUNFX1RZUEVfQUNDRUxFUkFUT1IgPSAweDgsXG4gICAgREVWSUNFX1RZUEVfREVCVUcgPSAweDE2LFxuICAgIERFVklDRV9UWVBFX0FMTCA9IDB4ZmZmZmZmZmYsXG4gICAgREVWSUNFX1RZUEUgPSAweDEwMDAsXG4gICAgREVWSUNFX1ZFTkRPUl9JRCA9IDB4MTAwMSxcbiAgICBERVZJQ0VfTUFYX0NPTVBVVEVfVU5JVFMgPSAweDEwMDIsXG4gICAgREVWSUNFX01BWF9XT1JLX0lURU1fRElNRU5TSU9OUyA9IDB4MTAwMyxcbiAgICBERVZJQ0VfTUFYX1dPUktfR1JPVVBfU0laRSA9IDB4MTAwNCxcbiAgICBERVZJQ0VfTUFYX1dPUktfSVRFTV9TSVpFUyA9IDB4MTAwNSxcbiAgICBERVZJQ0VfUFJFRkVSUkVEX1ZFQ1RPUl9XSURUSF9DSEFSID0gMHgxMDA2LFxuICAgIERFVklDRV9QUkVGRVJSRURfVkVDVE9SX1dJRFRIX1NIT1JUID0gMHgxMDA3LFxuICAgIERFVklDRV9QUkVGRVJSRURfVkVDVE9SX1dJRFRIX0lOVCA9IDB4MTAwOCxcbiAgICBERVZJQ0VfUFJFRkVSUkVEX1ZFQ1RPUl9XSURUSF9MT05HID0gMHgxMDA5LFxuICAgIERFVklDRV9QUkVGRVJSRURfVkVDVE9SX1dJRFRIX0ZMT0FUID0gMHgxMDBhLFxuICAgIERFVklDRV9QUkVGRVJSRURfVkVDVE9SX1dJRFRIX0RPVUJMRSA9IDB4MTAwYixcbiAgICBERVZJQ0VfTUFYX0NMT0NLX0ZSRVFVRU5DWSA9IDB4MTAwYyxcbiAgICBERVZJQ0VfQUREUkVTU19CSVRTID0gMHgxMDBkLFxuICAgIERFVklDRV9NQVhfUkVBRF9JTUFHRV9BUkdTID0gMHgxMDBlLFxuICAgIERFVklDRV9NQVhfV1JJVEVfSU1BR0VfQVJHUyA9IDB4MTAwZixcbiAgICBERVZJQ0VfTUFYX01FTV9BTExPQ19TSVpFID0gMHgxMDEwLFxuICAgIERFVklDRV9JTUFHRTJEX01BWF9XSURUSCA9IDB4MTAxMSxcbiAgICBERVZJQ0VfSU1BR0UyRF9NQVhfSEVJR0hUID0gMHgxMDEyLFxuICAgIERFVklDRV9JTUFHRTNEX01BWF9XSURUSCA9IDB4MTAxMyxcbiAgICBERVZJQ0VfSU1BR0UzRF9NQVhfSEVJR0hUID0gMHgxMDE0LFxuICAgIERFVklDRV9JTUFHRTNEX01BWF9ERVBUSCA9IDB4MTAxNSxcbiAgICBERVZJQ0VfSU1BR0VfU1VQUE9SVCA9IDB4MTAxNixcbiAgICBERVZJQ0VfTUFYX1BBUkFNRVRFUl9TSVpFID0gMHgxMDE3LFxuICAgIERFVklDRV9NQVhfU0FNUExFUlMgPSAweDEwMTgsXG4gICAgREVWSUNFX01FTV9CQVNFX0FERFJfQUxJR04gPSAweDEwMTksXG4gICAgREVWSUNFX01JTl9EQVRBX1RZUEVfQUxJR05fU0laRSA9IDB4MTAxYSxcbiAgICBERVZJQ0VfU0lOR0xFX0ZQX0NPTkZJRyA9IDB4MTAxYixcbiAgICBERVZJQ0VfR0xPQkFMX01FTV9DQUNIRV9UWVBFID0gMHgxMDFjLFxuICAgIERFVklDRV9HTE9CQUxfTUVNX0NBQ0hFTElORV9TSVpFID0gMHgxMDFkLFxuICAgIERFVklDRV9HTE9CQUxfTUVNX0NBQ0hFX1NJWkUgPSAweDEwMWUsXG4gICAgREVWSUNFX0dMT0JBTF9NRU1fU0laRSA9IDB4MTAxZixcbiAgICBERVZJQ0VfTUFYX0NPTlNUQU5UX0JVRkZFUl9TSVpFID0gMHgxMDIwLFxuICAgIERFVklDRV9NQVhfQ09OU1RBTlRfQVJHUyA9IDB4MTAyMSxcbiAgICBERVZJQ0VfTE9DQUxfTUVNX1RZUEUgPSAweDEwMjIsXG4gICAgREVWSUNFX0xPQ0FMX01FTV9TSVpFID0gMHgxMDIzLFxuICAgIERFVklDRV9FUlJPUl9DT1JSRUNUSU9OX1NVUFBPUlQgPSAweDEwMjQsXG4gICAgREVWSUNFX1BST0ZJTElOR19USU1FUl9SRVNPTFVUSU9OID0gMHgxMDI1LFxuICAgIERFVklDRV9FTkRJQU5fTElUVExFID0gMHgxMDI2LFxuICAgIERFVklDRV9BVkFJTEFCTEUgPSAweDEwMjcsXG4gICAgREVWSUNFX0NPTVBJTEVSX0FWQUlMQUJMRSA9IDB4MTAyOCxcbiAgICBERVZJQ0VfRVhFQ1VUSU9OX0NBUEFCSUxJVElFUyA9IDB4MTAyOSxcbiAgICBERVZJQ0VfUVVFVUVfUFJPUEVSVElFUyA9IDB4MTAyYSxcbiAgICBERVZJQ0VfTkFNRSA9IDB4MTAyYixcbiAgICBERVZJQ0VfVkVORE9SID0gMHgxMDJjLFxuICAgIERSSVZFUl9WRVJTSU9OID0gMHgxMDJkLFxuICAgIERFVklDRV9QUk9GSUxFID0gMHgxMDJlLFxuICAgIERFVklDRV9WRVJTSU9OID0gMHgxMDJmLFxuICAgIERFVklDRV9FWFRFTlNJT05TID0gMHgxMDMwLFxuICAgIERFVklDRV9QTEFURk9STSA9IDB4MTAzMSxcbiAgICBERVZJQ0VfRE9VQkxFX0ZQX0NPTkZJRyA9IDB4MTAzMixcbiAgICBERVZJQ0VfUFJFRkVSUkVEX1ZFQ1RPUl9XSURUSF9IQUxGID0gMHgxMDM0LFxuICAgIERFVklDRV9IT1NUX1VOSUZJRURfTUVNT1JZID0gMHgxMDM1LFxuICAgIERFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX0NIQVIgPSAweDEwMzYsXG4gICAgREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfU0hPUlQgPSAweDEwMzcsXG4gICAgREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfSU5UID0gMHgxMDM4LFxuICAgIERFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX0xPTkcgPSAweDEwMzksXG4gICAgREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfRkxPQVQgPSAweDEwM2EsXG4gICAgREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfRE9VQkxFID0gMHgxMDNiLFxuICAgIERFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX0hBTEYgPSAweDEwM2MsXG4gICAgREVWSUNFX09QRU5DTF9DX1ZFUlNJT04gPSAweDEwM2QsXG4gICAgREVWSUNFX0xJTktFUl9BVkFJTEFCTEUgPSAweDEwM2UsXG4gICAgREVWSUNFX0JVSUxUX0lOX0tFUk5FTFMgPSAweDEwM2YsXG4gICAgREVWSUNFX0lNQUdFX01BWF9CVUZGRVJfU0laRSA9IDB4MTA0MCxcbiAgICBERVZJQ0VfSU1BR0VfTUFYX0FSUkFZX1NJWkUgPSAweDEwNDEsXG4gICAgREVWSUNFX1BBUkVOVF9ERVZJQ0UgPSAweDEwNDIsXG4gICAgREVWSUNFX1BBUlRJVElPTl9NQVhfU1VCX0RFVklDRVMgPSAweDEwNDMsXG4gICAgREVWSUNFX1BBUlRJVElPTl9QUk9QRVJUSUVTID0gMHgxMDQ0LFxuICAgIERFVklDRV9QQVJUSVRJT05fQUZGSU5JVFlfRE9NQUlOID0gMHgxMDQ1LFxuICAgIERFVklDRV9QQVJUSVRJT05fVFlQRSA9IDB4MTA0NixcbiAgICBERVZJQ0VfUkVGRVJFTkNFX0NPVU5UID0gMHgxMDQ3LFxuICAgIERFVklDRV9QUkVGRVJSRURfSU5URVJPUF9VU0VSX1NZTkMgPSAweDEwNDgsXG4gICAgREVWSUNFX1BSSU5URl9CVUZGRVJfU0laRSA9IDB4MTA0OSxcbiAgICBERVZJQ0VfSU1BR0VfUElUQ0hfQUxJR05NRU5UID0gMHgxMDRhLFxuICAgIERFVklDRV9JTUFHRV9CQVNFX0FERFJFU1NfQUxJR05NRU5UID0gMHgxMDRiLFxuICAgIERFVklDRV9BRERSRVNTXzMyX0JJVFMgPSAweDEsXG4gICAgREVWSUNFX0FERFJFU1NfNjRfQklUUyA9IDB4MixcbiAgICBGUF9ERU5PUk0gPSAweDEsXG4gICAgRlBfSU5GX05BTiA9IDB4MixcbiAgICBGUF9ST1VORF9UT19ORUFSRVNUID0gMHg0LFxuICAgIEZQX1JPVU5EX1RPX1pFUk8gPSAweDgsXG4gICAgRlBfUk9VTkRfVE9fSU5GID0gMHgxNixcbiAgICBGUF9GTUEgPSAweDMyLFxuICAgIE5PTkUgPSAweDAsXG4gICAgUkVBRF9PTkxZX0NBQ0hFID0gMHgxLFxuICAgIFJFQURfV1JJVEVfQ0FDSEUgPSAweDIsXG4gICAgTE9DQUwgPSAweDEsXG4gICAgR0xPQkFMID0gMHgyLFxuICAgIEVYRUNfS0VSTkVMID0gMHgxLFxuICAgIEVYRUNfTkFUSVZFX0tFUk5FTCA9IDB4MixcbiAgICBRVUVVRV9PVVRfT0ZfT1JERVJfRVhFQ19NT0RFX0VOQUJMRSA9IDB4MSxcbiAgICBRVUVVRV9QUk9GSUxJTkdfRU5BQkxFID0gMHgyLFxuICAgIENPTlRFWFRfUkVGRVJFTkNFX0NPVU5UID0gMHgxMDgwLFxuICAgIENPTlRFWFRfTlVNX0RFVklDRVMgPSAweDEwODEsXG4gICAgQ09OVEVYVF9ERVZJQ0VTID0gMHgxMDgyLFxuICAgIENPTlRFWFRfUFJPUEVSVElFUyA9IDB4MTA4MyxcbiAgICBDT05URVhUX1BMQVRGT1JNID0gMHgxMDg0LFxuICAgIFFVRVVFX0NPTlRFWFQgPSAweDEwOTAsXG4gICAgUVVFVUVfREVWSUNFID0gMHgxMDkxLFxuICAgIFFVRVVFX1JFRkVSRU5DRV9DT1VOVCA9IDB4MTA5MixcbiAgICBRVUVVRV9QUk9QRVJUSUVTID0gMHgxMDkzLFxuICAgIE1FTV9SRUFEX1dSSVRFID0gMHgxLFxuICAgIE1FTV9XUklURV9PTkxZID0gMHgyLFxuICAgIE1FTV9SRUFEX09OTFkgPSAweDQsXG4gICAgTUVNX1VTRV9IT1NUX1BUUiA9IDB4OCxcbiAgICBNRU1fQUxMT0NfSE9TVF9QVFIgPSAweDE2LFxuICAgIE1FTV9DT1BZX0hPU1RfUFRSID0gMHgzMixcbiAgICBSID0gMHgxMGIwLFxuICAgIEEgPSAweDEwYjEsXG4gICAgUkcgPSAweDEwYjIsXG4gICAgUkEgPSAweDEwYjMsXG4gICAgUkdCID0gMHgxMGI0LFxuICAgIFJHQkEgPSAweDEwYjUsXG4gICAgQkdSQSA9IDB4MTBiNixcbiAgICBBUkdCID0gMHgxMGI3LFxuICAgIElOVEVOU0lUWSA9IDB4MTBiOCxcbiAgICBMVU1JTkFOQ0UgPSAweDEwYjksXG4gICAgU05PUk1fSU5UOCA9IDB4MTBkMCxcbiAgICBTTk9STV9JTlQxNiA9IDB4MTBkMSxcbiAgICBVTk9STV9JTlQ4ID0gMHgxMGQyLFxuICAgIFVOT1JNX0lOVDE2ID0gMHgxMGQzLFxuICAgIFVOT1JNX1NIT1JUXzU2NSA9IDB4MTBkNCxcbiAgICBVTk9STV9TSE9SVF81NTUgPSAweDEwZDUsXG4gICAgVU5PUk1fSU5UXzEwMTAxMCA9IDB4MTBkNixcbiAgICBTSUdORURfSU5UOCA9IDB4MTBkNyxcbiAgICBTSUdORURfSU5UMTYgPSAweDEwZDgsXG4gICAgU0lHTkVEX0lOVDMyID0gMHgxMGQ5LFxuICAgIFVOU0lHTkVEX0lOVDggPSAweDEwZGEsXG4gICAgVU5TSUdORURfSU5UMTYgPSAweDEwZGIsXG4gICAgVU5TSUdORURfSU5UMzIgPSAweDEwZGMsXG4gICAgSEFMRl9GTE9BVCA9IDB4MTBkZCxcbiAgICBGTE9BVCA9IDB4MTBkZSxcbiAgICBNRU1fT0JKRUNUX0JVRkZFUiA9IDB4MTBmMCxcbiAgICBNRU1fT0JKRUNUX0lNQUdFMkQgPSAweDEwZjEsXG4gICAgTUVNX09CSkVDVF9JTUFHRTNEID0gMHgxMGYyLFxuICAgIE1FTV9UWVBFID0gMHgxMTAwLFxuICAgIE1FTV9GTEFHUyA9IDB4MTEwMSxcbiAgICBNRU1fU0laRSA9IDB4MTEwMixcbiAgICBNRU1fSE9TVF9QVFIgPSAweDExMDMsXG4gICAgTUVNX01BUF9DT1VOVCA9IDB4MTEwNCxcbiAgICBNRU1fUkVGRVJFTkNFX0NPVU5UID0gMHgxMTA1LFxuICAgIE1FTV9DT05URVhUID0gMHgxMTA2LFxuICAgIElNQUdFX0ZPUk1BVCA9IDB4MTExMCxcbiAgICBJTUFHRV9FTEVNRU5UX1NJWkUgPSAweDExMTEsXG4gICAgSU1BR0VfUk9XX1BJVENIID0gMHgxMTEyLFxuICAgIElNQUdFX1NMSUNFX1BJVENIID0gMHgxMTEzLFxuICAgIElNQUdFX1dJRFRIID0gMHgxMTE0LFxuICAgIElNQUdFX0hFSUdIVCA9IDB4MTExNSxcbiAgICBJTUFHRV9ERVBUSCA9IDB4MTExNixcbiAgICBBRERSRVNTX05PTkUgPSAweDExMzAsXG4gICAgQUREUkVTU19DTEFNUF9UT19FREdFID0gMHgxMTMxLFxuICAgIEFERFJFU1NfQ0xBTVAgPSAweDExMzIsXG4gICAgQUREUkVTU19SRVBFQVQgPSAweDExMzMsXG4gICAgRklMVEVSX05FQVJFU1QgPSAweDExNDAsXG4gICAgRklMVEVSX0xJTkVBUiA9IDB4MTE0MSxcbiAgICBTQU1QTEVSX1JFRkVSRU5DRV9DT1VOVCA9IDB4MTE1MCxcbiAgICBTQU1QTEVSX0NPTlRFWFQgPSAweDExNTEsXG4gICAgU0FNUExFUl9OT1JNQUxJWkVEX0NPT1JEUyA9IDB4MTE1MixcbiAgICBTQU1QTEVSX0FERFJFU1NJTkdfTU9ERSA9IDB4MTE1MyxcbiAgICBTQU1QTEVSX0ZJTFRFUl9NT0RFID0gMHgxMTU0LFxuICAgIE1BUF9SRUFEID0gMHgxLFxuICAgIE1BUF9XUklURSA9IDB4MixcbiAgICBQUk9HUkFNX1JFRkVSRU5DRV9DT1VOVCA9IDB4MTE2MCxcbiAgICBQUk9HUkFNX0NPTlRFWFQgPSAweDExNjEsXG4gICAgUFJPR1JBTV9OVU1fREVWSUNFUyA9IDB4MTE2MixcbiAgICBQUk9HUkFNX0RFVklDRVMgPSAweDExNjMsXG4gICAgUFJPR1JBTV9TT1VSQ0UgPSAweDExNjQsXG4gICAgUFJPR1JBTV9CSU5BUllfU0laRVMgPSAweDExNjUsXG4gICAgUFJPR1JBTV9CSU5BUklFUyA9IDB4MTE2NixcbiAgICBQUk9HUkFNX0JVSUxEX1NUQVRVUyA9IDB4MTE4MSxcbiAgICBQUk9HUkFNX0JVSUxEX09QVElPTlMgPSAweDExODIsXG4gICAgUFJPR1JBTV9CVUlMRF9MT0cgPSAweDExODMsXG4gICAgQlVJTERfU1VDQ0VTUyA9IDAsXG4gICAgQlVJTERfTk9ORSA9IC0xLFxuICAgIEJVSUxEX0VSUk9SID0gLTIsXG4gICAgQlVJTERfSU5fUFJPR1JFU1MgPSAtMyxcbiAgICBLRVJORUxfRlVOQ1RJT05fTkFNRSA9IDB4MTE5MCxcbiAgICBLRVJORUxfTlVNX0FSR1MgPSAweDExOTEsXG4gICAgS0VSTkVMX1JFRkVSRU5DRV9DT1VOVCA9IDB4MTE5MixcbiAgICBLRVJORUxfQ09OVEVYVCA9IDB4MTE5MyxcbiAgICBLRVJORUxfUFJPR1JBTSA9IDB4MTE5NCxcbiAgICBLRVJORUxfV09SS19HUk9VUF9TSVpFID0gMHgxMWIwLFxuICAgIEtFUk5FTF9DT01QSUxFX1dPUktfR1JPVVBfU0laRSA9IDB4MTFiMSxcbiAgICBLRVJORUxfTE9DQUxfTUVNX1NJWkUgPSAweDExYjIsXG4gICAgRVZFTlRfQ09NTUFORF9RVUVVRSA9IDB4MTFkMCxcbiAgICBFVkVOVF9DT01NQU5EX1RZUEUgPSAweDExZDEsXG4gICAgRVZFTlRfUkVGRVJFTkNFX0NPVU5UID0gMHgxMWQyLFxuICAgIEVWRU5UX0NPTU1BTkRfRVhFQ1VUSU9OX1NUQVRVUyA9IDB4MTFkMyxcbiAgICBDT01NQU5EX05EUkFOR0VfS0VSTkVMID0gMHgxMWYwLFxuICAgIENPTU1BTkRfVEFTSyA9IDB4MTFmMSxcbiAgICBDT01NQU5EX05BVElWRV9LRVJORUwgPSAweDExZjIsXG4gICAgQ09NTUFORF9SRUFEX0JVRkZFUiA9IDB4MTFmMyxcbiAgICBDT01NQU5EX1dSSVRFX0JVRkZFUiA9IDB4MTFmNCxcbiAgICBDT01NQU5EX0NPUFlfQlVGRkVSID0gMHgxMWY1LFxuICAgIENPTU1BTkRfUkVBRF9JTUFHRSA9IDB4MTFmNixcbiAgICBDT01NQU5EX1dSSVRFX0lNQUdFID0gMHgxMWY3LFxuICAgIENPTU1BTkRfQ09QWV9JTUFHRSA9IDB4MTFmOCxcbiAgICBDT01NQU5EX0NPUFlfSU1BR0VfVE9fQlVGRkVSID0gMHgxMWY5LFxuICAgIENPTU1BTkRfQ09QWV9CVUZGRVJfVE9fSU1BR0UgPSAweDExZmEsXG4gICAgQ09NTUFORF9NQVBfQlVGRkVSID0gMHgxMWZiLFxuICAgIENPTU1BTkRfTUFQX0lNQUdFID0gMHgxMWZjLFxuICAgIENPTU1BTkRfVU5NQVBfTUVNX09CSkVDVCA9IDB4MTFmZCxcbiAgICBDT01NQU5EX01BUktFUiA9IDB4MTFmZSxcbiAgICBDT01NQU5EX1dBSVRfRk9SX0VWRU5UUyA9IDB4MTFmZixcbiAgICBDT01NQU5EX0JBUlJJRVIgPSAweDEyMDAsXG4gICAgQ09NTUFORF9BQ1FVSVJFX0dMX09CSkVDVFMgPSAweDEyMDEsXG4gICAgQ09NTUFORF9SRUxFQVNFX0dMX09CSkVDVFMgPSAweDEyMDIsXG4gICAgQ09NUExFVEUgPSAweDAsXG4gICAgUlVOTklORyA9IDB4MSxcbiAgICBTVUJNSVRURUQgPSAweDIsXG4gICAgUVVFVUVEID0gMHgzLFxuICAgIFBST0ZJTElOR19DT01NQU5EX1FVRVVFRCA9IDB4MTI4MCxcbiAgICBQUk9GSUxJTkdfQ09NTUFORF9TVUJNSVQgPSAweDEyODEsXG4gICAgUFJPRklMSU5HX0NPTU1BTkRfU1RBUlQgPSAweDEyODIsXG4gICAgUFJPRklMSU5HX0NPTU1BTkRfRU5EID0gMHgxMjgzLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gV2ViQ0xDb25zdGFudFN0cih2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuU1VDQ0VTUzpcbiAgICAgICAgICAgIHJldHVybiBcIlNVQ0NFU1NcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTk9UX0ZPVU5EOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX05PVF9GT1VORFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9OT1RfQVZBSUxBQkxFOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX05PVF9BVkFJTEFCTEVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfQ09NUElMRVJfTk9UX0FWQUlMQUJMRTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9DT01QSUxFUl9OT1RfQVZBSUxBQkxFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTUVNX09CSkVDVF9BTExPQ0FUSU9OX0ZBSUxVUkU6XG4gICAgICAgICAgICByZXR1cm4gXCJNRU1fT0JKRUNUX0FMTE9DQVRJT05fRkFJTFVSRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLk9VVF9PRl9SRVNPVVJDRVM6XG4gICAgICAgICAgICByZXR1cm4gXCJPVVRfT0ZfUkVTT1VSQ0VTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuT1VUX09GX0hPU1RfTUVNT1JZOlxuICAgICAgICAgICAgcmV0dXJuIFwiT1VUX09GX0hPU1RfTUVNT1JZXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUFJPRklMSU5HX0lORk9fTk9UX0FWQUlMQUJMRTpcbiAgICAgICAgICAgIHJldHVybiBcIlBST0ZJTElOR19JTkZPX05PVF9BVkFJTEFCTEVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NRU1fQ09QWV9PVkVSTEFQOlxuICAgICAgICAgICAgcmV0dXJuIFwiTUVNX0NPUFlfT1ZFUkxBUFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklNQUdFX0ZPUk1BVF9NSVNNQVRDSDpcbiAgICAgICAgICAgIHJldHVybiBcIklNQUdFX0ZPUk1BVF9NSVNNQVRDSFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklNQUdFX0ZPUk1BVF9OT1RfU1VQUE9SVEVEOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU1BR0VfRk9STUFUX05PVF9TVVBQT1JURURcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5CVUlMRF9QUk9HUkFNX0ZBSUxVUkU6XG4gICAgICAgICAgICByZXR1cm4gXCJCVUlMRF9QUk9HUkFNX0ZBSUxVUkVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NQVBfRkFJTFVSRTpcbiAgICAgICAgICAgIHJldHVybiBcIk1BUF9GQUlMVVJFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9WQUxVRTpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfVkFMVUVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX0RFVklDRV9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU5WQUxJRF9ERVZJQ0VfVFlQRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklOVkFMSURfUExBVEZPUk06XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX1BMQVRGT1JNXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9ERVZJQ0U6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX0RFVklDRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklOVkFMSURfQ09OVEVYVDpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfQ09OVEVYVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklOVkFMSURfUVVFVUVfUFJPUEVSVElFUzpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfUVVFVUVfUFJPUEVSVElFU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklOVkFMSURfQ09NTUFORF9RVUVVRTpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfQ09NTUFORF9RVUVVRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklOVkFMSURfSE9TVF9QVFI6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX0hPU1RfUFRSXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9NRU1fT0JKRUNUOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU5WQUxJRF9NRU1fT0JKRUNUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9JTUFHRV9GT1JNQVRfREVTQ1JJUFRPUjpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfSU1BR0VfRk9STUFUX0RFU0NSSVBUT1JcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX0lNQUdFX1NJWkU6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX0lNQUdFX1NJWkVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX1NBTVBMRVI6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX1NBTVBMRVJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX0JJTkFSWTpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfQklOQVJZXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9CVUlMRF9PUFRJT05TOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU5WQUxJRF9CVUlMRF9PUFRJT05TXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9QUk9HUkFNOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU5WQUxJRF9QUk9HUkFNXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9QUk9HUkFNX0VYRUNVVEFCTEU6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX1BST0dSQU1fRVhFQ1VUQUJMRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklOVkFMSURfS0VSTkVMX05BTUU6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX0tFUk5FTF9OQU1FXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9LRVJORUxfREVGSU5JVElPTjpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfS0VSTkVMX0RFRklOSVRJT05cIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX0tFUk5FTDpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfS0VSTkVMXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9BUkdfSU5ERVg6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX0FSR19JTkRFWFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklOVkFMSURfQVJHX1ZBTFVFOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU5WQUxJRF9BUkdfVkFMVUVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX0FSR19TSVpFOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU5WQUxJRF9BUkdfU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklOVkFMSURfS0VSTkVMX0FSR1M6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX0tFUk5FTF9BUkdTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9XT1JLX0RJTUVOU0lPTjpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfV09SS19ESU1FTlNJT05cIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX1dPUktfR1JPVVBfU0laRTpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfV09SS19HUk9VUF9TSVpFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9XT1JLX0lURU1fU0laRTpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfV09SS19JVEVNX1NJWkVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX0dMT0JBTF9PRkZTRVQ6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX0dMT0JBTF9PRkZTRVRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX0VWRU5UX1dBSVRfTElTVDpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfRVZFTlRfV0FJVF9MSVNUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9FVkVOVDpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfRVZFTlRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTlZBTElEX09QRVJBVElPTjpcbiAgICAgICAgICAgIHJldHVybiBcIklOVkFMSURfT1BFUkFUSU9OXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9HTF9PQkpFQ1Q6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX0dMX09CSkVDVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklOVkFMSURfQlVGRkVSX1NJWkU6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX0JVRkZFUl9TSVpFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9NSVBfTEVWRUw6XG4gICAgICAgICAgICByZXR1cm4gXCJJTlZBTElEX01JUF9MRVZFTFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlZFUlNJT05fMV8wOlxuICAgICAgICAgICAgcmV0dXJuIFwiVkVSU0lPTl8xXzBcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5GQUxTRTpcbiAgICAgICAgICAgIHJldHVybiBcIkZBTFNFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuVFJVRTpcbiAgICAgICAgICAgIHJldHVybiBcIlRSVUVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QTEFURk9STV9QUk9GSUxFOlxuICAgICAgICAgICAgcmV0dXJuIFwiUExBVEZPUk1fUFJPRklMRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBMQVRGT1JNX1ZFUlNJT046XG4gICAgICAgICAgICByZXR1cm4gXCJQTEFURk9STV9WRVJTSU9OXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUExBVEZPUk1fTkFNRTpcbiAgICAgICAgICAgIHJldHVybiBcIlBMQVRGT1JNX05BTUVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QTEFURk9STV9WRU5ET1I6XG4gICAgICAgICAgICByZXR1cm4gXCJQTEFURk9STV9WRU5ET1JcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QTEFURk9STV9FWFRFTlNJT05TOlxuICAgICAgICAgICAgcmV0dXJuIFwiUExBVEZPUk1fRVhURU5TSU9OU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9UWVBFX0RFRkFVTFQ6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfVFlQRV9ERUZBVUxUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1RZUEVfQ1BVOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1RZUEVfQ1BVXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1RZUEVfR1BVOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1RZUEVfR1BVXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1RZUEVfQUNDRUxFUkFUT1I6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfVFlQRV9BQ0NFTEVSQVRPUlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9UWVBFX0RFQlVHOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1RZUEVfREVCVUdcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfVFlQRV9BTEw6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfVFlQRV9BTExcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9UWVBFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1ZFTkRPUl9JRDpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9WRU5ET1JfSURcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTUFYX0NPTVBVVEVfVU5JVFM6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfTUFYX0NPTVBVVEVfVU5JVFNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTUFYX1dPUktfSVRFTV9ESU1FTlNJT05TOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX01BWF9XT1JLX0lURU1fRElNRU5TSU9OU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfV09SS19HUk9VUF9TSVpFOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX01BWF9XT1JLX0dST1VQX1NJWkVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTUFYX1dPUktfSVRFTV9TSVpFUzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9NQVhfV09SS19JVEVNX1NJWkVTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfQ0hBUjpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9QUkVGRVJSRURfVkVDVE9SX1dJRFRIX0NIQVJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUFJFRkVSUkVEX1ZFQ1RPUl9XSURUSF9TSE9SVDpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9QUkVGRVJSRURfVkVDVE9SX1dJRFRIX1NIT1JUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfSU5UOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfSU5UXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfTE9ORzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9QUkVGRVJSRURfVkVDVE9SX1dJRFRIX0xPTkdcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUFJFRkVSUkVEX1ZFQ1RPUl9XSURUSF9GTE9BVDpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9QUkVGRVJSRURfVkVDVE9SX1dJRFRIX0ZMT0FUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfRE9VQkxFOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfRE9VQkxFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX01BWF9DTE9DS19GUkVRVUVOQ1k6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfTUFYX0NMT0NLX0ZSRVFVRU5DWVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9BRERSRVNTX0JJVFM6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfQUREUkVTU19CSVRTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX01BWF9SRUFEX0lNQUdFX0FSR1M6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfTUFYX1JFQURfSU1BR0VfQVJHU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfV1JJVEVfSU1BR0VfQVJHUzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9NQVhfV1JJVEVfSU1BR0VfQVJHU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfTUVNX0FMTE9DX1NJWkU6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfTUFYX01FTV9BTExPQ19TSVpFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0lNQUdFMkRfTUFYX1dJRFRIOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX0lNQUdFMkRfTUFYX1dJRFRIXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0lNQUdFMkRfTUFYX0hFSUdIVDpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9JTUFHRTJEX01BWF9IRUlHSFRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfSU1BR0UzRF9NQVhfV0lEVEg6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfSU1BR0UzRF9NQVhfV0lEVEhcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfSU1BR0UzRF9NQVhfSEVJR0hUOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX0lNQUdFM0RfTUFYX0hFSUdIVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9JTUFHRTNEX01BWF9ERVBUSDpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9JTUFHRTNEX01BWF9ERVBUSFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9JTUFHRV9TVVBQT1JUOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX0lNQUdFX1NVUFBPUlRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTUFYX1BBUkFNRVRFUl9TSVpFOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX01BWF9QQVJBTUVURVJfU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfU0FNUExFUlM6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfTUFYX1NBTVBMRVJTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX01FTV9CQVNFX0FERFJfQUxJR046XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfTUVNX0JBU0VfQUREUl9BTElHTlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NSU5fREFUQV9UWVBFX0FMSUdOX1NJWkU6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfTUlOX0RBVEFfVFlQRV9BTElHTl9TSVpFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1NJTkdMRV9GUF9DT05GSUc6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfU0lOR0xFX0ZQX0NPTkZJR1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9HTE9CQUxfTUVNX0NBQ0hFX1RZUEU6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfR0xPQkFMX01FTV9DQUNIRV9UWVBFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0dMT0JBTF9NRU1fQ0FDSEVMSU5FX1NJWkU6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfR0xPQkFMX01FTV9DQUNIRUxJTkVfU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9HTE9CQUxfTUVNX0NBQ0hFX1NJWkU6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfR0xPQkFMX01FTV9DQUNIRV9TSVpFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0dMT0JBTF9NRU1fU0laRTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9HTE9CQUxfTUVNX1NJWkVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTUFYX0NPTlNUQU5UX0JVRkZFUl9TSVpFOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX01BWF9DT05TVEFOVF9CVUZGRVJfU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfQ09OU1RBTlRfQVJHUzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9NQVhfQ09OU1RBTlRfQVJHU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9MT0NBTF9NRU1fVFlQRTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9MT0NBTF9NRU1fVFlQRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9MT0NBTF9NRU1fU0laRTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9MT0NBTF9NRU1fU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9FUlJPUl9DT1JSRUNUSU9OX1NVUFBPUlQ6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfRVJST1JfQ09SUkVDVElPTl9TVVBQT1JUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BST0ZJTElOR19USU1FUl9SRVNPTFVUSU9OOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1BST0ZJTElOR19USU1FUl9SRVNPTFVUSU9OXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0VORElBTl9MSVRUTEU6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfRU5ESUFOX0xJVFRMRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9BVkFJTEFCTEU6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfQVZBSUxBQkxFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0NPTVBJTEVSX0FWQUlMQUJMRTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9DT01QSUxFUl9BVkFJTEFCTEVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfRVhFQ1VUSU9OX0NBUEFCSUxJVElFUzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9FWEVDVVRJT05fQ0FQQUJJTElUSUVTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1FVRVVFX1BST1BFUlRJRVM6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfUVVFVUVfUFJPUEVSVElFU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9OQU1FOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX05BTUVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfVkVORE9SOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1ZFTkRPUlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRSSVZFUl9WRVJTSU9OOlxuICAgICAgICAgICAgcmV0dXJuIFwiRFJJVkVSX1ZFUlNJT05cIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUFJPRklMRTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9QUk9GSUxFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1ZFUlNJT046XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfVkVSU0lPTlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9FWFRFTlNJT05TOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX0VYVEVOU0lPTlNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUExBVEZPUk06XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfUExBVEZPUk1cIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfRE9VQkxFX0ZQX0NPTkZJRzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9ET1VCTEVfRlBfQ09ORklHXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfSEFMRjpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9QUkVGRVJSRURfVkVDVE9SX1dJRFRIX0hBTEZcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfSE9TVF9VTklGSUVEX01FTU9SWTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9IT1NUX1VOSUZJRURfTUVNT1JZXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfQ0hBUjpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX0NIQVJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTkFUSVZFX1ZFQ1RPUl9XSURUSF9TSE9SVDpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX1NIT1JUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfSU5UOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfSU5UXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfTE9ORzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX0xPTkdcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTkFUSVZFX1ZFQ1RPUl9XSURUSF9GTE9BVDpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX0ZMT0FUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfRE9VQkxFOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfRE9VQkxFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX05BVElWRV9WRUNUT1JfV0lEVEhfSEFMRjpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX0hBTEZcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfT1BFTkNMX0NfVkVSU0lPTjpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9PUEVOQ0xfQ19WRVJTSU9OXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0xJTktFUl9BVkFJTEFCTEU6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfTElOS0VSX0FWQUlMQUJMRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9CVUlMVF9JTl9LRVJORUxTOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX0JVSUxUX0lOX0tFUk5FTFNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfSU1BR0VfTUFYX0JVRkZFUl9TSVpFOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX0lNQUdFX01BWF9CVUZGRVJfU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9JTUFHRV9NQVhfQVJSQVlfU0laRTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9JTUFHRV9NQVhfQVJSQVlfU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9QQVJFTlRfREVWSUNFOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1BBUkVOVF9ERVZJQ0VcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUEFSVElUSU9OX01BWF9TVUJfREVWSUNFUzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9QQVJUSVRJT05fTUFYX1NVQl9ERVZJQ0VTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BBUlRJVElPTl9QUk9QRVJUSUVTOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1BBUlRJVElPTl9QUk9QRVJUSUVTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BBUlRJVElPTl9BRkZJTklUWV9ET01BSU46XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfUEFSVElUSU9OX0FGRklOSVRZX0RPTUFJTlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9QQVJUSVRJT05fVFlQRTpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9QQVJUSVRJT05fVFlQRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9SRUZFUkVOQ0VfQ09VTlQ6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfUkVGRVJFTkNFX0NPVU5UXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BSRUZFUlJFRF9JTlRFUk9QX1VTRVJfU1lOQzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9QUkVGRVJSRURfSU5URVJPUF9VU0VSX1NZTkNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUFJJTlRGX0JVRkZFUl9TSVpFOlxuICAgICAgICAgICAgcmV0dXJuIFwiREVWSUNFX1BSSU5URl9CVUZGRVJfU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9JTUFHRV9QSVRDSF9BTElHTk1FTlQ6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfSU1BR0VfUElUQ0hfQUxJR05NRU5UXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0lNQUdFX0JBU0VfQUREUkVTU19BTElHTk1FTlQ6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfSU1BR0VfQkFTRV9BRERSRVNTX0FMSUdOTUVOVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9BRERSRVNTXzMyX0JJVFM6XG4gICAgICAgICAgICByZXR1cm4gXCJERVZJQ0VfQUREUkVTU18zMl9CSVRTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0FERFJFU1NfNjRfQklUUzpcbiAgICAgICAgICAgIHJldHVybiBcIkRFVklDRV9BRERSRVNTXzY0X0JJVFNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5GUF9ERU5PUk06XG4gICAgICAgICAgICByZXR1cm4gXCJGUF9ERU5PUk1cIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5GUF9JTkZfTkFOOlxuICAgICAgICAgICAgcmV0dXJuIFwiRlBfSU5GX05BTlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkZQX1JPVU5EX1RPX05FQVJFU1Q6XG4gICAgICAgICAgICByZXR1cm4gXCJGUF9ST1VORF9UT19ORUFSRVNUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuRlBfUk9VTkRfVE9fWkVSTzpcbiAgICAgICAgICAgIHJldHVybiBcIkZQX1JPVU5EX1RPX1pFUk9cIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5GUF9ST1VORF9UT19JTkY6XG4gICAgICAgICAgICByZXR1cm4gXCJGUF9ST1VORF9UT19JTkZcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5GUF9GTUE6XG4gICAgICAgICAgICByZXR1cm4gXCJGUF9GTUFcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5OT05FOlxuICAgICAgICAgICAgcmV0dXJuIFwiTk9ORVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlJFQURfT05MWV9DQUNIRTpcbiAgICAgICAgICAgIHJldHVybiBcIlJFQURfT05MWV9DQUNIRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlJFQURfV1JJVEVfQ0FDSEU6XG4gICAgICAgICAgICByZXR1cm4gXCJSRUFEX1dSSVRFX0NBQ0hFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTE9DQUw6XG4gICAgICAgICAgICByZXR1cm4gXCJMT0NBTFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkdMT0JBTDpcbiAgICAgICAgICAgIHJldHVybiBcIkdMT0JBTFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkVYRUNfS0VSTkVMOlxuICAgICAgICAgICAgcmV0dXJuIFwiRVhFQ19LRVJORUxcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5FWEVDX05BVElWRV9LRVJORUw6XG4gICAgICAgICAgICByZXR1cm4gXCJFWEVDX05BVElWRV9LRVJORUxcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5RVUVVRV9PVVRfT0ZfT1JERVJfRVhFQ19NT0RFX0VOQUJMRTpcbiAgICAgICAgICAgIHJldHVybiBcIlFVRVVFX09VVF9PRl9PUkRFUl9FWEVDX01PREVfRU5BQkxFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUVVFVUVfUFJPRklMSU5HX0VOQUJMRTpcbiAgICAgICAgICAgIHJldHVybiBcIlFVRVVFX1BST0ZJTElOR19FTkFCTEVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT05URVhUX1JFRkVSRU5DRV9DT1VOVDpcbiAgICAgICAgICAgIHJldHVybiBcIkNPTlRFWFRfUkVGRVJFTkNFX0NPVU5UXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQ09OVEVYVF9OVU1fREVWSUNFUzpcbiAgICAgICAgICAgIHJldHVybiBcIkNPTlRFWFRfTlVNX0RFVklDRVNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT05URVhUX0RFVklDRVM6XG4gICAgICAgICAgICByZXR1cm4gXCJDT05URVhUX0RFVklDRVNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT05URVhUX1BST1BFUlRJRVM6XG4gICAgICAgICAgICByZXR1cm4gXCJDT05URVhUX1BST1BFUlRJRVNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT05URVhUX1BMQVRGT1JNOlxuICAgICAgICAgICAgcmV0dXJuIFwiQ09OVEVYVF9QTEFURk9STVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlFVRVVFX0NPTlRFWFQ6XG4gICAgICAgICAgICByZXR1cm4gXCJRVUVVRV9DT05URVhUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUVVFVUVfREVWSUNFOlxuICAgICAgICAgICAgcmV0dXJuIFwiUVVFVUVfREVWSUNFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUVVFVUVfUkVGRVJFTkNFX0NPVU5UOlxuICAgICAgICAgICAgcmV0dXJuIFwiUVVFVUVfUkVGRVJFTkNFX0NPVU5UXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUVVFVUVfUFJPUEVSVElFUzpcbiAgICAgICAgICAgIHJldHVybiBcIlFVRVVFX1BST1BFUlRJRVNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NRU1fUkVBRF9XUklURTpcbiAgICAgICAgICAgIHJldHVybiBcIk1FTV9SRUFEX1dSSVRFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTUVNX1dSSVRFX09OTFk6XG4gICAgICAgICAgICByZXR1cm4gXCJNRU1fV1JJVEVfT05MWVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLk1FTV9SRUFEX09OTFk6XG4gICAgICAgICAgICByZXR1cm4gXCJNRU1fUkVBRF9PTkxZXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTUVNX1VTRV9IT1NUX1BUUjpcbiAgICAgICAgICAgIHJldHVybiBcIk1FTV9VU0VfSE9TVF9QVFJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NRU1fQUxMT0NfSE9TVF9QVFI6XG4gICAgICAgICAgICByZXR1cm4gXCJNRU1fQUxMT0NfSE9TVF9QVFJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NRU1fQ09QWV9IT1NUX1BUUjpcbiAgICAgICAgICAgIHJldHVybiBcIk1FTV9DT1BZX0hPU1RfUFRSXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUjpcbiAgICAgICAgICAgIHJldHVybiBcIlJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5BOlxuICAgICAgICAgICAgcmV0dXJuIFwiQVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlJHOlxuICAgICAgICAgICAgcmV0dXJuIFwiUkdcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5SQTpcbiAgICAgICAgICAgIHJldHVybiBcIlJBXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUkdCOlxuICAgICAgICAgICAgcmV0dXJuIFwiUkdCXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUkdCQTpcbiAgICAgICAgICAgIHJldHVybiBcIlJHQkFcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5CR1JBOlxuICAgICAgICAgICAgcmV0dXJuIFwiQkdSQVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkFSR0I6XG4gICAgICAgICAgICByZXR1cm4gXCJBUkdCXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU5URU5TSVRZOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU5URU5TSVRZXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTFVNSU5BTkNFOlxuICAgICAgICAgICAgcmV0dXJuIFwiTFVNSU5BTkNFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuU05PUk1fSU5UODpcbiAgICAgICAgICAgIHJldHVybiBcIlNOT1JNX0lOVDhcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5TTk9STV9JTlQxNjpcbiAgICAgICAgICAgIHJldHVybiBcIlNOT1JNX0lOVDE2XCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuVU5PUk1fSU5UODpcbiAgICAgICAgICAgIHJldHVybiBcIlVOT1JNX0lOVDhcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5VTk9STV9JTlQxNjpcbiAgICAgICAgICAgIHJldHVybiBcIlVOT1JNX0lOVDE2XCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuVU5PUk1fU0hPUlRfNTY1OlxuICAgICAgICAgICAgcmV0dXJuIFwiVU5PUk1fU0hPUlRfNTY1XCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuVU5PUk1fU0hPUlRfNTU1OlxuICAgICAgICAgICAgcmV0dXJuIFwiVU5PUk1fU0hPUlRfNTU1XCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuVU5PUk1fSU5UXzEwMTAxMDpcbiAgICAgICAgICAgIHJldHVybiBcIlVOT1JNX0lOVF8xMDEwMTBcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5TSUdORURfSU5UODpcbiAgICAgICAgICAgIHJldHVybiBcIlNJR05FRF9JTlQ4XCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuU0lHTkVEX0lOVDE2OlxuICAgICAgICAgICAgcmV0dXJuIFwiU0lHTkVEX0lOVDE2XCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuU0lHTkVEX0lOVDMyOlxuICAgICAgICAgICAgcmV0dXJuIFwiU0lHTkVEX0lOVDMyXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuVU5TSUdORURfSU5UODpcbiAgICAgICAgICAgIHJldHVybiBcIlVOU0lHTkVEX0lOVDhcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5VTlNJR05FRF9JTlQxNjpcbiAgICAgICAgICAgIHJldHVybiBcIlVOU0lHTkVEX0lOVDE2XCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuVU5TSUdORURfSU5UMzI6XG4gICAgICAgICAgICByZXR1cm4gXCJVTlNJR05FRF9JTlQzMlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkhBTEZfRkxPQVQ6XG4gICAgICAgICAgICByZXR1cm4gXCJIQUxGX0ZMT0FUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuRkxPQVQ6XG4gICAgICAgICAgICByZXR1cm4gXCJGTE9BVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLk1FTV9PQkpFQ1RfQlVGRkVSOlxuICAgICAgICAgICAgcmV0dXJuIFwiTUVNX09CSkVDVF9CVUZGRVJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NRU1fT0JKRUNUX0lNQUdFMkQ6XG4gICAgICAgICAgICByZXR1cm4gXCJNRU1fT0JKRUNUX0lNQUdFMkRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NRU1fT0JKRUNUX0lNQUdFM0Q6XG4gICAgICAgICAgICByZXR1cm4gXCJNRU1fT0JKRUNUX0lNQUdFM0RcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NRU1fVFlQRTpcbiAgICAgICAgICAgIHJldHVybiBcIk1FTV9UWVBFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTUVNX0ZMQUdTOlxuICAgICAgICAgICAgcmV0dXJuIFwiTUVNX0ZMQUdTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTUVNX1NJWkU6XG4gICAgICAgICAgICByZXR1cm4gXCJNRU1fU0laRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLk1FTV9IT1NUX1BUUjpcbiAgICAgICAgICAgIHJldHVybiBcIk1FTV9IT1NUX1BUUlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLk1FTV9NQVBfQ09VTlQ6XG4gICAgICAgICAgICByZXR1cm4gXCJNRU1fTUFQX0NPVU5UXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTUVNX1JFRkVSRU5DRV9DT1VOVDpcbiAgICAgICAgICAgIHJldHVybiBcIk1FTV9SRUZFUkVOQ0VfQ09VTlRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5NRU1fQ09OVEVYVDpcbiAgICAgICAgICAgIHJldHVybiBcIk1FTV9DT05URVhUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU1BR0VfRk9STUFUOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU1BR0VfRk9STUFUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU1BR0VfRUxFTUVOVF9TSVpFOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU1BR0VfRUxFTUVOVF9TSVpFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU1BR0VfUk9XX1BJVENIOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU1BR0VfUk9XX1BJVENIXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuSU1BR0VfU0xJQ0VfUElUQ0g6XG4gICAgICAgICAgICByZXR1cm4gXCJJTUFHRV9TTElDRV9QSVRDSFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLklNQUdFX1dJRFRIOlxuICAgICAgICAgICAgcmV0dXJuIFwiSU1BR0VfV0lEVEhcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTUFHRV9IRUlHSFQ6XG4gICAgICAgICAgICByZXR1cm4gXCJJTUFHRV9IRUlHSFRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5JTUFHRV9ERVBUSDpcbiAgICAgICAgICAgIHJldHVybiBcIklNQUdFX0RFUFRIXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQUREUkVTU19OT05FOlxuICAgICAgICAgICAgcmV0dXJuIFwiQUREUkVTU19OT05FXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQUREUkVTU19DTEFNUF9UT19FREdFOlxuICAgICAgICAgICAgcmV0dXJuIFwiQUREUkVTU19DTEFNUF9UT19FREdFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQUREUkVTU19DTEFNUDpcbiAgICAgICAgICAgIHJldHVybiBcIkFERFJFU1NfQ0xBTVBcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5BRERSRVNTX1JFUEVBVDpcbiAgICAgICAgICAgIHJldHVybiBcIkFERFJFU1NfUkVQRUFUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuRklMVEVSX05FQVJFU1Q6XG4gICAgICAgICAgICByZXR1cm4gXCJGSUxURVJfTkVBUkVTVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkZJTFRFUl9MSU5FQVI6XG4gICAgICAgICAgICByZXR1cm4gXCJGSUxURVJfTElORUFSXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuU0FNUExFUl9SRUZFUkVOQ0VfQ09VTlQ6XG4gICAgICAgICAgICByZXR1cm4gXCJTQU1QTEVSX1JFRkVSRU5DRV9DT1VOVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlNBTVBMRVJfQ09OVEVYVDpcbiAgICAgICAgICAgIHJldHVybiBcIlNBTVBMRVJfQ09OVEVYVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlNBTVBMRVJfTk9STUFMSVpFRF9DT09SRFM6XG4gICAgICAgICAgICByZXR1cm4gXCJTQU1QTEVSX05PUk1BTElaRURfQ09PUkRTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuU0FNUExFUl9BRERSRVNTSU5HX01PREU6XG4gICAgICAgICAgICByZXR1cm4gXCJTQU1QTEVSX0FERFJFU1NJTkdfTU9ERVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlNBTVBMRVJfRklMVEVSX01PREU6XG4gICAgICAgICAgICByZXR1cm4gXCJTQU1QTEVSX0ZJTFRFUl9NT0RFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuTUFQX1JFQUQ6XG4gICAgICAgICAgICByZXR1cm4gXCJNQVBfUkVBRFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLk1BUF9XUklURTpcbiAgICAgICAgICAgIHJldHVybiBcIk1BUF9XUklURVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBST0dSQU1fUkVGRVJFTkNFX0NPVU5UOlxuICAgICAgICAgICAgcmV0dXJuIFwiUFJPR1JBTV9SRUZFUkVOQ0VfQ09VTlRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QUk9HUkFNX0NPTlRFWFQ6XG4gICAgICAgICAgICByZXR1cm4gXCJQUk9HUkFNX0NPTlRFWFRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QUk9HUkFNX05VTV9ERVZJQ0VTOlxuICAgICAgICAgICAgcmV0dXJuIFwiUFJPR1JBTV9OVU1fREVWSUNFU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBST0dSQU1fREVWSUNFUzpcbiAgICAgICAgICAgIHJldHVybiBcIlBST0dSQU1fREVWSUNFU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBST0dSQU1fU09VUkNFOlxuICAgICAgICAgICAgcmV0dXJuIFwiUFJPR1JBTV9TT1VSQ0VcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QUk9HUkFNX0JJTkFSWV9TSVpFUzpcbiAgICAgICAgICAgIHJldHVybiBcIlBST0dSQU1fQklOQVJZX1NJWkVTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUFJPR1JBTV9CSU5BUklFUzpcbiAgICAgICAgICAgIHJldHVybiBcIlBST0dSQU1fQklOQVJJRVNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QUk9HUkFNX0JVSUxEX1NUQVRVUzpcbiAgICAgICAgICAgIHJldHVybiBcIlBST0dSQU1fQlVJTERfU1RBVFVTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUFJPR1JBTV9CVUlMRF9PUFRJT05TOlxuICAgICAgICAgICAgcmV0dXJuIFwiUFJPR1JBTV9CVUlMRF9PUFRJT05TXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUFJPR1JBTV9CVUlMRF9MT0c6XG4gICAgICAgICAgICByZXR1cm4gXCJQUk9HUkFNX0JVSUxEX0xPR1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkJVSUxEX1NVQ0NFU1M6XG4gICAgICAgICAgICByZXR1cm4gXCJCVUlMRF9TVUNDRVNTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQlVJTERfTk9ORTpcbiAgICAgICAgICAgIHJldHVybiBcIkJVSUxEX05PTkVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5CVUlMRF9FUlJPUjpcbiAgICAgICAgICAgIHJldHVybiBcIkJVSUxEX0VSUk9SXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQlVJTERfSU5fUFJPR1JFU1M6XG4gICAgICAgICAgICByZXR1cm4gXCJCVUlMRF9JTl9QUk9HUkVTU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLktFUk5FTF9GVU5DVElPTl9OQU1FOlxuICAgICAgICAgICAgcmV0dXJuIFwiS0VSTkVMX0ZVTkNUSU9OX05BTUVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5LRVJORUxfTlVNX0FSR1M6XG4gICAgICAgICAgICByZXR1cm4gXCJLRVJORUxfTlVNX0FSR1NcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5LRVJORUxfUkVGRVJFTkNFX0NPVU5UOlxuICAgICAgICAgICAgcmV0dXJuIFwiS0VSTkVMX1JFRkVSRU5DRV9DT1VOVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLktFUk5FTF9DT05URVhUOlxuICAgICAgICAgICAgcmV0dXJuIFwiS0VSTkVMX0NPTlRFWFRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5LRVJORUxfUFJPR1JBTTpcbiAgICAgICAgICAgIHJldHVybiBcIktFUk5FTF9QUk9HUkFNXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuS0VSTkVMX1dPUktfR1JPVVBfU0laRTpcbiAgICAgICAgICAgIHJldHVybiBcIktFUk5FTF9XT1JLX0dST1VQX1NJWkVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5LRVJORUxfQ09NUElMRV9XT1JLX0dST1VQX1NJWkU6XG4gICAgICAgICAgICByZXR1cm4gXCJLRVJORUxfQ09NUElMRV9XT1JLX0dST1VQX1NJWkVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5LRVJORUxfTE9DQUxfTUVNX1NJWkU6XG4gICAgICAgICAgICByZXR1cm4gXCJLRVJORUxfTE9DQUxfTUVNX1NJWkVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5FVkVOVF9DT01NQU5EX1FVRVVFOlxuICAgICAgICAgICAgcmV0dXJuIFwiRVZFTlRfQ09NTUFORF9RVUVVRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkVWRU5UX0NPTU1BTkRfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiBcIkVWRU5UX0NPTU1BTkRfVFlQRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkVWRU5UX1JFRkVSRU5DRV9DT1VOVDpcbiAgICAgICAgICAgIHJldHVybiBcIkVWRU5UX1JFRkVSRU5DRV9DT1VOVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkVWRU5UX0NPTU1BTkRfRVhFQ1VUSU9OX1NUQVRVUzpcbiAgICAgICAgICAgIHJldHVybiBcIkVWRU5UX0NPTU1BTkRfRVhFQ1VUSU9OX1NUQVRVU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkNPTU1BTkRfTkRSQU5HRV9LRVJORUw6XG4gICAgICAgICAgICByZXR1cm4gXCJDT01NQU5EX05EUkFOR0VfS0VSTkVMXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQ09NTUFORF9UQVNLOlxuICAgICAgICAgICAgcmV0dXJuIFwiQ09NTUFORF9UQVNLXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQ09NTUFORF9OQVRJVkVfS0VSTkVMOlxuICAgICAgICAgICAgcmV0dXJuIFwiQ09NTUFORF9OQVRJVkVfS0VSTkVMXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQ09NTUFORF9SRUFEX0JVRkZFUjpcbiAgICAgICAgICAgIHJldHVybiBcIkNPTU1BTkRfUkVBRF9CVUZGRVJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT01NQU5EX1dSSVRFX0JVRkZFUjpcbiAgICAgICAgICAgIHJldHVybiBcIkNPTU1BTkRfV1JJVEVfQlVGRkVSXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQ09NTUFORF9DT1BZX0JVRkZFUjpcbiAgICAgICAgICAgIHJldHVybiBcIkNPTU1BTkRfQ09QWV9CVUZGRVJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT01NQU5EX1JFQURfSU1BR0U6XG4gICAgICAgICAgICByZXR1cm4gXCJDT01NQU5EX1JFQURfSU1BR0VcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT01NQU5EX1dSSVRFX0lNQUdFOlxuICAgICAgICAgICAgcmV0dXJuIFwiQ09NTUFORF9XUklURV9JTUFHRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkNPTU1BTkRfQ09QWV9JTUFHRTpcbiAgICAgICAgICAgIHJldHVybiBcIkNPTU1BTkRfQ09QWV9JTUFHRVwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkNPTU1BTkRfQ09QWV9JTUFHRV9UT19CVUZGRVI6XG4gICAgICAgICAgICByZXR1cm4gXCJDT01NQU5EX0NPUFlfSU1BR0VfVE9fQlVGRkVSXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQ09NTUFORF9DT1BZX0JVRkZFUl9UT19JTUFHRTpcbiAgICAgICAgICAgIHJldHVybiBcIkNPTU1BTkRfQ09QWV9CVUZGRVJfVE9fSU1BR0VcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT01NQU5EX01BUF9CVUZGRVI6XG4gICAgICAgICAgICByZXR1cm4gXCJDT01NQU5EX01BUF9CVUZGRVJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT01NQU5EX01BUF9JTUFHRTpcbiAgICAgICAgICAgIHJldHVybiBcIkNPTU1BTkRfTUFQX0lNQUdFXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQ09NTUFORF9VTk1BUF9NRU1fT0JKRUNUOlxuICAgICAgICAgICAgcmV0dXJuIFwiQ09NTUFORF9VTk1BUF9NRU1fT0JKRUNUXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQ09NTUFORF9NQVJLRVI6XG4gICAgICAgICAgICByZXR1cm4gXCJDT01NQU5EX01BUktFUlwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkNPTU1BTkRfV0FJVF9GT1JfRVZFTlRTOlxuICAgICAgICAgICAgcmV0dXJuIFwiQ09NTUFORF9XQUlUX0ZPUl9FVkVOVFNcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT01NQU5EX0JBUlJJRVI6XG4gICAgICAgICAgICByZXR1cm4gXCJDT01NQU5EX0JBUlJJRVJcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5DT01NQU5EX0FDUVVJUkVfR0xfT0JKRUNUUzpcbiAgICAgICAgICAgIHJldHVybiBcIkNPTU1BTkRfQUNRVUlSRV9HTF9PQkpFQ1RTXCI7XG4gICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuQ09NTUFORF9SRUxFQVNFX0dMX09CSkVDVFM6XG4gICAgICAgICAgICByZXR1cm4gXCJDT01NQU5EX1JFTEVBU0VfR0xfT0JKRUNUU1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkNPTVBMRVRFOlxuICAgICAgICAgICAgcmV0dXJuIFwiQ09NUExFVEVcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5SVU5OSU5HOlxuICAgICAgICAgICAgcmV0dXJuIFwiUlVOTklOR1wiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlNVQk1JVFRFRDpcbiAgICAgICAgICAgIHJldHVybiBcIlNVQk1JVFRFRFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlFVRVVFRDpcbiAgICAgICAgICAgIHJldHVybiBcIlFVRVVFRFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBST0ZJTElOR19DT01NQU5EX1FVRVVFRDpcbiAgICAgICAgICAgIHJldHVybiBcIlBST0ZJTElOR19DT01NQU5EX1FVRVVFRFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBST0ZJTElOR19DT01NQU5EX1NVQk1JVDpcbiAgICAgICAgICAgIHJldHVybiBcIlBST0ZJTElOR19DT01NQU5EX1NVQk1JVFwiO1xuICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBST0ZJTElOR19DT01NQU5EX1NUQVJUOlxuICAgICAgICAgICAgcmV0dXJuIFwiUFJPRklMSU5HX0NPTU1BTkRfU1RBUlRcIjtcbiAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QUk9GSUxJTkdfQ09NTUFORF9FTkQ6XG4gICAgICAgICAgICByZXR1cm4gXCJQUk9GSUxJTkdfQ09NTUFORF9FTkRcIjtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxufSIsImltcG9ydCB7IENMYm9vbGVhbiwgQ0xlbnVtLCBDTHVpbnQgfSBmcm9tIFwiLi93ZWJjbHR5cGVcIjtcbmltcG9ydCB7IFdlYkNMQnVmZmVyIH0gZnJvbSAnLi93ZWJjbGJ1ZmZlcic7XG5pbXBvcnQgeyBXZWJDTENvbW1hbmRRdWV1ZSB9IGZyb20gJy4vd2ViY2xjb21tYW5kcXVldWUnO1xuaW1wb3J0IHsgV2ViQ0xEZXZpY2UgfSBmcm9tIFwiLi93ZWJjbGRldmljZVwiO1xuaW1wb3J0IHsgV2ViQ0xJbWFnZSB9IGZyb20gJy4vd2ViY2xpbWFnZSc7XG5pbXBvcnQgeyBXZWJDTEltYWdlRGVzY3JpcHRvciB9IGZyb20gJy4vd2ViY2xpbWFnZWRlc2NyaXB0b3InO1xuaW1wb3J0IHsgV2ViQ0xQcm9ncmFtIH0gZnJvbSAnLi93ZWJjbHByb2dyYW0nO1xuaW1wb3J0IHsgV2ViQ0xTYW1wbGVyIH0gZnJvbSAnLi93ZWJjbHNhbXBsZXInO1xuaW1wb3J0IHsgV2ViQ0xFeGNlcHRpb24gfSBmcm9tIFwiLi93ZWJjbGV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgV2ViQ0xDb25zdGFudFN0ciwgV2ViQ0xDb25zdGFudHMgfSBmcm9tIFwiLi93ZWJjbGNvbnN0YW50c1wiO1xuaW1wb3J0IHsgV2ViQ0xVc2VyRXZlbnQgfSBmcm9tICcuL3dlYmNsdXNlcmV2ZW50JztcbmltcG9ydCB7IFdlYkNMUGxhdGZvcm0gfSBmcm9tIFwiLi93ZWJjbHBsYXRmb3JtXCI7XG5cbmV4cG9ydCBjbGFzcyBXZWJDTENvbnRleHQge1xuICAgIC8vIFdlYkNMIE9iamVjdFxuICAgIHdjbFBsYXRmb3JtOiBXZWJDTFBsYXRmb3JtO1xuXG4gICAgY29uc3RydWN0b3Iod2NsX3BsYXRmb3JtOiBXZWJDTFBsYXRmb3JtKSB7XG4gICAgICAgIHRoaXMud2NsUGxhdGZvcm0gPSB3Y2xfcGxhdGZvcm07XG4gICAgfVxuXG4gICAgY3JlYXRlQnVmZmVyKG1lbUZsYWdzOiBDTGVudW0sIHNpemVJbkJ5dGVzOiBDTHVpbnQsIGhvc3RQdHI/OiBBcnJheUJ1ZmZlclZpZXcpOiBXZWJDTEJ1ZmZlciB7XG4gICAgICAgIG1lbUZsYWdzO1xuICAgICAgICBzaXplSW5CeXRlcztcbiAgICAgICAgaG9zdFB0cjtcblxuICAgICAgICByZXR1cm4gbmV3IFdlYkNMQnVmZmVyKCk7XG4gICAgfVxuXG4gICAgY3JlYXRlQ29tbWFuZFF1ZXVlKGRldmljZT86IFdlYkNMRGV2aWNlIHwgbnVsbCwgcHJvcGVydGllcz86IENMZW51bSk6IFdlYkNMQ29tbWFuZFF1ZXVlIHtcbiAgICAgICAgZGV2aWNlO1xuICAgICAgICBwcm9wZXJ0aWVzO1xuXG4gICAgICAgIHJldHVybiBuZXcgV2ViQ0xDb21tYW5kUXVldWUoKTtcbiAgICB9XG5cbiAgICBjcmVhdGVJbWFnZShtZW1GbGFnczogQ0xlbnVtLCBkZXNjcmlwdG9yOiBXZWJDTEltYWdlRGVzY3JpcHRvciwgaG9zdFB0cj86IEFycmF5QnVmZmVyVmlldyk6IFdlYkNMSW1hZ2Uge1xuICAgICAgICBtZW1GbGFncztcbiAgICAgICAgZGVzY3JpcHRvcjtcbiAgICAgICAgaG9zdFB0cjtcblxuICAgICAgICByZXR1cm4gbmV3IFdlYkNMSW1hZ2UoKTtcbiAgICB9XG5cbiAgICBjcmVhdGVQcm9ncmFtKHNvdXJjZTogc3RyaW5nKTogV2ViQ0xQcm9ncmFtIHtcbiAgICAgICAgcmV0dXJuIG5ldyBXZWJDTFByb2dyYW0odGhpcy53Y2xQbGF0Zm9ybSwgdGhpcywgc291cmNlKTtcbiAgICB9XG5cblxuICAgIGNyZWF0ZVNhbXBsZXIobm9ybWFsaXplZENvb3JkczogQ0xib29sZWFuLCBhZGRyZXNzaW5nTW9kZTogQ0xlbnVtLCBmaWx0ZXJNb2RlOiBDTGVudW0pOiBXZWJDTFNhbXBsZXIge1xuICAgICAgICBub3JtYWxpemVkQ29vcmRzO1xuICAgICAgICBhZGRyZXNzaW5nTW9kZTtcbiAgICAgICAgZmlsdGVyTW9kZTtcblxuICAgICAgICByZXR1cm4gbmV3IFdlYkNMU2FtcGxlcigpO1xuXG4gICAgfVxuXG4gICAgY3JlYXRlVXNlckV2ZW50KCk6IFdlYkNMVXNlckV2ZW50IHtcbiAgICAgICAgcmV0dXJuIG5ldyBXZWJDTFVzZXJFdmVudCgpO1xuICAgIH1cblxuICAgIGdldEluZm8obmFtZTogQ0xlbnVtKTogYW55IHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXZWJDTEV4Y2VwdGlvbihXZWJDTENvbnN0YW50cy5JTlZBTElEX0VWRU5ULCBcIltJTlZBTElEX0VWRU5UXSBXZWJDTENvbnRleHQuZ2V0SW5mbygpOiB1bmtub3duIHBhcmFtZXRlciAnXCIgKyBXZWJDTENvbnN0YW50U3RyKG5hbWUpICsgXCInXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U3VwcG9ydGVkSW1hZ2VGb3JtYXRzKG1lbUZsYWdzPzogQ0xlbnVtKTogQXJyYXk8V2ViQ0xJbWFnZURlc2NyaXB0b3I+IHwgbnVsbCB7XG4gICAgICAgIG1lbUZsYWdzO1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJlbGVhc2UoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICByZWxlYXNlQWxsKCk6IHZvaWQge1xuXG4gICAgfVxufSIsImltcG9ydCB7IFdlYkNMQ29uc3RhbnRTdHIsIFdlYkNMQ29uc3RhbnRzIH0gZnJvbSBcIi4vd2ViY2xjb25zdGFudHNcIjtcbmltcG9ydCB7IFdlYkNMRXhjZXB0aW9uIH0gZnJvbSBcIi4vd2ViY2xleGNlcHRpb25cIjtcbmltcG9ydCB7IFdlYkNMUGxhdGZvcm0gfSBmcm9tIFwiLi93ZWJjbHBsYXRmb3JtXCI7XG5pbXBvcnQgeyBDTGJvb2xlYW4sIENMZW51bSB9IGZyb20gXCIuL3dlYmNsdHlwZVwiO1xuXG5leHBvcnQgY2xhc3MgV2ViQ0xEZXZpY2Uge1xuICAgIC8vIFdlYkdQVSBPYmplY3RzXG4gICAgcHJpdmF0ZSB3Z3B1SW5mbzogR1BVQWRhcHRlckluZm87XG4gICAgcHJpdmF0ZSB3Z3B1RGV2aWNlOiBHUFVEZXZpY2U7XG5cbiAgICAvLyBXZWJDTCBPYmplY3RzXG4gICAgcHJpdmF0ZSB3Y2xQbGF0Zm9ybTogV2ViQ0xQbGF0Zm9ybTtcblxuICAgIGNvbnN0cnVjdG9yKHdjbF9wbGF0Zm9ybTogV2ViQ0xQbGF0Zm9ybSwgd2dwdV9pbmZvOiBHUFVBZGFwdGVySW5mbywgd2dwdV9kZXZpY2U6IEdQVURldmljZSkge1xuICAgICAgICB0aGlzLndjbFBsYXRmb3JtID0gd2NsX3BsYXRmb3JtO1xuICAgICAgICB0aGlzLndncHVJbmZvID0gd2dwdV9pbmZvO1xuICAgICAgICB0aGlzLndncHVEZXZpY2UgPSB3Z3B1X2RldmljZTtcbiAgICB9XG5cbiAgICBmbnYxYShzdHI6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGxldCBoYXNoID0gMjE2NjEzNjI2MTsgLy8gRk5WIG9mZnNldCBiYXNpc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaGFzaCBePSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgIGhhc2ggKj0gMTY3Nzc2MTk7IC8vIEZOViBwcmltZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYXNoID4+PiAwOyAvLyBFbnN1cmUgdW5zaWduZWQgMzItYml0IGludGVnZXJcbiAgICB9XG5cbiAgICBnZXRJbmZvKG5hbWU6IENMZW51bSk6IGFueSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfVFlQRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gV2ViQ0xDb25zdGFudHMuREVWSUNFX1RZUEVfR1BVO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfVkVORE9SX0lEOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZudjFhKHRoaXMud2dwdUluZm8udmVuZG9yKTtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX01BWF9DT01QVVRFX1VOSVRTOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndncHVEZXZpY2UubGltaXRzLm1heEJpbmRHcm91cHM7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfV09SS19JVEVNX0RJTUVOU0lPTlM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfV09SS19HUk9VUF9TSVpFOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndncHVEZXZpY2UubGltaXRzLm1heENvbXB1dGVJbnZvY2F0aW9uc1Blcldvcmtncm91cDtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX01BWF9XT1JLX0lURU1fU0laRVM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53Z3B1RGV2aWNlLmxpbWl0cy5tYXhDb21wdXRlV29ya2dyb3VwU2l6ZVgsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2dwdURldmljZS5saW1pdHMubWF4Q29tcHV0ZVdvcmtncm91cFNpemVZLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLndncHVEZXZpY2UubGltaXRzLm1heENvbXB1dGVXb3JrZ3JvdXBTaXplWixcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUFJFRkVSUkVEX1ZFQ1RPUl9XSURUSF9DSEFSOlxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUFJFRkVSUkVEX1ZFQ1RPUl9XSURUSF9TSE9SVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BSRUZFUlJFRF9WRUNUT1JfV0lEVEhfSU5UOlxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUFJFRkVSUkVEX1ZFQ1RPUl9XSURUSF9MT05HOlxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUFJFRkVSUkVEX1ZFQ1RPUl9XSURUSF9GTE9BVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX01BWF9DTE9DS19GUkVRVUVOQ1k6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9BRERSRVNTX0JJVFM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDMyO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTUFYX1JFQURfSU1BR0VfQVJHUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gODtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX01BWF9XUklURV9JTUFHRV9BUkdTOlxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTUFYX01FTV9BTExPQ19TSVpFOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndncHVEZXZpY2UubGltaXRzLm1heEJ1ZmZlclNpemU7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9JTUFHRTJEX01BWF9XSURUSDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53Z3B1RGV2aWNlLmxpbWl0cy5tYXhUZXh0dXJlRGltZW5zaW9uMkQ7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9JTUFHRTJEX01BWF9IRUlHSFQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2dwdURldmljZS5saW1pdHMubWF4VGV4dHVyZURpbWVuc2lvbjJEO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfSU1BR0UzRF9NQVhfV0lEVEg6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2dwdURldmljZS5saW1pdHMubWF4VGV4dHVyZURpbWVuc2lvbjNEO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfSU1BR0UzRF9NQVhfSEVJR0hUOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndncHVEZXZpY2UubGltaXRzLm1heFRleHR1cmVEaW1lbnNpb24zRDtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0lNQUdFM0RfTUFYX0RFUFRIOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndncHVEZXZpY2UubGltaXRzLm1heFRleHR1cmVEaW1lbnNpb24zRDtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0lNQUdFX1NVUFBPUlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfUEFSQU1FVEVSX1NJWkU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1NjtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX01BWF9TQU1QTEVSUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gODtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX01FTV9CQVNFX0FERFJfQUxJR046XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE2ICogMzI7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9TSU5HTEVfRlBfQ09ORklHOlxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfR0xPQkFMX01FTV9DQUNIRV9UWVBFOlxuICAgICAgICAgICAgICAgIHJldHVybiBXZWJDTENvbnN0YW50cy5SRUFEX1dSSVRFX0NBQ0hFO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfR0xPQkFMX01FTV9DQUNIRUxJTkVfU0laRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0dMT0JBTF9NRU1fQ0FDSEVfU0laRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0dMT0JBTF9NRU1fU0laRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTAyNCAqIDEwMjQ7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfQ09OU1RBTlRfQlVGRkVSX1NJWkU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEwMjQ7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NQVhfQ09OU1RBTlRfQVJHUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gNDtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0xPQ0FMX01FTV9UWVBFOlxuICAgICAgICAgICAgICAgIHJldHVybiBXZWJDTENvbnN0YW50cy5MT0NBTDtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0xPQ0FMX01FTV9TSVpFOlxuICAgICAgICAgICAgICAgIHJldHVybiAxMDI0O1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfRVJST1JfQ09SUkVDVElPTl9TVVBQT1JUOlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BST0ZJTElOR19USU1FUl9SRVNPTFVUSU9OOlxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfRU5ESUFOX0xJVFRMRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0FWQUlMQUJMRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0NPTVBJTEVSX0FWQUlMQUJMRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX0VYRUNVVElPTl9DQVBBQklMSVRJRVM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFdlYkNMQ29uc3RhbnRzLkVYRUNfS0VSTkVMO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUVVFVUVfUFJPUEVSVElFUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX05BTUU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2dwdUluZm8uZGV2aWNlO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfVkVORE9SOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndncHVJbmZvLnZlbmRvcjtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuRFJJVkVSX1ZFUlNJT046XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiMS4wXCI7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9QUk9GSUxFOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIldFQkNMX1BST0ZJTEUgXCIgKyB0aGlzLndncHVJbmZvLnZlbmRvcjtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1ZFUlNJT046XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiV0VCQ0wgMS4wIFwiICsgdGhpcy53Z3B1SW5mby52ZW5kb3I7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9FWFRFTlNJT05TOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN1cHBvcnRlZEV4dGVuc2lvbnMoKS5qb2luKFwiIFwiKTtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuREVWSUNFX1BMQVRGT1JNOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndjbFBsYXRmb3JtO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfSE9TVF9VTklGSUVEX01FTU9SWTpcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX0NIQVI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX1NIT1JUOlxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfTkFUSVZFX1ZFQ1RPUl9XSURUSF9JTlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX0xPTkc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9OQVRJVkVfVkVDVE9SX1dJRFRIX0ZMT0FUOlxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfT1BFTkNMX0NfVkVSU0lPTjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJXRUJDTCBDIDEuMCBcIiArIHRoaXMud2dwdUluZm8udmVuZG9yO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5ERVZJQ0VfUFJFRkVSUkVEX1ZFQ1RPUl9XSURUSF9ET1VCTEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLkRFVklDRV9NSU5fREFUQV9UWVBFX0FMSUdOX1NJWkU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXZWJDTEV4Y2VwdGlvbihXZWJDTENvbnN0YW50cy5JTlZBTElEX0VWRU5ULCBcIltJTlZBTElEX0VWRU5UXSBXZWJDTERldmljZS5nZXRJbmZvKCk6IHVua25vd24gcGFyYW1ldGVyICdcIiArIFdlYkNMQ29uc3RhbnRTdHIobmFtZSkgKyBcIidcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTdXBwb3J0ZWRFeHRlbnNpb25zKCk6IEFycmF5PHN0cmluZz4gfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2NsUGxhdGZvcm0uZ2V0U3VwcG9ydGVkRXh0ZW5zaW9ucygpO1xuICAgIH1cblxuICAgIGVuYWJsZUV4dGVuc2lvbihleHRlbnNpb25OYW1lOiBzdHJpbmcpOiBDTGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy53Y2xQbGF0Zm9ybS5lbmFibGVFeHRlbnNpb24oZXh0ZW5zaW9uTmFtZSk7XG4gICAgfVxufSIsImltcG9ydCB7IFdlYkNMQ29uc3RhbnRTdHIsIFdlYkNMQ29uc3RhbnRzIH0gZnJvbSBcIi4vd2ViY2xjb25zdGFudHNcIjtcbmltcG9ydCB7IFdlYkNMRXhjZXB0aW9uIH0gZnJvbSBcIi4vd2ViY2xleGNlcHRpb25cIjtcbmltcG9ydCB7IENMZW51bSwgQ0x1bG9uZywgV2ViQ0xDYWxsYmFjayB9IGZyb20gXCIuL3dlYmNsdHlwZVwiO1xuXG5leHBvcnQgY2xhc3MgV2ViQ0xFdmVudCB7XG5cbiAgICBnZXRJbmZvKG5hbWU6IENMZW51bSk6IGFueSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgV2ViQ0xFeGNlcHRpb24oV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9FVkVOVCwgXCJbSU5WQUxJRF9FVkVOVF0gV2ViQ0xFdmVudC5nZXRJbmZvKCk6IHVua25vd24gcGFyYW1ldGVyICdcIiArIFdlYkNMQ29uc3RhbnRTdHIobmFtZSkgKyBcIidcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQcm9maWxpbmdJbmZvKG5hbWU6IENMZW51bSk6IENMdWxvbmcge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFdlYkNMRXhjZXB0aW9uKFdlYkNMQ29uc3RhbnRzLklOVkFMSURfRVZFTlQsIFwiW0lOVkFMSURfRVZFTlRdIFdlYkNMRXZlbnQuZ2V0UHJvZmlsaW5nSW5mbygpOiB1bmtub3duIHBhcmFtZXRlciAnXCIgKyBXZWJDTENvbnN0YW50U3RyKG5hbWUpICsgXCInXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHNldENhbGxiYWNrKGNvbW1hbmRFeGVjQ2FsbGJhY2tUeXBlOiBDTGVudW0sIG5vdGlmeTogV2ViQ0xDYWxsYmFjayk6IHZvaWQge1xuICAgICAgICBjb21tYW5kRXhlY0NhbGxiYWNrVHlwZTtcbiAgICAgICAgbm90aWZ5O1xuICAgIH1cblxuICAgIHJlbGVhc2UoKTogdm9pZCB7XG5cbiAgICB9XG59IiwiaW1wb3J0IHsgV2ViQ0xDb25zdGFudHMgfSBmcm9tIFwiLi93ZWJjbGNvbnN0YW50c1wiO1xuXG5leHBvcnQgY2xhc3MgV2ViQ0xFeGNlcHRpb24gZXh0ZW5kcyBFcnJvciB7XG4gICAgaWQ6IG51bWJlcjsgLy8gVW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBlcnJvclxuXG4gICAgY29uc3RydWN0b3IoaWQ6IFdlYkNMQ29uc3RhbnRzLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICAvLyBSZXN0b3JlIHByb3RvdHlwZSBjaGFpblxuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgbmV3LnRhcmdldC5wcm90b3R5cGUpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBXZWJDTEltYWdlRGVzY3JpcHRvciB9IGZyb20gXCIuL3dlYmNsaW1hZ2VkZXNjcmlwdG9yXCI7XG5pbXBvcnQgeyBXZWJDTE1lbW9yeU9iamVjdCB9IGZyb20gXCIuL3dlYmNsbWVtb3J5b2JqZWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBXZWJDTEltYWdlIGV4dGVuZHMgV2ViQ0xNZW1vcnlPYmplY3Qge1xuICAgIGdldEluZm8oKTogV2ViQ0xJbWFnZURlc2NyaXB0b3Ige1xuICAgICAgICByZXR1cm4gbmV3IFdlYkNMSW1hZ2VEZXNjcmlwdG9yKCk7XG4gICAgfVxufSIsImltcG9ydCB7IENMZW51bSwgQ0x1aW50IH0gZnJvbSBcIi4vd2ViY2x0eXBlXCI7XG5cbmV4cG9ydCBjbGFzcyBXZWJDTEltYWdlRGVzY3JpcHRvciB7XG4gICAgY2hhbm5lbE9yZGVyPzogQ0xlbnVtO1xuICAgIGNoYW5uZWxUeXBlPzogQ0xlbnVtO1xuICAgIHdpZHRoPzogQ0x1aW50O1xuICAgIGhlaWdodD86IENMdWludDtcbiAgICByb3dQaXRjaD86IENMdWludDtcbn0iLCJpbXBvcnQgeyBXZWJDTERldmljZSB9IGZyb20gXCIuL3dlYmNsZGV2aWNlXCI7XG5pbXBvcnQgeyBDTGVudW0sIENMdWludCB9IGZyb20gXCIuL3dlYmNsdHlwZVwiO1xuaW1wb3J0IHsgV2ViQ0xLZXJuZWxBcmdJbmZvIH0gZnJvbSAnLi93ZWJjbGtlcm5lbGFyZ2luZm8nO1xuaW1wb3J0IHsgV2ViQ0xCdWZmZXIgfSBmcm9tIFwiLi93ZWJjbGJ1ZmZlclwiO1xuaW1wb3J0IHsgV2ViQ0xJbWFnZSB9IGZyb20gXCIuL3dlYmNsaW1hZ2VcIjtcbmltcG9ydCB7IFdlYkNMU2FtcGxlciB9IGZyb20gXCIuL3dlYmNsc2FtcGxlclwiO1xuaW1wb3J0IHsgV2ViQ0xDb25zdGFudFN0ciwgV2ViQ0xDb25zdGFudHMgfSBmcm9tIFwiLi93ZWJjbGNvbnN0YW50c1wiO1xuaW1wb3J0IHsgV2ViQ0xFeGNlcHRpb24gfSBmcm9tIFwiLi93ZWJjbGV4Y2VwdGlvblwiO1xuXG5leHBvcnQgY2xhc3MgV2ViQ0xLZXJuZWwge1xuICAgIGdldEluZm8obmFtZTogQ0xlbnVtKTogYW55IHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXZWJDTEV4Y2VwdGlvbihXZWJDTENvbnN0YW50cy5JTlZBTElEX0VWRU5ULCBcIltJTlZBTElEX0VWRU5UXSBXZWJDTEtlcm5lbC5nZXRJbmZvKCk6IHVua25vd24gcGFyYW1ldGVyICdcIiArIFdlYkNMQ29uc3RhbnRTdHIobmFtZSkgKyBcIidcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0V29ya0dyb3VwSW5mbyhkZXZpY2U6IFdlYkNMRGV2aWNlIHwgbnVsbCwgbmFtZTogQ0xlbnVtKTogYW55IHtcbiAgICAgICAgZGV2aWNlO1xuXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgV2ViQ0xFeGNlcHRpb24oV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9FVkVOVCwgXCJbSU5WQUxJRF9FVkVOVF0gV2ViQ0xLZXJuZWwuZ2V0V29ya0dyb3VwSW5mbygpOiB1bmtub3duIHBhcmFtZXRlciAnXCIgKyBXZWJDTENvbnN0YW50U3RyKG5hbWUpICsgXCInXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldEFyZ0luZm8oaW5kZXg6IENMdWludCk6IFdlYkNMS2VybmVsQXJnSW5mbyB7XG4gICAgICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFdlYkNMRXhjZXB0aW9uKFdlYkNMQ29uc3RhbnRzLklOVkFMSURfRVZFTlQsIFwiW0lOVkFMSURfRVZFTlRdIFdlYkNMS2VybmVsLmdldEFyZ0luZm8oKTogdW5rbm93biBwYXJhbWV0ZXIgJ1wiICsgaW5kZXggKyBcIidcIik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHNldEFyZyhpbmRleDogQ0x1aW50LCBhcmc6IFdlYkNMQnVmZmVyIHwgV2ViQ0xJbWFnZSB8IFdlYkNMU2FtcGxlciB8IEFycmF5QnVmZmVyVmlldyk6IHZvaWQge1xuICAgICAgICBpbmRleDtcbiAgICAgICAgYXJnO1xuICAgIH1cblxuICAgIHJlbGVhc2UoKTogdm9pZCB7IH1cblxufSIsImV4cG9ydCBjbGFzcyBXZWJDTEtlcm5lbEFyZ0luZm8ge1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgdHlwZU5hbWU/OiBzdHJpbmc7XG4gICAgYWRkcmVzc1F1YWxpZmllcj86IHN0cmluZztcbiAgICBhY2Nlc3NRdWFsaWZpZXI/OiBzdHJpbmc7XG59IiwiaW1wb3J0IHsgV2ViQ0xDb25zdGFudFN0ciwgV2ViQ0xDb25zdGFudHMgfSBmcm9tIFwiLi93ZWJjbGNvbnN0YW50c1wiO1xuaW1wb3J0IHsgV2ViQ0xFeGNlcHRpb24gfSBmcm9tIFwiLi93ZWJjbGV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgQ0xlbnVtIH0gZnJvbSBcIi4vd2ViY2x0eXBlXCI7XG5cbmV4cG9ydCBjbGFzcyBXZWJDTE1lbW9yeU9iamVjdCB7XG4gICAgZ2V0SW5mbyhuYW1lOiBDTGVudW0pOiBhbnkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFdlYkNMRXhjZXB0aW9uKFdlYkNMQ29uc3RhbnRzLklOVkFMSURfRVZFTlQsIFwiW0lOVkFMSURfRVZFTlRdIFdlYkNMTWVtb3J5T2JqZWN0LmdldEluZm8oKTogdW5rbm93biBwYXJhbWV0ZXIgJ1wiICsgV2ViQ0xDb25zdGFudFN0cihuYW1lKSArIFwiJ1wiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWxlYXNlKCk6IHZvaWQgeyB9XG59IiwiaW1wb3J0IHsgV2ViQ0xDb25zdGFudFN0ciwgV2ViQ0xDb25zdGFudHMgfSBmcm9tICcuL3dlYmNsY29uc3RhbnRzJztcbmltcG9ydCB7IENMZW51bSwgQ0xib29sZWFuIH0gZnJvbSAnLi93ZWJjbHR5cGUnO1xuaW1wb3J0IHsgV2ViQ0xEZXZpY2UgfSBmcm9tICcuL3dlYmNsZGV2aWNlJztcbmltcG9ydCB7IFdlYkNMRXhjZXB0aW9uIH0gZnJvbSAnLi93ZWJjbGV4Y2VwdGlvbic7XG5cbmNsYXNzIFdlYkNMUGxhdGZvcm0ge1xuICAgIC8vIFdlYkdQVSBvYmplY3RzXG4gICAgcHJpdmF0ZSB3Z3B1SW5mbzogR1BVQWRhcHRlckluZm87XG5cbiAgICAvLyBXZWJDTCBvYmplY3RzXG4gICAgcHJpdmF0ZSB3Y2xEZXZpY2U6IFdlYkNMRGV2aWNlO1xuXG4gICAgY29uc3RydWN0b3Iod2dwdV9pbmZvOiBHUFVBZGFwdGVySW5mbywgd2dwdV9kZXZpY2U6IEdQVURldmljZSkge1xuICAgICAgICB0aGlzLndncHVJbmZvID0gd2dwdV9pbmZvO1xuICAgICAgICB0aGlzLndjbERldmljZSA9IG5ldyBXZWJDTERldmljZSh0aGlzLCB3Z3B1X2luZm8sIHdncHVfZGV2aWNlKVxuICAgIH1cblxuICAgIGdldEluZm8obmFtZTogQ0xlbnVtKTogYW55IHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBMQVRGT1JNX1BST0ZJTEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiV0VCQ0xfUFJPRklMRSBcIiArIHRoaXMud2dwdUluZm8udmVuZG9yO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QTEFURk9STV9WRVJTSU9OOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIldlYkNMIDEuMCBcIiArIHRoaXMud2dwdUluZm8udmVuZG9yO1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QTEFURk9STV9OQU1FOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndncHVJbmZvLnZlbmRvcjtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUExBVEZPUk1fVkVORE9SOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndncHVJbmZvLnZlbmRvcjtcbiAgICAgICAgICAgIGNhc2UgV2ViQ0xDb25zdGFudHMuUExBVEZPUk1fRVhURU5TSU9OUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdXBwb3J0ZWRFeHRlbnNpb25zKCkuam9pbihcIiBcIik7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXZWJDTEV4Y2VwdGlvbihXZWJDTENvbnN0YW50cy5JTlZBTElEX0VWRU5ULCBcIltJTlZBTElEX0VWRU5UXSBXZWJDTFBsYXRmb3JtLmdldEluZm8oKTogdW5rbm93biBwYXJhbWV0ZXIgJ1wiICsgV2ViQ0xDb25zdGFudFN0cihuYW1lKSArIFwiJ1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldERldmljZXMoXz86IENMZW51bSk6IEFycmF5PFdlYkNMRGV2aWNlPiB7XG4gICAgICAgIHJldHVybiBbdGhpcy53Y2xEZXZpY2VdXG4gICAgfVxuXG4gICAgZ2V0U3VwcG9ydGVkRXh0ZW5zaW9ucygpOiBBcnJheTxzdHJpbmc+IHwgbnVsbCB7XG4gICAgICAgIHJldHVybiBbXCJLSFJfZ2xfc2hhcmluZ1wiLCBcIktIUl9mcDE2XCJdO1xuICAgIH1cblxuICAgIGVuYWJsZUV4dGVuc2lvbihleHRlbnNpb25OYW1lOiBzdHJpbmcpOiBDTGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdXBwb3J0ZWRFeHRlbnNpb25zKCkuaW5jbHVkZXMoZXh0ZW5zaW9uTmFtZSk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBXZWJDTFBsYXRmb3JtIH07IiwiaW1wb3J0IHsgV2ViQ0xEZXZpY2UgfSBmcm9tIFwiLi93ZWJjbGRldmljZVwiO1xuaW1wb3J0IHsgQ0xlbnVtLCBXZWJDTENhbGxiYWNrIH0gZnJvbSBcIi4vd2ViY2x0eXBlXCI7XG5pbXBvcnQgeyBXZWJDTEtlcm5lbCB9IGZyb20gJy4vd2ViY2xrZXJuZWwnO1xuaW1wb3J0IHsgV2ViQ0xFeGNlcHRpb24gfSBmcm9tIFwiLi93ZWJjbGV4Y2VwdGlvblwiO1xuaW1wb3J0IHsgV2ViQ0xDb25zdGFudFN0ciwgV2ViQ0xDb25zdGFudHMgfSBmcm9tIFwiLi93ZWJjbGNvbnN0YW50c1wiO1xuaW1wb3J0IHsgV2ViQ0xQbGF0Zm9ybSB9IGZyb20gXCIuL3dlYmNscGxhdGZvcm1cIjtcbmltcG9ydCB7IFdlYkNMQ29udGV4dCB9IGZyb20gXCIuL3dlYmNsY29udGV4dFwiO1xuXG5leHBvcnQgY2xhc3MgV2ViQ0xQcm9ncmFtIHtcbiAgICAvLyBXZWJDTCBPYmplY3RzXG4gICAgd2NsUGxhdGZvcm06IFdlYkNMUGxhdGZvcm07XG4gICAgd2NsQ29udGV4dDogV2ViQ0xDb250ZXh0O1xuXG4gICAgLy8gT3RoZXJzXG4gICAgc291cmNlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcih3Y2xfcGxhdGZvcm06IFdlYkNMUGxhdGZvcm0sIHdjbF9jb250ZXh0OiBXZWJDTENvbnRleHQsIHNvdXJjZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMud2NsUGxhdGZvcm0gPSB3Y2xfcGxhdGZvcm07XG4gICAgICAgIHRoaXMud2NsQ29udGV4dCA9IHdjbF9jb250ZXh0O1xuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG5cbiAgICBnZXRJbmZvKG5hbWU6IENMZW51bSk6IGFueSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QUk9HUkFNX05VTV9ERVZJQ0VTOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndjbFBsYXRmb3JtLmdldERldmljZXMoKS5sZW5ndGg7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBST0dSQU1fREVWSUNFUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53Y2xQbGF0Zm9ybS5nZXREZXZpY2VzKCk7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBST0dSQU1fQ09OVEVYVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53Y2xDb250ZXh0O1xuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QUk9HUkFNX1NPVVJDRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zb3VyY2U7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBXZWJDTEV4Y2VwdGlvbihXZWJDTENvbnN0YW50cy5JTlZBTElEX0VWRU5ULCBcIltJTlZBTElEX0VWRU5UXSBXZWJDTFByb2dyYW0uZ2V0SW5mbygpOiB1bmtub3duIHBhcmFtZXRlciAnXCIgKyBXZWJDTENvbnN0YW50U3RyKG5hbWUpICsgXCInXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldEJ1aWxkSW5mbyhkZXZpY2U6IFdlYkNMRGV2aWNlLCBuYW1lOiBDTGVudW0pOiBhbnkge1xuICAgICAgICBkZXZpY2U7XG5cbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBST0dSQU1fQlVJTERfU1RBVFVTOlxuICAgICAgICAgICAgY2FzZSBXZWJDTENvbnN0YW50cy5QUk9HUkFNX0JVSUxEX09QVElPTlM6XG4gICAgICAgICAgICBjYXNlIFdlYkNMQ29uc3RhbnRzLlBST0dSQU1fQlVJTERfTE9HOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgV2ViQ0xFeGNlcHRpb24oV2ViQ0xDb25zdGFudHMuSU5WQUxJRF9FVkVOVCwgXCJbSU5WQUxJRF9FVkVOVF0gV2ViQ0xQcm9ncmFtLmdldEJ1aWxkSW5mbygpOiB1bmtub3duIHBhcmFtZXRlciAnXCIgKyBXZWJDTENvbnN0YW50U3RyKG5hbWUpICsgXCInXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJ1aWxkKGRldmljZXM/OiBBcnJheTxXZWJDTERldmljZT4gfCBudWxsLCBvcHRpb25zPzogc3RyaW5nIHwgbnVsbCwgd2hlbkZpbmlzaGVkPzogV2ViQ0xDYWxsYmFjayk6IHZvaWQge1xuICAgICAgICBkZXZpY2VzO1xuICAgICAgICBvcHRpb25zO1xuICAgICAgICB3aGVuRmluaXNoZWQ7XG4gICAgfVxuICAgIGNyZWF0ZUtlcm5lbChrZXJuZWxOYW1lOiBzdHJpbmcpOiBXZWJDTEtlcm5lbCB7XG4gICAgICAgIGtlcm5lbE5hbWU7XG4gICAgICAgIHJldHVybiBuZXcgV2ViQ0xLZXJuZWwoKTtcbiAgICB9XG4gICAgY3JlYXRlS2VybmVsc0luUHJvZ3JhbSgpOiBBcnJheTxXZWJDTEtlcm5lbD4ge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJlbGVhc2UoKTogdm9pZCB7IH1cbn0iLCJpbXBvcnQgeyBXZWJDTENvbnN0YW50U3RyLCBXZWJDTENvbnN0YW50cyB9IGZyb20gXCIuL3dlYmNsY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBXZWJDTEV4Y2VwdGlvbiB9IGZyb20gXCIuL3dlYmNsZXhjZXB0aW9uXCI7XG5pbXBvcnQgeyBDTGVudW0gfSBmcm9tIFwiLi93ZWJjbHR5cGVcIjtcblxuZXhwb3J0IGNsYXNzIFdlYkNMU2FtcGxlciB7XG4gICAgZ2V0SW5mbyhuYW1lOiBDTGVudW0pOiBhbnkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFdlYkNMRXhjZXB0aW9uKFdlYkNMQ29uc3RhbnRzLklOVkFMSURfRVZFTlQsIFwiW0lOVkFMSURfRVZFTlRdIFdlYkNMU2FtcGxlci5nZXRJbmZvKCk6IHVua25vd24gcGFyYW1ldGVyICdcIiArIFdlYkNMQ29uc3RhbnRTdHIobmFtZSkgKyBcIidcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWxlYXNlKCk6IHZvaWQgeyB9XG59IiwiaW1wb3J0IHsgV2ViQ0xFdmVudCB9IGZyb20gXCIuL3dlYmNsZXZlbnRcIjtcbmltcG9ydCB7IENMaW50IH0gZnJvbSBcIi4vd2ViY2x0eXBlXCI7XG5cbmV4cG9ydCBjbGFzcyBXZWJDTFVzZXJFdmVudCBleHRlbmRzIFdlYkNMRXZlbnQge1xuICAgIHNldFN0YXR1cyhleGVjdXRpb25TdGF0dXM6IENMaW50KTogdm9pZCB7XG4gICAgICAgIGV4ZWN1dGlvblN0YXR1cztcbiAgICB9XG59IiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY3JlYXRlQmluZGluZyhvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBFeHBvcnQgYWxsIHRoZSBjbGFzcyBXZWJDTFxuZXhwb3J0IHsgV2ViQ0xCdWZmZXIgfSBmcm9tICcuL3dlYmNsYnVmZmVyJztcbmV4cG9ydCB7IFdlYkNMQ29tbWFuZFF1ZXVlIH0gZnJvbSAnLi93ZWJjbGNvbW1hbmRxdWV1ZSc7XG5leHBvcnQgeyBXZWJDTENvbnRleHQgfSBmcm9tICcuL3dlYmNsY29udGV4dCc7XG5leHBvcnQgeyBXZWJDTERldmljZSB9IGZyb20gJy4vd2ViY2xkZXZpY2UnXG5leHBvcnQgeyBXZWJDTEV4Y2VwdGlvbiB9IGZyb20gJy4vd2ViY2xleGNlcHRpb24nO1xuZXhwb3J0IHsgV2ViQ0xFdmVudCB9IGZyb20gJy4vd2ViY2xldmVudCc7XG5leHBvcnQgeyBXZWJDTEltYWdlIH0gZnJvbSAnLi93ZWJjbGltYWdlJztcbmV4cG9ydCB7IFdlYkNMSW1hZ2VEZXNjcmlwdG9yIH0gZnJvbSAnLi93ZWJjbGltYWdlZGVzY3JpcHRvcic7XG5leHBvcnQgeyBXZWJDTEtlcm5lbCB9IGZyb20gJy4vd2ViY2xrZXJuZWwnO1xuZXhwb3J0IHsgV2ViQ0xLZXJuZWxBcmdJbmZvIH0gZnJvbSAnLi93ZWJjbGtlcm5lbGFyZ2luZm8nO1xuZXhwb3J0IHsgV2ViQ0xNZW1vcnlPYmplY3QgfSBmcm9tICcuL3dlYmNsbWVtb3J5b2JqZWN0JztcbmV4cG9ydCB7IFdlYkNMUGxhdGZvcm0gfSBmcm9tICcuL3dlYmNscGxhdGZvcm0nO1xuZXhwb3J0IHsgV2ViQ0xQcm9ncmFtIH0gZnJvbSAnLi93ZWJjbHByb2dyYW0nO1xuZXhwb3J0IHsgV2ViQ0xTYW1wbGVyIH0gZnJvbSAnLi93ZWJjbHNhbXBsZXInO1xuZXhwb3J0IHsgV2ViQ0xVc2VyRXZlbnQgfSBmcm9tICcuL3dlYmNsdXNlcmV2ZW50JztcbmV4cG9ydCB7IFdlYkNMQ29uc3RhbnRzIH0gZnJvbSAnLi93ZWJjbGNvbnN0YW50cydcblxuZXhwb3J0IHsgV2ViQ0wgfSBmcm9tICcuL3dlYmNsJztcblxuLy8gTWFrZSBpdCBhY2Nlc3NpYmxlIHZpYSBuYXZpZ2F0b3Iud2ViY2xcbmltcG9ydCB7IFdlYkNMIH0gZnJvbSAnLi93ZWJjbCc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgICBpbnRlcmZhY2UgTmF2aWdhdG9yIHtcbiAgICAgICAgd2ViY2w6IHR5cGVvZiBXZWJDTDtcbiAgICB9XG59XG5cbi8vIEdldCBuYXZpZ2F0b3Iud2ViY2wuZ2V0UGxhdGZvcm1zKClcbmlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJykge1xuICAgIG5hdmlnYXRvci53ZWJjbCA9IFdlYkNMO1xufVxuXG4vLyBHZXQgV2ViQ0wuZ2V0UGxhdGZvcm1zKClcbmV4cG9ydCBjb25zdCBnZXRQbGF0Zm9ybXMgPSBXZWJDTC5nZXRQbGF0Zm9ybXM7XG5leHBvcnQgY29uc3Qgd2ViY2wgPSBXZWJDTDtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9

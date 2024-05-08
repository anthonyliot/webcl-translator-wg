export enum WebCLConstants {
    SUCCESS = 0,
    DEVICE_NOT_FOUND = -1,
    DEVICE_NOT_AVAILABLE = -2,
    DEVICE_COMPILER_NOT_AVAILABLE = -3,
    MEM_OBJECT_ALLOCATION_FAILURE = -4,
    OUT_OF_RESOURCES = -5,
    OUT_OF_HOST_MEMORY = -6,
    PROFILING_INFO_NOT_AVAILABLE = -7,
    MEM_COPY_OVERLAP = -8,
    IMAGE_FORMAT_MISMATCH = -9,
    IMAGE_FORMAT_NOT_SUPPORTED = -10,
    BUILD_PROGRAM_FAILURE = -11,
    MAP_FAILURE = -12,
    INVALID_VALUE = -30,
    INVALID_DEVICE_TYPE = -31,
    INVALID_PLATFORM = -32,
    INVALID_DEVICE = -33,
    INVALID_CONTEXT = -34,
    INVALID_QUEUE_PROPERTIES = -35,
    INVALID_COMMAND_QUEUE = -36,
    INVALID_HOST_PTR = -37,
    INVALID_MEM_OBJECT = -38,
    INVALID_IMAGE_FORMAT_DESCRIPTOR = -39,
    INVALID_IMAGE_SIZE = -40,
    INVALID_SAMPLER = -41,
    INVALID_BINARY = -42,
    INVALID_BUILD_OPTIONS = -43,
    INVALID_PROGRAM = -44,
    INVALID_PROGRAM_EXECUTABLE = -45,
    INVALID_KERNEL_NAME = -46,
    INVALID_KERNEL_DEFINITION = -47,
    INVALID_KERNEL = -48,
    INVALID_ARG_INDEX = -49,
    INVALID_ARG_VALUE = -50,
    INVALID_ARG_SIZE = -51,
    INVALID_KERNEL_ARGS = -52,
    INVALID_WORK_DIMENSION = -53,
    INVALID_WORK_GROUP_SIZE = -54,
    INVALID_WORK_ITEM_SIZE = -55,
    INVALID_GLOBAL_OFFSET = -56,
    INVALID_EVENT_WAIT_LIST = -57,
    INVALID_EVENT = -58,
    INVALID_OPERATION = -59,
    INVALID_GL_OBJECT = -60,
    INVALID_BUFFER_SIZE = -61,
    INVALID_MIP_LEVEL = -62,
    VERSION_1_0 = 1,
    FALSE = 0,
    TRUE = 1,
    PLATFORM_PROFILE = 0x0900,
    PLATFORM_VERSION = 0x0901,
    PLATFORM_NAME = 0x0902,
    PLATFORM_VENDOR = 0x0903,
    PLATFORM_EXTENSIONS = 0x0904,
    DEVICE_TYPE_DEFAULT = 0x1,
    DEVICE_TYPE_CPU = 0x2,
    DEVICE_TYPE_GPU = 0x4,
    DEVICE_TYPE_ACCELERATOR = 0x8,
    DEVICE_TYPE_DEBUG = 0x16,
    DEVICE_TYPE_ALL = 0xffffffff,
    DEVICE_TYPE = 0x1000,
    DEVICE_VENDOR_ID = 0x1001,
    DEVICE_MAX_COMPUTE_UNITS = 0x1002,
    DEVICE_MAX_WORK_ITEM_DIMENSIONS = 0x1003,
    DEVICE_MAX_WORK_GROUP_SIZE = 0x1004,
    DEVICE_MAX_WORK_ITEM_SIZES = 0x1005,
    DEVICE_PREFERRED_VECTOR_WIDTH_CHAR = 0x1006,
    DEVICE_PREFERRED_VECTOR_WIDTH_SHORT = 0x1007,
    DEVICE_PREFERRED_VECTOR_WIDTH_INT = 0x1008,
    DEVICE_PREFERRED_VECTOR_WIDTH_LONG = 0x1009,
    DEVICE_PREFERRED_VECTOR_WIDTH_FLOAT = 0x100a,
    DEVICE_PREFERRED_VECTOR_WIDTH_DOUBLE = 0x100b,
    DEVICE_MAX_CLOCK_FREQUENCY = 0x100c,
    DEVICE_ADDRESS_BITS = 0x100d,
    DEVICE_MAX_READ_IMAGE_ARGS = 0x100e,
    DEVICE_MAX_WRITE_IMAGE_ARGS = 0x100f,
    DEVICE_MAX_MEM_ALLOC_SIZE = 0x1010,
    DEVICE_IMAGE2D_MAX_WIDTH = 0x1011,
    DEVICE_IMAGE2D_MAX_HEIGHT = 0x1012,
    DEVICE_IMAGE3D_MAX_WIDTH = 0x1013,
    DEVICE_IMAGE3D_MAX_HEIGHT = 0x1014,
    DEVICE_IMAGE3D_MAX_DEPTH = 0x1015,
    DEVICE_IMAGE_SUPPORT = 0x1016,
    DEVICE_MAX_PARAMETER_SIZE = 0x1017,
    DEVICE_MAX_SAMPLERS = 0x1018,
    DEVICE_MEM_BASE_ADDR_ALIGN = 0x1019,
    DEVICE_MIN_DATA_TYPE_ALIGN_SIZE = 0x101a,
    DEVICE_SINGLE_FP_CONFIG = 0x101b,
    DEVICE_GLOBAL_MEM_CACHE_TYPE = 0x101c,
    DEVICE_GLOBAL_MEM_CACHELINE_SIZE = 0x101d,
    DEVICE_GLOBAL_MEM_CACHE_SIZE = 0x101e,
    DEVICE_GLOBAL_MEM_SIZE = 0x101f,
    DEVICE_MAX_CONSTANT_BUFFER_SIZE = 0x1020,
    DEVICE_MAX_CONSTANT_ARGS = 0x1021,
    DEVICE_LOCAL_MEM_TYPE = 0x1022,
    DEVICE_LOCAL_MEM_SIZE = 0x1023,
    DEVICE_ERROR_CORRECTION_SUPPORT = 0x1024,
    DEVICE_PROFILING_TIMER_RESOLUTION = 0x1025,
    DEVICE_ENDIAN_LITTLE = 0x1026,
    DEVICE_AVAILABLE = 0x1027,
    DEVICE_COMPILER_AVAILABLE = 0x1028,
    DEVICE_EXECUTION_CAPABILITIES = 0x1029,
    DEVICE_QUEUE_PROPERTIES = 0x102a,
    DEVICE_NAME = 0x102b,
    DEVICE_VENDOR = 0x102c,
    DRIVER_VERSION = 0x102d,
    DEVICE_PROFILE = 0x102e,
    DEVICE_VERSION = 0x102f,
    DEVICE_EXTENSIONS = 0x1030,
    DEVICE_PLATFORM = 0x1031,
    DEVICE_DOUBLE_FP_CONFIG = 0x1032,
    DEVICE_PREFERRED_VECTOR_WIDTH_HALF = 0x1034,
    DEVICE_HOST_UNIFIED_MEMORY = 0x1035,
    DEVICE_NATIVE_VECTOR_WIDTH_CHAR = 0x1036,
    DEVICE_NATIVE_VECTOR_WIDTH_SHORT = 0x1037,
    DEVICE_NATIVE_VECTOR_WIDTH_INT = 0x1038,
    DEVICE_NATIVE_VECTOR_WIDTH_LONG = 0x1039,
    DEVICE_NATIVE_VECTOR_WIDTH_FLOAT = 0x103a,
    DEVICE_NATIVE_VECTOR_WIDTH_DOUBLE = 0x103b,
    DEVICE_NATIVE_VECTOR_WIDTH_HALF = 0x103c,
    DEVICE_OPENCL_C_VERSION = 0x103d,
    DEVICE_LINKER_AVAILABLE = 0x103e,
    DEVICE_BUILT_IN_KERNELS = 0x103f,
    DEVICE_IMAGE_MAX_BUFFER_SIZE = 0x1040,
    DEVICE_IMAGE_MAX_ARRAY_SIZE = 0x1041,
    DEVICE_PARENT_DEVICE = 0x1042,
    DEVICE_PARTITION_MAX_SUB_DEVICES = 0x1043,
    DEVICE_PARTITION_PROPERTIES = 0x1044,
    DEVICE_PARTITION_AFFINITY_DOMAIN = 0x1045,
    DEVICE_PARTITION_TYPE = 0x1046,
    DEVICE_REFERENCE_COUNT = 0x1047,
    DEVICE_PREFERRED_INTEROP_USER_SYNC = 0x1048,
    DEVICE_PRINTF_BUFFER_SIZE = 0x1049,
    DEVICE_IMAGE_PITCH_ALIGNMENT = 0x104a,
    DEVICE_IMAGE_BASE_ADDRESS_ALIGNMENT = 0x104b,
    DEVICE_ADDRESS_32_BITS = 0x1,
    DEVICE_ADDRESS_64_BITS = 0x2,
    FP_DENORM = 0x1,
    FP_INF_NAN = 0x2,
    FP_ROUND_TO_NEAREST = 0x4,
    FP_ROUND_TO_ZERO = 0x8,
    FP_ROUND_TO_INF = 0x16,
    FP_FMA = 0x32,
    NONE = 0x0,
    READ_ONLY_CACHE = 0x1,
    READ_WRITE_CACHE = 0x2,
    LOCAL = 0x1,
    GLOBAL = 0x2,
    EXEC_KERNEL = 0x1,
    EXEC_NATIVE_KERNEL = 0x2,
    QUEUE_OUT_OF_ORDER_EXEC_MODE_ENABLE = 0x1,
    QUEUE_PROFILING_ENABLE = 0x2,
    CONTEXT_REFERENCE_COUNT = 0x1080,
    CONTEXT_NUM_DEVICES = 0x1081,
    CONTEXT_DEVICES = 0x1082,
    CONTEXT_PROPERTIES = 0x1083,
    CONTEXT_PLATFORM = 0x1084,
    QUEUE_CONTEXT = 0x1090,
    QUEUE_DEVICE = 0x1091,
    QUEUE_REFERENCE_COUNT = 0x1092,
    QUEUE_PROPERTIES = 0x1093,
    MEM_READ_WRITE = 0x1,
    MEM_WRITE_ONLY = 0x2,
    MEM_READ_ONLY = 0x4,
    MEM_USE_HOST_PTR = 0x8,
    MEM_ALLOC_HOST_PTR = 0x16,
    MEM_COPY_HOST_PTR = 0x32,
    R = 0x10b0,
    A = 0x10b1,
    RG = 0x10b2,
    RA = 0x10b3,
    RGB = 0x10b4,
    RGBA = 0x10b5,
    BGRA = 0x10b6,
    ARGB = 0x10b7,
    INTENSITY = 0x10b8,
    LUMINANCE = 0x10b9,
    SNORM_INT8 = 0x10d0,
    SNORM_INT16 = 0x10d1,
    UNORM_INT8 = 0x10d2,
    UNORM_INT16 = 0x10d3,
    UNORM_SHORT_565 = 0x10d4,
    UNORM_SHORT_555 = 0x10d5,
    UNORM_INT_101010 = 0x10d6,
    SIGNED_INT8 = 0x10d7,
    SIGNED_INT16 = 0x10d8,
    SIGNED_INT32 = 0x10d9,
    UNSIGNED_INT8 = 0x10da,
    UNSIGNED_INT16 = 0x10db,
    UNSIGNED_INT32 = 0x10dc,
    HALF_FLOAT = 0x10dd,
    FLOAT = 0x10de,
    MEM_OBJECT_BUFFER = 0x10f0,
    MEM_OBJECT_IMAGE2D = 0x10f1,
    MEM_OBJECT_IMAGE3D = 0x10f2,
    MEM_TYPE = 0x1100,
    MEM_FLAGS = 0x1101,
    MEM_SIZE = 0x1102,
    MEM_HOST_PTR = 0x1103,
    MEM_MAP_COUNT = 0x1104,
    MEM_REFERENCE_COUNT = 0x1105,
    MEM_CONTEXT = 0x1106,
    IMAGE_FORMAT = 0x1110,
    IMAGE_ELEMENT_SIZE = 0x1111,
    IMAGE_ROW_PITCH = 0x1112,
    IMAGE_SLICE_PITCH = 0x1113,
    IMAGE_WIDTH = 0x1114,
    IMAGE_HEIGHT = 0x1115,
    IMAGE_DEPTH = 0x1116,
    ADDRESS_NONE = 0x1130,
    ADDRESS_CLAMP_TO_EDGE = 0x1131,
    ADDRESS_CLAMP = 0x1132,
    ADDRESS_REPEAT = 0x1133,
    FILTER_NEAREST = 0x1140,
    FILTER_LINEAR = 0x1141,
    SAMPLER_REFERENCE_COUNT = 0x1150,
    SAMPLER_CONTEXT = 0x1151,
    SAMPLER_NORMALIZED_COORDS = 0x1152,
    SAMPLER_ADDRESSING_MODE = 0x1153,
    SAMPLER_FILTER_MODE = 0x1154,
    MAP_READ = 0x1,
    MAP_WRITE = 0x2,
    PROGRAM_REFERENCE_COUNT = 0x1160,
    PROGRAM_CONTEXT = 0x1161,
    PROGRAM_NUM_DEVICES = 0x1162,
    PROGRAM_DEVICES = 0x1163,
    PROGRAM_SOURCE = 0x1164,
    PROGRAM_BINARY_SIZES = 0x1165,
    PROGRAM_BINARIES = 0x1166,
    PROGRAM_BUILD_STATUS = 0x1181,
    PROGRAM_BUILD_OPTIONS = 0x1182,
    PROGRAM_BUILD_LOG = 0x1183,
    BUILD_SUCCESS = 0,
    BUILD_NONE = -1,
    BUILD_ERROR = -2,
    BUILD_IN_PROGRESS = -3,
    KERNEL_FUNCTION_NAME = 0x1190,
    KERNEL_NUM_ARGS = 0x1191,
    KERNEL_REFERENCE_COUNT = 0x1192,
    KERNEL_CONTEXT = 0x1193,
    KERNEL_PROGRAM = 0x1194,
    KERNEL_WORK_GROUP_SIZE = 0x11b0,
    KERNEL_COMPILE_WORK_GROUP_SIZE = 0x11b1,
    KERNEL_LOCAL_MEM_SIZE = 0x11b2,
    EVENT_COMMAND_QUEUE = 0x11d0,
    EVENT_COMMAND_TYPE = 0x11d1,
    EVENT_REFERENCE_COUNT = 0x11d2,
    EVENT_COMMAND_EXECUTION_STATUS = 0x11d3,
    COMMAND_NDRANGE_KERNEL = 0x11f0,
    COMMAND_TASK = 0x11f1,
    COMMAND_NATIVE_KERNEL = 0x11f2,
    COMMAND_READ_BUFFER = 0x11f3,
    COMMAND_WRITE_BUFFER = 0x11f4,
    COMMAND_COPY_BUFFER = 0x11f5,
    COMMAND_READ_IMAGE = 0x11f6,
    COMMAND_WRITE_IMAGE = 0x11f7,
    COMMAND_COPY_IMAGE = 0x11f8,
    COMMAND_COPY_IMAGE_TO_BUFFER = 0x11f9,
    COMMAND_COPY_BUFFER_TO_IMAGE = 0x11fa,
    COMMAND_MAP_BUFFER = 0x11fb,
    COMMAND_MAP_IMAGE = 0x11fc,
    COMMAND_UNMAP_MEM_OBJECT = 0x11fd,
    COMMAND_MARKER = 0x11fe,
    COMMAND_WAIT_FOR_EVENTS = 0x11ff,
    COMMAND_BARRIER = 0x1200,
    COMMAND_ACQUIRE_GL_OBJECTS = 0x1201,
    COMMAND_RELEASE_GL_OBJECTS = 0x1202,
    COMPLETE = 0x0,
    RUNNING = 0x1,
    SUBMITTED = 0x2,
    QUEUED = 0x3,
    PROFILING_COMMAND_QUEUED = 0x1280,
    PROFILING_COMMAND_SUBMIT = 0x1281,
    PROFILING_COMMAND_START = 0x1282,
    PROFILING_COMMAND_END = 0x1283,
}

export function WebCLConstantStr(value: number): string | undefined {
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

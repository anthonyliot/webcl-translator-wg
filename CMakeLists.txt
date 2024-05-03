CMAKE_MINIMUM_REQUIRED(VERSION 3.8.0 FATAL_ERROR)

# change version also in configure.ac
PROJECT(opencl LANGUAGES C CXX)
INCLUDE(CheckLanguage)

SET(CMAKE_CXX_EXTENSIONS ON)
SET(CMAKE_CXX_STANDARD 11)
SET(CMAKE_CXX_STANDARD_REQUIRED ON)

SET(CMAKE_C_EXTENSIONS ON)
SET(CMAKE_C_STANDARD 11)
SET(CMAKE_C_STANDARD_REQUIRED ON)

SET(CMAKE_POSITION_INDEPENDENT_CODE ON)

IF (NOT EMSCRIPTEN)
    OPTION(WITH_CL_WRAPPER
           "Use OpenCL Loader library instead to use system one" OFF)
ENDIF ()

IF (NOT WITH_CL_WRAPPER)
    # check support for OpenCL 1.2
    FIND_PACKAGE(OpenCL 1.2 EXACT REQUIRED QUIET)

    IF (OpenCL_FOUND)
        IF (EMSCRIPTEN)
            SET(OpenCL_INCLUDE_DIR ${OPENCL_INCLUDE_DIR})
            SET(OpenCL_LIBRARY ${OPENCL_LIBRARY})
        ELSE ()
            ADD_LIBRARY(opencl::opencl SHARED IMPORTED GLOBAL)
            SET_PROPERTY(TARGET opencl::opencl PROPERTY IMPORTED_LOCATION
                                                        ${OpenCL_LIBRARY})
            SET_PROPERTY(TARGET opencl::opencl PROPERTY IMPORTED_IMPLIB
                                                        ${OpenCL_LIBRARY})
            TARGET_INCLUDE_DIRECTORIES(opencl::opencl
                                       INTERFACE ${OpenCL_INCLUDE_DIR})
        ENDIF ()

        MESSAGE(
            STATUS
                "OpenCL Found: Include: ${OpenCL_INCLUDE_DIR} | Lib/Framework: ${OpenCL_LIBRARY}"
        )
    ELSE ()
        MESSAGE(STATUS "OpenCL Not found.")
    ENDIF ()
ELSE ()
    # use source code from
    # https://github.com/robertwgh/libOpenCL-loader/tree/master
    ADD_DEFINITIONS(-DUSE_CL_WRAPPER)

    FILE(GLOB OpenCL_SRC_FILES ${CMAKE_CURRENT_SOURCE_DIR}/src/loader/*)
    FILE(GLOB_RECURSE SRCS ${OpenCL_SRC_FILES})

    ADD_LIBRARY(opencl_opencl STATIC ${SRCS})
    TARGET_INCLUDE_DIRECTORIES(opencl_opencl
                               PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/src/loader/)

    ADD_LIBRARY(opencl::opencl ALIAS opencl_opencl)
ENDIF ()

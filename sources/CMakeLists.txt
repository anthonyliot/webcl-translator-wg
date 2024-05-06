FILE(
    GLOB folders
    RELATIVE ${CMAKE_CURRENT_SOURCE_DIR}
    ${CMAKE_CURRENT_SOURCE_DIR}/*)

SET(LIST_APP)
SET(LIST_CONFIG)

FOREACH (folder ${folders})
    IF (IS_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/${folder})
        SET(CURRENT_SOURCE_DIR ${CMAKE_CURRENT_SOURCE_DIR}/${folder})

        GET_FILENAME_COMPONENT(NAME "${CURRENT_SOURCE_DIR}" NAME)
        MESSAGE(STATUS "Samples ${NAME}")

        FILE(GLOB_RECURSE CL_KERNELS ${CURRENT_SOURCE_DIR}/*.cl)

        FOREACH (KERNEL ${CL_KERNELS})
            WEBCLTRANSLATOR_MAKE_INCLUDABLE(${KERNEL} ${KERNEL}.resources)
        ENDFOREACH ()

        IF (EMSCRIPTEN)
            # EMSCRIPTEN IS USING EXECUTABLE TO GENERATE JS FILE
            IF (EXISTS ${CURRENT_SOURCE_DIR}/${NAME}.cpp)
                ADD_EXECUTABLE(${NAME} ${CURRENT_SOURCE_DIR}/${NAME}.cpp)
                TARGET_INCLUDE_DIRECTORIES(${NAME}
                                           PRIVATE ${CURRENT_SOURCE_DIR}/)
                TARGET_INCLUDE_DIRECTORIES(${NAME}
                                           PRIVATE ${OpenCL_INCLUDE_DIR})
                INSTALL(FILES "$<TARGET_FILE_DIR:${NAME}>/${NAME}.js"
                              "$<TARGET_FILE_DIR:${NAME}>/${NAME}.wasm"
                        DESTINATION ${WEBCLTRANSLATOR_ROOT}/docs/dist)
            ENDIF ()

            IF (NOT "${index}" STREQUAL "${APPS_LENGTH}")
                SET(NEWLINE ,\n)
            ELSE ()
                SET(NEWLINE)
            ENDIF ()
            SET(LIST_APP "${LIST_APP}    \"${NAME}.js\"${NEWLINE}")
            SET(LIST_CONFIG
                "${LIST_CONFIG}    {\"title\": \"${TITLE}\", \"id\": ${index}, \"gl\": \"${GL}\"}${NEWLINE}"
            )
        ELSE ()
            IF (EXISTS ${CURRENT_SOURCE_DIR}/${NAME}.cpp)
                ENABLE_TESTING()
                ADD_LIBRARY(${NAME} ${CURRENT_SOURCE_DIR}/${NAME}.cpp)
                ADD_DEPENDENCIES(${NAME} cl::wrapper)

                # CREATE TEST EXECUTABLE
                IF (EXISTS ${CURRENT_SOURCE_DIR}/${NAME}.test.cpp)
                    ADD_EXECUTABLE(${NAME}_test)
                    TARGET_SOURCES(
                        ${NAME}_test
                        PRIVATE ${CURRENT_SOURCE_DIR}/${NAME}.test.cpp)
                    TARGET_LINK_LIBRARIES(
                        ${NAME}_test PRIVATE ${NAME} cl::wrapper gtest_main)
                    TARGET_INCLUDE_DIRECTORIES(
                        ${NAME}_test
                        PRIVATE ${WEBCLTRANSLATOR_ROOT}/externs/clwrapper)
                    GTEST_DISCOVER_TESTS(${NAME}_test)
                    ADD_TEST(${NAME}_test ${NAME}_test)
                ENDIF ()

                # CREATE BENCHMARK EXECUTABLE
                IF (EXISTS ${CURRENT_SOURCE_DIR}/${NAME}.benchmark.cpp)
                    ADD_EXECUTABLE(${NAME}_benchmark)
                    TARGET_SOURCES(
                        ${NAME}_benchmark
                        PRIVATE ${CURRENT_SOURCE_DIR}/${NAME}.benchmark.cpp)
                    TARGET_LINK_LIBRARIES(
                        ${NAME}_benchmark PRIVATE ${NAME} cl::wrapper pthread
                                                  benchmark::benchmark_main)
                    TARGET_INCLUDE_DIRECTORIES(
                        ${NAME}_benchmark
                        PRIVATE ${WEBCLTRANSLATOR_ROOT}/externs/clwrapper)
                    ADD_TEST(${NAME}_benchmark ${NAME}_benchmark)
                ENDIF ()
            ENDIF ()
        ENDIF ()
    ENDIF ()
ENDFOREACH ()

IF (EMSCRIPTEN)
    # Set the current date and time
    STRING(TIMESTAMP BUILD_TIME "%Y-%m-%d %H:%M:%S")

    # Replace @BUILD_TIME@ with the actual build time in the template file
    CONFIGURE_FILE(${WEBCLTRANSLATOR_ROOT}/docs/dist/buildtime.js.in
                   ${CMAKE_BINARY_DIR}/buildtime.js @ONLY)

    # Install the generated JavaScript file
    INSTALL(FILES ${CMAKE_BINARY_DIR}/buildtime.js
            DESTINATION ${WEBCLTRANSLATOR_ROOT}/docs/dist)

    FILE(
        WRITE ${WEBCLTRANSLATOR_ROOT}/docs/dist/samples.js
        "//
//  samples.js [AUTO GENERATED FILE]
//  Licence : https://github.com/anthony.liot/webcl-translator-wg/blob/master/LICENSE
//
//  Created by Anthony Liot.
//  Copyright (c) 2024 Anthony Liot. All rights reserved.
//

var samples_list = [
${LIST_APP}
]
")

    FILE(
        WRITE ${WEBCLTRANSLATOR_ROOT}/docs/dist/config.js
        "//
//  config.js [AUTO GENERATED FILE]
//  Licence : https://github.com/anthony.liot/webcl-translator-wg/blob/master/LICENSE
//
//  Created by Anthony Liot.
//  Copyright (c) 2024 Anthony Liot. All rights reserved.
//

var config_list = [
${LIST_CONFIG}
]
")
ENDIF ()

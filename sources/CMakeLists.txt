FILE(
    GLOB folders
    RELATIVE ${CMAKE_CURRENT_SOURCE_DIR}
    ${CMAKE_CURRENT_SOURCE_DIR}/*)

SET(SAMPLES)

FOREACH (folder ${folders})
    IF (IS_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/${folder})
        LIST(APPEND SAMPLES ${folder})
    ENDIF ()
ENDFOREACH ()

SET(LIST_APP)
SET(LIST_CONFIG)

LIST(LENGTH SAMPLES SAMPLES_LENGTH)
MATH(EXPR SAMPLES_LENGTH ${SAMPLES_LENGTH}-1)
MATH(EXPR SAMPLE_INDEX 0)

SET(USE_NATIVE_BINARY OFF)

FOREACH (index RANGE ${SAMPLES_LENGTH})
    LIST(GET SAMPLES ${index} folder)
    SET(CURRENT_SAMPLE_DIR ${CMAKE_CURRENT_SOURCE_DIR}/${folder})

    GET_FILENAME_COMPONENT(NAME "${CURRENT_SAMPLE_DIR}" NAME)
    MESSAGE(STATUS "Samples ${NAME}")

    FILE(GLOB_RECURSE CL_KERNELS ${CURRENT_SAMPLE_DIR}/*.cl)

    FOREACH (KERNEL ${CL_KERNELS})
        WEBCLTRANSLATOR_MAKE_INCLUDABLE(${KERNEL} ${KERNEL}.resources)
    ENDFOREACH ()

    IF (EMSCRIPTEN)
        IF (EXISTS ${CURRENT_SAMPLE_DIR}/${NAME}.json)
            FILE(READ ${CURRENT_SAMPLE_DIR}/${NAME}.json datajson)
            JSONPARSER(json datajson)

            IF (NOT ${SAMPLE_INDEX} EQUAL 0)
                SET(NEWLINE ,\n)
            ELSE ()
                SET(NEWLINE)
            ENDIF ()

            SET(LIST_APP "${LIST_APP}${NEWLINE}    \"${NAME}.js\"")
            SET(LIST_CONFIG
                "${LIST_CONFIG}${NEWLINE}    {\"title\": \"${json.title}\", \"gl\": \"${json.opengl}\"}"
            )

            MATH(EXPR SAMPLE_INDEX ${SAMPLE_INDEX}+1)
        ENDIF ()

        # EMSCRIPTEN IS USING EXECUTABLE TO GENERATE JS FILE
        IF (EXISTS ${CURRENT_SAMPLE_DIR}/${NAME}.cpp)
            ADD_EXECUTABLE(${NAME} ${CURRENT_SAMPLE_DIR}/${NAME}.cpp)
            SET_TARGET_PROPERTIES(
                ${NAME} PROPERTIES RUNTIME_OUTPUT_DIRECTORY
                                   ${CMAKE_CURRENT_BINARY_DIR}/${NAME})
            TARGET_INCLUDE_DIRECTORIES(${NAME} PRIVATE ${CURRENT_SAMPLE_DIR}/)
            TARGET_INCLUDE_DIRECTORIES(${NAME} PRIVATE ${OpenCL_INCLUDE_DIR})
            TARGET_INCLUDE_DIRECTORIES(
                ${NAME} PRIVATE ${WEBCLTRANSLATOR_ROOT}/externs/clwrapper/inc)
            TARGET_INCLUDE_DIRECTORIES(
                ${NAME}
                PRIVATE ${WEBCLTRANSLATOR_ROOT}/externs/clwrapper/externs/inc)
            TARGET_LINK_LIBRARIES(${NAME} PRIVATE cl::wrapper)
            ADD_DEPENDENCIES(${NAME} cl::wrapper)
            INSTALL(FILES "$<TARGET_FILE_DIR:${NAME}>/${NAME}.js"
                    DESTINATION ${WEBCLTRANSLATOR_ROOT}/docs/dist)
            INSTALL(FILES "$<TARGET_FILE_DIR:${NAME}>/${NAME}.wasm"
                    DESTINATION ${WEBCLTRANSLATOR_ROOT}/docs/dist)
        ENDIF ()
    ELSE ()
        IF (USE_NATIVE_BINARY)
            ADD_EXECUTABLE(${NAME} ${CURRENT_SAMPLE_DIR}/${NAME}.cpp)
            SET_TARGET_PROPERTIES(
                ${NAME} PROPERTIES RUNTIME_OUTPUT_DIRECTORY
                                   ${CMAKE_CURRENT_BINARY_DIR}/${NAME})
            TARGET_COMPILE_DEFINITIONS(${NAME} PRIVATE -DNATIVE_BINARY)
            TARGET_INCLUDE_DIRECTORIES(${NAME} PRIVATE ${CURRENT_SAMPLE_DIR}/)
            TARGET_INCLUDE_DIRECTORIES(${NAME} PRIVATE ${OpenCL_INCLUDE_DIR})
            TARGET_INCLUDE_DIRECTORIES(
                ${NAME} PRIVATE ${WEBCLTRANSLATOR_ROOT}/externs/clwrapper/inc)
            TARGET_INCLUDE_DIRECTORIES(
                ${NAME}
                PRIVATE ${WEBCLTRANSLATOR_ROOT}/externs/clwrapper/externs/inc)
            TARGET_LINK_LIBRARIES(${NAME} PRIVATE cl::wrapper)
            ADD_DEPENDENCIES(${NAME} cl::wrapper)
        ELSE ()
            IF (EXISTS ${CURRENT_SAMPLE_DIR}/${NAME}.cpp)
                ENABLE_TESTING()
                ADD_LIBRARY(${NAME} ${CURRENT_SAMPLE_DIR}/${NAME}.cpp)
                TARGET_COMPILE_DEFINITIONS(${NAME} PRIVATE -DDISABLE_PRINTF)
                TARGET_INCLUDE_DIRECTORIES(
                    ${NAME}
                    PRIVATE ${WEBCLTRANSLATOR_ROOT}/externs/clwrapper/inc)
                TARGET_INCLUDE_DIRECTORIES(
                    ${NAME}
                    PRIVATE
                        ${WEBCLTRANSLATOR_ROOT}/externs/clwrapper/externs/inc)
                ADD_DEPENDENCIES(${NAME} cl::wrapper)

                # CREATE TEST EXECUTABLE
                IF (EXISTS ${CURRENT_SAMPLE_DIR}/${NAME}.test.cpp)
                    ADD_EXECUTABLE(${NAME}_test)
                    TARGET_SOURCES(
                        ${NAME}_test
                        PRIVATE ${CURRENT_SAMPLE_DIR}/${NAME}.test.cpp)
                    TARGET_LINK_LIBRARIES(
                        ${NAME}_test PRIVATE ${NAME} cl::wrapper gtest_main)
                    GTEST_DISCOVER_TESTS(${NAME}_test)
                ENDIF ()

                # CREATE BENCHMARK EXECUTABLE
                IF (EXISTS ${CURRENT_SAMPLE_DIR}/${NAME}.benchmark.cpp)
                    ADD_EXECUTABLE(${NAME}_benchmark)
                    TARGET_SOURCES(
                        ${NAME}_benchmark
                        PRIVATE ${CURRENT_SAMPLE_DIR}/${NAME}.benchmark.cpp)
                    TARGET_LINK_LIBRARIES(
                        ${NAME}_benchmark PRIVATE ${NAME} cl::wrapper pthread
                                                  benchmark::benchmark_main)
                    #ADD_TEST(${NAME}_benchmark ${NAME}_benchmark)
                ENDIF ()
            ENDIF ()
        ENDIF ()
    ENDIF ()
ENDFOREACH ()

IF (EMSCRIPTEN)
    # Set the current date and time
    STRING(TIMESTAMP BUILD_TIME " %Y-%m-%d %H:%M:%S ")

    # Replace @BUILD_TIME@ with the actual build time in the template file
    CONFIGURE_FILE(${WEBCLTRANSLATOR_ROOT}/docs/dist/buildtime.js.in
                   ${CMAKE_BINARY_DIR}/buildtime.js @ONLY)

    # Install the generated JavaScript file
    INSTALL(FILES ${CMAKE_BINARY_DIR}/buildtime.js
            DESTINATION ${WEBCLTRANSLATOR_ROOT}/docs/dist)

    FILE(
        WRITE ${WEBCLTRANSLATOR_ROOT}/docs/dist/samples.js
        "//
// samples.js [AUTO GENERATED FILE]
// Licence : https://github.com/anthony.liot/webcl-translator-wg/blob/master/LICENSE
//
// Created by Anthony Liot.
// Copyright(c) 2024 Anthony Liot. All rights reserved.
//

var samples_list = [
${LIST_APP}
]
")

    FILE(
        WRITE ${WEBCLTRANSLATOR_ROOT}/docs/dist/config.js
        "//
// config.js [AUTO GENERATED FILE]
// Licence : https://github.com/anthony.liot/webcl-translator-wg/blob/master/LICENSE
//
// Created by Anthony Liot.
// Copyright(c) 2024 Anthony Liot. All rights reserved.
//

var config_list = [
${LIST_CONFIG}
]
")
ENDIF ()

UNSET(SAMPLES)
UNSET(SAMPLES_LENGTH)
UNSET(LIST_APP)
UNSET(LIST_CONFIG)

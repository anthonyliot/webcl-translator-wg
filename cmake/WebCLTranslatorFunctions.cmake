INCLUDE_GUARD(GLOBAL)

FUNCTION (WEBCLTRANSLATOR_GROUP_SOURCES)
    CMAKE_PARSE_ARGUMENTS(_ "" "" "SRCS;HDRS;" ${ARGN})

    FOREACH (FILE ${__SRCS};${__HDRS})
        # Get the directory of the source file
        GET_FILENAME_COMPONENT(PARENT_DIR "${FILE}" DIRECTORY)
        GET_FILENAME_COMPONENT(FWE "${FILE}" NAME_WE)

        # Remove common directory prefix to make the group
        STRING(REPLACE "${CMAKE_CURRENT_SOURCE_DIR}/" "" GROUP "${PARENT_DIR}")

        # Remove the firsts folder
        STRING(REPLACE "src" "" GROUP "${GROUP}")
        STRING(REPLACE "inc" "" GROUP "${GROUP}")

        # Make sure we are using windows slashes
        STRING(REPLACE "/" "\\" GROUP "${GROUP}")

        # Group into "Source Files" and "Header Files"
        IF ("${FILE}" MATCHES ".*\\.cpp")
            SET(GROUP "Sources${GROUP}")
        ELSEIF ("${FILE}" MATCHES ".*\\.h")
            SET(GROUP "Headers${GROUP}")
            STRING(REPLACE "\\" "/" HDR "${GROUP}")
            STRING(REPLACE "Headers" "" GR "${GROUP}")
        ENDIF ()

        SOURCE_GROUP("${GROUP}" FILES "${FILE}")
    ENDFOREACH ()
ENDFUNCTION ()

FUNCTION (WEBCLTRANSLATOR_NUMBER_TO_HEX)
    CMAKE_PARSE_ARGUMENTS(_ "" "" "NUMBER;OUTPUT_VARIABLE" ${ARGN})

    SET(chars "0123456789abcdef")
    SET(hex "")

    FOREACH (i RANGE 7)
        MATH(EXPR nibble "${__NUMBER} & 15")
        STRING(SUBSTRING "${chars}" "${nibble}" 1 nibble_hex)
        STRING(APPEND hex "${nibble_hex}")
        MATH(EXPR __NUMBER "${__NUMBER} >> 4")
    ENDFOREACH ()

    STRING(REGEX REPLACE "(.)(.)" "\\2\\1" hex "${hex}")
    SET("${__OUTPUT_VARIABLE}"
        "${hex}"
        PARENT_SCOPE)
ENDFUNCTION ()

FUNCTION (WEBCLTRANSLATOR_DICT command dict)
    IF ("${command}" STREQUAL "SET")
        SET(arg_key ${ARGV2})
        SET(arg_value ${ARGV3})

        WEBCLTRANSLATOR_DICT(_IDX ${dict} "${arg_key}" idx)

        IF (NOT idx STREQUAL -1)
            LIST(REMOVE_AT ${dict} ${idx})
        ENDIF ()

        LIST(APPEND ${dict} "${arg_key}=${arg_value}")
        SET(${dict}
            "${${dict}}"
            PARENT_SCOPE)

    ELSEIF ("${command}" STREQUAL "GET")
        SET(arg_key ${ARGV2})
        SET(arg_outvar ${ARGV3})

        WEBCLTRANSLATOR_DICT(_IDX ${dict} "${arg_key}" idx)

        IF (idx STREQUAL -1)
            MESSAGE(FATAL_ERROR "No key \"${arg_key}\" in dictionary")
        ENDIF ()

        LIST(GET ${dict} ${idx} kv)
        STRING(REGEX REPLACE "^[^=]+=(.*)" "\\1" value "${kv}")
        SET(${arg_outvar}
            "${value}"
            PARENT_SCOPE)

    ELSEIF ("${command}" STREQUAL "_IDX")
        SET(arg_key ${ARGV2})
        SET(arg_outvar ${ARGV3})
        SET(idx 0)

        FOREACH (kv IN LISTS ${dict})
            STRING(REGEX REPLACE "^([^=]+)=.*" "\\1" key "${kv}")

            IF (arg_key STREQUAL key)
                SET(${arg_outvar}
                    "${idx}"
                    PARENT_SCOPE)
                RETURN()
            ENDIF ()

            MATH(EXPR idx ${idx}+1)
        ENDFOREACH ()

        SET(${arg_outvar}
            "-1"
            PARENT_SCOPE)

    ELSEIF ("${command}" STREQUAL "PRETTY_PRINT")
        MESSAGE("{")

        FOREACH (kv IN LISTS ${dict})
            STRING(REGEX REPLACE "^([^=]+)=.*" "\\1" key "${kv}")
            STRING(REGEX REPLACE "^[^=]+=(.*)" "\\1" value "${kv}")
            MESSAGE("    ${key}: ${value}")
        ENDFOREACH ()

        MESSAGE("}")
    ELSEIF ("${command}" STREQUAL "LENGTH")
        SET(arg_outvar ${ARGV2})
        LIST(LENGTH ${dict} value)
        SET(${arg_outvar}
            ${value}
            PARENT_SCOPE)
    ELSE ()
        MESSAGE(FATAL_ERROR "dict does not recognize sub-command ${command}")
    ENDIF ()
ENDFUNCTION ()

FUNCTION (WEBCLTRANSLATOR_MAKE_INCLUDABLE input_file output_file)
    FILE(READ ${input_file} content)
    SET(delim "for_c++_include")
    SET(content "R\"${delim}(\n${content})${delim}\"")
    FILE(WRITE ${output_file} "${content}")
ENDFUNCTION ()

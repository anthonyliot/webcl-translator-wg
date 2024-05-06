INCLUDE_GUARD()

MACRO (JsonParser prefix jsonString)
    CMAKE_POLICY(PUSH)

    SET(json_string "${${jsonString}}")
    STRING(LENGTH "${json_string}" json_jsonLen)
    SET(json_index 0)
    SET(json_AllVariables ${prefix})
    SET(json_ArrayNestingLevel 0)
    SET(json_MaxArrayNestingLevel 0)

    _PARSE(${prefix})

    UNSET(json_index)
    UNSET(json_AllVariables)
    UNSET(json_jsonLen)
    UNSET(json_string)
    UNSET(json_value)
    UNSET(json_inValue)
    UNSET(json_name)
    UNSET(json_inName)
    UNSET(json_newPrefix)
    UNSET(json_reservedWord)
    UNSET(json_arrayIndex)
    UNSET(json_char)
    UNSET(json_end)
    UNSET(json_ArrayNestingLevel)
    FOREACH (json_nestingLevel RANGE ${json_MaxArrayNestingLevel})
        UNSET(json_${json_nestingLevel}_arrayIndex)
    ENDFOREACH ()
    UNSET(json_nestingLevel)
    UNSET(json_MaxArrayNestingLevel)

    CMAKE_POLICY(POP)
ENDMACRO ()

MACRO (JsonClear prefix)
    FOREACH (json_var ${${prefix}})
        UNSET(${json_var})
    ENDFOREACH ()

    UNSET(${prefix})
    UNSET(json_var)
ENDMACRO ()

MACRO (JsonPrint prefix)
    FOREACH (json_var ${${prefix}})
        MESSAGE("${json_var} = ${${json_var}}")
    ENDFOREACH ()
ENDMACRO ()

MACRO (_Parse prefix)

    WHILE (${json_index} LESS ${json_jsonLen})
        STRING(SUBSTRING "${json_string}" ${json_index} 1 json_char)

        IF ("\"" STREQUAL "${json_char}")
            _PARSENAMEVALUE(${prefix})
        ELSEIF ("{" STREQUAL "${json_char}")
            _MOVETONEXTNONEMPTYCHARACTER()
            _PARSEOBJECT(${prefix})
        ELSEIF ("[" STREQUAL "${json_char}")
            _MOVETONEXTNONEMPTYCHARACTER()
            _PARSEARRAY(${prefix})
        ENDIF ()

        IF (${json_index} LESS ${json_jsonLen})
            STRING(SUBSTRING "${json_string}" ${json_index} 1 json_char)
        ELSE ()
            BREAK()
        ENDIF ()

        IF ("}" STREQUAL "${json_char}" OR "]" STREQUAL "${json_char}")
            BREAK()
        ENDIF ()

        _MOVETONEXTNONEMPTYCHARACTER()
    ENDWHILE ()
ENDMACRO ()

MACRO (_ParseNameValue prefix)
    SET(json_name "")
    SET(json_inName no)

    WHILE (${json_index} LESS ${json_jsonLen})
        STRING(SUBSTRING "${json_string}" ${json_index} 1 json_char)

        # check if name ends
        IF ("\"" STREQUAL "${json_char}" AND json_inName)
            SET(json_inName no)
            _MOVETONEXTNONEMPTYCHARACTER()
            IF (NOT ${json_index} LESS ${json_jsonLen})
                BREAK()
            ENDIF ()
            STRING(SUBSTRING "${json_string}" ${json_index} 1 json_char)
            SET(json_newPrefix ${prefix}.${json_name})
            SET(json_name "")

            IF (":" STREQUAL "${json_char}")
                _MOVETONEXTNONEMPTYCHARACTER()
                IF (NOT ${json_index} LESS ${json_jsonLen})
                    BREAK()
                ENDIF ()
                STRING(SUBSTRING "${json_string}" ${json_index} 1 json_char)

                IF ("\"" STREQUAL "${json_char}")
                    _PARSEVALUE(${json_newPrefix})
                    BREAK()
                ELSEIF ("{" STREQUAL "${json_char}")
                    _MOVETONEXTNONEMPTYCHARACTER()
                    _PARSEOBJECT(${json_newPrefix})
                    BREAK()
                ELSEIF ("[" STREQUAL "${json_char}")
                    _MOVETONEXTNONEMPTYCHARACTER()
                    _PARSEARRAY(${json_newPrefix})
                    BREAK()
                ELSE ()
                    # reserved word starts
                    _PARSERESERVEDWORD(${json_newPrefix})
                    BREAK()
                ENDIF ()
            ELSE ()
                # name without value
                LIST(APPEND ${json_AllVariables} ${json_newPrefix})
                SET(${json_newPrefix} "")
                BREAK()
            ENDIF ()
        ENDIF ()

        IF (json_inName)
            # remove escapes
            IF ("\\" STREQUAL "${json_char}")
                MATH(EXPR json_index "${json_index} + 1")
                IF (NOT ${json_index} LESS ${json_jsonLen})
                    BREAK()
                ENDIF ()
                STRING(SUBSTRING "${json_string}" ${json_index} 1 json_char)
            ENDIF ()

            SET(json_name "${json_name}${json_char}")
        ENDIF ()

        # check if name starts
        IF ("\"" STREQUAL "${json_char}" AND NOT json_inName)
            SET(json_inName yes)
        ENDIF ()

        _MOVETONEXTNONEMPTYCHARACTER()
    ENDWHILE ()
ENDMACRO ()

MACRO (_ParseReservedWord prefix)
    SET(json_reservedWord "")
    SET(json_end no)
    WHILE (${json_index} LESS ${json_jsonLen} AND NOT json_end)
        STRING(SUBSTRING "${json_string}" ${json_index} 1 json_char)

        IF ("," STREQUAL "${json_char}"
            OR "}" STREQUAL "${json_char}"
            OR "]" STREQUAL "${json_char}")
            SET(json_end yes)
        ELSE ()
            SET(json_reservedWord "${json_reservedWord}${json_char}")
            MATH(EXPR json_index "${json_index} + 1")
        ENDIF ()
    ENDWHILE ()

    LIST(APPEND ${json_AllVariables} ${prefix})
    STRING(STRIP "${json_reservedWord}" json_reservedWord)
    SET(${prefix} ${json_reservedWord})
ENDMACRO ()

MACRO (_ParseValue prefix)
    CMAKE_POLICY(SET CMP0054 NEW) # turn off implicit expansions in if statement

    SET(json_value "")
    SET(json_inValue no)

    WHILE (${json_index} LESS ${json_jsonLen})
        # fast path for copying strings
        IF (json_inValue)
            # attempt to gobble up to 128 bytes of string
            STRING(SUBSTRING "${json_string}" ${json_index} 128 try_gobble)
            # consume a piece of string we can just straight copy before encountering \ or "
            STRING(REGEX MATCH "^[^\"\\\\]+" simple_copy "${try_gobble}")
            STRING(CONCAT json_value "${json_value}" "${simple_copy}")
            STRING(LENGTH "${simple_copy}" copy_length)
            MATH(EXPR json_index "${json_index} + ${copy_length}")
        ENDIF ()

        STRING(SUBSTRING "${json_string}" ${json_index} 1 json_char)

        # check if json_value ends, it is ended by "
        IF ("\"" STREQUAL "${json_char}" AND json_inValue)
            SET(json_inValue no)

            SET(${prefix} ${json_value})
            LIST(APPEND ${json_AllVariables} ${prefix})
            _MOVETONEXTNONEMPTYCHARACTER()
            BREAK()
        ENDIF ()

        IF (json_inValue)
            # if " is escaped consume
            IF ("\\" STREQUAL "${json_char}")
                MATH(EXPR json_index "${json_index} + 1")
                IF (NOT ${json_index} LESS ${json_jsonLen})
                    BREAK()
                ENDIF ()
                STRING(SUBSTRING "${json_string}" ${json_index} 1 json_char)
                IF (NOT "\"" STREQUAL "${json_char}")
                    # if it is not " then copy also escape character
                    SET(json_char "\\${json_char}")
                ENDIF ()
            ENDIF ()

            _ADDESCAPEDCHARACTER("${json_char}")
        ENDIF ()

        # check if value starts
        IF ("\"" STREQUAL "${json_char}" AND NOT json_inValue)
            SET(json_inValue yes)
        ENDIF ()

        MATH(EXPR json_index "${json_index} + 1")
    ENDWHILE ()
ENDMACRO ()

MACRO (_AddEscapedCharacter char)
    STRING(CONCAT json_value "${json_value}" "${char}")
ENDMACRO ()

MACRO (_ParseObject prefix)
    _PARSE(${prefix})
    _MOVETONEXTNONEMPTYCHARACTER()
ENDMACRO ()

MACRO (_ParseArray prefix)
    MATH(EXPR json_ArrayNestingLevel "${json_ArrayNestingLevel} + 1")
    SET(json_${json_ArrayNestingLevel}_arrayIndex 0)

    SET(${prefix} "")
    LIST(APPEND ${json_AllVariables} ${prefix})

    WHILE (${json_index} LESS ${json_jsonLen})
        STRING(SUBSTRING "${json_string}" ${json_index} 1 json_char)

        IF ("\"" STREQUAL "${json_char}")
            # simple value
            LIST(APPEND ${prefix} ${json_${json_ArrayNestingLevel}_arrayIndex})
            _PARSEVALUE(${prefix}_${json_${json_ArrayNestingLevel}_arrayIndex})
        ELSEIF ("{" STREQUAL "${json_char}")
            # object
            _MOVETONEXTNONEMPTYCHARACTER()
            LIST(APPEND ${prefix} ${json_${json_ArrayNestingLevel}_arrayIndex})
            _PARSEOBJECT(${prefix}_${json_${json_ArrayNestingLevel}_arrayIndex})
        ELSE ()
            LIST(APPEND ${prefix} ${json_${json_ArrayNestingLevel}_arrayIndex})
            _PARSERESERVEDWORD(
                ${prefix}_${json_${json_ArrayNestingLevel}_arrayIndex})
        ENDIF ()

        IF (NOT ${json_index} LESS ${json_jsonLen})
            BREAK()
        ENDIF ()

        STRING(SUBSTRING "${json_string}" ${json_index} 1 json_char)

        IF ("]" STREQUAL "${json_char}")
            _MOVETONEXTNONEMPTYCHARACTER()
            BREAK()
        ELSEIF ("," STREQUAL "${json_char}")
            MATH(EXPR json_${json_ArrayNestingLevel}_arrayIndex
                 "${json_${json_ArrayNestingLevel}_arrayIndex} + 1")
        ENDIF ()

        _MOVETONEXTNONEMPTYCHARACTER()
    ENDWHILE ()

    IF (${json_MaxArrayNestingLevel} LESS ${json_ArrayNestingLevel})
        SET(json_MaxArrayNestingLevel ${json_ArrayNestingLevel})
    ENDIF ()
    MATH(EXPR json_ArrayNestingLevel "${json_ArrayNestingLevel} - 1")
ENDMACRO ()

MACRO (_MoveToNextNonEmptyCharacter)
    MATH(EXPR json_index "${json_index} + 1")
    IF (${json_index} LESS ${json_jsonLen})
        STRING(SUBSTRING "${json_string}" ${json_index} 1 json_char)
        WHILE (${json_char} MATCHES "[ \t\n\r]" AND ${json_index} LESS
                                                    ${json_jsonLen})
            MATH(EXPR json_index "${json_index} + 1")
            STRING(SUBSTRING "${json_string}" ${json_index} 1 json_char)
        ENDWHILE ()
    ENDIF ()
ENDMACRO ()

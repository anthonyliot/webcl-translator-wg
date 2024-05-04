INCLUDE(FetchContent)

FETCHCONTENT_DECLARE(
    googletest
    GIT_REPOSITORY https://github.com/google/googletest.git
    GIT_TAG origin/main)

FETCHCONTENT_MAKEAVAILABLE(googletest)

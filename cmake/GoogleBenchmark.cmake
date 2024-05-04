# Disable the Google Benchmark requirement on Google Test
SET(BENCHMARK_ENABLE_TESTING NO)

INCLUDE(FetchContent)

FETCHCONTENT_DECLARE(
    googlebenchmark
    GIT_REPOSITORY https://github.com/google/benchmark.git
    GIT_TAG origin/main)

FETCHCONTENT_MAKEAVAILABLE(googlebenchmark)

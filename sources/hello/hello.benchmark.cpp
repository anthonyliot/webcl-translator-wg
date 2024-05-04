#include "hello.h"
#include <benchmark/benchmark.h>

static void BM_hello(benchmark::State &state)
{
    for (auto _ : state)
    {
        std::vector<int> foo;
        benchmark::DoNotOptimize(foo = hello());
        benchmark::ClobberMemory();
    }
}

BENCHMARK(BM_hello);

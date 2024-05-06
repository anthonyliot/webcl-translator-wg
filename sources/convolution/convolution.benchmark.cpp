#include "convolution.h"
#include <benchmark/benchmark.h>

static void BM_convolution(benchmark::State &state)
{
    for (auto _ : state)
    {
        std::vector<int> foo;
        benchmark::DoNotOptimize(foo = convolution());
        benchmark::ClobberMemory();
    }
}

BENCHMARK(BM_convolution);

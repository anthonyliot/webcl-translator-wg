#include "matrixmul.h"
#include <benchmark/benchmark.h>

static void BM_mm1_cpu(benchmark::State &state)
{
    for (auto _ : state)
    {
        std::vector<float> foo;
        benchmark::DoNotOptimize(foo = mm1_cpu(state.range(0), state.range(0)));
        benchmark::ClobberMemory();
    }
}

static void BM_mm1_gpu(benchmark::State &state)
{
    for (auto _ : state)
    {
        std::vector<float> foo;
        benchmark::DoNotOptimize(foo = mm1_gpu(state.range(0), state.range(0)));
        benchmark::ClobberMemory();
    }
}

static void BM_mm2_gpu(benchmark::State &state)
{
    for (auto _ : state)
    {
        std::vector<float> foo;
        benchmark::DoNotOptimize(foo = mm2_gpu(state.range(0), state.range(0)));
        benchmark::ClobberMemory();
    }
}

BENCHMARK(BM_mm1_cpu)->Arg(1024)->Arg(2048)->Arg(4096)->Arg(8192)->Iterations(1000);
BENCHMARK(BM_mm1_gpu)->Arg(1024)->Arg(2048)->Arg(4096)->Arg(8192)->Iterations(1000);
BENCHMARK(BM_mm2_gpu)->Arg(1024)->Arg(2048)->Arg(4096)->Arg(8192)->Iterations(1000);

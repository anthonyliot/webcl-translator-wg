#include "hello.h"
#include <benchmark/benchmark.h>

static void BM_hello_cpu(benchmark::State &state)
{
    for (auto _ : state)
    {
        std::vector<float> foo;
        benchmark::DoNotOptimize(foo = hello_cpu(state.range(0)));
        benchmark::ClobberMemory();
    }
}

static void BM_hello_gpu(benchmark::State &state)
{
    for (auto _ : state)
    {
        std::vector<float> foo;
        benchmark::DoNotOptimize(foo = hello_gpu(state.range(0)));
        benchmark::ClobberMemory();
    }
}

BENCHMARK(BM_hello_cpu)->Arg(1024)->Arg(2048)->Arg(4096)->Arg(8192)->Iterations(1000);
BENCHMARK(BM_hello_gpu)->Arg(1024)->Arg(2048)->Arg(4096)->Arg(8192)->Iterations(1000);

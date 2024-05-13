#include "matrixmul.h"
#include <gtest/gtest.h>

TEST(mm1_cpu, cpu)
{
    const std::vector<float> ret = mm1_cpu(MM_COL_SIZE, MM_ROW_SIZE);
}

TEST(mm1_gpu, gpu)
{
    const std::vector<float> ret = mm1_gpu(MM_COL_SIZE, MM_ROW_SIZE);
}

TEST(mm2_gpu, gpu)
{
    const std::vector<float> ret = mm2_gpu(MM_COL_SIZE, MM_ROW_SIZE);
}

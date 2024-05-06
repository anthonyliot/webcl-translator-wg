#include "hello.h"
#include <gtest/gtest.h>

TEST(hello_cpu, cpu)
{
    std::vector<float> expected(DATA_SIZE);
    for (int i = 0; i < DATA_SIZE; i++)
        expected[i] = (i + 1.0f) * (i + 1.0f);

    const std::vector<float> ret = hello_cpu(DATA_SIZE);
    ASSERT_EQ(expected.size(), ret.size()) << "Vectors x and y are of unequal length";
    for (int idx = 0; idx < DATA_SIZE; idx++)
    {
        SCOPED_TRACE(idx); // write to the console in which iteration the error occurred
        ASSERT_EQ(expected[idx], ret[idx]) << "Vectors x and y differ at index " << idx;
    }
}

TEST(hello_gpu, gpu)
{
    std::vector<float> expected(DATA_SIZE);
    for (int i = 0; i < DATA_SIZE; i++)
        expected[i] = (i + 1.0f) * (i + 1.0f);

    const std::vector<float> ret = hello_gpu(DATA_SIZE);
    ASSERT_EQ(expected.size(), ret.size()) << "Vectors x and y are of unequal length";
    for (int idx = 0; idx < DATA_SIZE; idx++)
    {
        SCOPED_TRACE(idx); // write to the console in which iteration the error occurred
        ASSERT_EQ(expected[idx], ret[idx]) << "Vectors x and y differ at index " << idx;
    }
}

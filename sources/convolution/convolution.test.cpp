#include "convolution.h"
#include <gtest/gtest.h>

TEST(convolution, CorrectSize)
{
    const std::vector<int> ret = convolution();
    EXPECT_EQ(ret.size(), 1);
}

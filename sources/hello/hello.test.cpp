#include "hello.h"
#include <gtest/gtest.h>

TEST(hello, CorrectSize)
{
    const std::vector<int> ret = hello();
    EXPECT_EQ(ret.size(), 1);
}

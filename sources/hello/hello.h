#pragma once

#include <vector>

#define DATA_SIZE (16384)

extern std::vector<float> hello_cpu(unsigned int count);

extern std::vector<float> hello_gpu(unsigned int count);

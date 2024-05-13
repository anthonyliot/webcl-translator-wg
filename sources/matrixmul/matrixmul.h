#pragma once

#include <vector>

#define TS 16

#define MM_ROW_SIZE 4096
#define MM_COL_SIZE 4096

extern std::vector<float> mm1_cpu(unsigned int col, unsigned int row);

extern std::vector<float> mm1_gpu(unsigned int col, unsigned int row);

extern std::vector<float> mm2_gpu(unsigned int col, unsigned int row);

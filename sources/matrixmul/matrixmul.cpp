#include "matrixmul.h"
#include <chrono>

#include <clext.h>
#include <clwrapper.h>

#ifdef __EMSCRIPTEN__
#include <CL/opencl.h>
#endif

#ifdef DISABLE_PRINTF
#define PRINTF(...)
#else
#define PRINTF(...) printf(__VA_ARGS__)
#endif

#ifndef __EMSCRIPTEN__
#ifndef CL_SET_TYPE_POINTER
#define CL_SET_TYPE_POINTER(x)
#endif
#endif

constexpr char MM1_KERNEL[] =
#include "mm1.cl.resources"
    ;

constexpr char MM2_KERNEL[] =
#include "mm2.cl.resources"
    ;

std::vector<float> mm1_cpu(unsigned int col, unsigned int row)
{
    PRINTF("CPU Matrix Mul: (%dx%d)\n", col, row);

    // C = A * B
    // A[M, K], B[K, N], C[M, N]
    int M = row; // MATRIX A ROWS
    int K = col; // MATRIX A COLS AND MATRIX B ROWS
    int N = col; // MATRIX B COLS

    // DATA ARE STORED ROW MAJOR / LEXICOGRAPHY
    std::vector<float> A(M * K);
    std::vector<float> B(K * N);
    std::vector<float> C(M * N);

    // Initialize the matrix A
    float counter = 0.0f;
    for (int m = 0; m < M; m++)
    {
        for (int k = 0; k < K; k++)
        {
            A[m * M + k] = counter++;
        }
    }

    for (int k = 0; k < K; k++)
    {
        for (int n = 0; n < N; n++)
        {
            B[k * K + n] = --counter;
        }
    }

    // Matrices in column-major format
    // A: K columns, M rows
    // B: N columns, K rows
    // C: N columns, M rows
    //
    //                   N
    //                o-----o
    //                |     |
    //              K | [B] |
    //                |     |
    //                o-----o
    //        K          N
    //    o-------o   o-----o
    //  M |  [A]  | M | [C] |
    //    |       |   |     |
    //    o-------o   o-----o
    auto start = std::chrono::high_resolution_clock::now();

    for (int m = 0; m < M; m++)
    {
        for (int n = 0; n < N; n++)
        {
            float acc = 0.0f;
            for (int k = 0; k < K; k++)
            {
                acc += A[m * K + k] * B[k * N + n];
            }
            C[m * N + n] = acc;
        }
    }
    // NAIVE IMPLEMENTATION
    auto end = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);

    // Calculate GFLOPS
    double total_flops = 2 * static_cast<double>(col) * col * row; // 2 FLOPs per element
    double gflops = total_flops / (duration.count());

    PRINTF("Time taken %lld ns - %f ms | GFLOPS:  %lf\n", duration.count(), duration.count() / 1000000.0f, gflops);

    // PRINTF("MATRIX A\n");
    // for (int m = 0; m < M; m++)
    // {
    //     for (int k = 0; k < K; k++)
    //     {
    //         PRINTF("%f ", A[m * K + k]);
    //     }
    //     PRINTF("\n");
    // }
    // PRINTF("\n");
    // PRINTF("MATRIX B\n");
    // for (int k = 0; k < K; k++)
    // {
    //     for (int n = 0; n < N; n++)
    //     {
    //         PRINTF("%f ", B[k * N + n]);
    //     }
    //     PRINTF("\n");
    // }
    // PRINTF("\n");
    // PRINTF("MATRIX A * B\n");
    // for (int m = 0; m < M; m++)
    // {
    //     for (int n = 0; n < N; n++)
    //     {
    //         PRINTF("%f ", C[m * N + n]);
    //     }
    //     PRINTF("\n");
    // }
    // PRINTF("\n");

    return C;
}

std::vector<float> mm1_gpu(unsigned int col, unsigned int row)
{
    CLExt::init();
    PRINTF("GPU Matrix Mul 1: (%dx%d)\n", col, row);
    // PRINTF("\tName: %s\n", CLExt::getName());
    // PRINTF("\tVendor: %s\n", CLExt::getVendor());
    // PRINTF("\tVersion: %s\n", CLExt::getVersion());
    // PRINTF("\tExtensions: %s\n", CLExt::getExtensions());

    cl_platform_id platform = CLExt::getPlatform();
    cl_device_id device = CLExt::getDevice();
    cl_context context = CLExt::getContext();
    cl_command_queue commands = CLExt::getQueue();

    // C = A * B
    // A[M, K], B[K, N], C[M, N]
    int M = row; // MATRIX A ROWS
    int K = col; // MATRIX A COLS AND MATRIX B ROWS
    int N = col; // MATRIX B COLS

    // DATA ARE STORED ROW MAJOR / LEXICOGRAPHY
    std::vector<float> A(M * K);
    std::vector<float> B(K * N);
    std::vector<float> C(M * N);

    // Initialize the matrix A
    float counter = 0.0f;
    for (int m = 0; m < M; m++)
    {
        for (int k = 0; k < K; k++)
        {
            A[m * M + k] = counter++;
        }
    }

    for (int k = 0; k < K; k++)
    {
        for (int n = 0; n < N; n++)
        {
            B[k * K + n] = --counter;
        }
    }

    char *kernel_src_std;
    kernel_src_std = (char *)malloc(strlen(MM1_KERNEL) + 1);
    memcpy(kernel_src_std, MM1_KERNEL, strlen(MM1_KERNEL));

    auto start = std::chrono::high_resolution_clock::now();

    // Create Buffers
    cl_int err;
    cl_mem bufferA =
        clCreateBuffer(context, CL_MEM_READ_ONLY | CL_MEM_COPY_HOST_PTR, sizeof(float) * M * K, A.data(), &err);
    cl_mem bufferB =
        clCreateBuffer(context, CL_MEM_READ_ONLY | CL_MEM_COPY_HOST_PTR, sizeof(float) * K * N, B.data(), &err);
    cl_mem bufferC = clCreateBuffer(context, CL_MEM_WRITE_ONLY, sizeof(float) * M * N, NULL, &err);

    cl_program program = clCreateProgramWithSource(context, 1, (const char **)&kernel_src_std, NULL, &err);
    clBuildProgram(program, 1, &device, NULL, NULL, NULL);

    cl_kernel kernel = clCreateKernel(program, "mm1", &err);
    clSetKernelArg(kernel, 0, sizeof(int), (void *)&M);
    clSetKernelArg(kernel, 1, sizeof(int), (void *)&N);
    clSetKernelArg(kernel, 2, sizeof(int), (void *)&K);
    clSetKernelArg(kernel, 3, sizeof(cl_mem), (void *)&bufferA);
    clSetKernelArg(kernel, 4, sizeof(cl_mem), (void *)&bufferB);
    clSetKernelArg(kernel, 5, sizeof(cl_mem), (void *)&bufferC);

    const int TSX = TS;
    const int TSY = TS;
    const size_t local[2] = {static_cast<size_t>(TSX), static_cast<size_t>(TSY)};
    const size_t global[2] = {static_cast<size_t>(M), static_cast<size_t>(N)};
    clEnqueueNDRangeKernel(commands, kernel, 2, NULL, global, local, 0, NULL, NULL);
    clFinish(commands);
    clEnqueueReadBuffer(commands, bufferC, CL_TRUE, 0, sizeof(float) * M * N, C.data(), 0, NULL, NULL);

    auto end = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);

    // Calculate GFLOPS
    double total_flops = 2 * static_cast<double>(col) * col * row; // 2 FLOPs per element
    double gflops = total_flops / (duration.count());

    PRINTF("Time taken %lld ns - %f ms | GFLOPS:  %lf\n", duration.count(), duration.count() / 1000000.0f, gflops);

    clReleaseMemObject(bufferA);
    clReleaseMemObject(bufferB);
    clReleaseMemObject(bufferC);
    clReleaseProgram(program);
    clReleaseKernel(kernel);

    CLExt::shutdown();

    PRINTF("MATRIX A\n");
    for (int m = 0; m < std::min(M, 4); m++)
    {
        for (int k = 0; k < std::min(K, 4); k++)
        {
            PRINTF("%f ", A[m * K + k]);
        }
        PRINTF("\n");
    }
    PRINTF("\n");
    PRINTF("MATRIX B\n");
    for (int k = 0; k < std::min(K, 4); k++)
    {
        for (int n = 0; n < std::min(N, 4); n++)
        {
            PRINTF("%f ", B[k * N + n]);
        }
        PRINTF("\n");
    }
    PRINTF("\n");
    PRINTF("MATRIX A * B\n");
    for (int m = 0; m < std::min(M, 4); m++)
    {
        for (int n = 0; n < std::min(N, 4); n++)
        {
            PRINTF("%f ", C[m * N + n]);
        }
        PRINTF("\n");
    }
    PRINTF("\n");

    return C;
}

std::vector<float> mm2_gpu(unsigned int col, unsigned int row)
{
    CLExt::init();
    PRINTF("GPU Matrix Mul 2: (%dx%d)\n", col, row);
    // PRINTF("\tName: %s\n", CLExt::getName());
    // PRINTF("\tVendor: %s\n", CLExt::getVendor());
    // PRINTF("\tVersion: %s\n", CLExt::getVersion());
    // PRINTF("\tExtensions: %s\n", CLExt::getExtensions());

    cl_platform_id platform = CLExt::getPlatform();
    cl_device_id device = CLExt::getDevice();
    cl_context context = CLExt::getContext();
    cl_command_queue commands = CLExt::getQueue();

    // C = A * B
    // A[M, K], B[K, N], C[M, N]
    int M = row; // MATRIX A ROWS
    int K = col; // MATRIX A COLS AND MATRIX B ROWS
    int N = col; // MATRIX B COLS

    // DATA ARE STORED ROW MAJOR / LEXICOGRAPHY
    std::vector<float> A(M * K);
    std::vector<float> B(K * N);
    std::vector<float> C(M * N);

    // Initialize the matrix A
    float counter = 0.0f;
    for (int m = 0; m < M; m++)
    {
        for (int k = 0; k < K; k++)
        {
            A[m * M + k] = counter++;
        }
    }

    for (int k = 0; k < K; k++)
    {
        for (int n = 0; n < N; n++)
        {
            B[k * K + n] = --counter;
        }
    }

    char *kernel_src_std;
    kernel_src_std = (char *)malloc(strlen(MM2_KERNEL) + 1);
    memcpy(kernel_src_std, MM2_KERNEL, strlen(MM2_KERNEL));

    auto start = std::chrono::high_resolution_clock::now();

    // Create Buffers
    cl_int err;
    cl_mem bufferA =
        clCreateBuffer(context, CL_MEM_READ_ONLY | CL_MEM_COPY_HOST_PTR, sizeof(float) * M * K, A.data(), &err);
    cl_mem bufferB =
        clCreateBuffer(context, CL_MEM_READ_ONLY | CL_MEM_COPY_HOST_PTR, sizeof(float) * K * N, B.data(), &err);
    cl_mem bufferC = clCreateBuffer(context, CL_MEM_WRITE_ONLY, sizeof(float) * M * N, NULL, &err);

    cl_program program = clCreateProgramWithSource(context, 1, (const char **)&kernel_src_std, NULL, &err);
    clBuildProgram(program, 1, &device, NULL, NULL, NULL);

    cl_kernel kernel = clCreateKernel(program, "mm2", &err);
    clSetKernelArg(kernel, 0, sizeof(int), (void *)&M);
    clSetKernelArg(kernel, 1, sizeof(int), (void *)&N);
    clSetKernelArg(kernel, 2, sizeof(int), (void *)&K);
    clSetKernelArg(kernel, 3, sizeof(cl_mem), (void *)&bufferA);
    clSetKernelArg(kernel, 4, sizeof(cl_mem), (void *)&bufferB);
    clSetKernelArg(kernel, 5, sizeof(cl_mem), (void *)&bufferC);

    const int TSX = TS;
    const int TSY = TS;
    const size_t local[2] = {static_cast<size_t>(TSX), static_cast<size_t>(TSY)};
    const size_t global[2] = {static_cast<size_t>(M), static_cast<size_t>(N)};
    clEnqueueNDRangeKernel(commands, kernel, 2, NULL, global, local, 0, NULL, NULL);
    clFinish(commands);
    clEnqueueReadBuffer(commands, bufferC, CL_TRUE, 0, sizeof(float) * M * N, C.data(), 0, NULL, NULL);

    auto end = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);

    // Calculate GFLOPS
    double total_flops = 2 * static_cast<double>(col) * col * row; // 2 FLOPs per element
    double gflops = total_flops / (duration.count());

    PRINTF("Time taken %lld ns - %f ms | GFLOPS:  %lf\n", duration.count(), duration.count() / 1000000.0f, gflops);

    clReleaseMemObject(bufferA);
    clReleaseMemObject(bufferB);
    clReleaseMemObject(bufferC);
    clReleaseProgram(program);
    clReleaseKernel(kernel);

    CLExt::shutdown();

    PRINTF("MATRIX A\n");
    for (int m = 0; m < std::min(M, 4); m++)
    {
        for (int k = 0; k < std::min(K, 4); k++)
        {
            PRINTF("%f ", A[m * K + k]);
        }
        PRINTF("\n");
    }
    PRINTF("\n");
    PRINTF("MATRIX B\n");
    for (int k = 0; k < std::min(K, 4); k++)
    {
        for (int n = 0; n < std::min(N, 4); n++)
        {
            PRINTF("%f ", B[k * N + n]);
        }
        PRINTF("\n");
    }
    PRINTF("\n");
    PRINTF("MATRIX A * B\n");
    for (int m = 0; m < std::min(M, 4); m++)
    {
        for (int n = 0; n < std::min(N, 4); n++)
        {
            PRINTF("%f ", C[m * N + n]);
        }
        PRINTF("\n");
    }
    PRINTF("\n");

    return C;
}

#if defined(EMSCRIPTEN) || defined(NATIVE_BINARY)
int main(int argc, char *argv[])
{

    // ----------------------------------------------------------------

    std::vector<float> res;
    // res = mm_cpu(MM_COL_SIZE, MM_ROW_SIZE);

    // ----------------------------------------------------------------

    res = mm1_gpu(MM_COL_SIZE, MM_ROW_SIZE);
    res = mm2_gpu(MM_COL_SIZE, MM_ROW_SIZE);
    return EXIT_SUCCESS;
}
#endif

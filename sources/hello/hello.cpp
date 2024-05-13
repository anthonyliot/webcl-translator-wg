#include "hello.h"
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

////////////////////////////////////////////////////////////////////////////////
// Simple compute kernel which computes the square of an input array
//
const char *KernelSource = "\n"
                           "__kernel void square(                                                  \n"
                           "   __global float* input,                                              \n"
                           "   __global float* output,                                             \n"
                           "   const unsigned int count)                                           \n"
                           "{                                                                      \n"
                           "   int i = get_global_id(0);                                           \n"
                           "   if(i < count) {                                                     \n"
                           "       output[i] = input[i] * input[i];                                \n"
                           "   }                                                                   \n"
                           "}                                                                      \n"
                           "__kernel void cubic(                                                   \n"
                           "   __global float* input,                                              \n"
                           "   __global float* output,                                             \n"
                           "   const unsigned int count)                                           \n"
                           "{                                                                      \n"
                           "   int i = get_global_id(0);                                           \n"
                           "   if(i < count) {                                                     \n"
                           "       output[i] = input[i] * input[i] * input[i];                     \n"
                           "   }                                                                   \n"
                           "}                                                                      \n"
                           "\n";

void check_cl_error(cl_int err_num, char *msg)
{
    if (err_num != CL_SUCCESS)
    {
        PRINTF("[Error] OpenCL error code: %d in %s \n", err_num, msg);
        exit(EXIT_FAILURE);
    }
}

std::vector<float> hello_cpu(unsigned int count)
{
    PRINTF("CPU Hello: (%d)\n", count);
    auto start = std::chrono::high_resolution_clock::now();

    std::vector<float> input(count);
    std::vector<float> output(count);

    int i = 0;
    for (; i < count; i++)
        input[i] = i + 1.0f;

    i = 0;
    while (i < count)
    {
        if (i < count)
        {
            output[i] = input[i] * input[i];
        }
        i++;
    }
    auto end = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
    PRINTF("Time taken %lld ns - %f ms\n", duration.count(), duration.count() / 1000000.0f);
    return output;
}

std::vector<float> hello_gpu(unsigned int count)
{
    CLExt::init();
    PRINTF("GPU Hello: (%d)\n", count);
    PRINTF("\tName: %s\n", CLExt::getName());
    PRINTF("\tVendor: %s\n", CLExt::getVendor());
    PRINTF("\tVersion: %s\n", CLExt::getVersion());
    PRINTF("\tExtensions: %s\n", CLExt::getExtensions());

    cl_platform_id platform = CLExt::getPlatform();
    cl_device_id device = CLExt::getDevice();
    cl_context context = CLExt::getContext();
    cl_command_queue commands = CLExt::getQueue();

    auto start = std::chrono::high_resolution_clock::now();

    std::vector<float> input(count);
    std::vector<float> output(count);

    for (int i = 0; i < count; i++)
        input[i] = i + 1.0f;

    cl_program program = clCreateProgramWithSource(context, 1, (const char **)&KernelSource, NULL, NULL);
    clBuildProgram(program, 0, NULL, NULL, NULL, NULL);

    cl_kernel kernel = clCreateKernel(program, "square", NULL);

    CL_SET_TYPE_POINTER(CL_FLOAT);
    cl_mem clinput = clCreateBuffer(context, CL_MEM_READ_ONLY, sizeof(float) * count, NULL, NULL);

    CL_SET_TYPE_POINTER(CL_FLOAT);
    cl_mem cloutput = clCreateBuffer(context, CL_MEM_WRITE_ONLY, sizeof(float) * count, NULL, NULL);

    CL_SET_TYPE_POINTER(CL_FLOAT);
    clEnqueueWriteBuffer(commands, clinput, CL_TRUE, 0, sizeof(float) * count, input.data(), 0, NULL, NULL);

    clSetKernelArg(kernel, 0, sizeof(cl_mem), &clinput);
    clSetKernelArg(kernel, 1, sizeof(cl_mem), &cloutput);
    clSetKernelArg(kernel, 2, sizeof(unsigned int), &count);

    size_t local;
    size_t global = count;
    clGetKernelWorkGroupInfo(kernel, device, CL_KERNEL_WORK_GROUP_SIZE, sizeof(local), &local, NULL);
    clEnqueueNDRangeKernel(commands, kernel, 1, NULL, &global, &local, 0, NULL, NULL);
    clFinish(commands);

    CL_SET_TYPE_POINTER(CL_FLOAT);
    clEnqueueReadBuffer(commands, cloutput, CL_TRUE, 0, sizeof(float) * count, output.data(), 0, NULL, NULL);

    auto end = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
    PRINTF("Time taken %lld ns - %f ms\n", duration.count(), duration.count() / 1000000.0f);

    clReleaseMemObject(clinput);
    clReleaseMemObject(cloutput);
    clReleaseProgram(program);
    clReleaseKernel(kernel);

    CLExt::shutdown();
    return output;
}

#if defined(EMSCRIPTEN) || defined(NATIVE_BINARY)
int main(int argc, char *argv[])
{
    std::vector<float> expected(DATA_SIZE);
    for (int i = 0; i < DATA_SIZE; i++)
        expected[i] = (i + 1.0f) * (i + 1.0f);

    // ----------------------------------------------------------------

    std::vector<float> res;
    res = hello_cpu(DATA_SIZE);
    int correct = 0;
    for (int i = 0; i < DATA_SIZE; i++)
    {
        if (res[i] == expected[i] && res[i] != 0)
            correct++;
    }
    PRINTF("CPU Computed '%d/%d' correct values!\n", correct, DATA_SIZE);

    // ----------------------------------------------------------------

    res = hello_gpu(DATA_SIZE);
    correct = 0;
    for (int i = 0; i < DATA_SIZE; i++)
    {
        if (res[i] == expected[i] && res[i] != 0)
            correct++;
    }
    PRINTF("GPU Computed '%d/%d' correct values!\n", correct, DATA_SIZE);

    return EXIT_SUCCESS;
}
#endif

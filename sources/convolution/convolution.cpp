#include "convolution.h"

#include <fcntl.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>
#include <vector>

std::vector<int> convolution(void)
{
    int fd = open("/dev/urandom", O_RDONLY);
    if (fd < 0)
        throw "failed to open file";
    int v = 0;
    read(fd, &v, 1);
    close(fd);
    std::vector<int> ret{v};
    return ret;
}

#if defined(EMSCRIPTEN) || defined(NATIVE_BINARY)
int main(int argc, char *argv[])
{
    convolution();
    return EXIT_SUCCESS;
}
#endif

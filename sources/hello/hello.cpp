#include "hello.h"

#include <fcntl.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>
#include <vector>

std::vector<int> hello(void)
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

#include "bitarray.h"
#include <ostream>

int main() {
    // BitArray<> b{"1010101"};
    BitArray<> b{"100011111100000"};
    BitArray<> b2{"10101111"};
    std::cout << (b<b2) << std::endl;
    // b += true;
    // std::cout << b.to_string() << std::endl;
    // for (int i=0; i < 32; ++i)
    //     std::cout << b[i];
    // b.toggle(5);
    std::cout << b.to_string() << std::endl;
    b >>= 2;
    // b = "101010111";
    std::cout << b.to_string() << std::endl;
    std::cout << (b >> 2) << std::endl;
    b.insert(1, b2);
    std::cout << b << std::endl;
    return 0;
}
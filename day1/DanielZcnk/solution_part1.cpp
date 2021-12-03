#include <iostream>
#include <vector>

size_t count_increasing_measurements(const std::vector<int> &measurments) {
    size_t counter = 0;
    for (size_t i = 1; i < measurments.size(); ++i) {
        if (measurments[i] > measurments[i - 1])
            counter++;
    }
    return counter;
}

int main()
{
    std::vector<int> input;
    for (int elem; std::cin >> elem;) input.push_back(elem);
    std::cout << count_increasing_measurements(input) << std::endl;
    
    return 0;
}
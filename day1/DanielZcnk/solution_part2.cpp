#include <iostream>
#include <vector>

size_t count_increasing_measurements_sliding_window(const std::vector<int> &measurments, size_t window_size) {
    size_t counter = 0;
    for(size_t i = window_size; i < measurments.size(); ++i) {
        if (measurments[i] > measurments[i - window_size]) 
            counter++;
    }
    return counter;
}

int main()
{
    std::vector<int> input;
    for(int elem; std::cin >> elem;) input.push_back(elem);
    std::cout << count_increasing_measurements_sliding_window(input, 3) << std::endl;
    
    return 0;
}
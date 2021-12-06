from pathlib import Path
from numpy import fromfile

file_name = 'input.txt'
file_path = Path(__file__).with_name(file_name)

measuremens = fromfile(file_path, sep='\n')
num_of_measuremens = len(measuremens)


def num_depth_window_measurement_inc(window_size: int):
    count_inc = 0
    for i in range(num_of_measuremens-window_size):
        if measuremens[i] < measuremens[i+window_size]:
            count_inc += 1
    return count_inc


if __name__ == "__main__":
    print(num_depth_window_measurement_inc(window_size=1))

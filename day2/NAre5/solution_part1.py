from pathlib import Path
from pandas import read_csv


file_name = 'input.txt'
file_path = Path(__file__).with_name(file_name)

commands = read_csv(file_path, delim_whitespace=True, header=None).to_numpy()

num_of_commands = len(commands)

if __name__ == "__main__":
    def sum_commands():
        horizontal_position, depth = 0, 0
        for command_name, command_value in commands:
            if command_name == 'down':
                depth += command_value
            elif command_name == 'up':
                depth -= command_value
            elif command_name == 'forward':
                horizontal_position += command_value

        return horizontal_position, depth

    horizontal_position, depth = sum_commands()
    print(horizontal_position * depth)

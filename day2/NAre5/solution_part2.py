from solution_part1 import *


def sum_commands_with_aim():
    horizontal_position, depth, aim = 0, 0, 0

    for command_name, command_value in commands:

        if command_name == 'down':
            aim += command_value
        elif command_name == 'up':
            aim -= command_value
        elif command_name == 'forward':
            horizontal_position += command_value
            depth += aim * command_value

    return horizontal_position, depth


horizontal_position, depth = sum_commands_with_aim()
print(horizontal_position * depth)

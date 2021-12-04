from solution_part1 import *


winned_boards = []

for round_number, draw_number in enumerate(draw_numbers):
    for board_index, bingo_board in enumerate(bingo_boards):
        if bingo_board not in winned_boards:
            win = bingo_board.update_board(draw_number)
            if win:
                winned_boards.append(bingo_board)
                if len(winned_boards) == len(bingo_boards):
                    print(
                        f'at last... with the number {draw_number}...\n\
                        bingo_board number {board_index+1} wins after {round_number} rounds with score {bingo_board.get_score()}!'
                    )
                    # print(bingo_board.get_print_board())
                    break

    if len(winned_boards) == len(bingo_boards):
        break

import numpy as np
from typing import List
from pathlib import Path
from pandas import DataFrame


file_name = 'input.txt'
file_path = Path(__file__).with_name(file_name)

board_size = 5


class BingoBoard:
    def __init__(self, board: np.ndarray) -> None:
        self.board = board
        self.rows = np.zeros(board_size)
        self.columns = np.zeros(board_size)
        self.bingod_numbers = []
        self.cells = {}
        self.win = False

        for row in range(board_size):
            for column in range(board_size):
                self.cells[board[row][column]] = [row, column]

    def update_board(self, round_number: np.int_) -> bool:
        cell = self.cells.get(round_number)
        if cell is not None:
            row, column = cell

            self.rows[row] = self.rows[row] + 1
            self.columns[column] = self.columns[column] + 1

            self.bingod_numbers.append(round_number)

            if self.rows[row] == board_size:
                self.win = True

            if self.columns[column] == board_size:
                self.win = True

        return self.win

    def get_score(self):
        return sum([key for key in self.cells.keys() if key not in self.bingod_numbers]) * self.bingod_numbers[-1]

    def print_board(self):
        def sign(x):
            return f'({x})' if x in self.bingod_numbers else f'{x}'
        print(DataFrame(np.vectorize(sign, otypes=[str])(self.board)))


bingo_boards: List[BingoBoard] = []

with open(file_path, 'r') as input_file:
    draw_numbers: np.ndarray = np.fromstring(
        next(input_file), dtype=int, sep=',')

    while input_file.readline() != '':

        board: np.ndarray = np.array([np.fromstring(next(input_file), dtype=int, sep=' ')
                                      for x in range(board_size)])
        bingo_boards.append(BingoBoard(board))


if __name__ == "__main__":
    win = False

    for round_number, draw_number in enumerate(draw_numbers):
        for board_index, bingo_board in enumerate(bingo_boards):
            win = bingo_board.update_board(draw_number)
            if win:
                print(
                    f'bingo_board number {board_index+1} wins after {round_number} rounds with score {bingo_board.get_score()}!'
                )
                # bingo_board.print_board()
                break

        if win:
            break

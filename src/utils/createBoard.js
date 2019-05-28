/*
CREATES A BOARD FILLED WITH DEAD CELLS
*/
export const createEmptyBoard = (dimensionX, dimensionY) => {
  const boardRow = new Array(dimensionX).fill(false);
  return new Array(dimensionY).fill(boardRow);
};

/*
CREATE A BOARD WITH DEAD OR ALIVE CELLS BASED ON PROBABILITY
*/
export const createBoardWithRandomness = (
  dimensionX,
  dimensionY,
  probability
) => {
  const boardRow = new Array(dimensionX).fill();
  return new Array(dimensionY).fill(boardRow).map(boardRow => {
    return boardRow.map(() => Math.random() < probability);
  });
};

/*
GIVEN THE CURRENT GAME STATE, COMPUTES THE NEXT GAME STATE
RULES:
Any live cell with fewer than two live neighbours dies (referred to as underpopulation or exposure).
Any live cell with more than three live neighbours dies (referred to as overpopulation or overcrowding).
Any live cell with two or three live neighbours lives, unchanged, to the next generation.
Any dead cell with exactly three live neighbours will come to life.
*/
export const computeNextGeneration = board => {
  const getAliveNeighboursCount = (row, column) => {
    let aliveNeighbours = 0;
    for (let rowIndex = -1; rowIndex <= 1; rowIndex++) {
      for (let columnIndex = -1; columnIndex <= 1; columnIndex++) {
        if (
          row + rowIndex < 0 ||
          row + rowIndex > board.length - 1 ||
          column + columnIndex < 0 ||
          column + columnIndex > board[0].length - 1 ||
          (rowIndex === 0 && columnIndex === 0)
        )
          continue;
        const neighbour = board[row + rowIndex][column + columnIndex];
        if (neighbour) aliveNeighbours++;
      }
    }
    return aliveNeighbours;
  };

  let newBoard = JSON.parse(JSON.stringify(board));
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board[0].length; column++) {
      const aliveNeighbours = getAliveNeighboursCount(row, column);
      //if the cell is ALIVE, handle rules 1-3
      if (board[row][column]) {
        if (aliveNeighbours < 2 || aliveNeighbours > 3) {
            newBoard[row][column] = false; //underpopulation or overpopulation
        }
      } else {
        //if the cell is DEAD, handle rule 4
        if (aliveNeighbours === 3) {
            newBoard[row][column] = true;
        }
      }
    }
  }

  return newBoard;
};

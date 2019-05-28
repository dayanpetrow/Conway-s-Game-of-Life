import React from "react";
import styled from "styled-components";

const ALIVE_CELL = "#2068db";
const DEAD_CELL = "#d2d7dd";
const CELL_BORDER = "#a8afb7";

const StyledBoard = styled.table`
  margin: 20px;
  overflow: auto;
  width: 100%;
  td {
    width: ${props => props.cellSize}px;
    height: ${props => props.cellSize}px;
    border: 1px solid ${CELL_BORDER};
    &.alive {
      background-color: ${ALIVE_CELL};
    }
    &.dead {
      background-color: ${DEAD_CELL};
    }
  }
`;

const StyledBoardWrapper = styled.div``

const Board = ({ board, toggleBoardCell, cellSize }) => (
  <StyledBoardWrapper>
    <StyledBoard cellSize={cellSize}>
      <tbody>
        {board.map((boardRow, indexRow) => (
          <tr key={indexRow}>
            {boardRow.map((cell, indexColumn) => (
              <td
                className={cell ? "alive" : "dead"}
                key={indexColumn}
                onClick={() => toggleBoardCell(indexRow, indexColumn)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </StyledBoard>
  </StyledBoardWrapper>
);

export default Board;

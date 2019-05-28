import React from "react";
import { Button, Icon, Divider } from "antd";
import {
  createEmptyBoard,
  createBoardWithRandomness,
  computeNextGeneration
} from "./utils/createBoard";
import Board from "./components/Board";
import OptionsModal from "./components/OptionsModal";
import BoardWrapper from './components/styledBoardWrapper';
import Controllers from './components/Controllers';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: "initial",
      initialProbability: 0.3,
      gridX: 50,
      gridY: 50,
      cellSize: 12,
      generations: 0,
      board: [],
      intervalID: "",
      speed: 50,
      boardSetupIsDone: false
    };
  }

  /* CREATE EMPTY BOARD */
  componentDidMount() {
    this.setState({
      board: createBoardWithRandomness(50, 50, this.state.probability)
    });
  }

  /* SINGLE STEP */
  nextGeneration = () => {
    this.setState(prevState => ({
      board: computeNextGeneration(prevState.board),
      generations: prevState.generations + 1
    }));
  };

  /* AUTOPLAY */
  startGame = () => {
    if (this.state.intervalID !== "") return;
    this.setState(() => ({ gameState: "isPlaying" }));
    let intervalID = setInterval(this.nextGeneration, this.state.speed);
    this.setState({ intervalID });
  };

  /* PAUSE/STOP */
  stopGame = () => {
    clearInterval(this.state.intervalID);
    this.setState(() => ({ intervalID: "", gameState: "isActive" }));
  };

  //clicking on a cell will toggle its value (true => false, false => true)
  toggleBoardCell = (row, column) => {
    if(this.state.gameState !== "isPlaying") {
      console.log(this.state);
      let clonedBoard = JSON.parse(JSON.stringify(this.state.board));
      clonedBoard[row][column] = !clonedBoard[row][column];
      this.setState({ board: clonedBoard });
    }
  };

  /* MODAL SETTERS */
  onProbabilityChange = value => {
    this.setState({ initialProbability: parseFloat(value) });
  };

  onCellSizeChange = value => {
    this.setState({ cellSize: parseInt(value) });
  };

  onGridXChange = value => {
    this.setState({ gridX: parseInt(value) });
  };

  onGridYChange = value => {
    this.setState({ gridY: parseInt(value) });
  };

  onOptionsSubmit = () => {
    this.setState({
      board: createBoardWithRandomness(
        this.state.gridX,
        this.state.gridY,
        this.state.initialProbability
      ),
      gameState: "isActive",
      boardSetupIsDone: true
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.gameState === "initial" && (
          <OptionsModal
            onProbabilityChange={this.onProbabilityChange}
            initialProbability={this.state.initialProbability}
            onCellSizeChange={this.onCellSizeChange}
            cellSize={this.state.cellSize}
            onGridYChange={this.onGridYChange}
            gridX={this.state.gridX}
            onGridXChange={this.onGridXChange}
            gridY={this.state.gridY}
            onOptionsSubmit={this.onOptionsSubmit}
            visible={this.state.gameState === "initial"}
          />
        )}
        <BoardWrapper boardSetupIsDone={this.state.boardSetupIsDone}>
          <div className="GameGenerations">{this.state.generations}</div>
          <Board
            board={this.state.board}
            toggleBoardCell={this.toggleBoardCell}
            cellSize={this.state.cellSize}
            boardSetupIsDone={this.state.boardSetupIsDone}
          />
          <Divider />
          <Controllers 
            startGame={this.startGame}
            gameState={this.state.gameState}
            stopGame={this.stopGame}
            nextGeneration={this.nextGeneration}
          />
        </BoardWrapper>
      </div>
    );
  }
}

export default App;

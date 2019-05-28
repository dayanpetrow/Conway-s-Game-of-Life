import React from "react";
import { Button, Icon } from "antd";
import styled from 'styled-components';

const ControllersWrapper = styled.div`
    width: 100%;
    text-align: center;
`

export default ({
    startGame,
    gameState,
    stopGame,
    nextGeneration
}) => (
  <ControllersWrapper>
    <Button.Group>
      <Button
        type="primary"
        onClick={startGame}
        disabled={gameState === "isPlaying"}
      >
        <Icon type="play-circle" />
        Autoplay
      </Button>
      <Button
        type="primary"
        onClick={stopGame}
        disabled={gameState !== "isPlaying"}
      >
        <Icon type="pause-circle" />
        Stop
      </Button>
      <Button
        type="primary"
        onClick={nextGeneration}
        disabled={gameState === "isPlaying"}
      >
        Next Generation
        <Icon type="step-forward" />
      </Button>
    </Button.Group>
  </ControllersWrapper>
);

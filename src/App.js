import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Line } from 'react-konva';
import Rectangle from './view/Rectangle';
import './App.css';

function App() {
  const [lines, setLines] = useState([]);
  const [pos, setPos] = useState([]);

  const registerMovement = (x, y) => {
    setPos([{ ...pos[0], curx: x, cury: y }]);
  };
  const handleMouseDown = (e) => {
    if (pos.length === 0) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setPos([
        {
          startx: x,
          starty: y,
          curx: x,
          cury: y,
        },
      ]);
    }
  };

  const handleMouseUp = (e) => {
    if (pos.length === 1) {
      const { x, y } = e.target.getStage().getPointerPosition();
      registerMovement(x, y);
      setLines([...lines, pos[0]]);
      setPos([]);
    }
  };

  const handleMouseMove = (e) => {
    if (pos.length === 1) {
      const { x, y } = e.target.getStage().getPointerPosition();
      registerMovement(x, y);
    }
  };

  const drawLine = (line) => {
    const points = [line.startx, line.starty, line.curx, line.cury];
    return (
      <Line
        points={points}
        fill='#40E0D0'
        stroke='#40E0D0'
        strokeWidth={3}
        lineCap='round'
        fillPatternRotation={3}
        dash={[3, 6]}
      />
    );
  };
  const linesToRender = [...lines, ...pos];
  return (
    <div className='App'>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          <Rectangle onClick={(e) => drawLine(e)} xPos={100} />
          <Rectangle onClick={(e) => drawLine(e)} xPos={950} />
          {linesToRender.length > 0 &&
            linesToRender.map((line) => {
              return drawLine(line);
            })}
        </Layer>
      </Stage>
    </div>
  );
}

export default App;

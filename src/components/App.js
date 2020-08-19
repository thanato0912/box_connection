import React, { useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import Rectangle from './view/Rectangle';
import './App.css';

function App() {
  const [line, setLine] = useState([]);
  const [newLine, setNewLine] = useState([]);
  const [lineID, setLineID] = useState('');

  const registerMovement = (x, y) => {
    setNewLine([{ ...newLine[0], curx: x, cury: y }]);
  };

  const handleClick = (x, y, id) => {
    if (newLine.length === 1) {
      const length = id.length;
      if (lineID.substring(0, length - 1) === id.substring(0, length - 1)) {
        setLineID('');
        setNewLine([]);
      } else {
        registerMovement(x, y);
        setLine([...newLine]);
        setLineID('');
        setNewLine([]);
      }
    }

    //not drawing, create line to draw
    else if (newLine.length === 0) {
      setLineID(id);
      setNewLine([
        {
          startx: x,
          starty: y,
          fixstartx: x,
          fixstarty: y,
          curx: x,
          cury: y,
        },
      ]);
    }
  };

  const handleMouseMove = (e) => {
    if (newLine.length === 1) {
      const { x, y } = e.target.getStage().getPointerPosition();
      registerMovement(x, y);
    }
  };

  const handleDragMove = (e, x, y, newx, newy) => {
    if (x === -1000) return;
    if (line.length === 1) {
      if (line[0].fixstartx === x && line[0].fixstarty === y)
        setLine([{ ...line[0], startx: newx, starty: newy }]);
      else setLine([{ ...line[0], curx: newx, cury: newy }]);
    }
  };

  const drawLine = (line, i) => {
    const points = [line.startx, line.starty, line.curx, line.cury];
    return (
      <Line
        key={i}
        points={points}
        fill='#A9A9A9'
        stroke='#A9A9A9'
        strokeWidth={3}
        lineCap='round'
        fillPatternRotation={3}
      />
    );
  };

  const drawDottedLine = (line, i) => {
    const points = [line.startx, line.starty, line.curx, line.cury];
    return (
      <Line
        key={i}
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

  return (
    <div className='App'>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          {line.length > 0 &&
            line.map((line, i) => {
              return drawLine(line, i);
            })}
          {newLine.length > 0 &&
            newLine.map((line, i) => {
              return drawDottedLine(line, i);
            })}
          <Rectangle
            lineID={lineID}
            handleClick={handleClick}
            handleMouseMove={handleMouseMove}
            handleDragMove={handleDragMove}
            xPos={100}
            yPos={100}
          />
          <Rectangle
            lineID={lineID}
            handleClick={handleClick}
            handleMouseMove={handleMouseMove}
            handleDragMove={handleDragMove}
            xPos={950}
            yPos={100}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;

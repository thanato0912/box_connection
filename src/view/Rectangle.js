import React, {useState} from 'react'
import { Rect, Group } from 'react-konva';
import Connector from './Connector';


export default function Rectangle(props) {
  const [state, setState] = useState({
    x: props.xPos,
    y: 100,
    rectColor: '#A9A9A9',
    circleColor: '#A9A9A9',
  });

  
  return (
    <Group draggable>
      <Rect
        x={state.x}
        y={state.y}
        width={300}
        height={350}
        fill={state.rectColor}
        shadowBlur={1}
        cornerRadius={13}
      />
      <Connector
        x={state.x + 20}
        y={state.y + 20}
        fill={state.circleColor}
      />
      <Connector
        x={state.x + 280}
        y={state.y + 20}
        fill={state.circleColor}
      />
    </Group>
  );
}


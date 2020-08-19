import React, {useState, useEffect} from 'react'
import { Rect, Group } from 'react-konva';
import Connector from './Connector';


export default function Rectangle(props) {
  const [state, setState] = useState({
    id: Math.random().toString(36).substring(7),
    x: props.xPos,
    y: props.yPos,
    leftCircle: {
      x: props.xPos + 20,
      y: props.yPos + 20,
    },
    rightCircle: {
      x: props.xPos + 280,
      y: props.yPos + 20,
    },
    linex: -1000,
    liney: -1000,
    rectColor: '#A9A9A9',
    circleColor: '#A9A9A9',
  });

  const [circle, setCircle] = useState('');
  const [lineID, setLineID] = useState('');
  
  //Updating the line end
  useEffect(() => {
    setLineID(props.lineID);
  },[props.lineID])

  const updateLinePoint = (circle, id) => {
    const length = id.length;
    //Throw message if end points of the line are within the same shape
    if(lineID.substring(0, length-1) === id.substring(0, length-1)) {
      alert('Cannot connect same rectangle!');
      return;
    }
    //Indicating the button is from the left circle
    if (circle === 'left') {
      setState({
        ...state,
        linex: state.leftCircle.x,
        liney: state.leftCircle.y,
      });
      setCircle('left');
      props.handleClick(state.leftCircle.x, state.leftCircle.y, id);
    }
    //Indicating the button is from the left circle
    else {
      setState({
        ...state,
        linex: state.rightCircle.x,
        liney: state.rightCircle.y,
      });
      setCircle('right');
      props.handleClick(state.rightCircle.x, state.rightCircle.y, id);
    }
    
  }

  const handleDragMove = (e) => {
    setState({
      ...state,
      leftCircle: {
        x: props.xPos + 20 + e.target.x(),
        y: props.yPos + 20 + e.target.y(),
      },
      rightCircle: {
        x: props.xPos + 280 + e.target.x(),
        y: props.yPos + 20 + e.target.y(),
      },
    });
    if(circle === 'left') {
      props.handleDragMove(e, state.linex, state.liney, state.leftCircle.x, state.leftCircle.y); 
    }
    else if(circle === 'right') {
      props.handleDragMove(
        e,
        state.linex,
        state.liney,
        state.rightCircle.x,
        state.rightCircle.y
      );
    }
      
  }
  
  return (
    <Group draggable onDragMove={handleDragMove}>
      <Rect
        x={props.xPos}
        y={props.yPos}
        width={300}
        height={350}
        fill={state.rectColor}
        shadowBlur={1}
        cornerRadius={13}
      />
      <Connector
        id={state.id + '1'}
        x={props.xPos + 20}
        y={props.yPos + 20}
        circleColor={state.circleColor}
        handleClick={props.handleClick}
        handleMouseMove={props.handleMouseMove}
        updateLinePoint={updateLinePoint}
      />
      <Connector
        id={state.id + '2'}
        x={props.xPos + 280}
        y={props.yPos + 20}
        circleColor={state.circleColor}
        handleClick={props.handleClick}
        handleMouseMove={props.handleMouseMove}
        updateLinePoint={updateLinePoint}
      />
    </Group>
  );
}


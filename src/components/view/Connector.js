import React, {useState} from 'react'
import {  Circle } from 'react-konva';

export default function Connector(props) {

  const [hoverToggle, setHoverToggle] = useState(false);
  const [circleColor, setCircleColor] = useState(props.circleColor);

  const handleClick = (e) => {
    const circle = props.id.substring(props.id.length-1) === '1'?'left':'right';
    props.updateLinePoint(circle, props.id);
  }

  const handleHover = () => {
    if (!hoverToggle) {
      setCircleColor('#40E0D0');
    } else {
      setCircleColor('#A9A9A9' );
    }
    setHoverToggle(!hoverToggle);
  };

  return (
    <Circle
      style={{ cursor: 'pointer' }}
      x={props.x}
      y={props.y}
      fill={circleColor}
      stroke='white'
      radius={7}
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    />
  );
}

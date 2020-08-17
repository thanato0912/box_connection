import React, {useState} from 'react'
import { Rect, Circle, Group } from 'react-konva';

export default function Connector(props) {

  const [hoverToggle, setHoverToggle] = useState(false);
  // const [clickToggle, setClickToggle] = useState(false);
  const [circleColor, setCircleColor] = useState(props.circleColor);
  
  const handleHover = () => {
    if (!hoverToggle) {
      setCircleColor('#40E0D0');
    } else {
      setCircleColor('#A9A9A9' );
    }
    setHoverToggle(!hoverToggle);
  };

  // const handleClick = () => {
  //   if (!clickToggle) {
  //     setCircleColor('#00FFFF');
  //   } else {
  //     setCircleColor('#A9A9A9');
  //   }
  //   setClickToggle(!clickToggle);
  // }

  return (
    <Circle
      x={props.x}
      y={props.y}
      fill={circleColor}
      stroke='white'
      radius={7}
      // onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    />
  );
}

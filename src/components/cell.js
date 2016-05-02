import React from 'react';

export default ({ cell, distance, visible, zone }) => {
  let opacityValue = 1;
  if (cell.type === 0){
    opacityValue = cell.opacity
  }
  if (visible && distance > 10){
    opacityValue = 0
  }

  let divStyle = {
    opacity: opacityValue
  }
  return (
    <div
      className={cell.type ? `${cell.type} cell` : `back-${zone} cell`}
      style={divStyle}
       />
  )
}

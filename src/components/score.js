import React from 'react';

export default (props) => {
  return (
    <div className="score-item">
      <div className={`icon cell ${props.iconClass}`}/>
      {`${props.title}: ${props.value}`}
    </div>
  )
}

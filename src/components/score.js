import React from 'react';

export default ({ iconClass, title, value }) => {
  return (
    <div className="score-item">
      <div className={`icon cell ${iconClass}`}/>
      {`${title}: ${value}`}
    </div>
  )
}

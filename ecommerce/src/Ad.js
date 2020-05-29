import React from 'react';

import './Ad.css';

const Ad = props => {
  const imageId = Math.floor(Math.random() * 1000);
  
  return ( 
    <div className="Ad">
      <img className="Ad-image" src={`http://localhost:3000/ads/?r=${imageId}`}/>
    </div>
   );
}
 
export default Ad;
import React, { useState } from 'react';

import './Ad.css';

const Ad = props => {
  const imageId = Math.floor(Math.random() * 1000);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="Ad">
      {/* <div class="Ad-placeholder">Ad</div>  */}
      {loaded || <div class="Ad-placeholder">Ad</div>}
      <img
        className="Ad-image"
        style={loaded ? {} : { display: 'none' }}
        src={`http://localhost:3000/ads/?r=${imageId}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );

}
 
export default Ad;
import React, { useState, useRef, useEffect } from 'react';

import './Ad.css';

const Ad = props => {
  const [loaded, setLoaded] = useState(false);
  const imageIdRef = useRef()

  useEffect(() => {
    imageIdRef.current = Math.floor(Math.random() * 1000);
  }, []);

  return (
    <div className="Ad">
      {loaded || <div className="Ad-placeholder">Ad</div>}
      <img
        alt="Ad"
        className="Ad-image"
        style={loaded ? {} : { display: 'none' }}
        src={`http://localhost:3000/ads/?r=${imageIdRef.current}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );

}
 
export default Ad;
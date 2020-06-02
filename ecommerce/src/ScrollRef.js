import React from 'react';

const ScrollRef = ({productsLength, selector}) => {
  const styles = {
    display: productsLength ? 'block' : 'none'
  }

  return <div className="ScrollRef" style={styles} ref={selector} />
}
 
export default ScrollRef;
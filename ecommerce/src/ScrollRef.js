import React from 'react';

const ScrollRef = ({productsLength, selector}) => {
  const styles = {
    border: '1px solid red',
    display: productsLength ? 'block' : 'none'
  }

  return <div className="ScrollRef" style={styles} ref={selector} />
}
 
export default ScrollRef;
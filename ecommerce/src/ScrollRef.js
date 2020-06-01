import React from 'react';

const ScrollRef = ({productsLength, selector}) => {
  const styles = {
    marginTop: productsLength ? '6rem' : '100vh',
    border: '1px solid red'
  }

  return <div className="ScrollRef" style={styles} ref={selector} />
}
 
export default ScrollRef;
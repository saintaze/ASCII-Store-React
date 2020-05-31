import React from 'react';

import './Product.css';
import { convertCentToDollar, timeAgo } from './helpers';

const Product = ({product}) => {
  const faceStyle = {
    fontSize: product.size,
    fontWeight: product.size <= 26 ? '900' : '700'
  }



  return ( 
    <div className="Product">
      <div className="Product-face" style={faceStyle}>{product.face}</div>
      <div className="Product-info">
        <div className="Product-left">
          <div className="Product-size">
            <span className="Product-size-value">{product.size}</span>
            <span className="Product-px">px</span>
          </div>
          <div className="Product-date">{timeAgo(product.date)}</div>   
        </div>
        <div className="Product-right">
          <div className="Product-price">
            <span className="Product-currency">$</span>
            <span className="Product-price-value">{convertCentToDollar(product.price)}</span>
          </div>
        </div>
      </div>
    </div> 
  );
}
 
export default Product;
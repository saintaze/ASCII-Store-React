import React from 'react';

import './SortProductList.css';

const SortProductList = ({handleSort}) => {
  return ( 
    <div className="select-dropdown">
      <select defaultValue='price' onChange={handleSort}>
        <option disabled>Sort</option>
        <option value="size">Size</option>
        <option value="price">Price</option>
        <option value="id">Id</option>
      </select>
    </div>
   );
}
 
export default SortProductList;
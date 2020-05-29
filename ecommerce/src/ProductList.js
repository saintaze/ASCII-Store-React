import React, { useEffect, useState } from 'react';
import Product from './Product';

import './ProductList.css';


const ProductList = props => {
  const [products, setProducts] = useState([]);
  
  const getProducts = async () => {
    const res = await fetch('http://localhost:3000/api/products');
    const products = await res.json();
    setProducts(products);
  }

  useEffect(() => {
    getProducts()
  }, []);


  const renderProducts = () => {
    return products.map((p ,i)=> {
      return  <Product product={p} key={i} />
    });
  }

  return (
    <div className="ProductList">
      
      {renderProducts()}
    </div>
  );
}

export default ProductList;
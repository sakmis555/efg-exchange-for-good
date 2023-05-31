import { Button } from 'antd'
import React, { useState } from 'react'
import ProductsForm from './ProductsForm';

function Products() {

  const [showProductForm, setShowProductForm] = useState(false);
  return (
    <div>
      <div className='flex justify-end'>
        <Button 
          type='primary'
          onClick={() => setShowProductForm(true)}
        >
          <div className='text-whiteLike'>Add Product</div>
          
        </Button>
      </div>
      {showProductForm && <ProductsForm showProductForm={showProductForm} setShowProductForm={setShowProductForm} />}
    </div>
  )
}

export default Products

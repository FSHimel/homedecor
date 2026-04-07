import React, { useState } from 'react';
import useProducts from '../hooks/useProducts';
import ProductCard from '../Components/ProductCard';
import { Link } from 'react-router';

const Products = () => {
    const { products } = useProducts()
    const [search, setSearch] = useState('')
    const term = search.trim().toLocaleLowerCase()
    const searchedProducts = term ? products.filter(product =>
        product.name.toLocaleLowerCase().includes(term))
        : products
        // console.log(searchedProducts)
    return (
        <div>
            <div className='flex justify-between items-center pb-5'>
                <h1 className='font-bold text-3xl'>All Products <span className='text-sm text-gray-500'>({searchedProducts.length}) Products</span></h1>
                <label className='input'>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="search"
                        placeholder='Search Products' />
                </label>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    searchedProducts.map(featuredProduct =>
                        <ProductCard key={featuredProduct.id} featuredProduct={featuredProduct}></ProductCard>
                    )
                }
            </div>
        </div>
    );
};

export default Products;
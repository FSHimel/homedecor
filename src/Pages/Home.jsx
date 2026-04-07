import React from 'react';
import { Link, useLoaderData } from 'react-router';
import ProductCard from '../Components/ProductCard';
import useProducts from '../hooks/useProducts';

const Home = () => {
    const {products, loading, error} = useProducts()
    const featuredProducts = products.slice(0, 6)
    return (

        <div>
            <div className='flex justify-between items-center pb-5'>
                <h1 className='font-bold text-3xl'>Featured Products</h1>
                <Link className='btn btn-outline' to='/products'>See All Product</Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    featuredProducts.map(featuredProduct =>
                        <ProductCard key={featuredProduct.id} featuredProduct={featuredProduct}></ProductCard>
                    )
                }
            </div>
        </div>
    );
};

export default Home;
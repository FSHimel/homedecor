import React from 'react';
import { Link, useParams } from 'react-router';
import useProducts from '../hooks/useProducts';

const ProductDetails = () => {
    const { id } = useParams()
    const { products, loading } = useProducts()
    const product = products.find(p => String(p.id) === id)
    // console.log(product)
    if (loading) return <p>Loading.....</p>
    const { name, image, price, category, description } = product || {}


    const handleAddToWishlist = () => {
    let existingList = []

    try {
        const stored = localStorage.getItem('wishlist')
        existingList = stored ? JSON.parse(stored) : []
    } catch (error) {
        console.error("Broken wishlist data", error)
        existingList = []
    }

    const isDuplicate = existingList.some(p => p.id === product.id)
    if (isDuplicate) return alert('Already exists!!!!!')

    const updatedList = [...existingList, product]

    localStorage.setItem('wishlist', JSON.stringify(updatedList))
}

    return (
        <div className="card bg-base-100 border shadow-sm">
            <figure className='h-84 overflow-hidden'>
                <img className='w-full object-cover'
                    src={image}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <p>Price: ${price}</p>
                <p>Category: {category}</p>
                <div className="card-actions justify-end">
                    <button onClick={handleAddToWishlist} className="btn btn-outline">Add to Wishlist</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
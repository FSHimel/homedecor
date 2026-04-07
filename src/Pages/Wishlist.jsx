import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([])
    const [sortOrder, setSortOrder] = useState('none')

    useEffect(() => {
        try {
            const stored = localStorage.getItem('wishlist')

            if (!stored || stored === "undefined") {
                setWishlist([])
            } else {
                setWishlist(JSON.parse(stored))
            }
        } catch (error) {
            console.error("Invalid wishlist data", error)
            setWishlist([])
        }
    }, [])
    
    const sortItem = (() => {
        if (sortOrder === 'price-asc') {
            return [...wishlist].sort((a, b) => a.price - b.price)
        }
        else if (sortOrder === 'price-dsc') {
            return [...wishlist].sort((a, b) => b.price - a.price)
        }
        else {
            return wishlist
        }
    })()
    
    if(!wishlist.length) return <h1 className='font-bold text-3xl'>Wishlist<span className='text-sm text-gray-500'>({sortItem.length}) Products</span></h1>

    const handleRemove = (id) => {
        const updatedList = wishlist.filter(p => p.id !== id)

        setWishlist(updatedList)
        localStorage.setItem('wishlist', JSON.stringify(updatedList))
    }



    const totalsByCategory = {}
    wishlist.forEach(product=>{
        const category = product.category
        // console.log(category)
        totalsByCategory[category] = (totalsByCategory[category] || 0) + product.price
    })

    const chartData = Object.keys(totalsByCategory).map(category=>({
        category: category,
        total: totalsByCategory[category],

    }))


    return (
        <div>
            <div className='flex justify-between items-center pb-5'>
                <h1 className='font-bold text-3xl'>Wishlist<span className='text-sm text-gray-500'>({sortItem.length}) Products</span></h1>
                <label className='form-control w-full max-w-xs'>
                    <select className='select select-bordered'
                        value={sortOrder}
                        onChange={e => setSortOrder(e.target.value)}>
                        <option value="none">Sort by Price</option>
                        <option value="price-asc">Low &gt;High</option>
                        <option value="price-dsc">High &gt;Low</option>
                    </select>
                </label>
            </div>
            <div className='space-y-3'>
                {
                    sortItem.map(p =>
                        <div key={p.id} className="card card-side bg-base-100 shadow border flex justify-between">
                            <figure className='w-40 h-28 object-cover'>
                                <img
                                    src={p.image}
                                    alt={p.name} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{p.name}</h2>
                                <p className='text-base-content/70'>{p.category}</p>
                            </div>
                            <div className="pr-4 flex items-center gap-3">
                                <div className='font-semibold'>${p.price}</div>
                                <button onClick={() => handleRemove(p.id)} className="btn btn-outline">Remove</button>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className='space-y-3'>
                <h1 className='text-xl font-semibold'>Wishlist Summary</h1>
                <div className='bg-base-100 border rounded-xl h-80 p-4'>
                    <BarChart
                    style={{ width: '100%', height: '100%' }}
                    data={chartData}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#82ca9d" />
                </BarChart>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
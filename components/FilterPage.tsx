'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronDownIcon, SearchIcon } from 'lucide-react'

type Product = {
    id: number
    name: string
    description: string
    price: number
    size: string
    type: string
    availability: string
    color: string
    offer: string
    discount: number
}

const sampleProducts: Product[] = [
    { id: 1, name: "Product 1", description: "Description 1", price: 100, size: "S", type: "Type A", availability: "In Stock", color: "Red", offer: "5% off", discount: 20 },
    { id: 2, name: "Product 2", description: "Description 2", price: 200, size: "M", type: "Type B", availability: "Out of Stock", color: "Blue", offer: "10% off", discount: 30 },
    { id: 3, name: "Product 3", description: "Description 3", price: 300, size: "L", type: "Type C", availability: "In Stock", color: "Green", offer: "15% off", discount: 50 },
    { id: 4, name: "Product 4", description: "Description 4", price: 150, size: "S", type: "Type A", availability: "In Stock", color: "Yellow", offer: "8% off", discount: 25 },
    { id: 5, name: "Product 5", description: "Description 5", price: 250, size: "M", type: "Type B", availability: "Out of Stock", color: "Black", offer: "12% off", discount: 35 },
    { id: 6, name: "Product 6", description: "Description 6", price: 350, size: "L", type: "Type C", availability: "In Stock", color: "White", offer: "20% off", discount: 60 },
    { id: 7, name: "Product 7", description: "Description 7", price: 120, size: "S", type: "Type A", availability: "In Stock", color: "Purple", offer: "7% off", discount: 22 },
    { id: 8, name: "Product 8", description: "Description 8", price: 220, size: "M", type: "Type B", availability: "Out of Stock", color: "Orange", offer: "10% off", discount: 30 },
    { id: 9, name: "Product 9", description: "Description 9", price: 320, size: "L", type: "Type C", availability: "In Stock", color: "Pink", offer: "18% off", discount: 55 },
    { id: 10, name: "Product 10", description: "Description 10", price: 180, size: "M", type: "Type A", availability: "In Stock", color: "Grey", offer: "10% off", discount: 28 },
    { id: 11, name: "Product 11", description: "Description 11", price: 110, size: "S", type: "Type A", availability: "In Stock", color: "Teal", offer: "6% off", discount: 21 },
    { id: 12, name: "Product 12", description: "Description 12", price: 210, size: "M", type: "Type B", availability: "Out of Stock", color: "Navy", offer: "9% off", discount: 32 },
    { id: 13, name: "Product 13", description: "Description 13", price: 310, size: "L", type: "Type C", availability: "In Stock", color: "Lavender", offer: "17% off", discount: 54 },
    { id: 14, name: "Product 14", description: "Description 14", price: 160, size: "S", type: "Type A", availability: "Out of Stock", color: "Cyan", offer: "11% off", discount: 26 },
    { id: 15, name: "Product 15", description: "Description 15", price: 260, size: "M", type: "Type B", availability: "In Stock", color: "Magenta", offer: "13% off", discount: 36 },
    { id: 16, name: "Product 16", description: "Description 16", price: 360, size: "L", type: "Type C", availability: "In Stock", color: "Lime", offer: "19% off", discount: 57 },
    { id: 17, name: "Product 17", description: "Description 17", price: 130, size: "S", type: "Type A", availability: "In Stock", color: "Brown", offer: "6% off", discount: 23 },
    { id: 18, name: "Product 18", description: "Description 18", price: 230, size: "M", type: "Type B", availability: "Out of Stock", color: "Crimson", offer: "14% off", discount: 33 },
    { id: 19, name: "Product 19", description: "Description 19", price: 330, size: "L", type: "Type C", availability: "In Stock", color: "Gold", offer: "16% off", discount: 52 },
    { id: 20, name: "Product 20", description: "Description 20", price: 190, size: "M", type: "Type A", availability: "Out of Stock", color: "Silver", offer: "9% off", discount: 29 },
    { id: 21, name: "Product 21", description: "Description 21", price: 105, size: "S", type: "Type A", availability: "In Stock", color: "Coral", offer: "5% off", discount: 19 },
    { id: 22, name: "Product 22", description: "Description 22", price: 205, size: "M", type: "Type B", availability: "Out of Stock", color: "Bronze", offer: "11% off", discount: 31 },
    { id: 23, name: "Product 23", description: "Description 23", price: 305, size: "L", type: "Type C", availability: "In Stock", color: "Khaki", offer: "18% off", discount: 53 },
    { id: 24, name: "Product 24", description: "Description 24", price: 155, size: "S", type: "Type A", availability: "In Stock", color: "Turquoise", offer: "10% off", discount: 24 },
    { id: 25, name: "Product 25", description: "Description 25", price: 255, size: "M", type: "Type B", availability: "Out of Stock", color: "Charcoal", offer: "12% off", discount: 34 },
    { id: 26, name: "Product 26", description: "Description 26", price: 355, size: "L", type: "Type C", availability: "In Stock", color: "Ivory", offer: "22% off", discount: 58 },
    { id: 27, name: "Product 27", description: "Description 27", price: 125, size: "S", type: "Type A", availability: "In Stock", color: "Peach", offer: "6% off", discount: 21 },
    { id: 28, name: "Product 28", description: "Description 28", price: 225, size: "M", type: "Type B", availability: "Out of Stock", color: "Amber", offer: "13% off", discount: 32 },
    { id: 29, name: "Product 29", description: "Description 29", price: 325, size: "L", type: "Type C", availability: "In Stock", color: "Mint", offer: "17% off", discount: 55 },
];

export default function FilterPage() {
    const [products, setProducts] = useState<Product[]>(sampleProducts);
    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 1000,
        size: '',
        type: '',
        availability: '',
        color: '',
        offer: '',
        discount: 0,
        sortBy: ''
    });

    const applyFiltersAndSort = useCallback(() => {
        let filteredProducts = sampleProducts.filter(product => {
            return (
                product.price >= filters.minPrice &&
                product.price <= filters.maxPrice &&
                (!filters.size || product.size === filters.size) &&
                (!filters.type || product.type === filters.type) &&
                (!filters.availability || product.availability === filters.availability) &&
                (!filters.color || product.color === filters.color) &&
                (!filters.offer || product.offer === filters.offer) &&
                product.discount >= filters.discount
            );
        });

        switch (filters.sortBy) {
            case 'priceAsc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'priceDesc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'nameAsc':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'nameDesc':
                filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break; 
        }

        setProducts(filteredProducts);
    }, [filters]);

    useEffect(() => {
        applyFiltersAndSort();
    }, [applyFiltersAndSort]);

    const handleFilterChange = (filterName: keyof typeof filters, value: string | number) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value
        }));
    };

    return (
        <section className="py-24 relative">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row lg:items-center max-lg:gap-4 justify-between w-full mb-8">
                    <ul className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
                        {['Finance', 'Management', "Today's deal"].map((category, index) => (
                            <li key={index} className="flex items-center cursor-pointer outline-none group">
                                <span className="font-normal text-lg leading-8 text-black pl-2 pr-3 transition-all duration-500 group-hover:text-indigo-600">
                                    {category}
                                </span>
                                <span className="w-6 h-6 rounded-full border border-gray-900 flex items-center justify-center font-manrope font-medium text-base text-gray-900 transition-all duration-500 group-hover:border-indigo-600 group-hover:text-indigo-600">
                                    {index + 1}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="relative">
                        <select
                            className="appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                        >
                            <option value="">Sort by</option>
                            <option value="priceAsc">Price: Low to High</option>
                            <option value="priceDesc">Price: High to Low</option>
                            <option value="nameAsc">Name: A to Z</option>
                            <option value="nameDesc">Name: Z to A</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <ChevronDownIcon className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 md:col-span-3">
                        <div className="rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
                            <h6 className="font-medium text-base leading-7 text-black mb-5">Filter</h6>

                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-600">Price Range</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        className="w-1/2 p-2 border rounded"
                                        onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        className="w-1/2 p-2 border rounded"
                                        onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-600">Size</label>
                                <select
                                    className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    onChange={(e) => handleFilterChange('size', e.target.value)}
                                >
                                    <option value="">Select size</option>
                                    <option value="S">Small</option>
                                    <option value="M">Medium</option>
                                    <option value="L">Large</option>
                                </select>
                            </div>

                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-600">Type</label>
                                <select
                                    className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    onChange={(e) => handleFilterChange('type', e.target.value)}
                                >
                                    <option value="">Select type</option>
                                    <option value="Type A">Type A</option>
                                    <option value="Type B">Type B</option>
                                    <option value="Type C">Type C</option>
                                </select>
                            </div>

                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-600">Availability</label>
                                <div className="space-y-2">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-indigo-600"
                                            onChange={(e) => handleFilterChange('availability', e.target.checked ? 'In Stock' : '')}
                                        />
                                        <span className="ml-2 text-gray-700">In Stock</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-600">Color</label>
                                <select
                                    className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    onChange={(e) => handleFilterChange('color', e.target.value)}
                                >
                                    <option value="">Select color</option>
                                    <option value="Red">Red</option>
                                    <option value="Blue">Blue</option>
                                    <option value="Green">Green</option>
                                </select>
                            </div>

                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-600">Offer</label>
                                <select
                                    className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    onChange={(e) => handleFilterChange('offer', e.target.value)}
                                >
                                    <option value="">Select offer</option>
                                    <option value="5% off">5% off</option>
                                    <option value="10% off">10% off</option>
                                    <option value="15% off">15% off</option>
                                </select>
                            </div>

                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-600">Discount</label>
                                <div className="space-y-2">
                                    {[20, 30, 50].map((discount) => (
                                        <label key={discount} className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-5 w-5 text-indigo-600"
                                                onChange={(e) => handleFilterChange('discount', e.target.checked ? discount : 0)}
                                            />
                                            <span className="ml-2 text-gray-700">{discount}% or more</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                                onClick={() => setFilters({
                                    minPrice: 0,
                                    maxPrice: 1000,
                                    size: '',
                                    type: '',
                                    availability: '',
                                    color: '',
                                    offer: '',
                                    discount: 0,
                                    sortBy: ''
                                })}
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-9">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div key={product.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                                    <p className="text-gray-600 mb-2">{product.description}</p>
                                    <p className="font-semibold mb-1">Price: ${product.price}</p>
                                    <p className="text-sm text-gray-500 mb-1">Size: {product.size}</p>
                                    <p className="text-sm text-gray-500 mb-1">Type: {product.type}</p>
                                    <p className="text-sm text-gray-500 mb-1">Availability: {product.availability}</p>
                                    <p className="text-sm text-gray-500 mb-1">Color: {product.color}</p>
                                    <p className="text-sm text-indigo-600 mb-1">Offer: {product.offer}</p>
                                    <p className="text-sm font-medium text-green-600">Discount: {product.discount}%</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
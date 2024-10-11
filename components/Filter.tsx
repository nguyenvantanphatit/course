'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronDownIcon, ChevronLeft, ChevronRight, SearchIcon } from 'lucide-react'

interface PriceVariant {
    id: number;
    color: string;
    price: number;
    originalPrice: number;
    stockStatus: "In Stock" | "Out of Stock" | "Low Stock";
}

interface SizeVariant {
    id: number;
    size: string;
    colors: PriceVariant[];
}

interface Product {
    id: number;
    general: {
        name: string;
        description: string;
        brand: string;
        category: string;
    };
    details: {
        material: string;
        careInstructions: string[];
        features: string[];
    };
    variants: SizeVariant[];
    promotion: {
        offer: string;
        discountPercentage: number;
    };
}

const sampleProducts: Product[] = [
    {
        id: 1,
        general: {
            name: "Classic T-Shirt",
            description: "A comfortable and versatile t-shirt for everyday wear.",
            brand: "ComfortWear",
            category: "Tops",
        },
        details: {
            material: "100% Cotton",
            careInstructions: ["Machine wash cold", "Tumble dry low"],
            features: ["Breathable fabric", "Ribbed crew neck", "Short sleeves"],
        },
        variants: [
            {
                id: 101,
                size: "S",
                colors: [
                    { id: 1001, color: "White", price: 19.99, originalPrice: 24.99, stockStatus: "In Stock" },
                    { id: 1002, color: "Black", price: 29.99, originalPrice: 54.99, stockStatus: "In Stock" },
                ],
            },
            {
                id: 102,
                size: "M",
                colors: [
                    { id: 1003, color: "White", price: 19.99, originalPrice: 24.99, stockStatus: "In Stock" },
                    { id: 1004, color: "Black", price: 19.99, originalPrice: 24.99, stockStatus: "Out of Stock" },
                ],
            },
            {
                id: 103,
                size: "L",
                colors: [
                    { id: 1005, color: "White", price: 21.99, originalPrice: 26.99, stockStatus: "Low Stock" },
                    { id: 1006, color: "Black", price: 21.99, originalPrice: 26.99, stockStatus: "In Stock" },
                ],
            },
        ],
        promotion: {
            offer: "Buy 2, Get 1 Free",
            discountPercentage: 20,
        },
    },
    {
        id: 2,
        general: {
            name: "Slim Fit Jeans",
            description: "Modern slim fit jeans with a comfortable stretch.",
            brand: "UrbanDenim",
            category: "Bottoms",
        },
        details: {
            material: "98% Cotton, 2% Elastane",
            careInstructions: ["Machine wash cold", "Hang to dry"],
            features: ["Slim fit", "Five-pocket styling", "Button closure"],
        },
        variants: [
            {
                id: 104,
                size: "S",
                colors: [
                    { id: 1001, color: "White", price: 19.99, originalPrice: 24.99, stockStatus: "In Stock" },
                    { id: 1002, color: "Black", price: 19.99, originalPrice: 24.99, stockStatus: "In Stock" },
                ],
            },
            {
                id: 105,
                size: "M",
                colors: [
                    { id: 1003, color: "White", price: 19.99, originalPrice: 24.99, stockStatus: "In Stock" },
                    { id: 1004, color: "Black", price: 19.99, originalPrice: 24.99, stockStatus: "Out of Stock" },
                ],
            },
            {
                id: 106,
                size: "L",
                colors: [
                    { id: 1005, color: "White", price: 21.99, originalPrice: 26.99, stockStatus: "Low Stock" },
                    { id: 1006, color: "Black", price: 21.99, originalPrice: 26.99, stockStatus: "In Stock" },
                ],
            },
        ],
        promotion: {
            offer: "15% off",
            discountPercentage: 15,
        },
    },
    {
        id: 3,
        general: {
            name: "Running Shoes",
            description: "Lightweight and responsive running shoes for optimal performance.",
            brand: "SpeedRunner",
            category: "Footwear",
        },
        details: {
            material: "Synthetic mesh upper, Rubber sole",
            careInstructions: ["Wipe clean with a damp cloth", "Air dry"],
            features: ["Breathable mesh upper", "Cushioned midsole", "Durable outsole"],
        },
        variants: [
            {
                id: 107,
                size: "S",
                colors: [
                    { id: 1001, color: "White", price: 19.99, originalPrice: 24.99, stockStatus: "In Stock" },
                    { id: 1002, color: "Black", price: 19.99, originalPrice: 24.99, stockStatus: "In Stock" },
                ],
            },
            {
                id: 108,
                size: "M",
                colors: [
                    { id: 1003, color: "White", price: 19.99, originalPrice: 24.99, stockStatus: "In Stock" },
                    { id: 1004, color: "Black", price: 19.99, originalPrice: 24.99, stockStatus: "Out of Stock" },
                ],
            },
            {
                id: 109,
                size: "L",
                colors: [
                    { id: 1005, color: "White", price: 21.99, originalPrice: 26.99, stockStatus: "Low Stock" },
                    { id: 1006, color: "Black", price: 21.99, originalPrice: 26.99, stockStatus: "In Stock" },
                ],
            },
        ],
        promotion: {
            offer: "Free shipping",
            discountPercentage: 10,
        },
    },
];

export default function Filter() {
    const [products, setProducts] = useState<Product[]>(sampleProducts);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 1000,
        size: '',
        type: '',
        availability: '',
        color: '',
        offer: '',
        brand: "",
        category: '',
        discount: 0,
        sortBy: ''
    });

    const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
    const [selectedColorId, setSelectedColorId] = useState<number | null>(null);

    const applyFiltersAndSort = useCallback(() => {
        let filteredProducts = sampleProducts.filter(product => {
            return product.variants.some(sizeVariant =>
                sizeVariant.colors.some(colorVariant =>
                    colorVariant.price >= filters.minPrice &&
                    colorVariant.price <= filters.maxPrice &&
                    (!filters.size || sizeVariant.size === filters.size) &&
                    (!filters.color || colorVariant.color === filters.color) &&
                    (!filters.availability || colorVariant.stockStatus === filters.availability)
                )
            ) &&
                (!filters.brand || product.general.brand === filters.brand) &&
                (!filters.category || product.general.category === filters.category) &&
                (!filters.offer || product.promotion.offer === filters.offer) &&
                product.promotion.discountPercentage >= filters.discount;
        });

        switch (filters.sortBy) {
            case 'priceAsc':
                filteredProducts.sort((a, b) => {
                    const minPriceA = Math.min(...a.variants.flatMap(v => v.colors.map(c => c.price)));
                    const minPriceB = Math.min(...b.variants.flatMap(v => v.colors.map(c => c.price)));
                    return minPriceA - minPriceB;
                });
                break;
            case 'priceDesc':
                filteredProducts.sort((a, b) => {
                    const maxPriceA = Math.max(...a.variants.flatMap(v => v.colors.map(c => c.price)));
                    const maxPriceB = Math.max(...b.variants.flatMap(v => v.colors.map(c => c.price)));
                    return maxPriceB - maxPriceA;
                });
                break;
            case 'nameAsc':
                filteredProducts.sort((a, b) => a.general.name.localeCompare(b.general.name));
                break;
            case 'nameDesc':
                filteredProducts.sort((a, b) => b.general.name.localeCompare(a.general.name));
                break;
            default:
                break;
        }

        setProducts(filteredProducts);
        setCurrentPage(1);
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleSizeSelect = (sizeId: number) => {
        setSelectedSizeId(sizeId);
        setSelectedColorId(null);
    };

    const handleColorSelect = (colorId: number) => {
        setSelectedColorId(colorId);
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
                                    brand: "",
                                    category: '',
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
                            {currentItems.map(product => (
                                <div key={product.id} className="border p-4 rounded-lg shadow-md">
                                    <h3 className="text-xl font-bold">{product.general.name}</h3>
                                    <p className="text-gray-600">{product.general.description}</p>
                                    <p className="mt-2"><span className="font-semibold">Brand:</span> {product.general.brand}</p>
                                    <p><span className="font-semibold">Category:</span> {product.general.category}</p>
                                    <div className="mt-4">
                                        <h4 className="font-semibold">Sizes:</h4>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {product.variants.map(variant => (
                                                <button
                                                    key={variant.size}
                                                    className={`px-3 py-1 border rounded ${selectedSizeId === variant.id ? 'bg-blue-500 text-white' : 'bg-white'}`}
                                                    onClick={() => handleSizeSelect(variant.id)}
                                                >
                                                    {variant.size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {selectedSizeId && (
                                        <div className="mt-4">
                                            <h4 className="font-semibold">Colors:</h4>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {product.variants.find(v => v.id === selectedSizeId)?.colors.map(colorVariant => (
                                                    <button
                                                        key={colorVariant.color}
                                                        className={`px-3 py-1 border rounded ${selectedColorId === colorVariant.id ? 'bg-blue-500 text-white' : 'bg-white'}`}
                                                        onClick={() => handleColorSelect(colorVariant.id)}
                                                    >
                                                        {colorVariant.color}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {selectedSizeId && selectedColorId && (
                                        <div className="mt-4">
                                            <h4 className="font-semibold">Price:</h4>
                                            {(() => {
                                                const selectedVariant = product.variants.find(v => v.id === selectedSizeId);
                                                const selectedColorVariant = selectedVariant?.colors.find(c => c.id === selectedColorId);
                                                if (selectedColorVariant) {
                                                    return (
                                                        <div>
                                                            <p>Price: ${selectedColorVariant.price.toFixed(2)}</p>
                                                            <p>Original Price: ${selectedColorVariant.originalPrice.toFixed(2)}</p>
                                                            <p>Status: {selectedColorVariant.stockStatus}</p>
                                                        </div>
                                                    );
                                                }
                                                return <p>No price information available for the selected combination.</p>;
                                            })()}
                                        </div>
                                    )}
                                    <div className="mt-4">
                                        <h4 className="font-semibold">Details:</h4>
                                        <p><span className="font-semibold">Material:</span> {product.details.material}</p>
                                        <p><span className="font-semibold">Care Instructions:</span> {product.details.careInstructions.join(", ")}</p>
                                        <p><span className="font-semibold">Features:</span> {product.details.features.join(", ")}</p>
                                    </div>
                                    <div className="mt-4">
                                        <h4 className="font-semibold">Promotion:</h4>
                                        <p>Offer: {product.promotion.offer}</p>
                                        <p>Discount: {product.promotion.discountPercentage}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center items-center space-x-2 mt-6">
                            <button
                                className={`p-2 border border-gray-300 rounded-md hover:bg-gray-100 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    className={`p-2 border rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'border-gray-300 hover:bg-gray-100'}`}
                                    onClick={() => paginate(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                className={`p-2 border border-gray-300 rounded-md hover:bg-gray-100 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
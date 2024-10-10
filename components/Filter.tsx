'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronDownIcon, ChevronLeft, ChevronRight, SearchIcon } from 'lucide-react'

type Product = {
    id: number;
    general: {
        name: string;
        description: string;
    };
    details: {
        pricing: {
            price: number;
            originalPrice: number;
        };
        availability: {
            stockStatus: string;
            size: string;
        };
        attributes: {
            type: string;
            color: string;
        };
    };
    promotion: {
        offer: string;
        discount: number;
    };
};


const sampleProducts: Product[] = [
    {
        id: 1,
        general: {
            name: "Product 1",
            description: "Description 1"
        },
        details: {
            pricing: {
                price: 100,
                originalPrice: 150,
            },
            availability: {
                stockStatus: "In Stock",
                size: "S"
            },
            attributes: {
                type: "Type A",
                color: "Red"
            }
        },
        promotion: {
            offer: "5% off",
            discount: 20
        }
    },
    {
        id: 2,
        general: {
            name: "Product 2",
            description: "Description 2"
        },
        details: {
            pricing: {
                price: 200,
                originalPrice: 250,
            },
            availability: {
                stockStatus: "Out of Stock",
                size: "M"
            },
            attributes: {
                type: "Type B",
                color: "Blue"
            }
        },
        promotion: {
            offer: "10% off",
            discount: 30
        }
    },
    {
        id: 3,
        general: {
            name: "Product 3",
            description: "Description 3"
        },
        details: {
            pricing: {
                price: 300,
                originalPrice: 400,
            },
            availability: {
                stockStatus: "In Stock",
                size: "L"
            },
            attributes: {
                type: "Type C",
                color: "Green"
            }
        },
        promotion: {
            offer: "15% off",
            discount: 50
        }
    }
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
        discount: 0,
        sortBy: ''
    });

    const applyFiltersAndSort = useCallback(() => {
        let filteredProducts = sampleProducts.filter(product => {
            return (
                product.details.pricing.price >= filters.minPrice &&
                product.details.pricing.price <= filters.maxPrice &&
                (!filters.size || product.details.availability.size === filters.size) &&
                (!filters.type || product.details.attributes.type === filters.type) &&
                (!filters.availability || product.details.availability.stockStatus === filters.availability) &&
                (!filters.color || product.details.attributes.color === filters.color) &&
                (!filters.offer || product.promotion.offer === filters.offer) &&
                product.promotion.discount >= filters.discount
            );
        });

        switch (filters.sortBy) {
            case 'priceAsc':
                filteredProducts.sort((a, b) => a.details.pricing.price - b.details.pricing.price);
                break;
            case 'priceDesc':
                filteredProducts.sort((a, b) => b.details.pricing.price - a.details.pricing.price);
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
                            {currentItems.map((product) => (
                                <div key={product.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <h3>{product.general.name}</h3>
                                    <p>{product.general.description}</p>
                                    <p>Price: {product.details.pricing.price}</p>
                                    <p>Original Price: {product.details.pricing.originalPrice}</p>
                                    <p>Size: {product.details.availability.size}</p>
                                    <p>Availability: {product.details.availability.stockStatus}</p>
                                    <p>Type: {product.details.attributes.type}</p>
                                    <p>Color: {product.details.attributes.color}</p>
                                    <p>Offer: {product.promotion.offer}</p>
                                    <p>Discount: {product.promotion.discount}%</p>
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
import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCardTest = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(false);
    const componentMounted = useRef(true);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://fakestoreapi.com/products/");
                if (componentMounted.current) {
                    const products = await response.json();


                    const formattedProducts = products.map(product => ({
                        id: product.id,
                        title: product.title,
                        imageUrl: product.image,
                        price: product.price,
                        description: product.description,
                        category: product.category,
                        stock: Math.floor(Math.random() * 20) + 1,
                        rating: product.rating,

                        variants: generateVariants(product.category, product.id)
                    }));

                    setData(formattedProducts);
                    setFilter(formattedProducts);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        getProducts();

        return () => {
            componentMounted.current = false;
        };
    }, []);


    const generateVariants = (category, productId) => {

        switch (category) {
            case "men's clothing":
                return [
                    { id: 's', name: 'Small', price: null, stock: Math.floor(Math.random() * 5) + 1 },
                    { id: 'm', name: 'Medium', price: null, stock: Math.floor(Math.random() * 8) + 1 },
                    { id: 'l', name: 'Large', price: null, stock: Math.floor(Math.random() * 5) + 1 },
                    { id: 'xl', name: 'X-Large', price: null, stock: Math.floor(Math.random() * 3) }
                ];
            case "women's clothing":
                return [
                    { id: 'xs', name: 'X-Small', price: null, stock: Math.floor(Math.random() * 3) + 1 },
                    { id: 's', name: 'Small', price: null, stock: Math.floor(Math.random() * 5) + 1 },
                    { id: 'm', name: 'Medium', price: null, stock: Math.floor(Math.random() * 8) + 1 },
                    { id: 'l', name: 'Large', price: null, stock: Math.floor(Math.random() * 5) + 1 }
                ];
            case "electronics":
                return [
                    { id: 'black', name: 'Black', price: null, stock: Math.floor(Math.random() * 5) + 1 },
                    { id: 'white', name: 'White', price: null, stock: Math.floor(Math.random() * 3) + 1 },
                    { id: 'silver', name: 'Silver', price: null, stock: Math.floor(Math.random() * 4) + 1 },
                    { id: 'blue', name: 'Blue', price: null, stock: Math.floor(Math.random() * 2) + 1 }
                ];
            case "jewelery":
                return [
                    { id: 'gold', name: 'Gold Plated', price: null, stock: Math.floor(Math.random() * 3) + 1 },
                    { id: 'silver', name: 'Sterling Silver', price: null, stock: Math.floor(Math.random() * 5) + 1 },
                    { id: 'rose-gold', name: 'Rose Gold', price: null, stock: Math.floor(Math.random() * 4) + 1 }
                ];
            default:

                return [
                    { id: 'standard', name: 'Standard', price: null, stock: Math.floor(Math.random() * 10) + 1 },
                    { id: 'premium', name: 'Premium', price: null, stock: Math.floor(Math.random() * 5) + 1 },
                    { id: 'deluxe', name: 'Deluxe', price: null, stock: Math.floor(Math.random() * 3) + 1 }
                ];
        }
    }; const filterProduct = (cat) => {
        if (cat === 'all') {
            setFilter(data);
        } else {
            const updatedList = data.filter((item) => item.category === cat);
            setFilter(updatedList);
        }
    };

    const Loading = () => {
        return (
            <div className="row">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                        <div className="card h-100">
                            <Skeleton height={250} />
                            <div className="card-body">
                                <Skeleton height={20} className="mb-2" />
                                <Skeleton height={40} className="mb-3" />
                                <Skeleton height={30} className="mb-2" />
                                <Skeleton height={45} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <Navbar />
            <div className="bg-light min-vh-100">
                <div className="container py-5">
                    {/* Hero Section */}
                    <div className="row mb-5">
                        <div className="col-12 text-center">
                            <h1 className="display-4 fw-bold text-dark mb-3">
                                <i className="fa fa-shopping-bag me-3"></i>
                                Product Card
                            </h1>
                        </div>
                    </div>

                    {!loading && (
                        <div className="row mb-4">
                            <div className="col-12">
                                <div className="d-flex flex-wrap justify-content-center gap-2">
                                    <button
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={() => filterProduct('all')}
                                    >
                                        <i className="fa fa-th me-1"></i>All Products
                                    </button>
                                    <button
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={() => filterProduct("men's clothing")}
                                    >
                                        <i className="fa fa-male me-1"></i>Men's Clothing
                                    </button>
                                    <button
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={() => filterProduct("women's clothing")}
                                    >
                                        <i className="fa fa-female me-1"></i>Women's Clothing
                                    </button>
                                    <button
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={() => filterProduct("jewelery")}
                                    >
                                        <i className="fa fa-gem me-1"></i>Jewelery
                                    </button>
                                    <button
                                        className="btn btn-outline-dark btn-sm"
                                        onClick={() => filterProduct("electronics")}
                                    >
                                        <i className="fa fa-laptop me-1"></i>Electronics
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Product Cards */}
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="row g-4 mb-5">
                            {filter.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}


                </div>
            </div>
        </>
    );
};

export default ProductCardTest;

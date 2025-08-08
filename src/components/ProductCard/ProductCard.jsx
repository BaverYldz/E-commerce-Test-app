import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/action";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
    const [selectedVariant, setSelectedVariant] = useState(
        product.variants && product.variants.length > 0 ? product.variants[0] : null
    );

    const dispatch = useDispatch();

    const isOutOfStock = product.stock === 0 || (selectedVariant && selectedVariant.stock === 0);

    const addProduct = (product) => {
        dispatch(addCart(product));
    };

    const handleAddToCart = () => {
        if (!isOutOfStock) {
            toast.success("Added to cart");
            addProduct(product);
        }
    }; const handleVariantChange = (e) => {
        const variant = product.variants.find(v => v.id === e.target.value);
        setSelectedVariant(variant);
    };

    const getCurrentPrice = () => {
        if (selectedVariant && selectedVariant.price) {
            return selectedVariant.price;
        }
        return product.price;
    };

    return (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card h-100 shadow-sm border-0 product-card-hover">
                <div className="position-relative overflow-hidden">
                    <img
                        src={product.imageUrl || product.image}
                        alt={product.title || product.name}
                        className="card-img-top img-fluid"
                        style={{ height: '250px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x250?text=No+Image';
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                    {isOutOfStock && (
                        <div className="position-absolute top-50 start-50 translate-middle">
                            <span className="badge bg-danger fs-6 px-3 py-2 border border-light">
                                <i className="fa fa-times-circle me-1"></i>
                                Out of Stock
                            </span>
                        </div>
                    )}
                    {!isOutOfStock && product.stock < 5 && (
                        <span className="position-absolute top-0 end-0 badge bg-warning text-dark m-2">
                            <i className="fa fa-exclamation-triangle me-1"></i>
                            Only {product.stock} left
                        </span>
                    )}
                </div>

                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate mb-2" style={{ minHeight: '1.5rem' }}>
                        {product.title || product.name}
                    </h5>

                    <div className="mb-3">
                        <span className="h4 text-dark fw-bold">
                            <i className="fa fa-dollar-sign"></i>{getCurrentPrice()}
                        </span>
                    </div>

                    {product.variants && product.variants.length > 0 && (
                        <div className="mb-3">
                            <label className="form-label small text-muted fw-bold">
                                <i className="fa fa-cog me-1"></i>Options:
                            </label>
                            <select
                                value={selectedVariant?.id || ''}
                                onChange={handleVariantChange}
                                className="form-select form-select-sm"
                                disabled={isOutOfStock}
                            >
                                {product.variants.map(variant => (
                                    <option key={variant.id} value={variant.id}>
                                        {variant.name} {variant.price && `($${variant.price})`}
                                        {variant.stock === 0 ? ' - Out of Stock' : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="mt-auto">
                        <button
                            className={`btn w-100 fw-bold ${isOutOfStock
                                ? 'btn-secondary disabled'
                                : 'btn-dark btn-lg'
                                }`}
                            onClick={handleAddToCart}
                            disabled={isOutOfStock}
                        >
                            {isOutOfStock ? (
                                <>
                                    <i className="fa fa-ban me-2"></i>
                                    Out of Stock
                                </>
                            ) : (
                                <>
                                    <i className="fa fa-shopping-cart me-2"></i>
                                    Add to Cart
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {!isOutOfStock && (
                    <div className="card-footer bg-transparent border-0 pt-0">
                        <div className="d-flex justify-content-between align-items-center">
                            <small className="text-success">
                                <i className="fa fa-check-circle me-1"></i>
                                In Stock
                            </small>
                            <small className="text-muted">
                                <i className="fa fa-truck me-1"></i>
                                Free Shipping
                            </small>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;

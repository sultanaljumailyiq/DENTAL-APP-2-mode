import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewsCount?: number;
  discount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  category?: string;
  supplier?: string;
}

interface SmartProductsGridProps {
  products: Product[];
  title: string;
  subtitle?: string;
  viewAllLink?: string;
  gridType?: "mobile-3" | "mobile-4" | "desktop-10" | "compact" | "featured";
  showScrollIndicator?: boolean;
  className?: string;
}

export default function SmartProductsGrid({
  products,
  title,
  subtitle,
  viewAllLink,
  gridType = "mobile-3",
  showScrollIndicator = true,
  className = "",
}: SmartProductsGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const handleResize = () => updateScrollButtons();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = gridType === "compact" ? 150 : 200;
      const scrollAmount = cardWidth * 2;
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const getGridClasses = () => {
    return `smart-product-grid ${gridType}`;
  };

  const getCardClasses = () => {
    if (gridType === "compact") {
      return "smart-product-card flex-shrink-0 w-36 lg:w-auto";
    }

    return "smart-product-card";
  };

  return (
    <div className={`mb-4 md:mb-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-0.5">{subtitle}</p>
          )}
        </div>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="text-teal-600 text-sm font-medium hover:text-teal-700 flex items-center gap-1"
          >
            عرض الكل
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>

      {/* Products Grid */}
      <div className="relative">
        {/* Mobile/Tablet: Horizontal scroll with arrows */}
        <div className="lg:hidden">
          {showScrollIndicator && canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-gray-200 flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            onScroll={updateScrollButtons}
            className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="mobile"
              />
            ))}
          </div>

          {showScrollIndicator && canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-gray-200 flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>

        {/* Desktop: Grid layout */}
        <div className={`hidden lg:block ${getGridClasses()}`}>
          {products.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} variant="desktop" />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  variant: "mobile" | "desktop";
}

function ProductCard({ product, variant }: ProductCardProps) {
  const isMobile = variant === "mobile";

  return (
    <Link
      to={`/dental-supply/product/${product.id}`}
      className={`smart-product-card ${isMobile ? "flex-shrink-0 w-32" : ""}`}
    >
      {/* Product Image */}
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Badges */}
        <div className="product-badges">
          {product.discount && (
            <span className="product-badge discount">-{product.discount}%</span>
          )}
          {product.isNew && <span className="product-badge new">جديد</span>}
          {product.isFeatured && (
            <span className="product-badge featured">مميز</span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-1">
            <button className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
              <Heart className="w-3 h-3 text-gray-600" />
            </button>
            <button className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
              <Eye className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3>{product.name}</h3>

        {/* Rating */}
        <div className="product-rating">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviewsCount || 0})
          </span>
        </div>

        {/* Price */}
        <div className="product-price">
          <span className="current-price">${product.price}</span>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="add-to-cart-btn">
          <ShoppingCart className="w-3 h-3" />
          أضف للسلة
        </button>
      </div>
    </Link>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Eye,
  ShoppingCart,
  Heart,
  Timer,
  Crown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

interface OptimizedProductCardProps {
  product: {
    id: number;
    name: string;
    arabicName: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviewCount: number;
    category: string;
    brand: string;
    discount?: number;
    featured?: boolean;
    isNew?: boolean;
    timeLeft?: string;
    inStock: boolean;
  };
  className?: string;
  compact?: boolean;
}

export default function OptimizedProductCard({
  product,
  className,
  compact = false,
}: OptimizedProductCardProps) {
  const { addItem: addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <Link
      to={`/dental-supply/product/${product.id}`}
      className={cn(
        "group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden relative block",
        "lg:w-auto w-full flex-shrink-0",
        compact ? "lg:h-auto h-72" : "lg:h-auto h-80",
        className,
      )}
    >
      {/* Product Image */}
      <div
        className={cn(
          "bg-gray-50 relative overflow-hidden",
          compact
            ? "aspect-square h-24 sm:h-32 md:h-28 lg:h-32"
            : "aspect-square h-32 sm:h-40 md:h-36 lg:h-40",
        )}
      >
        <img
          src={product.image}
          alt={product.arabicName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badges */}
        {product.discount && (
          <div className="absolute top-1 right-1 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">
            -{product.discount}%
          </div>
        )}

        {product.featured && (
          <div className="absolute top-1 left-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-0.5">
            <Crown className="w-2.5 h-2.5" />
            <span className="hidden sm:inline">مميز</span>
          </div>
        )}

        {product.isNew && (
          <div className="absolute top-1 left-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5" />
            <span className="hidden sm:inline">جديد</span>
          </div>
        )}

        {product.timeLeft && (
          <div className="absolute bottom-1 left-1 bg-black/70 text-white px-1.5 py-0.5 rounded-lg text-xs flex items-center gap-0.5">
            <Timer className="w-2.5 h-2.5" />
            <span className="hidden sm:inline">{product.timeLeft}</span>
          </div>
        )}

        {/* Action Buttons - Mobile Optimized */}
        <div className="absolute bottom-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(product);
            }}
            className={cn(
              "w-6 h-6 shadow-md rounded-full flex items-center justify-center transition-colors touch-manipulation",
              isFavorite(product.id)
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-500",
            )}
          >
            <Heart className="w-3 h-3" />
          </button>
          <div className="w-6 h-6 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors">
            <Eye className="w-3 h-3 text-gray-600 hover:text-blue-500" />
          </div>
        </div>
      </div>

      {/* Product Info - Compact */}
      <div
        className={cn(
          "p-2 md:p-2.5 lg:p-3",
          compact ? "p-1.5 md:p-2" : "p-2 md:p-2.5 lg:p-3",
        )}
      >
        {/* Brand */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500 font-medium truncate">
            {product.brand}
          </span>
        </div>

        {/* Product Name */}
        <h3
          className={cn(
            "font-bold text-gray-900 mb-1.5 line-clamp-2 leading-tight",
            compact ? "text-xs" : "text-xs md:text-sm",
          )}
        >
          {product.arabicName}
        </h3>

        {/* Rating - Simplified */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-2.5 h-2.5",
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300",
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Price and Cart Button */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span
              className={cn(
                "font-bold text-gray-900",
                compact ? "text-xs" : "text-xs md:text-sm",
              )}
            >
              {product.price.toLocaleString()} د.ع
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Compact Cart Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className={cn(
              "p-1 md:p-1.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md touch-manipulation",
              isInCart(product.id)
                ? "bg-green-500 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700",
            )}
          >
            <ShoppingCart className="w-2.5 h-2.5 md:w-3 md:h-3" />
          </button>
        </div>
      </div>
    </Link>
  );
}

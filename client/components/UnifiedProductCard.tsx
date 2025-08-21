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

interface UnifiedProductCardProps {
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
  showProgressBar?: boolean;
}

export default function UnifiedProductCard({
  product,
  className,
  compact = false,
  showProgressBar = false,
}: UnifiedProductCardProps) {
  const { addItem: addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div
      className={cn(
        "group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden relative",
        "flex-shrink-0 w-32 sm:w-36 lg:w-auto",
        className,
      )}
    >
      {/* Product Image */}
      <div className="aspect-square bg-gray-50 relative overflow-hidden">
        <Link to={`/dental-supply/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.arabicName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{product.discount}%
          </div>
        )}

        {product.featured && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Crown className="w-3 h-3" />
            مميز
          </div>
        )}

        {product.isNew && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            جديد
          </div>
        )}

        {product.timeLeft && (
          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
            <Timer className="w-3 h-3" />
            <span>{product.timeLeft}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute bottom-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => toggleFavorite(product)}
            className={cn(
              "w-7 h-7 shadow-md rounded-full flex items-center justify-center transition-colors",
              isFavorite(product.id)
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-500",
            )}
          >
            <Heart className="w-3.5 h-3.5" />
          </button>
          <Link
            to={`/dental-supply/product/${product.id}`}
            className="w-7 h-7 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-gray-600 hover:text-blue-500" />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className={cn("p-3", compact ? "sm:p-3" : "sm:p-4 lg:p-4")}>
        {/* Brand and Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600 truncate">
            {product.brand}
          </span>
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 leading-tight">
          {product.arabicName}
        </h3>

        {/* Tags */}
        {!compact && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.arabicName.includes("حزمة") && (
              <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                أدوات فحص
              </span>
            )}
            {product.arabicName.includes("تبييض") && (
              <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                جل تبييض
              </span>
            )}
          </div>
        )}

        {/* Rating and Sales */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300",
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              ({product.reviewCount})
            </span>
          </div>
          <span className="text-xs text-gray-500">89 مُباع</span>
        </div>

        {/* Progress Bar for Flash Deals */}
        {showProgressBar && product.timeLeft && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>المباع 78%</span>
              <span>متبقي 44</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: "78%" }}
              ></div>
            </div>
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-sm">
              {product.price.toLocaleString()} د.ع
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                {product.originalPrice.toLocaleString()} د.ع
              </span>
            )}
          </div>
          {product.discount && product.originalPrice && (
            <div className="text-left">
              <span className="inline-block bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                وفر {(product.originalPrice - product.price).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

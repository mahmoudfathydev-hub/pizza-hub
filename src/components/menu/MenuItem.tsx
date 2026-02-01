"use client";

import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import { useState, Suspense } from "react";
import AddToCartButton from "./AddToCartButton";
import { ProductWithRelation } from "@/types/product";

// Loading skeleton component
const MenuItemSkeleton = () => (
  <li className="animate-pulse">
    <div className="relative w-48 h-48 mx-auto bg-gray-200 rounded-lg overflow-hidden">
      <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
    </div>
    <div className="info flex items-center justify-between mt-3">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
    </div>
    <div className="mt-2 space-y-2">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
    <div className="mt-4 h-12 bg-gray-200 rounded-full"></div>
  </li>
);

const MenuItem = ({ item }: { item: ProductWithRelation }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    console.error(`Failed to load image: ${item.image}`);
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <li className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="relative w-48 h-48 mx-auto bg-gray-100 rounded-lg overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
        )}
        {!imageError && item.image ? (
          <Image
            src={item.image}
            className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={handleImageError}
            onLoad={handleImageLoad}
            priority={false}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="info flex items-center justify-between">
        <h4 className="font-semibold text-black text-xl my-3 transition-colors duration-200 hover:text-accent">
          {item.name}
        </h4>
        <strong className="text-accent transition-transform duration-200 hover:scale-110">
          {formatCurrency(item.basePrice)}
        </strong>
      </div>
      <p className="text-gray-500 text-sm line-clamp-3 transition-colors duration-200 hover:text-gray-600">
        {item.description}
      </p>
      <Suspense
        fallback={
          <div className="mt-4 h-12 bg-gray-200 rounded-full animate-pulse"></div>
        }
      >
        <AddToCartButton item={item} />
      </Suspense>
    </li>
  );
};

export default MenuItem;

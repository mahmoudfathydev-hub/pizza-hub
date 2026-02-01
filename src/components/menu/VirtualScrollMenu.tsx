"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { ProductWithRelation } from "@/types/product";
import MenuItem from "./MenuItem";

interface VirtualScrollProps {
  items: ProductWithRelation[];
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

interface VirtualScrollItemProps {
  item: ProductWithRelation;
  index: number;
  style: React.CSSProperties;
}

const VirtualScrollItem: React.FC<VirtualScrollItemProps> = ({
  item,
  index,
  style,
}) => {
  return (
    <div style={style} className="transform transition-all duration-300">
      <MenuItem item={item} />
    </div>
  );
};

export const VirtualScrollMenu: React.FC<VirtualScrollProps> = ({
  items,
  itemHeight = 400,
  containerHeight = 800,
  overscan = 5,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: containerHeight,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - overscan,
    );
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerSize.height) / itemHeight) + overscan,
    );
    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerSize.height, overscan, items.length]);

  // Calculate total height
  const totalHeight = useMemo(
    () => items.length * itemHeight,
    [items.length, itemHeight],
  );

  // Handle scroll
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // Update container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Render visible items
  const visibleItems = useMemo(() => {
    const elements = [];
    for (let i = visibleRange.startIndex; i <= visibleRange.endIndex; i++) {
      if (i < items.length) {
        elements.push(
          <VirtualScrollItem
            key={items[i].id}
            item={items[i]}
            index={i}
            style={{
              position: "absolute",
              top: i * itemHeight,
              left: 0,
              right: 0,
              height: itemHeight,
            }}
          />,
        );
      }
    }
    return elements;
  }, [visibleRange, itemHeight, items]);

  if (items.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">No products found</div>
    );
  }

  // Only use virtual scrolling for large lists
  if (items.length <= 12) {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </ul>
    );
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="overflow-auto"
        style={{ height: containerHeight }}
        onScroll={handleScroll}
      >
        <div className="relative" style={{ height: totalHeight }}>
          {visibleItems}
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-2">
        Showing {visibleRange.startIndex + 1} -{" "}
        {Math.min(visibleRange.endIndex + 1, items.length)} of {items.length}{" "}
        items
      </div>
    </div>
  );
};

// Fallback component for smaller lists
export const OptimizedMenu: React.FC<{ items: ProductWithRelation[] }> = ({
  items,
}) => {
  if (items.length <= 12) {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </ul>
    );
  }

  return (
    <VirtualScrollMenu
      items={items}
      itemHeight={400}
      containerHeight={600}
      overscan={3}
    />
  );
};

export default VirtualScrollMenu;

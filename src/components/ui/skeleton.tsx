import React from 'react'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  lines?: number
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  lines = 1
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 bg-cover bg-fixed'
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg'
  }

  const style = {
    width: width || '100%',
    height: height || 'auto'
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${variantClasses[variant]}`}
            style={{
              width: i === lines - 1 ? '70%' : '100%',
              height: height || '1rem'
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  )
}

// Menu Item Skeleton
export const MenuItemSkeleton: React.FC = () => {
  return (
    <li className="transform transition-all duration-300">
      <div className="relative w-48 h-48 mx-auto mb-4">
        <Skeleton variant="rounded" width="192px" height="192px" />
      </div>
      <div className="info flex items-center justify-between mb-3">
        <Skeleton width="70%" height="24px" />
        <Skeleton width="25%" height="24px" />
      </div>
      <div className="space-y-2 mb-4">
        <Skeleton lines={2} height="16px" />
      </div>
      <Skeleton variant="rectangular" height="48px" className="rounded-full" />
    </li>
  )
}

// Category Skeleton
export const CategorySkeleton: React.FC = () => {
  return (
    <section className="fade-in">
      <div className="container">
        <Skeleton width="200px" height="40px" className="mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <MenuItemSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Page Skeleton
export const PageSkeleton: React.FC = () => {
  return (
    <main>
      <div className="container space-y-8">
        {Array.from({ length: 3 }, (_, i) => (
          <CategorySkeleton key={i} />
        ))}
      </div>
    </main>
  )
}

export default Skeleton

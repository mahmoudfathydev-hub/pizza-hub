'use client';

import { Button } from '@/src/components/ui/button';
import { deliveryFee, getSubTotal } from '@/src/lib/cart';
import { formatCurrency } from '@/src/lib/formatters';
import {removeItemFromCart,selectCartItems} from '@/src/redux/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { useTranslations } from '@/src/hooks/use-translations';

function CartItems() {
    const cart = useAppSelector(selectCartItems);
    const dispatch = useAppDispatch();
    const Subtotal = getSubTotal(cart);
    const { t, loading } = useTranslations('cart');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cartItems', JSON.stringify(cart));
        }
    }, [cart]);

    if (loading) {
        return (
            <div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col md:flex-row gap-6 justify-between">
                            <div className='flex items-center gap-2'>
                                <div className='w-24 h-24 bg-gray-200 rounded animate-pulse'></div>
                                <div className="space-y-2">
                                    <div className="h-5 bg-gray-200 rounded animate-pulse w-32"></div>
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                                </div>
                            </div>
                            <div className='flex-1 flex items-center gap-4 justify-end'>
                                <div className="h-5 bg-gray-200 rounded animate-pulse w-16"></div>
                                <div className="h-8 bg-gray-200 rounded animate-pulse w-8"></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col justify-end items-end pt-6 space-y-2'>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {cart && cart.length > 0 ? (
                <>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                <div className='flex flex-col md:flex-row gap-6 justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <div className='relative w-24 h-24'>
                                            <Image
                                                src={item.image}
                                                className='object-contain'
                                                alt={item.name}
                                                fill
                                            />
                                        </div>
                                        <div>
                                            <h4 className='font-semibold md:text-lg'>{item.name}</h4>
                                            <div className='relative'>
                                                {item.size && (
                                                    <span className='text-sm text-accent'>
                                                        {t.items?.size || 'Size:'} {item.size.name}
                                                    </span>
                                                )}
                                                {item.extras && item.extras.length > 0 && (
                                                    <div className='flex gap-1'>
                                                        <span>{t.items?.extras || 'Extras:'}</span>
                                                        <ul>
                                                            {item.extras.map((extra) => (
                                                                <li key={extra.id}>
                                                                    <span className='text-sm text-accent'>
                                                                        {extra.name} {formatCurrency(extra.price)}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                <span className='absolute right-0 top-0 text-sm text-black'>
                                                    {t.items?.quantity || 'x'}{item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex-1 flex items-center gap-4 justify-end'>
                                        <strong className='text-black '>
                                            {formatCurrency(item.basePrice)}
                                        </strong>
                                        <Button
                                            onClick={() =>
                                                dispatch(removeItemFromCart({ id: item.id }))
                                            }
                                            variant='secondary'
                                            className='border'
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='flex flex-col justify-end items-end pt-6'>
                        <span className='text-accent font-medium'>
                            {t.summary?.subtotal || 'Subtotal:'}
                            <strong className='text-black'>{formatCurrency(Subtotal)}</strong>
                        </span>
                        <span className='text-accent font-medium'>
                            {t.summary?.delivery || 'Delivery:'}
                            <strong className='text-black'>
                                {formatCurrency(deliveryFee)}
                            </strong>
                        </span>
                        <span className='text-accent font-medium'>
                            {t.summary?.total || 'Total:'}
                            <strong className='text-black'>
                                {formatCurrency(Subtotal + deliveryFee)}
                            </strong>
                        </span>
                    </div>
                </>
            ) : (
                <p className='text-accent'>{t.empty?.message || 'There are no items in your cart. Add some'}</p>
            )}
        </div>
    );
}
export default CartItems;
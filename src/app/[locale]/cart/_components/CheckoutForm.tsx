'use client';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import { getTotalAmount } from '@/src/lib/cart';
import { formatCurrency } from '@/src/lib/formatters';
import { selectCartItems } from '@/src/redux/features/cart/cartSlice';
import { useAppSelector } from '@/src/redux/hooks';
import { useTranslations } from '@/src/hooks/use-translations';

function CheckoutForm() {
    const cart = useAppSelector(selectCartItems);
    const totalAmount = getTotalAmount(cart);
    const { t, loading } = useTranslations('cart');

    if (loading) {
        return (
            <div className='grid gap-6 bg-gray-100 rounded-md p-4'>
                <div className="h-8 bg-gray-200 rounded animate-pulse w-32"></div>
                <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                    <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-2"></div>
                            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-16 mb-2"></div>
                            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-2"></div>
                            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        )
    }

    return (
        cart &&
        cart.length > 0 && (
            <div className='grid gap-6 bg-gray-100 rounded-md p-4'>
                <h2 className='text-2xl text-black font-semibold'>{t.checkout?.title || 'Checkout'}</h2>
                <form>
                    <div className='grid gap-4'>
                        <div className='grid gap-1'>
                            <Label htmlFor='phone' className='text-accent'>
                                {t.checkout?.form?.phone?.label || 'Phone'}
                            </Label>
                            <Input
                                id='phone'
                                placeholder={t.checkout?.form?.phone?.placeholder || 'Enter your phone'}
                                type='text'
                                name='phone'
                            />
                        </div>
                        <div className='grid gap-1'>
                            <Label htmlFor='address' className='text-accent'>
                                {t.checkout?.form?.address?.label || 'Street address'}
                            </Label>
                            <Textarea
                                id='address'
                                placeholder={t.checkout?.form?.address?.placeholder || 'Enter your address'}
                                name='address'
                                className='resize-none'
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='grid gap-1'>
                                <Label htmlFor='postal-code' className='text-accent'>
                                    {t.checkout?.form?.postalCode?.label || 'Postal code'}
                                </Label>
                                <Input
                                    type='text'
                                    id='postal-code'
                                    placeholder={t.checkout?.form?.postalCode?.placeholder || 'Enter postal code'}
                                    name='postal-code'
                                />
                            </div>
                            <div className='grid gap-1'>
                                <Label htmlFor='city' className='text-accent'>
                                    {t.checkout?.form?.city?.label || 'City'}
                                </Label>
                                <Input
                                    type='text'
                                    id='city'
                                    placeholder={t.checkout?.form?.city?.placeholder || 'Enter your City'}
                                    name='city'
                                />
                            </div>
                            <div className='grid gap-1'>
                                <Label htmlFor='country' className='text-accent'>
                                    {t.checkout?.form?.country?.label || 'Country'}
                                </Label>
                                <Input
                                    type='text'
                                    id='country'
                                    placeholder={t.checkout?.form?.country?.placeholder || 'Enter your country'}
                                    name='country'
                                />
                            </div>
                        </div>
                        <Button className='h-10'>{t.checkout?.form?.submit || 'Pay'} {formatCurrency(totalAmount)}</Button>
                    </div>
                </form>
            </div>
        )
    );
}

export default CheckoutForm;
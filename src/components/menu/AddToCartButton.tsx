"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from "@/lib/formatters";
import { Checkbox } from "../ui/checkbox";
import { Size, Extra, ProductSizes } from "@prisma/client";
import { ProductWithRelation } from "@/types/product";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addCartItem,
  removeCartItem,
  removeItemFromCart,
  selectCartItems,
} from "@/redux/features/cart/cartSlice";
import { useState } from "react";
import { getItemQuantity } from "@/lib/cart";
const AddToCartButton = ({ item }: { item: ProductWithRelation }) => {
  // Dispatch Action
  const dispatch = useAppDispatch();
  // Logic SIze
  const cart = useAppSelector(selectCartItems);
  const defaultSize =
    cart.find((element) => element.id === item.id)?.size ||
    item.sizes.find((size) => size.name === ProductSizes.SMALL);
  const [selectedSize, setSelectedSize] = useState<Size>(defaultSize!);
  // Plus / Minus Buttons
  const quantity = getItemQuantity(item.id, cart);
  // Logic Extra
  const defaultExtras =
    cart.find((element) => element.id === item.id)?.extras || [];
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtras);
  // Image error state
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.error(`Failed to load image in dialog: ${item.image}`);
    setImageError(true);
  };
  // Logic Button Add To Cart
  let totalPrice = item.basePrice;
  if (selectedSize) {
    totalPrice += selectedSize.price;
  }
  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      totalPrice += extra.price;
    }
  }
  const handleAddToCart = () => {
    dispatch(
      addCartItem({
        basePrice: item.basePrice,
        id: item.id,
        image: item.image,
        name: item.name,
        size: selectedSize,
        extras: selectedExtras,
      }),
    );
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            type="button"
            size="lg"
            className="mt-4 text-white rounded-full px-8!"
          >
            <span>Add To Cart</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25 max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex items-center">
            {!imageError && item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={200}
                onError={handleImageError}
                className="rounded-lg"
              />
            ) : (
              <div className="w-[200px] h-[200px] bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-400"
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
            <DialogTitle>{item.name}</DialogTitle>
            <DialogDescription className="text-center">
              {item.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-10">
            <div className="space-y-4 text-center">
              <Label
                htmlFor="Pick-size"
                className="block w-full text-center font-bold"
              >
                Pick Your Size
              </Label>
              <PickSize
                sizes={item.sizes}
                item={item}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
            </div>
            <div className="space-y-4 text-center">
              <Label
                htmlFor="any-extra"
                className="block w-full text-center font-bold"
              >
                Any extras?
              </Label>
              <Extras
                extras={item.extras}
                selectedExtras={selectedExtras}
                setSelectedExtras={setSelectedExtras}
              />
            </div>
          </div>
          <DialogFooter>
            {quantity === 0 ? (
              <Button
                type="submit"
                className="w-full h-10"
                onClick={handleAddToCart}
              >
                Add To Cart {formatCurrency(totalPrice)}
              </Button>
            ) : (
              <ChooseQuantity
                quantity={quantity}
                item={item}
                selectedSize={selectedSize}
                selectedExtras={selectedExtras}
              />
            )}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
export default AddToCartButton;
function PickSize({
  sizes,
  item,
  selectedSize,
  setSelectedSize,
}: {
  sizes: Size[];
  item: ProductWithRelation;
  selectedSize: Size;
  setSelectedSize: React.Dispatch<React.SetStateAction<Size>>;
}) {
  return (
    <RadioGroup defaultValue="comfortable" className="w-fit">
      {sizes.map((size) => (
        <div key={size.id} className="flex items-center gap-3">
          <RadioGroupItem
            value={selectedSize.name}
            checked={selectedSize.id === size.id}
            id={size.id}
            onClick={() => setSelectedSize(size)}
          />
          <Label htmlFor={size.id}>
            {size.name} {formatCurrency(size.price + item.basePrice)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
function Extras({
  extras,
  selectedExtras,
  setSelectedExtras,
}: {
  extras: Extra[];
  selectedExtras: Extra[];
  setSelectedExtras: React.Dispatch<React.SetStateAction<Extra[]>>;
}) {
  const handleExtra = (extra: Extra) => {
    if (selectedExtras.find((e) => e.id === extra.id)) {
      const filteredSelectedExtras = selectedExtras.filter(
        (item) => item.id !== extra.id,
      );
      setSelectedExtras(filteredSelectedExtras);
    } else {
      setSelectedExtras((prev) => [...prev, extra]);
    }
  };
  return extras.map((extra) => (
    <div
      key={extra.id}
      className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
    >
      <Checkbox
        id={extra.id}
        checked={Boolean(selectedExtras.find((e) => e.id === extra.id))}
        onClick={() => handleExtra(extra)}
      />
      <Label htmlFor={extra.id} className="text-sm font-medium">
        {extra.name} {formatCurrency(extra.price)}
      </Label>
    </div>
  ));
}

const ChooseQuantity = ({
  quantity,
  item,
  selectedExtras,
  selectedSize,
}: {
  quantity: number;
  selectedExtras: Extra[];
  selectedSize: Size;
  item: ProductWithRelation;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center flex-col gap-2 mt-4 w-full">
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => dispatch(removeCartItem({ id: item.id }))}
        >
          -
        </Button>
        <div>
          <span className="text-black">{quantity} in cart</span>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            dispatch(
              addCartItem({
                basePrice: item.basePrice,
                id: item.id,
                image: item.image,
                name: item.name,
                extras: selectedExtras,
                size: selectedSize,
              }),
            )
          }
        >
          +
        </Button>
      </div>
      <Button
        size="sm"
        onClick={() => dispatch(removeItemFromCart({ id: item.id }))}
      >
        Remove
      </Button>
    </div>
  );
};

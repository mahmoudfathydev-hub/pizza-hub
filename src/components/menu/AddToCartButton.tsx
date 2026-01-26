"use client"

import Image from "next/image"
import { Button } from "../ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog"
import { Label } from "../ui/label"

import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group"
import { formatCurrency } from "@/src/lib/formatters"
import { Checkbox } from "../ui/checkbox"
import {  Size, Extra } from "@prisma/client"
import { ProductWithRelation } from "@/src/types/product"



const AddToCartButton = ({ item }: { item: ProductWithRelation }) => {
    return (

        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button
                        type='button'
                        size='lg'
                        className="mt-4 text-white rounded-full px-8!">
                        <span>Add To Cart</span>
                    </Button>

                </DialogTrigger>
                <DialogContent className="sm:max-w-106.25 max-h-[80vh] overflow-y-auto">
                    <DialogHeader className="flex items-center">
                        <Image src={item.image} alt={item.name} width={200} height={200} />
                        <DialogTitle>{item.name}</DialogTitle>
                        <DialogDescription className="text-center">{item.description}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-10">
                        <div className="space-y-4 text-center">
                            <Label htmlFor="Pick-size" className="block w-full text-center font-bold">Pick Your Size</Label>
                            <PickSize sizes={item.sizes} item={item} />
                        </div>
                        <div className="space-y-4 text-center">
                            <Label htmlFor="any-extra" className="block w-full text-center font-bold">Any extras?</Label>
                            <Extras extras={item.extras} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full h-10">Add To Cart</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default AddToCartButton
function PickSize({ sizes, item }: { sizes: Size[]; item: ProductWithRelation }) {
    return (
        <RadioGroup defaultValue="comfortable" className="w-fit">
            {sizes.map((size) => (
                <div key={size.id} className="flex items-center gap-3">
                    <RadioGroupItem value={size.id} id={size.id} />
                    <Label htmlFor={size.id}>
                        {size.name} {formatCurrency(size.price + item.basePrice)}
                    </Label>
                </div>
            ))}
        </RadioGroup>
    )
}



function Extras({ extras }: { extras: Extra[]}) {
    return (
        extras.map((extra) => (
            <div key={extra.id} className="flex items-center space-x-2 border border-gray-100 rounded-md p-4">
                <Checkbox id={extra.id} />
                <Label htmlFor={extra.id} className="text-sm font-medium">
                    {extra.name} {formatCurrency(extra.price)}
                </Label>
            </div>
        ))
    )
}

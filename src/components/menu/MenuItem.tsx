import { formatCurrency } from "@/src/lib/formatters"
import Image from "next/image"
import AddToCartButton from "./AddToCartButton"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuItem = ({ item }: { item: any }) => {
    return (
        <li>
            <div className="relative w-48 h-48 mx-auto">
                <Image
                    src={item.image}
                    className="object-cover"
                    alt={item.name}
                    fill />
            </div>
            <div className="info flex items-center justify-between">
                <h4 className="font-semibold text-black text-xl my-3">{item.name}</h4>
                <strong className="text-accent">{formatCurrency(item.basePrice)}</strong>
            </div>
            <p className="text-gray-500 text-sm line-clamp-3">
                {item.description}
            </p>
            <AddToCartButton item={item}/>
        </li>
    )
}

export default MenuItem
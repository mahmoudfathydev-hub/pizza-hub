import Link from "@/components/link";
import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { Product } from "@prisma/client";
import Image from "next/image";

import { MenuItemsTranslations } from "@/lib/translation";

interface MenuItemsProps {
    products: Product[];
    locale: Locale;
    translations: MenuItemsTranslations;
}

function MenuItems({ products, locale, translations }: MenuItemsProps) {
    return products && products.length > 0 ? (
        <ul className="grid grid-cols-3 gap-4 sm:max-w-156.25 mx-auto">
            {products.map((product) => (
                <li
                    key={product.id}
                    className="bg-gray-100 hover:bg-gray-200 duration-200 transition-colors rounded-md"
                >
                    <Link
                        href={`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${product.id}/${Pages.EDIT}`}
                        className="element-center flex-col py-4"
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={100}
                            height={100}
                        />
                        <h3 className="text-lg text-accent font-medium">{product.name}</h3>
                    </Link>
                </li>
            ))}
        </ul>
    ) : (
        <p className="text-accent text-center">{translations.noMenuItemsFound}</p>
    );
}

export default MenuItems;
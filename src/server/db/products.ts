import { cache } from "@/src/lib/cashe";
import { db } from "@/src/lib/prisma";

export const getProductsByCategory = cache(
    () => {
        const products = db.category.findMany({
            include: {
                products: {
                    include: {
                        sizes: true,
                        extras: true,
                    },
                },
            },
        });
        return products;
    },
    ["products-by-category"],
    { revalidate: 3600 }
);
export const getBestSellers = cache(
    (limit?: number) => {
        return db.product.findMany({
            where: {
                orders: {
                    some: {},
                },
            },
            orderBy: {
                orders: {
                    _count: "desc",
                },
            },
            include: {
                sizes: true,
                extras: true,
            },
            take: limit,
        });
    },
    ["best-sellers"],
    { revalidate: 3600 }
);

export const getProducts = cache(
    () => {
        const products = db.product.findMany({
            orderBy: {
                order: "asc",
            },
        });
        return products;
    },
    ["products"],
    { revalidate: 3600 }
);

export const getProduct = cache(
    (id: string) => {
        const product = db.product.findUnique({
            where: {
                id,
            },
            include: {
                sizes: true,
                extras: true,
            },
        });
        return product;
    },
    [`product-${crypto.randomUUID()}`],
    { revalidate: 3600 }
);
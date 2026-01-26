import { cache } from "@/src/lib/cashe";
import { db } from "@/src/lib/prisma";

export const getBestSellers = cache((limit?: number | undefined) => {
    return db.product.findMany({
        where: {
            orderItems: {
                some: {}, 
            },
        },
        orderBy: {
            orderItems: {
                _count: "desc",
            },
        },
        include: {
            sizes: true,
            extras: true,
        },
        take: limit
    });
}, ["best-sellers"], { revalidate: 3600 });

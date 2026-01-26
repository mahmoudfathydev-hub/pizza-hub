import { Prisma } from "@prisma/client"

export type ProductWithRelation = Prisma.ProductGetPayload<{
    include:{
        sizes: true,
        extras: true,
    };
}>;
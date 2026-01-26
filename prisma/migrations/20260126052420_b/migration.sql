/*
  Warnings:

  - You are about to drop the column `City` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `Country` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `City` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `StreetAddress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `postalCose` on the `User` table. All the data in the column will be lost.
  - Added the required column `city` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "Category_order_seq";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "City",
DROP COLUMN "Country",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "CreatedAt",
DROP COLUMN "orderId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "City",
DROP COLUMN "Country",
DROP COLUMN "StreetAddress",
DROP COLUMN "postalCose",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "streetAddress" TEXT;

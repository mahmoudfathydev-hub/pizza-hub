/*
  Warnings:

  - The values [ONION] on the enum `ExtraIngredients` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExtraIngredients_new" AS ENUM ('MOZZARELLA', 'CHEDDAR', 'BLUE_CHEESE', 'PARMESAN', 'PEPPERONI', 'BACON', 'CHICKEN', 'SAUSAGE', 'MUSHROOMS', 'OLIVES', 'BELL_PEPPERS', 'SPINACH', 'ONIONS', 'JALAPENOS', 'PINEAPPLE', 'TRUFFLE_OIL', 'GARLIC', 'CHEESE', 'TOMATO', 'PEPPER');
ALTER TABLE "Extra" ALTER COLUMN "name" TYPE "ExtraIngredients_new" USING ("name"::text::"ExtraIngredients_new");
ALTER TYPE "ExtraIngredients" RENAME TO "ExtraIngredients_old";
ALTER TYPE "ExtraIngredients_new" RENAME TO "ExtraIngredients";
DROP TYPE "public"."ExtraIngredients_old";
COMMIT;

-- AlterEnum
ALTER TYPE "ProductSizes" ADD VALUE 'FAMILY';

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "Product_basePrice_idx" ON "Product"("basePrice");

-- CreateIndex
CREATE INDEX "Product_createdAt_idx" ON "Product"("createdAt");

-- CreateIndex
CREATE INDEX "Product_name_idx" ON "Product"("name");

-- CreateIndex
CREATE INDEX "Product_categoryId_basePrice_idx" ON "Product"("categoryId", "basePrice");

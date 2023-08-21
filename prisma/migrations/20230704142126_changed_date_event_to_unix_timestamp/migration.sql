/*
  Warnings:

  - You are about to drop the column `date` on the `CartItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "date",
ADD COLUMN     "dateEvent" INTEGER;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "dateEvent" INTEGER;

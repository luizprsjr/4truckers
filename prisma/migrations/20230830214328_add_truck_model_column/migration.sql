/*
  Warnings:

  - Added the required column `truckModel` to the `trucks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trucks" ADD COLUMN     "truckModel" TEXT NOT NULL,
ALTER COLUMN "length" DROP NOT NULL,
ALTER COLUMN "width" DROP NOT NULL,
ALTER COLUMN "height" DROP NOT NULL;

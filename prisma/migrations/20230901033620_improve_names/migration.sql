/*
  Warnings:

  - You are about to drop the column `deliveryCity` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryDate` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `pickUpCity` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `pickUpDate` on the `announcements` table. All the data in the column will be lost.
  - Added the required column `destinationCity` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originCity` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originDate` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcements" DROP COLUMN "deliveryCity",
DROP COLUMN "deliveryDate",
DROP COLUMN "pickUpCity",
DROP COLUMN "pickUpDate",
ADD COLUMN     "destinationCity" TEXT NOT NULL,
ADD COLUMN     "destinationDate" TIMESTAMP(3),
ADD COLUMN     "originCity" TEXT NOT NULL,
ADD COLUMN     "originDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "originEndDate" TIMESTAMP(3);

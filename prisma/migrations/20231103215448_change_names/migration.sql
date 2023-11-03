/*
  Warnings:

  - You are about to drop the column `destinationDate` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `destinationEndDate` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `originDate` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `originEndDate` on the `announcements` table. All the data in the column will be lost.
  - Added the required column `pickupOrDepartureDate` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcements" DROP COLUMN "destinationDate",
DROP COLUMN "destinationEndDate",
DROP COLUMN "originDate",
DROP COLUMN "originEndDate",
ADD COLUMN     "arrivalOrDeliveryDate" TIMESTAMP(3),
ADD COLUMN     "deliveryMaxDate" TIMESTAMP(3),
ADD COLUMN     "pickUpMaxDate" TIMESTAMP(3),
ADD COLUMN     "pickupOrDepartureDate" TIMESTAMP(3) NOT NULL;

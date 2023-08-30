/*
  Warnings:

  - You are about to drop the column `arrival` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `arrivalCity` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `departure` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `departureCity` on the `announcements` table. All the data in the column will be lost.
  - Added the required column `destinationCity` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickUpCity` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickUpDate` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcements" DROP COLUMN "arrival",
DROP COLUMN "arrivalCity",
DROP COLUMN "departure",
DROP COLUMN "departureCity",
ADD COLUMN     "deliveryCity" TIMESTAMP(3),
ADD COLUMN     "destinationCity" TEXT NOT NULL,
ADD COLUMN     "pickUpCity" TEXT NOT NULL,
ADD COLUMN     "pickUpDate" TIMESTAMP(3) NOT NULL;

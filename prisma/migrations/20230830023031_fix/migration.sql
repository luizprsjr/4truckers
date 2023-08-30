/*
  Warnings:

  - You are about to drop the column `destinationCity` on the `announcements` table. All the data in the column will be lost.
  - Made the column `deliveryCity` on table `announcements` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "announcements" DROP COLUMN "destinationCity",
ADD COLUMN     "deliveryDate" TIMESTAMP(3),
ALTER COLUMN "deliveryCity" SET NOT NULL,
ALTER COLUMN "deliveryCity" SET DATA TYPE TEXT;

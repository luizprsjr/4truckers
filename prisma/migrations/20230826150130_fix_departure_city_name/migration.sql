/*
  Warnings:

  - You are about to drop the column `deparatureCity` on the `announcements` table. All the data in the column will be lost.
  - Added the required column `departureCity` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcements" DROP COLUMN "deparatureCity",
ADD COLUMN     "departureCity" TEXT NOT NULL;

/*
  Warnings:

  - Added the required column `arrivalCity` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deparatureCity` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcements" ADD COLUMN     "arrivalCity" TEXT NOT NULL,
ADD COLUMN     "deparatureCity" TEXT NOT NULL;

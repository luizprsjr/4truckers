/*
  Warnings:

  - Added the required column `type` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AdType" AS ENUM ('FREIGHT', 'FREE_DRIVER');

-- AlterTable
ALTER TABLE "announcements" ADD COLUMN     "type" "AdType" NOT NULL;

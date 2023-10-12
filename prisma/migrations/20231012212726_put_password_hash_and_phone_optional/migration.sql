-- AlterTable
ALTER TABLE "users" ALTER COLUMN "passwordHash" DROP NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL;

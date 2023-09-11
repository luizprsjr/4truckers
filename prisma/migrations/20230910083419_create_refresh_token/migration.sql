-- CreateTable
CREATE TABLE "refresh-token" (
    "id" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "refresh-token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "refresh-token" ADD CONSTRAINT "refresh-token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

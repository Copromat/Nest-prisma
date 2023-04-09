/*
  Warnings:

  - You are about to drop the column `createat_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[long_number]` on the table `Credit_card` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cvv` to the `Credit_card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long_number` to the `Credit_card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Credit_card" ADD COLUMN     "cvv" INTEGER NOT NULL,
ADD COLUMN     "long_number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createat_at",
DROP COLUMN "password",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Security_guard" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "refresh_token" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Security_guard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Security_guard_userId_key" ON "Security_guard"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Credit_card_long_number_key" ON "Credit_card"("long_number");

-- AddForeignKey
ALTER TABLE "Security_guard" ADD CONSTRAINT "Security_guard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

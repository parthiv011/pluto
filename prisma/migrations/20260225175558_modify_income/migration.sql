/*
  Warnings:

  - You are about to drop the column `date` on the `Income` table. All the data in the column will be lost.
  - Added the required column `receivedAt` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `source` on the `Income` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "IncomeSource" AS ENUM ('ADS', 'SPONSORSHIP', 'AFFILIATE', 'SUBSCRIPTION', 'DONATION', 'OTHER');

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "date",
ADD COLUMN     "brandName" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "platform" TEXT,
ADD COLUMN     "receivedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "source",
ADD COLUMN     "source" "IncomeSource" NOT NULL;

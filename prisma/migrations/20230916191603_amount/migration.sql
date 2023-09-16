/*
  Warnings:

  - You are about to drop the column `fee` on the `payable` table. All the data in the column will be lost.
  - Added the required column `amount` to the `payable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payable" DROP COLUMN "fee",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;

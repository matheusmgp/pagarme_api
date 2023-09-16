/*
  Warnings:

  - Added the required column `card_number` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "card_number" TEXT NOT NULL;

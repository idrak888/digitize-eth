/*
  Warnings:

  - Added the required column `tokenDescription` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trade" ADD COLUMN     "tokenDescription" STRING NOT NULL;

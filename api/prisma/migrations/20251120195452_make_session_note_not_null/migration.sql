/*
  Warnings:

  - Made the column `note` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "note" SET NOT NULL,
ALTER COLUMN "note" SET DEFAULT '';

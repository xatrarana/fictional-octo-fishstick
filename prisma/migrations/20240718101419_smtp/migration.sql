/*
  Warnings:

  - You are about to drop the column `displayame` on the `Smtp` table. All the data in the column will be lost.
  - You are about to drop the column `serverName` on the `Smtp` table. All the data in the column will be lost.
  - Added the required column `displayname` to the `Smtp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servername` to the `Smtp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Smtp` DROP COLUMN `displayame`,
    DROP COLUMN `serverName`,
    ADD COLUMN `displayname` VARCHAR(191) NOT NULL,
    ADD COLUMN `servername` VARCHAR(191) NOT NULL;

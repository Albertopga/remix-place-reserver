/*
  Warnings:

  - You are about to drop the column `x` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the column `y` on the `Site` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Site" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "screen" BOOLEAN NOT NULL DEFAULT false,
    "support_pc" BOOLEAN NOT NULL DEFAULT false,
    "support_screen" BOOLEAN NOT NULL DEFAULT false,
    "occupied" BOOLEAN NOT NULL DEFAULT false,
    "office_id" TEXT NOT NULL,
    CONSTRAINT "Site_office_id_fkey" FOREIGN KEY ("office_id") REFERENCES "Office" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Site" ("id", "occupied", "office_id", "screen", "support_pc", "support_screen") SELECT "id", "occupied", "office_id", "screen", "support_pc", "support_screen" FROM "Site";
DROP TABLE "Site";
ALTER TABLE "new_Site" RENAME TO "Site";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

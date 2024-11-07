/*
  Warnings:

  - You are about to drop the column `registerType` on the `DailyRegister` table. All the data in the column will be lost.
  - Added the required column `type` to the `DailyRegister` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DailyRegister" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employeeId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    CONSTRAINT "DailyRegister_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DailyRegister" ("date", "employeeId", "id") SELECT "date", "employeeId", "id" FROM "DailyRegister";
DROP TABLE "DailyRegister";
ALTER TABLE "new_DailyRegister" RENAME TO "DailyRegister";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

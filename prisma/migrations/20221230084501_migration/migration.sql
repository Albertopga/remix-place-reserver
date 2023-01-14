-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedtedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Site" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "screen" BOOLEAN NOT NULL DEFAULT false,
    "support_pc" BOOLEAN NOT NULL DEFAULT false,
    "support_screen" BOOLEAN NOT NULL DEFAULT false,
    "occupied" BOOLEAN NOT NULL DEFAULT false,
    "office_id" TEXT NOT NULL,
    CONSTRAINT "Site_office_id_fkey" FOREIGN KEY ("office_id") REFERENCES "Office" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Office" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "city" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Office_admins" (
    "id" TEXT NOT NULL,
    "office_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedtedAt" DATETIME NOT NULL,

    PRIMARY KEY ("office_id", "user_id"),
    CONSTRAINT "Office_admins_office_id_fkey" FOREIGN KEY ("office_id") REFERENCES "Office" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Office_admins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Office_sites_booking" (
    "id" TEXT NOT NULL,
    "site_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "bookingAt" DATETIME NOT NULL,
    "updatedtedAt" DATETIME NOT NULL,

    PRIMARY KEY ("site_id", "user_id", "bookingAt"),
    CONSTRAINT "Office_sites_booking_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Office_sites_booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_key" ON "Role"("role");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Office_city_key" ON "Office"("city");

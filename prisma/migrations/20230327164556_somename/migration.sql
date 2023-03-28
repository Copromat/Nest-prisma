-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firs_name" TEXT NOT NULL,
    "middle_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sity" TEXT,
    "work" TEXT,
    "skills" TEXT,
    "avatar" TEXT,
    "createat_at" TIMESTAMP(3),
    "update_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credit_card" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "bank" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL,

    CONSTRAINT "Credit_card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- AddForeignKey
ALTER TABLE "Credit_card" ADD CONSTRAINT "Credit_card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

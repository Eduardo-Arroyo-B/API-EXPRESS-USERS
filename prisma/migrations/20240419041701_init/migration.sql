-- CreateTable
CREATE TABLE "productos" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

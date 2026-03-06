-- CreateTable
CREATE TABLE "learned" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "learned_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "learned_user_id_group_id_key" ON "learned"("user_id", "group_id");

-- AddForeignKey
ALTER TABLE "learned" ADD CONSTRAINT "learned_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learned" ADD CONSTRAINT "learned_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

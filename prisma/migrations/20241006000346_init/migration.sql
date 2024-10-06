/*
  Warnings:

  - You are about to drop the `_BlogTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BlogTag" DROP CONSTRAINT "_BlogTag_blogID_fkey";

-- DropForeignKey
ALTER TABLE "_BlogTag" DROP CONSTRAINT "_BlogTag_tagID_fkey";

-- DropTable
DROP TABLE "_BlogTag";

-- CreateTable
CREATE TABLE "_BlogTags" (
    "A" UUID NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BlogTags_AB_unique" ON "_BlogTags"("A", "B");

-- CreateIndex
CREATE INDEX "_BlogTags_B_index" ON "_BlogTags"("B");

-- AddForeignKey
ALTER TABLE "_BlogTags" ADD CONSTRAINT "_BlogTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogTags" ADD CONSTRAINT "_BlogTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

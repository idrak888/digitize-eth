-- CreateEnum
CREATE TYPE "TradeStatus" AS ENUM ('CREATED', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "Trade" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ownerUserAddress" STRING NOT NULL,
    "requestingUserAddress" STRING NOT NULL,
    "tokenId" STRING NOT NULL,
    "status" "TradeStatus" NOT NULL DEFAULT 'CREATED',

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_ownerUserAddress_fkey" FOREIGN KEY ("ownerUserAddress") REFERENCES "User"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_requestingUserAddress_fkey" FOREIGN KEY ("requestingUserAddress") REFERENCES "User"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

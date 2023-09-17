import prisma from "@/lib/prisma";
import { TradeStatus } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  const { tradeId } = req.body;

  const updatedTrade = await prisma.trade.update({
    where: {
      id: tradeId,
    },
    data: {
      status: TradeStatus.COMPLETED
    },
  });

  if (!updatedTrade) {
    throw new Error("Error updating trade");
  }

  return res.status(200).json(true);
}

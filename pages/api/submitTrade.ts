import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  const { ownerAddress, tokenId, requestingAddress, description } = req.body;

  console.log("Owner Address: ", ownerAddress);
  console.log("Token ID: ", tokenId);
  console.log("Requesting Address: ", requestingAddress);
  const createdTrade = await prisma.trade.create({
    data: {
      ownerUserAddress: ownerAddress,
      tokenId,
      requestingUserAddress: requestingAddress,
      tokenDescription: description,
    },
  });

  if (!createdTrade) {
    throw new Error("Error creating trade");
  }

  return res.status(200).json(true);
}

import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Given wallet address, return user
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(422).json({});
  }

  const user = await prisma.user.findUnique({
    where: {
      walletAddress,
    },
  });

  if (!user) {
    return res.status(404).json({});
  }

  return res.status(200).json(user);
}
